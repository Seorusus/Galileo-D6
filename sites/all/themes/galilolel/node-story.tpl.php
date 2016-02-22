<div>
	
	<? if (!empty($title)) { ?>
		<h2> <?php echo $title; ?></h2>
	<? } ?>
	
	<? if (!empty($terms)) { ?>
		<div class="taxonomy"><b>תגיות:</b> <?php print $terms?></div>
	<? } ?>




<div class="content"><?php print $picture; ?><?php echo $content; ?>
				<?php $path=$node->path; ?><br/><br/><br/>

				<div class="fb-comments" <?php echo 'data-href=' . 'http://galilole.org.il' . '/' .$path; ?> data-num-posts="2" 			data-width="470"></div>		   


</div>


<?php if (isset($node->links['node_read_more'])) { echo '<div class="read_more">'.get_html_link_output($node->links['node_read_more']).'</div>'; }?>

<div class="cleared"></div>
<div><?= $links ?></div>
<div class="cleared"></div>



</div>
