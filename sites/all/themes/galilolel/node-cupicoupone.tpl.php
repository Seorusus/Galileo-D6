<? if( $node->type == 'cupicoupone'){ ?>
<?// include 'page-node-lightbox2.tpl.php' ?>
		<? //include 'node.tpl.php' ?>
		<pre> 
		<? //print_r($node); ?>
		 </pre> 
		<?php
			//print_r(array_keys($node->content)); 
			//print_r(array_keys($nodeArray)); 
		?>
		<?php // echo $content; ?>
	<? } ?>
	
<?// endif; ?>


<div id="CouponeBanner" title="קופומניה בגליל - קופונים אטרקטיביים בגליל ובגולן. גליל עולה לא מוכר לכם קופונים, אלא אוסף עבורכם מבצעים והנחות!">
<!-- <a class="CouponeLink" href="http://www.galilole.org.il/coupon" title="קופומניה בגליל - לחצו כאן לרשימת  הקופונים המלאה!"></a> -->
</div>


  <div id= "CouponeDescription"
	<?  if (!empty ($node->field_coupone_description[0][value])) {?> 
	<?php echo $node->field_coupone_description[0][value]; ?> 
	<? } ?> 

 </div> 

<div id = "CouponeNodeDisplay">


<div class = "CouponeContent">
<img class="BgImage" src="/sites/all/themes/galilolel/images/CouponeBkg400-500.jpg" alt=""  width="400" height="500"   />

	<div  id = "TitleLink">
	<!-- -->
	<a  class="titlelink" href="http://www.galilole.org.il/node/81826"  target="_blank"></a>
	<?php // echo  '<a class="titlelink" href="http://www.galilole.org.il/coupon" title="קופומניה בגליל - לחצו כאן לרשימת הקופונים המלאה!"  target="_blank" ></a>'; ?>
	</div> 

	<div class = "BuissLogo">
	<?php
	  print theme_imagefield_image($node->field_advertiser_logo[0]);
	?>
	
	<?php $tooltip=''; ?>
	<?php  if (!empty ($node->field_coupone_logo_tooltip[0][value]))
	{$tooltip=$node->field_coupone_logo_tooltip[0][value]; } ?>
	
	
	<? if (!empty ($node->field_buiss_link[0][url])) {?>
	
	
	<?php  $path=$node->field_buiss_link[0][url]; 
	echo  '<a  class="BuissLogolink" href="'. $path . '" title="'. $tooltip . '"  target="_blank" ></a>'; ?>
	<? } ?>

	</div>
	

		
	<div class = "BuissTitile">
	<?php  print $node->field_coupone_header[0][value] ; ?>
	</div>
	</br>

	 
	<div class = "offer">
	<?php //print $node->content ['body']['#value']; ?>
	<?php print $node->field_coupone_content[0][value]; ?>
	<div class = "offerb">
	<?  if (!empty ($node->field_coupone_content_b[0][value])) {?>
	<?php print $node->field_coupone_content_b[0][value]; ?>
	<? } ?>
	</div>
	</div>
	
	
	<div class="valitity">למימוש עד 
	<?php  print $node->field_coupon_validity[0]['view']; ?>
	</div>
	
	<div class="leagal">אין כפל הנחות ומבצעים</div>
	
	
	
	<div class="OfeerImage"">
	<? if(!empty($node->field_advertiser_product[0])) { ?>
	<?php  print theme_imagefield_image($node->field_advertiser_product[0]); ?>
	<? } ?>
	
	</div>
	
	<div class="CouponeComment">
	<?  if (!empty ($node->field_coupone_comment[0][value])) {?>
	<?php  print $node->field_coupone_comment[0][value]; ?>
	<? } ?>
	</div>

	
	<div class="CouponeCommentb">
	<?  if (!empty ($node->field_coupone_comment_b[0][value])) {?>
	<?php  print $node->field_coupone_comment_b[0][value]; ?>
	<? } ?>
	</div>

	<div class="BuissAdress" >
	<?  if (!empty ($node->field_buiss_adress[0][value])) {?>
	<?php  print $node->field_buiss_adress[0][value]; ?>
	<? } ?>
	</div>
	
	<div class="BuissLink">
	<? if (!empty ($node->field_buiss_link[0][url])) {?>
	<?php $path=$node->field_buiss_link[0][url]; 
	echo  '<a  href="'. $path . '"   target="_blank" >'. $path . '</a>'; ?>
	<? } ?>
	</div>
	
	
	<div class="couponesList">
	<!-- 	<a href="http://www.galilole.org.il/node/81826" target="_blank">לעמוד קופומניה בגליל</a> -->
	</div> 
	
	<div class="printCoupone">
	<A href="javascript:window.print();" title="הדפס קופון"><span>הדפס קופון &nbsp</span>
<IMG class="printImage" SRC="/sites/all/themes/galilolel/images/print_icon.gif" width="16" height="16" ></A>
	</div>
	
	
</div>







<?php if(!empty($node->body)) ?>
			<?php  //print $node->body; ?>

	
	<? //if (!empty($title)) { ?>
		<h2> <?//php echo $title; ?></h2>
	<?// } ?>
<div><?php //print $picture; ?>
<?php// echo $content; ?></div>
<?php// if (isset($node->links['node_read_more'])) { echo '<div class="read_more">'.get_html_link_output($node->links['node_read_more']).'</div>'; }?>

<div class="cleared"></div>
<div><?= $links ?></div>

</div>
