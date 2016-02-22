<?php
// $Id

require_once("common_methods.php");

if (get_drupal_version() == 5) {
  require_once("drupal5_methods.php");
}
else {
  require_once("drupal6_methods.php");
}

/* Common methods */

function get_drupal_version() {
	$tok = strtok(VERSION, '.');
	//return first part of version number
	return (int)$tok[0];
}

function get_page_language($language) {
  if (get_drupal_version() >= 6) return $language->language;
  return $language;
}

function get_full_path_to_theme() {
  return base_path().path_to_theme();
}

/**
 * Allow themable wrapping of all breadcrumbs.
 */
function galilolel_breadcrumb($breadcrumb) {
  if (!empty($breadcrumb)) {
 	if( arg(0) == 'node' && is_numeric( arg(1)) ){
 		$node = node_load(arg(1));
 		if ($node->type == 'adowner') {
 			$breadcrumb[0] = str_replace('בית','חזרה לאתר גליל עולה',$breadcrumb[0]);
 		}

  	}

    return '<div class="breadcrumb">'. implode(' | ', $breadcrumb) .'</div>';
  }
}

function galilolel_service_links_node_format($links) {
  return '<div class="service-links"><div class="service-label">'. t('Bookmark/Search this post with: ') .'</div>'. art_links_woker($links) .'</div>';
}

/**
 * Theme a form button.
 *
 * @ingroup themeable
 */
function galilolel_button($element) {
  // Make sure not to overwrite classes.
  if (isset($element['#attributes']['class'])) {
    $element['#attributes']['class'] = 'form-'.$element['#button_type'].' '.$element['#attributes']['class'].' art-button';
  }
  else {
    $element['#attributes']['class'] = 'form-'.$element['#button_type'].' art-button';
  }

  return '<span class="art-button-wrapper">'.
    '<span class="l"></span>'.
    '<span class="r"></span>'.
    '<input type="submit" '. (empty($element['#name']) ? '' : 'name="'. $element['#name']
         .'" ')  .'id="'. $element['#id'].'" value="'. check_plain($element['#value']) .'" '. drupal_attributes($element['#attributes']).' />'.
	'</span>';
}

/**
 * Image assist module support.
 * Using Artisteer styles in IE
*/
function galilolel_img_assist_page($content, $attributes = NULL) {
  $title = drupal_get_title();
  $output = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'."\n";
  $output .= '<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">'."\n";
  $output .= "<head>\n";
  $output .= '<title>'. $title ."</title>\n";

  // Note on CSS files from Benjamin Shell:
  // Stylesheets are a problem with image assist. Image assist works great as a
  // TinyMCE plugin, so I want it to LOOK like a TinyMCE plugin. However, it's
  // not always a TinyMCE plugin, so then it should like a themed Drupal page.
  // Advanced users will be able to customize everything, even TinyMCE, so I'm
  // more concerned about everyone else. TinyMCE looks great out-of-the-box so I
  // want image assist to look great as well. My solution to this problem is as
  // follows:
  // If this image assist window was loaded from TinyMCE, then include the
  // TinyMCE popups_css file (configurable with the initialization string on the
  // page that loaded TinyMCE). Otherwise, load drupal.css and the theme's
  // styles. This still leaves out sites that allow users to use the TinyMCE
  // plugin AND the Add Image link (visibility of this link is now a setting).
  // However, on my site I turned off the text link since I use TinyMCE. I think
  // it would confuse users to have an Add Images link AND a button on the
  // TinyMCE toolbar.
  //
  // Note that in both cases the img_assist.css file is loaded last. This
  // provides a way to make style changes to img_assist independently of how it
  // was loaded.
  $output .= drupal_get_html_head();
  $output .= drupal_get_js();
  $output .= "\n<script type=\"text/javascript\"><!-- \n";
  $output .= "  if (parent.tinyMCE) {\n";
  $output .= "    document.write('<link href=\"' + parent.tinyMCE.getParam(\"popups_css\") + '\" rel=\"stylesheet\" type=\"text/css\">');\n";
  $output .= "  } else {\n";
  foreach (drupal_add_css() as $media => $type) {
    $paths = array_merge($type['module'], $type['theme']);
    foreach (array_keys($paths) as $path) {
      // Don't import img_assist.css twice.
      if (!strstr($path, 'img_assist.css')) {
        $output .= "  document.write('<style type=\"text/css\" media=\"{$media}\">@import \"". base_path() . $path ."\";<\/style>');\n";
      }
    }
  }
  $output .= "  }\n";
  $output .= "--></script>\n";
  // Ensure that img_assist.js is imported last.
  $path = drupal_get_path('module', 'img_assist') .'/img_assist.css';
  $output .= "<style type=\"text/css\" media=\"all\">@import \"". base_path() . $path ."\";</style>\n";

  $output .= '<link rel="stylesheet" href="'.get_full_path_to_theme().'/style.css" type="text/css" />'."\n";
  $output .= '<!--[if IE 6]><link rel="stylesheet" href="'.get_full_path_to_theme().'/style.ie6.css" type="text/css" /><![endif]-->'."\n";
  $output .= '<!--[if IE 7]><link rel="stylesheet" href="'.get_full_path_to_theme().'/style.ie7.css" type="text/css" /><![endif]-->'."\n";

  $output .= "</head>\n";
  $output .= '<body'. drupal_attributes($attributes) .">\n";

  $output .= theme_status_messages();

  $output .= "\n";
  $output .= $content;
  $output .= "\n";
  $output .= '</body>';
  $output .= '</html>';
  return $output;
}

/**
* Override the search block form so we can change the label
* @return
* @param $form Object
*/
function ___phptemplate_search_block_form($form) {
  $output = '';

  // the search_block_form element is the search's text field, it also happens to be the form id, so can be confusing
  $form['search_block_form']['#title'] = t('');

  $output .= drupal_render($form);
  return $output;
}

/*function galilolel_taxonomy_term_page($tids, $result) {
  $output = '';

  // Only display the description if we have a single term...
  if (count($tids) == 1) {
   $term = taxonomy_get_term($tids[0]);
   $description = $term->description;
   // Check that a description is set.
   if (!empty($description)) {
     $output .= '<h1>';
     $output .= filter_xss_admin($description) ;
     $output .= '</h1>';
    }
  }
  $output .= taxonomy_render_nodes($result);
  return $output;
}
*/
//function galiole_breadcrumb($breadcrumb) {
//  if (!empty($breadcrumb)) {
//    return '<div class="breadcrumb">'. implode(' » ', $breadcrumb) .'</div>';
//  }
//}


/**
 * Theme function override of node_images to support imagecrop module
 */
function galilolel_node_images_list($form) {
  $header = array(t('Thumbnail'), t('Description').' / '.t('Path'), t('Size'), t('Weight'), t('Delete'));

  $rows = array();
  foreach($form['images']['#value'] as $id=>$image) {
    $row = array();
    if (isset($form['imagecrop']) && module_exists('thickbox'))
    $row[] = '<img src="'.file_create_url($image->thumbpath).'" vspace="5" /><br /><a class="thickbox" href="' . url('imagecrop/showcrop/'. $id .'/0/node_images', NULL, NULL, TRUE) . '?KeepThis=true&TB_iframe=true&height=600&width=700">'. t('Javascript crop') .'</a>';
    elseif (isset($form['imagecrop']) && !module_exists('thickbox'))
    $row[] = '<img src="'.file_create_url($image->thumbpath).'" vspace="5" /><br /><a href="javascript:;" onclick="window.open(\''. url('imagecrop/showcrop/'. $id .'/0/node_images', NULL, NULL, TRUE) .'\',\'imagecrop\',\'menubar=0,resizable=1,width=700,height=650\');">'. t('Javascript crop') .'</a>';
    else
    $row[] = '<img src="'.file_create_url($image->thumbpath).'" vspace="5" />';
    $row[] = drupal_render($form['rows'][$image->id]['description']).$image->filepath;
    $row[] = array('data' => format_size($image->filesize), 'style' => 'white-space: nowrap');
    $row[] = drupal_render($form['rows'][$image->id]['weight']);
    $row[] = array('data' => drupal_render($form['rows'][$image->id]['delete']), 'align' => 'center');
    $rows[] = $row;
  }

  $output = '<fieldset><legend>'.t('Uploaded images').'</legend>';
  $output .= theme('table', $header, $rows);
  $output .= drupal_render($form);
  $output .= '</fieldset>';

  return $output;
}

//returning term description for page-taxonomy tpl file 
//Override or insert PHPTemplate variables into the templates.
function galilolel_preprocess_page(&$vars, $hook) {
  $term = taxonomy_get_term(arg(2));
  $vars['taxonomy_term_description'] = ($term->description);
  
  
  
  // Add per content type pages
      if (isset($vars['node'])) {
        // Add template naming suggestion. It should alway use hyphens.
        // If node type is "custom_news", it will pickup "page-custom-news.tpl.php".
        $vars['template_files'][] = 'page-'. str_replace('_', '-', $vars['node']->type);
      } 
  
   
  
  
  
}

//
//
//function galilolel_preprocess_node(&$vars, $hook) {
//  $node = $vars['node'];
//  if (arg(0) == 'taxonomy'){
//    if (!empty($node->page_title)){
//$vars['title'] = check_plain($node->page_title);
//}
//if (!empty($node->nodewords['description'])){
//     $vars['content'] =  $node->nodewords['description'];
//}
//else {
//$vars['content'] = rtrim(strip_tags($node->teaser),150);
//}
//  }
//
//}


/**
 * Format a link to a specific query result page.
 *
 * @param $page_new
 *   The first result to display on the linked page.
 * @param $element
 *   An optional integer to distinguish between multiple pagers on one page.
 * @param $parameters
 *   An associative array of query string parameters to append to the pager link.
 * @param $attributes
 *   An associative array of HTML attributes to apply to a pager anchor tag.
 * @return
 *   An HTML string that generates the link.
 *
 * @ingroup themeable
 */
function galilolel_pager_link($text, $page_new, $element, $parameters = array(), $attributes = array()) {
  $page = isset($_GET['page']) ? $_GET['page'] : '';
  if ($new_page = implode(',', pager_load_array($page_new[$element], $element, explode(',', $page)))) {
    $parameters['page'] = $new_page;
  }

  $query = array();
  if (count($parameters)) {
    $query[] = drupal_query_string_encode($parameters, array());
  }
  $querystring = pager_get_querystring();
  if ($querystring != '') {
    $query[] = $querystring;
  }

  // Set each pager link title
  if (!isset($attributes['title'])) {
    static $titles = NULL;
    if (!isset($titles)) {
      $titles = array(
        t('« first') => t('Go to first page'),
        t('‹ previous') => t('Go to previous page'),
        t('next ›') => t('Go to next page'),
        t('last »') => t('Go to last page'),
      );
    }
    if (isset($titles[$text])) {
      $attributes['title'] = $titles[$text];
    }
    else if (is_numeric($text)) {
      $attributes['title'] = t('Go to page @number', array('@number' => $text));
    }
  }

  return l($text, $_GET['q'], array('attributes' => $attributes, 'query' => count($query) ? implode('&', $query) : NULL, 'html' => true));
}


function galilolel_views_mini_pager($tags = array(), $limit = 10, $element = 0, $parameters = array(), $quantity = 9) {
  global $pager_page_array, $pager_total;
	//which nevigator do we use ?  	
	$who = strtolower($_SERVER['HTTP_USER_AGENT']);
	
  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // max is the maximum page number
  $pager_max = ($pager_total[$element] > 20 )? 20 : $pager_total[$element]  ;
  // End of marker calculations.

 if(preg_match("/msie/", $who)) {
 	//echo 'in the MSIE first!!';
 		
  $li_previous = theme('pager_previousie', (isset($tags[1]) ? $tags[1] :"<img src='/sites/all/themes/galilolel/images/next-horizontal.png' />"), $limit, $element, 1, $parameters);
  if (empty($li_previous)) {//echo'firstempty';
    $li_previous = "<img src='/sites/all/themes/galilolel/images/next-horizontal.png' />";
  }
  $li_next = theme('pager_nextie', (isset($tags[3]) ? $tags[3] : "<img src='/sites/all/themes/galilolel/images/prev-horizontal.png' />"), $limit, $element, 1, $parameters);
  if (empty($li_next)) {
    $li_next = "<img src='/sites/all/themes/galilolel/images/prev-horizontal.png' />";
  }
}else{$li_previous = theme('pager_previous', (isset($tags[1]) ? $tags[1] :"<img src='/sites/all/themes/galilolel/images/next-horizontal.png' />"), $limit, $element, 1, $parameters);
  if (empty($li_previous)) {
    $li_previous = "<img src='/sites/all/themes/galilolel/images/next-horizontal.png' />";
  }
  $li_next = theme('pager_next', (isset($tags[3]) ? $tags[3] : "<img src='/sites/all/themes/galilolel/images/prev-horizontal.png' />"), $limit, $element, 1, $parameters);
  if (empty($li_next)) {
    $li_next = "<img src='/sites/all/themes/galilolel/images/prev-horizontal.png' />";
  }
}
 
if ($pager_total[$element] > 1) {
//specific css class for Views with minipagers for unique erow defenitions 
//for IE
if(preg_match("/msie/", $who)) { 
//echo 'MSIE Greater than one';
    $items[] = array(
      'class' => 'pager-previousie',
      'data' => $li_previous,
    );

    $items[] = array(
      'class' => 'pager-currentie',
      'data' => t('@current מ- @max', array('@current' => $pager_current, '@max' => $pager_max)),
    );

    $items[] = array(
      'class' => 'pager-nextie',
      'data' => $li_next,
    );
	//print_r (array ($items));
}else
{
//echo 'NOT  MSIE';
    $items[] = array(
      'class' => 'pager-previous',
      'data' => $li_previous,
    );

    $items[] = array(
      'class' => 'pager-current',
      'data' => t('@current מ- @max', array('@current' => $pager_current, '@max' => $pager_max)),
    );

    $items[] = array(
      'class' => 'pager-next',
      'data' => $li_next,
    );
}
    return theme('item_list', $items, NULL, 'ul', array('class' => 'pager'));
 }
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
function galilolel_imagefield_image_imagecache_lightbox2($view_preset, $field_name, $item, $node, $rel = 'lightbox', $args = array()) {

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
    $full_rel = $rel .'[]['. $caption .']';
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


/**
 * Format an individual feed item for display in the block.
 *
 * @param $item
 *   The item to be displayed.
 * @param $feed
 *   Not used.
 * @return
 *   The item HTML.
 * @ingroup themeable
 */
function galilolel_aggregator_block_item($item, $feed = 0) {
  global $user;

  $output = '';
  if ($user->uid && module_exists('blog') && user_access('create blog entries')) {
    if ($image = theme('image', 'misc/blog.png', t('blog it'), t('blog it'))) {
      $output .= '<div class="icon">'. l($image, 'node/add/blog', array('attributes' => array('title' => t('Comment on this news item in your personal blog.'), 'class' => 'blog-it'), 'query' => "iid=$item->iid", 'html' => TRUE)) .'</div>';
    }
  }

  // Display the external link to the item.
  $output .= '<a target="_blank" href="'. check_url($item->link) .'">'. check_plain($item->title) ."</a>\n";

  return $output;
}


/**
 * Format a username.
 *
 * @param $object
 *   The user object to format, usually returned from user_load().
 * @return
 *   A string containing an HTML link to the user's page if the passed object
 *   suggests that this is a site user. Otherwise, only the username is returned.
 */
function galilolel_username($object) {

  if ($object->uid && $object->name) {
    // Shorten the name when it is too long or it will break many tables.
    if (drupal_strlen($object->name) > 20) {
      $name = drupal_substr($object->name, 0, 15) .'...';
    }
    else {
      $name = $object->name;
    }

    if (user_access('access user profiles')) {
      $output = l($name, 'user/'. $object->uid, array('attributes' => array('title' => t('View user profile.'))));
    }
    else {
      $output = check_plain($name);
    }
  }
  else if ($object->name) {
    // Sometimes modules display content composed by people who are
    // not registered members of the site (e.g. mailing list or news
    // aggregator modules). This clause enables modules to display
    // the true author of the content.
    if (!empty($object->homepage)) {
      $output = l($object->name, $object->homepage, array('attributes' => array('rel' => 'nofollow')));
    }
    else {
      $output = check_plain($object->name);
    }

    //$output .= ' ('. t('not verified') .')';
  }
  else {
    $output = check_plain(variable_get('anonymous', t('Anonymous')));
  }

  return $output;
}


//avoid showing disabled blocks unlless there modules are listed  in $show below  ...
function galilolel_preprocess_block_admin_display_form(&$vars) {
      // List of modules which are allowed on the block page add temporarly when need a specific module blocks
      $show = array(
   //     'block','ad','petition','boost','views'
   'block','ad','views'
   
      );
      // Scan through each disabled block entry and remove ones that aren't needed.
      foreach ($vars['block_listing']['-1'] as $key => $disabled) {
        $type = explode('_', $key);
        if (!in_array($type[0], $show)) {
          unset($vars['block_listing']['-1'][$key]);
        }
      }
    }