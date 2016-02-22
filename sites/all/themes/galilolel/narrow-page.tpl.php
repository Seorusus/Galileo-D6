<!-- narrow-page.tpl.php -->
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
<body>
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
			<div id="logo"></div>
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
		    <div id="mainContent" class="narrowContent">
		   		<?php echo $content; ?>
		   </div>
		   <div class="cleared" ></div>
		   
		   <div id="footerArea">  <a href="http://tripleyou-websites.com/">Tripleyou WebSites</a>  
		   		<?php if (!empty($footer)) { echo '<div id="footer" >'.$footer.'</div>'; } ?>	
		   		<?php if (!empty($footer_message) && (trim($footer_message) != '')) {  
			        echo '<div id="bottomMessage" >'. $footer_message .' </div>';
			    }?>
		   		
		   </div>
		   <div class="cleared" ></div>
		</div>
	</div>
	<!--[if lt IE 9]>
		<script src="http://cdn4.easysitenow.net/sites/all/themes/galilolel/roundIE.js"></script>
	<![endif]--> 
<?php echo $scripts ?>

<script src="http://cdn4.easysitenow.net/sites/all/themes/galilolel/script.js"></script>

<script type="text/javascript">

  var _gaq = _gaq || [];
//  _gaq.push(['_setAccount', 'UA-25695376-1']);
  _gaq.push(['_setAccount', 'UA-41413092-1']);
  _gaq.push(['_setDomainName', 'galilole.org.il']);
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