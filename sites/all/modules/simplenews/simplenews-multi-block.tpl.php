<?php
// $Id: simplenews-multi-block.tpl.php,v 1.1.2.1 2010/08/16 11:32:02 mirodietiker Exp $

/**
 * @file
 * Default theme implementation to display the simplenews block.
 *
 * Copy this file in your theme directory to create a custom themed block.
 *
 * Available variables:
 * - $subscribed: the current user is subscribed to the $tid newsletter
 * - $user: the current user is authenticated
 * - $message: announcement message (Default: 'Stay informed on our latest news!')
 * - $form: newsletter subscription form
 *
 * @see template_preprocess_simplenews_multi_block()
 */
?>

  <?php if ($message): ?>
    <p><?php print $message; ?></p>
  <?php endif; ?>

  <?php print $form; ?>

