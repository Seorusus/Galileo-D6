<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="<?php echo get_page_language($language); ?>" xml:lang="<?php echo get_page_language($language); ?>">

<head>
  
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="ImageToolbar" content="false">
    <meta http-equiv="ClearType" content="true">    
    <meta name="MSSmartTagsPreventParsing" content="true">
    
  <?php echo $head; ?>
  <title><?php if (isset($head_title )) { echo $head_title; } ?></title>  
  <link href="http://cdn3.galilole.org.il/sites/all/themes/galilolel/reset.css?B" media="all" rel="stylesheet" type="text/css">
  <link href="http://cdn3.galilole.org.il/sites/all/modules/admin_menu/admin_menu.css?Q" media="all" rel="stylesheet" type="text/css">
  <link href="http://cdn3.galilole.org.il/sites/all/modules/admin_menu/admin_menu-rtl.css?Q" media="all" rel="stylesheet" type="text/css">
  <?php echo $styles ?>
   
	<script src="http://cdn4.galilole.org.il/sites/all/modules/jquery_update/replace/jquery.min.js?0" type="text/javascript"></script>
	<script src="http://cdn4.galilole.org.il/misc/drupal.js?0" type="text/javascript"></script>
	
</head>
<?php $nodeid = $node->nid; ?>
<?php $group = true; ?>

<?php if(strstr($body_classes, 'wide') != false){
	$group =  false;
}elseif(strstr($body_classes, 'node-type-organic-group') != false){
	$group =  false;
}elseif(strstr($body_classes, 'node-type-adowner') != false){
	$group =  false;
}
?>
<body class="<?php print $body_classes; ?>" id="node-<?php echo $nodeid; ?>">
<?php if (!empty($admin)) print $admin; ?>
	<div class="wrapper">
		<div class="container">
			
		<!--advertisments start-->
			<?php if(!empty($leftFloatingAd)){?><div id="leftFloatingAd"><?= $leftFloatingAd;?></div><?}?> 
		    <?php if(!empty($rightFloatingAd)){?><div id="rightFloatingAd"><?= $rightFloatingAd;?></div><?}?>
		<!--advertisments end-->
		
		    <?php if (!empty($topMenu)) {?>
			<?php	echo '<div id="topMenu">'.$topMenu; ?>
			<?php  if (!empty($search_box)): ?>
	     	   <div id="search-box"><?php print $search_box; ?></div>
	        <?php endif; ?>
	        <?php echo '</div>'; } ?>
	       
			
			<div class="cleared" ></div>
			<?php if (!empty($mainMenu)) { echo '<div id="mainMenu">'.$mainMenu.'</div>'; } ?>
			<div class="cleared" ></div>
			<?php if (!empty($mainAd)) { echo '<div id="mainAd" >'.$mainAd.'</div>'; } ?>
			<div class="cleared" ></div>
		    <?php if (!empty($rightNavigation)) { echo '<div id="rightNavigation" >'.$rightNavigation.'</div>'; } ?>
		    
		    <div id="breadcrumbTabs" >
			    <?php if (!empty($help)) { echo $help; } ?>
				<?php if (!empty($messages)) { echo $messages; } ?>
		 	    <?php if (!empty($breadcrumb)) { echo $breadcrumb; } ?>
				<?php if (!empty($tabs)) { echo $tabs.'<div class="cleared"></div>'; }; ?>
				<?php if (!empty($tabs2)) { echo $tabs2.'<div class="cleared"></div>'; } ?>
		  		<?php if (!empty($breadcrumbTabs)) { echo $breadcrumbTabs; } ?>
		    </div>
		    <div id="mainContent">
		   		<?php echo $content; ?>
		   </div>
		   <? if($group){ ?>
		   <div id="leftInner">
		   		<?php echo $leftInner; ?>
		   </div>
		   <? } ?>
		   <div class="cleared" ></div>
		   
		</div>
	</div>
<?php echo $scripts ?>
<script src="http://cdn4.galilole.org.il/sites/all/themes/galilolel/scripts/admin.js"></script>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-25695376-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-68135664-1', 'auto');
  ga('send', 'pageview');

</script>
<?php print $closure; ?>

</body>