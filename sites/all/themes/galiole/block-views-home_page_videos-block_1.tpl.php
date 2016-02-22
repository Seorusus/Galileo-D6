<div class="clear-block greyBlock block block-<?php print $block->module ?>" id="block-<?php print $block->module .'-'. $block->delta; ?>">

	

		<h3 class="subject active" id="sportTitle">וידאו ספורט</h3>
		<h3 class="subject" id="tarbutTitle">וידאו תרבות</h3>



	<div class="inner-block" id="sport-video-1">
	<?php print views_embed_view('home_page_videos','block_1'); ?>
	</div>
	
	<div class="inner-block" id="tarbut-video-1" >
	<?php print views_embed_view('home_page_videos','block_2'); ?>
	</div>
</div>

