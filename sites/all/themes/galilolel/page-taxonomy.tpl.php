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
  <?php echo $styles ?>

	<script src="http://cdn4.galilole.org.il/sites/all/modules/jquery_update/replace/jquery.min.js?0" type="text/javascript"></script>
	<script src="http://cdn4.galilole.org.il/misc/drupal.js?0" type="text/javascript"></script>


<!--Start Media Vertex Tag For פופאנדר -->
<!-- <script type="text/javascript" src="http://advertexjs.mvertex.co.il/js/popunder.js?mediaID=80196"></script> -->
<!-- End Media Vertex Tag -->

</head>
<?php
function getBrowser()
{
    $u_agent = $_SERVER['HTTP_USER_AGENT'];
    $bname = 'Unknown';
    $platform = 'Unknown';
    $version= "";

    //First get the platform?
    if (preg_match('/linux/i', $u_agent)) {
        $platform = 'linux';
    }
    elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
        $platform = 'mac';
    }
    elseif (preg_match('/windows|win32/i', $u_agent)) {
        $platform = 'windows';
    }
   
    // Next get the name of the useragent yes seperately and for good reason
    if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent))
    {
        $bname = 'Internet Explorer';
        $ub = "MSIE";
    }
    elseif(preg_match('/Firefox/i',$u_agent))
    {
        $bname = 'Mozilla Firefox';
        $ub = "Firefox";
    }
    elseif(preg_match('/Chrome/i',$u_agent))
    {
        $bname = 'Google Chrome';
        $ub = "Chrome";
    }
    elseif(preg_match('/Safari/i',$u_agent))
    {
        $bname = 'Apple Safari';
        $ub = "Safari";
    }
    elseif(preg_match('/Opera/i',$u_agent))
    {
        $bname = 'Opera';
        $ub = "Opera";
    }
    elseif(preg_match('/Netscape/i',$u_agent))
    {
        $bname = 'Netscape';
        $ub = "Netscape";
    }
   
    // finally get the correct version number
    $known = array('Version', $ub, 'other');
    $pattern = '#(?<browser>' . join('|', $known) .
    ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
    if (!preg_match_all($pattern, $u_agent, $matches)) {
        // we have no matching number just continue
    }
   
    // see how many we have
    $i = count($matches['browser']);
    if ($i != 1) {
        //we will have two since we are not using 'other' argument yet
        //see if version is before or after the name
        if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
            $version= $matches['version'][0];
        }
        else {
            $version= $matches['version'][1];
        }
    }
    else {
        $version= $matches['version'][0];
    }
   
    // check if we have a number
    if ($version==null || $version=="") {$version="?";}
   
    return array(
        'userAgent' => $u_agent,
        'name'      => $bname,
        'version'   => $version,
        'platform'  => $platform,
        'pattern'    => $pattern
    );
}

// now try it
$ua=getBrowser();
$yourbrowser= $ua['name'];
if($yourbrowser == 'Apple Safari') { ?>

<?php }
?>
<body class="<?php print $body_classes; ?> wide">
<?php if (!empty($admin)) print $admin; ?>
	<div class="wrapper">
		<div class="container">


		<?php if ($user->uid == 1)
		{
			//tr(get_defined_vars());
		}?>
		<!--advertisments start-->
			<?php if(!empty($leftFloatingAd)){?><div id="leftFloatingAd"><?= $leftFloatingAd;?></div><?}?>
		    <?php if(!empty($rightFloatingAd)){?><div id="rightFloatingAd"><?= $rightFloatingAd;?></div><?}?>
		<!--advertisments end-->
		
		<div class="cleared" ></div>
			<div id="logo">
				 <?php echo $mylogo; ?>
			</div>
			<div class="cleared" ></div>

		    <?php if (!empty($topMenu)) {?>
			<?php	echo '<div id="topMenu">'.$topMenu; ?>
			<?php  if (!empty($search_box)): ?>
	     	   <div id="search-box"><?php print $search_box; ?></div>
	        <?php endif; ?>
	        <?php echo '</div>'; } ?>

			
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
			<?php if ($taxonomy_term_description): ?>
			  <div id="taxonomy-term-description">
			    <?php print $taxonomy_term_description; ?>
</br></br>
			  </div>
			<?php endif; ?>


		   		<?php //if($user->uid == 7){?>
		   		<?php $view1 = checkView('taxonomy_page_blocks','block_1',arg(2));?>
		   		<?php $view2 = checkView('taxonomy_page_blocks','block_2',arg(2));?>
		   		<?php $view3 = checkView('taxonomy_page_blocks','block_3',arg(2));?>



		   			<? if(null == $view3 && null == $view2 && null == $view1){?>
		   		<?php echo $content; ?>
		   		<?  }else{?>
		   			<?php print views_embed_view('term_description','block_1'); ?>
		   		<?}?>

		   <div class="rightOgColumn">
	   			<?php if(null != $view1){?>
					<div class="clear-block redBlock block">
						<h3 class="subject active">כתבות אחרונות</h3>
						<div class="inner-block">
						<?php print views_embed_view('taxonomy_page_blocks','block_1' , arg(2)); ?>
						</div>
					</div>
				<?}?>

				<?php if(null != $view2){?>
					<div class="clear-block redBlock block">
						<h3 class="subject active">וידאו אחרונים</h3>
						<div class="inner-block">
						<?php print views_embed_view('taxonomy_page_blocks','block_2',arg(2)); ?>
						</div>
					</div>
				<?}?>
	   		</div>
	   		<div class="leftOgColumn">
		   		<?php if(null != $view3){?>
					<div class="clear-block redBlock block">
						<h3 class="subject active">תמונות אחרונות</h3>
						<div class="inner-block">
						<?php print views_embed_view('taxonomy_page_blocks','block_3',arg(2)); ?>
						</div>
					</div>
				<?}?>
	   		</div>
	   		 </div>
		   <div class="cleared" ></div>

		   <div id="footerArea">
		   		<?php if (!empty($footer)) { echo '<div id="footer" >'.$footer.'</div>'; } ?>
		   		<?php if (!empty($footer_message) && (trim($footer_message) != '')) {
			        echo '<div id="bottomMessage" >'. $footer_message .'</div>';
			        //echo '<div id="bottoSupport1" ><p class="rtecenter"><a href="http://auroraweb.co.il" target="_blank">הדרכה ופיתוח אתרי אינטרנט בדרופל – אורורה ווב</p></div>';
			    }?>

		   </div>
		   <div class="cleared" ></div>
		</div>
	</div>

<?php echo $scripts ?>
<script src="http://cdn4.galilole.org.il/sites/all/themes/galilolel/scripts/admin.js"></script>

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
<!-- ?php print $closure; ? --> <!-- this adds some dubious js facebook script -->

</body>
