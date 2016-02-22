<? //if( $_SERVER['REMOTE_ADDR']=='81.218.170.242'): ?>

	<? if( $node->type == 'adowner'){ ?>
		<? //include 'node.tpl.php' ?>
		<? //print_r($node); ?>
		<?php //echo $content; ?>
	<? } ?>
	
<?// endif; ?>

<div>
	<? if (!empty($title)) { ?>
		<h2> <?php echo $title; ?></h2>
	<? } ?>
	
	<?php
	
	$view1 = checkView('og_main_page_blocks','block_1');
	$view2 = checkView('og_main_page_blocks','block_3');
	$view3 = checkView('og_home_page_images','block_1');
	
	
	
	$nodeArray = (array)$node;
	?>
	
	<?php if(!empty($nodeArray['content']['og_mission']['#value'])){ ?>
		<div class="nodeContent">
			<?php print $nodeArray['content']['og_mission']['#value']; ?>
		</div>
	<? } ?>
	<div class="cleared"></div>
	<div class="rightOgColumn">
		<?php if(null != $view1){?>
			<div class="clear-block redBlock block">
				<h3 class="subject active">כתבות אחרונות</h3>
				<div class="inner-block">
				<?php print views_embed_view('og_main_page_blocks','block_1'); ?>
				</div>
			</div>
		<?}?>
		<?php if(null != $view2){?>
			<div class="clear-block redBlock block">
				<h3 class="subject active"">וידאו אחרונים</h3>
				<div class="inner-block">
				<?php print views_embed_view('og_main_page_blocks','block_3'); ?>
				</div>
			</div>
		<?}?>
	</div>
	
	<div class="leftOgColumn">
		<?php if(null != $view3){?>
			<div class="clear-block redBlock block">
				<h3 class="subject active"">תמונות אחרונות</h3>
				<div class="inner-block">
				<?php print views_embed_view('og_home_page_images','block_1'); ?>
				</div>
			</div>
		<?}?>
	</div>




	<div class="cleared"></div>
</div>


<? //endif; ?>

<?php 


?>