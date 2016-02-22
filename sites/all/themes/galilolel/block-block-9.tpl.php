<div id="block-tabbed_block-0" class="clear-block greyBlock block block-tabbed_block">
	<div class="inner-block">
		<div class="tabbed-block">
		 	<ul class="tabbed_block-nav">
		 		<li class="tabbed_block-selected">
		 			<a id="fragment0-0" class="tabbedA" href="#">חדשות ספורט</a>
		 		</li>
		 		<li>
		 			<a id="fragment0-1" class="tabbedA" href="#">מדברים עסקים</a>
		 		</li>
		 		<li>
		 			<a id="fragment0-2" class="tabbedA" href="#">חדשות שונות</a>
		 		</li>
		 		
		 	</ul>
		 	
			 <div id="content-fragment0-0" class="tabbed_block-container">
				<?php print views_embed_view('latest_news','block_1'); ?>
			 </div>
			 
			 <div id="content-fragment0-1" class="tabbed_block-container tabbed_block-hide"> 
			 	<?php print views_embed_view('latest_news','block_3'); ?>		      
			 </div>  									      
			 
			 <div id="content-fragment0-2" class="tabbed_block-container tabbed_block-hide">
				 <?php print views_embed_view('latest_news','block_2'); ?>
			 </div>
			 
			 
			 
		</div>
	</div>
</div>
