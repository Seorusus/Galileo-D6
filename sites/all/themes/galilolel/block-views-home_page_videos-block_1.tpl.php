<div class="clear-block whiteBlock block block-<?php print $block->module ?>" id="block-<?php print $block->module .'-'. $block->delta; ?>">



		<h3 class="subject active" id="caurt-3">וידאו ספורט</h3>
		<h3 class="subject" id="caurt-4">וידאו תרבות</h3>



	<div class="inner-block active" id="caur-3" dir="ltr">
		<?php print views_embed_view('home_page_better_videos','block_1'); ?>
	</div>

	<div class="inner-block" id="caur-4" dir="ltr">
		<?php print views_embed_view('home_page_better_videos','block_2'); ?>
	</div>

	<!--<div class="inner-block active" id="caur-3" dir="ltr">
		<?php //print views_embed_view('home_page_videos','block_1'); ?>
	</div>

	<div class="inner-block" id="caur-4" dir="ltr">
		<?php //print views_embed_view('home_page_videos','block_2'); ?>
	</div>-->
</div>

