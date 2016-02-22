<?php
function hariporter_form(){
	
	$form = array();
	
	$form['title_link'] = array(
    '#prefix' => '<div class="menu-block-title-link">',
    '#type' => 'checkbox',
    '#title' => t('Block title as link'),
    '#default_value' => $config['title_link'],
    '#description' => t('Make the default block title a link to that menu item. An overridden block title will not be a link.'),
    '#suffix' => '</div>',
  );
  $form['admin_title'] = array(
    '#type' => 'textfield',
    '#default_value' => $config['admin_title'],
    '#title' => t('Administrative title'),
    '#description' => t('This title will be used administratively to identify this block. If blank, the regular title will be used.'),
  );
  $form['parent'] = array(
    '#type' => 'select',
    '#title' => t('Parent item'),
    '#default_value' => $config['menu_name'] . ':' . $config['parent_mlid'],
    '#options' => $parent_options,
    '#description' => t('The tree of links will only contain children of the selected parent item. Using <em>&lt;the menu selected by the page&gt;</em> can be customized on the <a href="!url">Menu block settings page</a>.', array('!url' => url('admin/settings/menu_block'))),
    '#attributes' => array('class' => 'menu-block-parent'),
    '#element_validate' => array('menu_block_configure_form_parent_validate'),
  );
  $form['level'] = array(
    '#type' => 'select',
    '#title' => t('Starting level'),
    '#default_value' => $config['level'],
    '#options' => array(
      '1'  => t('1st level (primary)'),
      '2'  => t('2nd level (secondary)'),
      '3'  => t('3rd level (tertiary)'),
      '4'  => t('4th level'),
      '5'  => t('5th level'),
      '6'  => t('6th level'),
      '7'  => t('7th level'),
      '8'  => t('8th level'),
      '9'  => t('9th level'),
    ),
    '#description' => t('Blocks that start with the 1st level will always be visible. Blocks that start with the 2nd level or deeper will only be visible when the trail to the active menu item is in the block’s tree.'),
  );
  
  return $form;
  
	
}