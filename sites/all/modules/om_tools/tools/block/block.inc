<?php
// $Id$

/**
 * @file
 * Block Tools
 *
 * @author: Daniel Honrade http://drupal.org/user/351112
 *
 */

/**
 * Block Tools Form
 *
 */
function om_block_tools(&$form, $block_defaults = array()) {
  
  // Block Tools   
  $block_tools = array();  

  $block_tools['block_classes'] = array(
    '#type' => 'fieldset',
    '#title' => t('Block Classes'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  
  $block_tools['block_classes'] += om_block_classes($block_defaults);

  $form['om_block_tools'] = array(
    '#type' => 'fieldset',
    '#title' => t('Block'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  
  $form['om_block_tools'] += $block_tools;
    
  return $form;  
}


/**
 * Override or insert om variables into the templates.
 */
function om_block_preprocess_block(&$vars) {
  $block = $vars['block'];
  $block_defaults = $vars['om_block_tools_values'];  
  //dsm($block);
  if ($block_defaults['block_classes_switch']) {
    if (isset($block_defaults['block_classes___' . $block->module . '___' . $block->delta])) $vars['om_block_classes'] = $block_defaults['block_classes___' . $block->module . '___' . $block->delta];
  }
}
 

/**
 * default blocks classes
 *
 */
function om_block_classes_get($block_defaults = array(), $reset = FALSE) {
  $theme_default = variable_get('theme_default', 'garland');

  // boxes table is for custom blocks
  $box_result = db_query("SELECT bid, info FROM {boxes} ORDER BY info ASC");

  $box_classes = array();
  while ($box_record = db_fetch_object($box_result)) {
    $box_classes[$box_record->bid] = om_tools_class_safe($box_record->info);
  }

  // default, module generated blocks
  $block_result = db_query("SELECT module, delta FROM {blocks} WHERE theme = '%s' ORDER BY module, delta ASC", $theme_default);
  
  $new_blocks = 0;
  $current_blocks = array();
  while ($block_record = db_fetch_object($block_result)) {
    // new blocks
    if (!isset($block_defaults['block_classes___' . $block_record->module . '___' . $block_record->delta]) || ($reset == TRUE)) { 
      $new_blocks++;
      if ($block_record->module == 'block') {
        $classes = 'block-' . $box_classes[$block_record->delta];
      }
      else {
        $classes = 'block-' . $block_record->module . '-' . $block_record->delta;
      }
    }
    // old blocks
    else { 
      $classes = $block_defaults['block_classes___' . $block_record->module . '___' . $block_record->delta];
    }

    // this will ignore non-existing blocks
    $current_blocks[$block_record->module]['block_classes___' . $block_record->module . '___' . $block_record->delta] = $classes;  
  }
  ($new_blocks > 1) ? $message = 'There are ' . $new_blocks . ' new blocks, save your settings to add these new blocks.': $message = 'There is ' . $new_blocks . ' new block, save your settings to add this new block.';
  if ($new_blocks) drupal_set_message(t($message));  

  $current_blocks['block_classes_switch'] = isset($block_defaults['block_classes_switch']) ? $block_defaults['block_classes_switch']: 0;  
  $current_blocks['block_classes_reset'] = isset($block_defaults['block_classes_reset']) ? $block_defaults['block_classes_reset']: 0; 
   
  ksort($current_blocks);
  
  return $current_blocks;
} 


/**
 * Block Classes Form
 *
 */
function om_block_classes($block_defaults = array()) {

  // get new blocks
  $block_defaults = om_block_classes_get($block_defaults, FALSE);  
    
  // Block Classes  
  $out = array();

  // reset block classes
  if (isset($block_defaults['block_classes_reset']) && ($block_defaults['block_classes_reset'] == 1)) {
    $block_defaults['block_classes_reset'] = 0;
    $block_defaults = om_block_classes_get($block_defaults, TRUE);
  }  
      
  $out['block_classes_switch'] = array(
    '#type' => 'checkbox',
    '#title' =>  t('Add custom block classes'),
    '#default_value' => $block_defaults['block_classes_switch'],
  );  
  $out['block_classes_settings'] = array(
    '#type' => 'fieldset',
    '#attributes' => array( 'id' => 'om-group-block-classes-settings'),
    '#title' => t('Block Classes Settings'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#description' => t('If you\'re not using <strong>OM Base Theme 2</strong>, you need to add this to your <strong>block.tpl.php</strong>, ... class="block block-&lt;?php print $block->module ?&gt; <strong>&lt;?php print $om_block_classes; ?&gt;</strong>">'),
  );  
  $excluded = array('block_classes_switch', 'block_classes_reset');
  foreach ($block_defaults as $module => $blocks) {
    if (!in_array($module, $excluded)) {
      $out['block_classes_settings'][$module] = array(
        '#type' => 'fieldset',
        '#title' => t(ucwords($module)),
        '#collapsible' => TRUE,
        '#collapsed' => TRUE,
      ); 
      foreach ($blocks as $name => $class) {
        $block  = explode('___', $name); // '___' instead of '_' to distinguish it from other names, somehow space can't be used on array keys
        $delta  = $block[2];
        $out['block_classes_settings'][$module]['block_classes___' . $module . '___' . $delta] = array(
          '#type' => 'textfield',
          '#title' => t('ID: ' . 'block-' . $module . '-' . $delta . ' <a href="' . base_path() . 'admin/build/block/configure/' . $module . '/' . $delta . '?destination=admin/settings/om-tools">Edit</a>'),
          '#default_value' => $class,
        );  
      }
    }
  }
  $out['block_classes_reset'] = array(
    '#type' => 'checkbox',
    '#title' => t('Reset to default values.'),      
    '#default_value' => isset($block_defaults['block_classes_reset']) ? $block_defaults['block_classes_reset']: 0,
  );   
 
  return $out;
}   
