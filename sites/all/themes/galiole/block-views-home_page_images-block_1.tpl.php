<div class="clear-block greyBlock block block-<?php print $block->module ?>" id="block-<?php print $block->module .'-'. $block->delta; ?>">

	

		<h3 class="subject active" id="sportImageTitle">תמונות ספורט</h3>
		<h3 class="subject" id="tarbutImageTitle">תמונות תרבות</h3>



	<div class="inner-block" id="sport-image-1">
	<?php print views_embed_view('home_page_images','block_1'); ?>
	</div>
	
	<div class="inner-block" id="tarbut-image-1" >
	<?php print views_embed_view('home_page_images','block_2'); ?>
	</div>
</div>
