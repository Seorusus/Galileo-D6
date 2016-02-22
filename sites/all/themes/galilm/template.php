<?php
// $Id: template.php,v 1.1.2.9 2010/07/09 14:53:42 himerus Exp $

/*
 * Add any conditional stylesheets you will need for this sub-theme.
 *
 * To add stylesheets that ALWAYS need to be included, you should add them to
 * your .info file instead. Only use this section if you are including
 * stylesheets based on certain conditions.
 */
/* -- Delete this line if you want to use and modify this code
// Example: optionally add a fixed width CSS file.
if (theme_get_setting('galilm_fixed')) {
  drupal_add_css(path_to_theme() . '/layout-fixed.css', 'theme', 'all');
}
// */


/**
 * Implementation of HOOK_theme().
 */
function galilm_theme(&$existing, $type, $theme, $path) {
  $hooks = omega_theme($existing, $type, $theme, $path);
  // Add your theme hooks like this:
  /*
  $hooks['hook_name_here'] = array( // Details go here );
  */
  // @TODO: Needs detailed comments. Patches welcome!
  return $hooks;
}

/**
 * Override or insert variables into all templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered (name of the .tpl.php file.)
 */
/* -- Delete this line if you want to use this function
function galilm_preprocess(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function galilm_preprocess_page(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function galilm_preprocess_node(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function galilm_preprocess_comment(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function galilm_preprocess_block(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */


/**
 * Create a string of attributes form a provided array.
 * 
 * @param $attributes
 * @return string
 */
function galilm_render_attributes($attributes) {
	return omega_render_attributes($attributes);  
}



function saveCookie($search_term) {
  setcookie('galil_init', $search_term, time() + 3600 * 24 * 180);
}

function readCookie() {
  return $_COOKIE['galil_init'];
}	


function checkView($view, $display,$arg=null){
	$view = views_get_view($view);
	$view->set_display($display);
	if ($arg) {
	  $output = $view->preview(null,array($arg));
	}else{
	  $output = $view->preview();
	}
	// At least in $view->result is the result.
	if ($view->result) {
	  return true;
	}else{
		return null;
	}
}


/**
 * Generate the HTML output for imagefield + imagecache images so they can be
 * opened in a lightbox by clicking on the image on the node page or in a view.
 *
 * This actually also handles filefields + imagecache images too.
 *
 * @param $view_preset
 *   The imagecache preset to be displayed on the node or in the view.
 * @param $field_name
 *   The field name the action is being performed on.
 * @param $item
 *   An array, keyed by column, of the data stored for this item in this field.
 * @param $node
 *   The node object.
 * @param $rel
 *   The type of lightbox to open: lightbox, lightshow or lightframe.
 * @param $args
 *   Args may override internal processes: caption, rel_grouping.
 * @return
 *   The themed imagefield + imagecache image and link.
 */
function galilm_imagefield_image_imagecache_lightbox2($view_preset, $field_name, $item, $node, $rel = 'lightbox', $args = array()) {

  if (!isset($args['lightbox_preset'])) {
    $args['lightbox_preset'] = 'original';
  }
  // Can't show current node page in a lightframe on the node page.
  // Switch instead to show it in a lightbox.
  $on_image_node = (arg(0) == 'node') && (arg(1) == $node->nid);
  if ($rel == 'lightframe' && $on_image_node) {
    $rel = 'lightbox';
  }
  $orig_rel = $rel;

  // Unserialize into original - if sourced by views.
  $item_data = $item['data'];
  if (is_string($item['data'])) {
    $item_data = unserialize($item['data']);
  }

  // Set up the title.
  $image_title = $item_data['description'];
  $image_title = (!empty($image_title) ? $image_title : $item_data['title']);
  $image_title = (!empty($image_title) ? $image_title : $item_data['alt']);
  if (empty($image_title) || variable_get('lightbox2_imagefield_use_node_title', FALSE)) {
    $node = node_load($node->nid);
    $image_title = $node->title;
    $image_title = $node->field_gallery_image_title[0]['value'];
  }

  $image_tag_title = '';
  if (!empty($item_data['title'])) {
    $image_tag_title = $item_data['title'];
  }


  // Enforce image alt.
  $image_tag_alt = '';
  if (!empty($item_data['alt'])) {
    $image_tag_alt = $item_data['alt'];
  }
  elseif (!empty($image_title)) {
    $image_tag_alt = $image_title;
  }

  // Set up the caption.
  $node_links = array();
  if (!empty($item['nid'])) {
    $attributes = array();
    $attributes['id'] = 'lightbox2-node-link-text';
    $target = variable_get('lightbox2_node_link_target', FALSE);
    if (!empty($target)) {
      $attributes['target'] = $target;
    }
    $node_link_text = variable_get('lightbox2_node_link_text', 'View Image Details');
    if (!$on_image_node && !empty($node_link_text)) {
      $node_links[] = l($node_link_text, 'node/'. $item['nid'], array('attributes' => $attributes));
    }
    $download_link_text = check_plain(variable_get('lightbox2_download_link_text', 'Download Original'));
    if (!empty($download_link_text) && user_access('download original image')) {
      $node_links[] = l($download_link_text, file_create_url($item['filepath']), array('attributes' => array('target' => '_blank', 'id' => 'lightbox2-download-link-text')));
    }
  }

  $caption = $image_title;
  if (count($node_links)) {
    $caption .= '<br /><br />'. implode(" - ", $node_links);
  }
  if (isset($args['caption'])) {
    $caption = $args['caption']; // Override caption.
  }

  if ($orig_rel == 'lightframe') {
    $frame_width = variable_get('lightbox2_default_frame_width', 600);
    $frame_height = variable_get('lightbox2_default_frame_height', 400);
    $frame_size = 'width:'. $frame_width .'px; height:'. $frame_height .'px;';
    $rel = preg_replace('/\]$/', "|$frame_size]", $rel);
  }

  // Set up the rel attribute.
  $full_rel = '';
  $imagefield_grouping = variable_get('lightbox2_imagefield_group_node_id', 1);
  if (isset($args['rel_grouping'])) {
    $full_rel = $rel .'['. $args['rel_grouping'] .']['. $caption .']';
  }
  elseif ($imagefield_grouping == 1) {
    $full_rel = $rel .'['. $field_name .']['. $caption .']';
  }
  elseif ($imagefield_grouping == 2 && !empty($item['nid'])) {
    $full_rel = $rel .'['. $item['nid'] .']['. $caption .']';
  }
  elseif ($imagefield_grouping == 3 && !empty($item['nid'])) {
    $full_rel = $rel .'['. $field_name .'_'. $item['nid'] .']['. $caption .']';
  }
  elseif ($imagefield_grouping == 4 ) {
    $full_rel = $rel .'[allnodes]['. $caption .']';
  }
  else {
    $full_rel = $rel .'[]['. 'ZZZZZZZZZZZZZZZZZZZ' .']';
  }
  $class = '';
  if ($view_preset != 'original') {
    $class = 'imagecache imagecache-' . $field_name . ' imagecache-' . $view_preset . ' imagecache-' . $field_name . '-' . $view_preset;
  }
  $link_attributes = array(
    'rel' => $full_rel,
    'class' => 'imagefield imagefield-lightbox2 imagefield-lightbox2-' . $view_preset . ' imagefield-' . $field_name . ' ' . $class,
  );

  $attributes = array();
  if (isset($args['compact']) && $item['#delta']) {
    $image = '';
  }
  elseif ($view_preset == 'original') {
    $image = theme('lightbox2_image', $item['filepath'], $image_tag_alt, $image_tag_title, $attributes);
  }
  elseif ($view_preset == 'link') {
    // Not actually an image, just a text link.
    $image = variable_get('lightbox2_view_image_text', 'View image');
  }
  else {
    $image = theme('imagecache', $view_preset, $item['filepath'], $image_tag_alt, $image_tag_title, $attributes);
  }

  if ($args['lightbox_preset'] == 'node') {
    $output = l($image, 'node/'. $node->nid .'/lightbox2', array('attributes' => $link_attributes, 'html' => TRUE));
  }
  elseif ($args['lightbox_preset'] == 'original') {
    $output = l($image, file_create_url($item['filepath']), array('attributes' => $link_attributes, 'html' => TRUE));
  }
  else {
    $output = l($image, imagecache_create_url($args['lightbox_preset'], $item['filepath']), array('attributes' => $link_attributes, 'html' => TRUE));
  }

  return $output;
}
