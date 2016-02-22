<div class="clear-block whiteBlock block block-<?php print $block->module ?>" id="block-<?php print $block->module .'-'. $block->delta; ?>">

	

		<h3 class="subject active" id="caurt-1">תמונות ספורט</h3>
		<h3 class="subject" id="caurt-2">תמונות תרבות</h3>
		



	<div class="inner-block active" id="caur-1" dir="ltr">
	<?php print views_embed_view('home_page_better_images','block_1'); ?>
	</div>
	
	<div class="inner-block" id="caur-2" dir="ltr">
	<?php  print views_embed_view('home_page_better_images','block_2'); ?>
	</div>

	<!--<div class="inner-block active" id="caur-1" dir="ltr">
	<?php //print views_embed_view('home_page_images','block_1'); ?>
	</div>
	
	<div class="inner-block" id="caur-2" dir="ltr">
	<?php  //print views_embed_view('home_page_images','block_2'); ?>
	</div>-->
	
	
</div>

