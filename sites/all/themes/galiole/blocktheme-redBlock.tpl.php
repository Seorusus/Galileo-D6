<div class="clear-block redBlock block block-<?php print $block->module ?>" id="block-<?php print $block->module .'-'. $block->delta; ?>">



	<?php if ($block->subject): ?>
		<span class="rightRed">&nbsp;</span>
		<h3 class="subject"><span class="heightCorect"><?php echo $block->subject; ?></span></h3>
		<span class="leftRed">&nbsp;</span>
	<?php endif; ?>



	<div class="inner-block">

		<?php echo $block->content; ?>

	</div>

</div>



