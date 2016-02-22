<?php

/**
 * @file
 * Handles displaying the splash page.
 *
 * Either creates the JS for handling the splash page (redirect, lightbox or
 * popup) or displays the What: Content full screen or in the site design.
 */

/**
 * Implements hook_init().
 *
 * Generates the JS for the redirect, lightbox or popup window.
 */
function splashify_init() {
  global $base_url;

  // Load the jStorage library.
  $library_path = splashify_get_library_path('jstorage');
  if ($library_path) {
    drupal_add_js($library_path . '/jstorage.min.js');
  }
  else {
    // Error message?
  }

  // If this is the cron script or drush, do not run the splashify code.
  $drush_check = (function_exists('drush_verify_cli') && call_user_func('drush_verify_cli')) ? TRUE : FALSE;
  $cron_check = (strpos($_SERVER['PHP_SELF'], 'cron.php') !== FALSE) ? TRUE : FALSE;
  if ($drush_check || $cron_check) {
    return;
  }


  /*
   * Step #1: Retrieve the admin settings.
   */

  $config = _splashify_get_config();

  $when_frequency = $config['when_frequency'];
  $where_page = $config['where_page'];
  $where_listpages = $config['where_listpages'];
  $what_mode = $config['what_mode'];
  $what_content = $config['what_content'];
  $what_content_value = $config['what_content_value'];
  $how_mode = $config['how_mode'];
  $how_size = $config['how_size'];


  /*
   * Step #2: Should we display the splash page?
   */

  if ($when_frequency == 'never') {
    return;
  }

  // Default to not showing the splash page.
  $splash_display = FALSE;

  if (!isset($_GET['splash'])) {
    $_GET['splash'] = '';
  }

  $splash_correct_page = FALSE;
  switch ($where_page) {
    case 'all':
      // Display on all pages.
      $splash_correct_page = TRUE;
      break;

    case 'home':
      // Display on the home page.
      if ($_GET['q'] == drupal_get_normal_path(variable_get('site_frontpage', 'node'))) {
        $splash_correct_page = TRUE;
      }
      break;

    case 'list':
      // Display the splash on the provided list of pages. Loop through the
      // paths.
      $list_paths = preg_split('/[\n\r]+/', $where_listpages);
      foreach ($list_paths as $list_path) {
        $list_path = trim($list_path);
        if ($list_path == $_GET['q']) {
          $splash_correct_page = TRUE;
          break;
        }
      }
      break;
  }

  /*
   * Goes through the main server side checks to see if we should show the
   * splash page.
   */

  if (empty($what_content_value)) {
    // The What: Content field is not specified.
    $splash_display = FALSE;
  }
  elseif ($_GET['splash'] == 'off') {
    // Special case for preventing the splash page from showing up.
    $splash_display = FALSE;
  }
  elseif ($_GET['splash'] == 'on') {
    // Special case for forcing the splash page to show up.
    $splash_display = TRUE;

    // Modify this value to force the splash to show up in this case.
    $when_frequency = 'always';
  }
  elseif ($splash_correct_page) {
    // We need to show the splash page on this page. Do one last check.
    if (($parsed_url = parse_url($base_url)) && stristr($_SERVER['HTTP_REFERER'], $parsed_url['host'])) {
      // This page was loaded from an internal page. Do not show the splash
      // page.
      $splash_display = FALSE;
    }
    else {
      // We passed all of the tests...display the splash page!
      $splash_display = TRUE;
    }
  }

  // If we shouldn't display the splash, end the code here.
  if (!$splash_display) {
    return;
  }


  /*
   * Step #3: Display the Splash Page
   *
   * At this point, we know that we should display the splash page.
   */

  // Controls when the jStorage variable should expire next. In other words,
  // when should the splash page show up again?
  $js_expiretime = '';

  // Since the time is based on server time, we need to pass this value to
  // the JS.
  $js_nowtime = time();

  // This variable is a way to always show the splash in the JS.
  $js_splash_always = FALSE;

  switch ($when_frequency) {
    case 'once':
      // Set to expire in one year.
      $js_expiretime = time() + (365 * 24 * 60 * 60);
      break;

    case 'daily':
      // Set to expire in 24 hours.
      $js_expiretime = time() + (24 * 60 * 60);
      break;

    case 'weekly':
      // Set to expire in 7 days.
      $js_expiretime = time() + (7 * 24 * 60 * 60);
      break;

    case 'always':
      // This should make the splash always show up on the next page load.
      $js_expiretime = time();
      $js_splash_always = TRUE;
      break;
  }

  // If we are working with a url, we need to specify that url value here.
  $url = '';
  $js_mode_settings = array();
  if ($what_mode == 'template' || $what_mode == 'fullscreen') {
    // We need to redirect to the /splash page. Define the action url.
    $js_mode_settings['url'] = url('splash');
    if ($what_mode == 'fullscreen') {
      // Display HTML without the site template. Set the HTML variable.
      $js_mode_settings['html'] = $what_content_value;
    }
  }
  elseif ($what_mode == 'sequence' || $what_mode == 'random') {
    // Remove any markup that may be leftover from a previous input format.
    // Trim so that we're not left with an extra '/', which can cause an
    // infinite loop on redirects.
    $what_content_value = trim(strip_tags($what_content_value));
    $what_paths = preg_split('/[\n\r]+/', $what_content_value);
    if ($what_mode == 'sequence') {
      /*
       * Since we are using jStorage to store the last splash page that was
       * displayed, we need to create an array of the sequential url's and
       * figure out which is the next url to display (based on the previous
       * url)...all through JS.
       */

      // We don't use this value in this case, so set it to empty.
      $js_mode_settings['url'] = '';

      // This holds all of the url values in the correct order.
      $js_mode_settings['urls'] = array();
      $js_mode_settings['total_urls'] = count($what_paths);
      foreach ($what_paths as $path) {
        $js_mode_settings['urls'][] = url(trim($path));
      }
    }
    elseif ($what_mode == 'random') {
      $next_index = array_rand($what_paths);

      // Define the action url.
      $js_mode_settings['url'] = url(trim($what_paths[$next_index]));
    }
  }

  // Define the last remaining JS variables we need to send.
  $size_action = $how_size ? explode('x', $how_size) : FALSE;
  $js_mode = '';
  switch ($how_mode) {
    case 'redirect':
      // Redirect to a different url.
      $js_mode = 'redirect';
      break;

    case 'window':
      // Open up a popup window.
      $js_mode = 'window';
      $js_mode_settings['size'] = $size_action ? 'width=' . $size_action[0] . ',height=' . $size_action[1] : '';
      break;

    case 'lightbox':
      if (module_exists('colorbox')) {
        // Display a ColorBox.
        $js_mode = 'colorbox';

        // Get the size of the lightbox.
        if (count($size_action) > 1) {
          $colorbox_width = $size_action[0];
          $colorbox_height = $size_action[1];
        }
        else {
          // Default size settings for the colorbox.
          $colorbox_width = 800;
          $colorbox_height = 600;
        }

        $js_mode_settings['size_width'] = $colorbox_width;
        $js_mode_settings['size_height'] = $colorbox_height;
      }
      else {
        return;
      }

      break;

    default:
      // Do nothing! This is a fail safe.
      return;
  }


  /*
   * Finally: Include the JS that puts it all together!
   *
   * At this point the page passed all of the server side checks. We now
   * implement JS code that checks if the splash page should show up, based
   * on when it last showed up. It then executes the JS action code, based
   * on the specified settings.
   */

  // Make our splash settings variables available to our JavaScript.
  $js_settings = array(
    'js_nowtime' => $js_nowtime,
    'js_splash_always' => $js_splash_always ? '1' : '0',
    'js_expiretime' => $js_expiretime,
    'js_mode' => $js_mode,
    'js_mode_settings' => $js_mode_settings,
  );

  drupal_add_js(array('splashify' => $js_settings), 'setting');
  drupal_add_js(drupal_get_path('module', 'splashify') . '/js/jquery.json-2.3.min.js', 'module', 'header', FALSE, TRUE);

  // Include the main JS file that does the heavy lifting.
  $js_splashify = drupal_get_path('module', 'splashify') . '/js/splashify.js';
  drupal_add_js($js_splashify, 'theme', 'header', FALSE, TRUE);
}

/**
 * Display the What: Content either in the site template or full screen.
 *
 * @return string
 *   If the $what_mode equals 'template', returns the string entered into
 *   $what_content_value. If $what_mode equals 'fullscreen', it displays
 *   the text right there and exits the request.
 */
function splashify_display_splashtext() {
  $config = _splashify_get_config();

  $when_frequency = $config['when_frequency'];
  $where_page = $config['where_page'];
  $where_listpages = $config['where_listpages'];
  $what_mode = $config['what_mode'];
  $what_content = $config['what_content'];
  $what_content_value = $config['what_content_value'];
  $what_content_title = $config['what_content_title'];
  $how_mode = $config['how_mode'];
  $how_size = $config['how_size'];

  if ($what_mode == 'template') {
    // Display what they entered in the field in the site template.
    if (!empty($what_content_title)) {
      drupal_set_title($what_content_title);
    }

    return $what_content_value;
  }
  elseif ($what_mode == 'fullscreen') {
    // Display what they entered in the field as a full page.
    print $what_content_value;
    exit(); // drupal_exit() is only for D7
  }
}

/**
 * Retrieves the admin settings.
 *
 * Will either retrieve the desktop or mobile settings, depending whether this
 * is a mobile request or not.
 *
 * @return array
 *   Returns an associate array with the following keys: when_frequency,
 *   when_mobile_test, where_page, where_listpages, what_mode, what_content,
 *   what_content_value, how_mode, and how_size.
 */
function _splashify_get_config() {
  // This controls whether mobile is enabled or not.
  $is_mobile_enabled = variable_get('splashify_when_mobile', 0);

  // This controls whether or not we should use the mobile settings for this
  // request.
  $do_mobile = FALSE;

  // If this admin setting is true, force the system to use the mobile
  // settings.
  $force_mobile = variable_get('splashify_when_mobile_test', FALSE);

  if (!empty($is_mobile_enabled) && module_exists('mobile_tools')) {

    // Is this a mobile request?
    module_load_include('module', 'mobile_tools');
    $mobile = mobile_tools_is_mobile_device();
    if ($mobile['type'] != 'desktop' || $force_mobile) {
      // This is a mobile request!
      $do_mobile = TRUE;

      // Get the mobile admin settings.
      $when_frequency = variable_get('splashify_when_mobile_frequency', 'never');
      $where_page = variable_get('splashify_where_mobile_page', 'home');
      $where_listpages = variable_get('splashify_where_mobile_listpages', '');
      $what_mode = variable_get('splashify_what_mobile_mode', 'random');
      $what_content = variable_get('splashify_what_mobile_content', '');
      $what_content_format = variable_get('splashify_what_mobile_content_format', 'FILTER_FORMAT_DEFAULT');
      $what_content_title = variable_get('splashify_what_mobile_pagetitle', '');
      $how_mode = variable_get('splashify_how_mobile_mode', 'redirect');

      // This is no longer an option for the mobile settings.
      $how_size = '';
    }
  }

  if (!$do_mobile) {
    // Get the desktop admin settings.
    $when_frequency = variable_get('splashify_when_desktop_frequency', 'never');
    $where_page = variable_get('splashify_where_desktop_page', 'home');
    $where_listpages = variable_get('splashify_where_desktop_listpages', '');
    $what_mode = variable_get('splashify_what_desktop_mode', 'random');
    $what_content = variable_get('splashify_what_desktop_content', '');
    $what_content_format = variable_get('splashify_what_desktop_content_format', 'FILTER_FORMAT_DEFAULT');
    $what_content_title = variable_get('splashify_what_desktop_pagetitle', '');
    $how_mode = variable_get('splashify_how_desktop_mode', 'redirect');
    $how_size = variable_get('splashify_how_desktop_size', '');
  }

  // This is a textarea field, so make sure this value is safe.
  $where_listpages = check_plain($where_listpages);

  if (isset($what_content)) {
    // We are dealing with a textarea field.
    // Do not check for access to the input format, as doing so might result in
    // unexpected behavior when anons visit the page.
    $check_access = FALSE;
    $what_content_value = check_markup($what_content, $what_content_format, $check_access);
  }
  else {
    $what_content_value = '';
  }

  return array(
    'when_frequency' => $when_frequency,
    'when_mobile_test' => $force_mobile,
    'where_page' => $where_page,
    'where_listpages' => $where_listpages,
    'what_mode' => $what_mode,
    'what_content' => $what_content,
    'what_content_value' => $what_content_value,
    'what_content_title' => $what_content_title,
    'how_mode' => $how_mode,
    'how_size' => $how_size,
  );
}
