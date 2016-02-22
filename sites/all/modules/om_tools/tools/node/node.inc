<?php
// $Id$

/**
 * @file
 * Node Tools
 *
 * @author: Daniel Honrade http://drupal.org/user/351112
 *
 */

/**
 * Node Tools Form
 *
 */
function om_node_tools(&$form, $node_defaults = array()) {

  // Node Tools
  $node_tools = array();

  $node_tools['node_body_classes'] = array(
    '#type' => 'fieldset',
    '#title' => t('Node Body Classes'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  ); 
    
  $node_tools['node_body_classes'] += om_node_body_classes($node_defaults);

  $node_tools['node_terms_classes'] = array(
    '#type' => 'fieldset',
    '#title' => t('Node Terms Classes'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  $node_tools['node_terms_classes'] += om_node_terms_classes($node_defaults);

  $node_tools['node_type_titles'] = array(
    '#type' => 'fieldset',
    '#title' => t('Node Type Titles'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  $node_tools['node_type_titles'] += om_node_type_titles($node_defaults);
             
  $form['om_node_tools'] = array(
    '#type' => 'fieldset',
    '#title' => t('Node'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  
  $form['om_node_tools'] += $node_tools;
                     
  return $form;  
}

/**
 * Override or insert om variables into the templates.
 */
function om_node_preprocess_page(&$vars) {
  $node_tools = $vars['om_node_tools_values'];
  
  if ((isset($node_tools['node_body_classes_switch']) && ($node_tools['node_body_classes_switch'] == 1)) || 
      (isset($node_tools['node_terms_classes_switch']) && ($node_tools['node_terms_classes_switch'] == 1)) || 
      (isset($node_tools['node_type_titles_switch']) && ($node_tools['node_type_titles_switch'] == 1))) {

    $classes = explode(' ', $vars['body_classes']);

    if (!$vars['is_front']) {

      // Add unique class for each page.
      $path = drupal_get_path_alias($_GET['q']);
      
      // path title
      $classes[] = om_tools_class_safe('page-' . $path);
      
      // default section
      list($section) = explode('/', $path, 2);

      $arg = arg(); // get all arguments

      if ($arg[0] == 'node') {
      
        $node_type = isset($vars['node']->type) ? $vars['node']->type: ''; 
        			         
        if (isset($node_tools['node_body_classes']) && ($node_tools['node_body_classes'] == 1)) {
          if (($arg[1] == 'add') && isset($arg[2])) { // add node
            $section      = 'node-add';                    
            $page_type    = $arg[2];                     
            $page_type_op = $page_type . '-add';         
          }
          elseif (($arg[1] == 'add') && !isset($arg[2])) { // add any node
            $section      = 'node-add';               
            $page_type    = 'any';                    
            $page_type_op = $page_type . '-add';           
          }          
          elseif (is_numeric($arg[1]) && !isset($arg[2]) && empty($node_type)) { // not found
            $section      = 'page-not-found';              
            $page_type    = 'any';                    
            $page_type_op = $page_type . '-view';         
          }
          elseif (is_numeric($arg[1]) && !isset($arg[2])) { // view node
            // default $section                        
            $page_type    = $node_type;                  
            $page_type_op = $page_type . '-view';          
          }					
          elseif (is_numeric($arg[1]) && isset($arg[2])) { // has arg 2, like delete, edit, etc.
            $section      = 'node-' . $arg[2];               
            $page_type    = !empty($node_type) ? $node_type: 'any';                   
            $page_type_op = $page_type . '-' . $arg[2];          
          }    
          $classes[] = om_tools_class_safe($node_tools['node_body_classes_prefix'] . $page_type);
          $classes[] = om_tools_class_safe($node_tools['node_body_classes_prefix'] . $page_type_op);
        }
        
        // node terms
        if (isset($node_tools['node_terms_classes_switch']) && ($node_tools['node_terms_classes_switch'] == 1)) {                
          // Term classes
          if (!empty($vars['node']->taxonomy) && $node_tools['node_terms_classes']) {
            foreach ($vars['node']->taxonomy as $term) {
              $classes[] = om_tools_class_safe($node_tools['node_terms_classes_prefix'] . $term->name);
            }
          }
        }
        // node titles
        if (isset($node_tools['node_type_titles_switch']) && ($node_tools['node_type_titles_switch'] == 1)) {
          if (!empty($node_type) && !empty($node_tools['node_' . $node_type . '_titles'])) { 
            unset($vars['title']);
            $classes[] = 'om-tools-no-title';
          }  
        }    
      }
      $classes[] = om_tools_class_safe('section-' . $section);
      $classes[] = 'om-tools-active';    
    }
    $vars['body_classes_array'] = $classes;
    $vars['body_classes'] = implode(' ', $classes); // Concatenate with spaces.	
    //dsm($vars);
  }
}


/**
 * Node Body Classes Form
 *
 */
function om_node_body_classes($node_defaults = array()) {

  // Node Body Classes
  $out = array();
    
  if (($node_defaults['node_body_classes_reset'] == 1) || !isset($node_defaults['node_body_classes'])) {
    $node_defaults['node_body_classes']        = 1;
    $node_defaults['node_body_classes_prefix'] = 'content-type-';
    $node_defaults['node_body_classes_reset']  = 0;
  }  
       
  $out['node_body_classes_switch'] = array(
    '#type' => 'checkbox',
    '#title' =>  t('Apply node body classes'),
    '#default_value' => $node_defaults['node_body_classes_switch'],
  );  
  $out['node_body_classes_settings'] = array(
    '#type' => 'fieldset',
    '#attributes' => array( 'id' => 'om-group-node-body-classes-settings'),
    '#title' => t('Node body classes settings'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );  
  $out['node_body_classes_settings']['node_body_classes'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add node body classes'),
    '#default_value' => $node_defaults['node_body_classes'],
  );  
  $out['node_body_classes_settings']['node_body_classes_prefix'] = array(
    '#type' => 'textfield',
    '#title' => t('Node body class prefix'),
    '#default_value' => $node_defaults['node_body_classes_prefix'],
    '#description' => t('content-type-page content-type-page-add | content-type-page-edit | content-type-page-view | content-type-page-delete section-node-add | section-node-edit | section-node-delete'),
  ); 
  $out['node_body_classes_reset'] = array(
    '#type' => 'checkbox',
    '#title' => t('Reset to default values.'),      
    '#default_value' => $node_defaults['node_body_classes_reset'],
  );    
  
  return $out;
}


/**
 * Node Terms Classes Form
 *
 */
function om_node_terms_classes($node_defaults = array()) {

  // Node Terms Classes
  $out = array();
  
  if (($node_defaults['node_terms_classes_reset'] == 1) || !isset($node_defaults['node_terms_classes'])) {
    $node_defaults['node_terms_classes']        = 1;
    $node_defaults['node_terms_classes_prefix'] = 'content-term-';
    $node_defaults['node_terms_classes_reset']  = 0;
  }  
  
  $out['node_terms_classes_switch'] = array(
    '#type' => 'checkbox',
    '#title' =>  t('Apply node terms classes'),
    '#default_value' => $node_defaults['node_terms_classes_switch'],
  );   
  $out['node_terms_classes_settings'] = array(
    '#type' => 'fieldset',
    '#attributes' => array( 'id' => 'om-group-node-terms-classes-settings'),
    '#title' => t('Node terms classes settings'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );        
  $out['node_terms_classes_settings']['node_terms_classes'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add node terms body classes'),
    '#default_value' => $node_defaults['node_terms_classes'],
  );  
  $out['node_terms_classes_settings']['node_terms_classes_prefix'] = array(
    '#type' => 'textfield',
    '#title' => t('Node term class prefix'),
    '#default_value' => $node_defaults['node_terms_classes_prefix'],
    '#description' => t('content-term-mobile content-term-technology content-term-educaton ...'),
  );
  $out['node_terms_classes_reset'] = array(
    '#type' => 'checkbox',
    '#title' => t('Reset to default values.'),      
    '#default_value' => $node_defaults['node_terms_classes_reset'],
  ); 

  return $out;
}

/**
 * Node Type Titles Form
 *
 */
function om_node_type_titles($node_defaults = array()) {
  
  // Node Type Titles
  $out = array();

  if ($node_defaults['node_type_titles_reset']) {
    foreach (node_get_types() as $type => $info) {
      $node_defaults['node_' . $type . '_titles'] = 0;
    }  
    $node_defaults['node_type_titles_reset'] = 0;
  }  
  
  $out['node_type_titles_switch'] = array(
    '#type' => 'checkbox',
    '#title' =>  t('Hide node types titles'),
    '#default_value' => $node_defaults['node_type_titles_switch'],
  );  
  $out['node_type_titles_settings'] = array(
    '#type' => 'fieldset',
    '#attributes' => array( 'id' => 'om-group-node-type-titles-settings'),
    '#title' => t('Node type titles'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );  
  
  foreach (node_get_types() as $type => $info) {
    $out['node_type_titles_settings']['node_' . $type . '_titles'] = array(
      '#type' => 'checkbox',
      '#title' => t('Hide ' . $type . ' titles'),
      '#default_value' => $node_defaults['node_' . $type . '_titles'],
    );
  }
  
  $out['node_type_titles_reset'] = array(
    '#type' => 'checkbox',
    '#title' => t('Reset to default values.'),      
    '#default_value' => $node_defaults['node_type_titles_reset'],
  );  
  
  return $out;
}  

