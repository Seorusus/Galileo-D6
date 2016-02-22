<?php
include_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
//drupal_bootstrap(DRUPAL_BOOTSTRAP_PATH);

$view = $_GET['view'];
$display = $_GET['display'];

$data = views_embed_view($view,$display);

//print( timer_read('page') ) . "<br/>";
//print(memory_get_peak_usage(true) / 1024/ 1024); 
//die(memory_get_peak_usage(true) / 1024/ 1024); 

print $data;
?>