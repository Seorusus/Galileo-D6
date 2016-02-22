<div class="clear-block leftFloatBlock block block-<?php print $block->module ?>" id="block-<?php print $block->module .'-'. $block->delta; ?>">
	<?php if ($block->subject): ?>
		<h3 class="subject"><?php echo $block->subject; ?></h3>
	<?php endif; ?>
		<div class="inner-block">

		 <?php echo $block->content; ?>
		</div>
</div>
