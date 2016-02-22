<?php

/**
 * @file
 * The admin "Where" tab.
 *
 * Admin functionality that determines where the splash page should show up
 * on the website.
 */

/**
 * "Where" settings tab.
 */
function splashify_admin_where_form(&$form_state) {
  $form = array();

  $form['description'] = array(
    '#markup' => '<p>' . t('Where should the splash page come up?') . '</p>',
  );

  $form['desktop'] = array(
    '#type' => 'fieldset',
    '#title' => t('Desktop Settings'),
  );

  $page_options = array(
    'home' => t('Front Page'),
    'all' => t('All Pages'),
  );

  $form['desktop']['splashify_where_desktop_page'] = array(
    '#type' => 'select',
    '#title' => t('Specify where the splash page should show up:'),
    '#default_value' => variable_get('splashify_where_desktop_page', 'home'),
    '#options' => $page_options,
    '#description' => t('Define where the splash page should show up.'),
  );

  // Set a variable that is either defined by the selection from the ajax
  // dropdown, or a previously saved value.
  if (isset($form_state['values']['splashify_where_desktop_page'])) {
    $where_desktop_list_set = $form_state['values']['splashify_where_desktop_page'];
  }
  else {
    $where_desktop_list_set = variable_get('splashify_where_desktop_page', '');
  }

  $form['mobile'] = array(
    '#type' => 'fieldset',
    '#title' => t('Mobile Settings'),
  );

  // If the mobile splash is enabled, display the mobile options.
  if (variable_get('splashify_when_mobile', 0) == 1) {
    $form['mobile']['splashify_where_mobile_page'] = array(
      '#type' => 'select',
      '#title' => t('Specify where the splash page should show up:'),
      '#default_value' => variable_get('splashify_where_mobile_page', 'home'),
      '#options' => $page_options,
      '#ajax' => array(
        'callback' => 'splashify_ajax_where_mobile_page_callback',
        'wrapper' => 'where-mobile-page-value',
        'method' => 'replace',
        'effect' => 'slide',
      ),
    );

    // Set a variable that is either defined by the selection from the ajax
    // drop down, or a previously saved value.
    if (isset($form_state['values']['splashify_where_mobile_page'])) {
      $where_mobile_list_set = $form_state['values']['splashify_where_mobile_page'];
    }
    else {
      $where_mobile_list_set = variable_get('splashify_where_mobile_page', '');
    }
  }
  else {
    $form['mobile']['splashify_what_mobile_mode'] = array(
      '#markup' => '<p>' . t('In order to specify mobile options, you need to enable the "When: Enable Unique Mobile Splash" option.') . '</p>',
    );
  }

  $form['#validate'][] = 'splashify_admin_where_form_validate';
  $form['#submit'][] = 'splashify_admin_where_form_submit';
  return system_settings_form($form);
}

/**
 * Implements form validation handler.
 */
function splashify_admin_where_form_validate($form, &$form_state) {
  // If they entered paths, make sure the path values are valid.
  if ($form_state['values']['splashify_where_desktop_page'] == 'list') {
    splashify_where_paths_check('splashify_where_desktop_listpages', $form_state['values']['splashify_where_desktop_listpages']);
  }

  if (isset($form_state['values']['splashify_where_mobile_page'])) {
    if ($form_state['values']['splashify_where_mobile_page'] == 'list') {
      splashify_where_paths_check('splashify_where_mobile_listpages', $form_state['values']['splashify_where_mobile_listpages']);
    }
  }
}

/**
 * Implements form submit handler.
 */
function splashify_admin_where_form_submit($form, &$form_state) {
  if ($form_state['values']['splashify_where_desktop_page'] != 'list') {
    // Unset the listpages variable (desktop), if the list pages option is not
    // set.
    variable_set('splashify_where_desktop_listpages', '');
  }

  if (isset($form_state['values']['splashify_where_mobile_page'])) {
    if ($form_state['values']['splashify_where_mobile_page'] != 'list') {
      // Unset the listpages variable (mobile), if the list pages option is not
      // set.
      variable_set('splashify_where_mobile_listpages', '');
    }
  }
}

/**
 * Validate the where:list:paths field.
 *
 * We put this in a function so it can handle both the desktop and mobile
 * settings. This assumes that each path in $paths is separated by a new line
 * character.
 */
function splashify_where_paths_check($field, $paths) {
  if (empty($paths)) {
    form_set_error($field, t('You must enter at least one path.'));
    return;
  }

  $what_paths = preg_split('/[\n\r]+/', $paths);
  $errors = array();
  foreach ($what_paths as $path) {
    // If this path is a source url, we know this is a valid path.
    if (drupal_valid_path($path)) {
      continue;
    }

    // This path is not an alias or the source url.
    $errors[] .= t('The path "@path" is not a valid source page. This path cannot be an alias.', array('@path' => $path));
  }

  // Since there could be multiple errors for this one field, we want to
  // break each error into a separate line.
  if (count($errors) > 0) {
    form_set_error($field, implode('<br />', $errors));
  }
}