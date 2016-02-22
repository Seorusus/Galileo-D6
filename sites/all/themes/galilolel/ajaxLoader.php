<?php
include_once './includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

$view = $_GET['view'];
$display = $_GET['display'];

$data = views_embed_view($view,$display);

print $data;
?>