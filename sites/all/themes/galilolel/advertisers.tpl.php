<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="<?php echo get_page_language($language); ?>" xml:lang="<?php echo get_page_language($language); ?>">

<head>
  
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="ImageToolbar" content="false">
    <meta http-equiv="ClearType" content="true">    
    <meta name="MSSmartTagsPreventParsing" content="true">
    <!--[if IE]>
		<meta http-equiv="Page-Enter" content="blendTrans(duration=0)" />
		<meta http-equiv="Page-Exit" content="blendTrans(duration=0)" />
	<![endif]-->	
  <?php echo $head; ?>
  <title><?php if (isset($head_title )) { echo $head_title; } ?></title>  
  <link href="http://cdn3.easysitenow.net/sites/all/themes/galilolel/reset.css?B" media="all" rel="stylesheet" type="text/css">
  <?php echo $styles ?>
   
	<script src="http://cdn4.easysitenow.net/sites/all/modules/jquery_update/replace/jquery.min.js?0" type="text/javascript"></script>
	<script src="http://cdn4.easysitenow.net/misc/drupal.js?0" type="text/javascript"></script>
	
</head>

<body class="advertisers-body">
<?php if (!empty($admin)) print $admin; ?>
	<div class="wrapper">
		<div class="container">
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
		   <div class="cleared" ></div>
		</div>
	</div>
	<!--[if lt IE 9]>
		<script src="http://cdn4.easysitenow.net/sites/all/themes/galilolel/roundIE.js"></script>
	<![endif]--> 
<?php echo $scripts ?>

<script src="http://cdn4.easysitenow.net/sites/all/themes/galilolel/script.js"></script>
<script src="http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
<script type="text/javascript">
	_uacct = "UA-635031-6";
	urchinTracker();
</script>
<?php print $closure; ?>

</body>