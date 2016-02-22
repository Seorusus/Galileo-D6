<?php
// $Id: node-og-group.tpl.php
?>
<?php print '<!--node-og-group.tpl.php  -->' ; ?>
        <?php if($content_top): ?>
        <div id="content-top">
					<div class="cleared" ></div>
			<?php if (!empty($mainAd)) { echo '<div id="mainAd" >'.$mainAd.'</div>'; } ?>
			<div class="cleared" ></div>
			
			
			

          <?php print $content_top; ?>
        </div><!-- /#content-top -->
        <?php endif; ?>
        <?php if ($tabs): ?>
          <div id="content-tabs" class=""><?php print $tabs; ?></div><!-- /#content-tabs -->
        <?php endif; ?>
        <div id="main-content" class="region clearfix">
          <?php print $content; ?>
        </div><!-- /#main-content -->
        
        <?php if($content_bottom): ?>
        <div id="content-bottom">
          <?php print $content_bottom; ?>
        </div><!-- /#content-bottom -->
        <?php endif; ?>


