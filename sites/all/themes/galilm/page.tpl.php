<?php
// $Id: page.tpl.php,v 1.1.2.16 2010/11/16 14:39:39 himerus Exp $
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">

<head>
<?php print '<!--page.tpl.php  -->' ; ?> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<link href="apple-touch-icon-precomposed.png" rel="apple-touch-icon-precomposed" />
<link href="apple-touch-icon-72x72-precomposed.png" rel="apple-touch-icon-precomposed" sizes="72x72" />
<link href="apple-touch-icon-114x114-precomposed.png" rel="apple-touch-icon-precomposed" sizes="114x114" />
<link href="apple-touch-icon-144x144-precomposed.png" rel="apple-touch-icon-precomposed" sizes="144x144" />
  <title><?php print $head_title; ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $scripts; ?>
</head>

<body class="<?php print $body_classes . ' galilm';  ?> simple-page">
  <?php if (!empty($admin)) print $admin; ?>
  <div id="page" class="clearfix">
    <div id="site-header" class="container-<?php print $branding_wrapper_width; ?> clearfix">
      <div id="branding" class="grid-<?php print $header_logo_width; ?>">
        <?php if ($linked_logo_img): ?>
          <?php print $linked_logo_img; ?>
        <?php endif; ?>
        <?php if ($linked_site_name): ?>
          <?php if ($title): ?>
            <h2 id="site-name" class=""><?php print $linked_site_name; ?></h2>
          <?php else: ?>
            <h1 id="site-name" class=""><?php print $linked_site_name; ?></h1>
          <?php endif; ?>
        <?php endif; ?>
      </div><!-- /#branding -->
         <div id="header-first" class="<?php print $header_first_classes; ?>">
          <?php print $header_first; ?>
        </div><!-- /#header-first -->

    </div>


    <div id="header-regions" class="container-<?php print $header_wrapper_width; ?> clearfix">


        <div id="header-last" class="<?php print $header_last_classes; ?>">

          <?php print $header_last; ?>

        </div><!-- /#header-last -->

    </div><!-- /#header-regions -->
    
    <?php if($site_slogan && $is_front || $search_box || $breadcrumb): ?>
    <div id="internal-nav" class="container-<?php print $internal_nav_wrapper_width; ?> clearfix">
      <div id="slogan-bcrumb" class="grid-<?php print $breadcrumb_slogan_width; ?>">
        <?php if ($site_slogan && $is_front): ?>
          <div id="slogan"><?php print $site_slogan; ?></div><!-- /#slogan -->
        <?php endif; ?>
        <?php if($breadcrumb): ?>
          <!-- div id="bcrumb"><?php print $breadcrumb; ?></div --><!-- /#bcrumb -->
        <?php endif; ?>
      </div>
      <?php if ($search_box): ?>
        <div id="search-box" class="grid-<?php print $search_width; ?>"><?php print $search_box; ?></div><!-- /#search-box -->
      <?php endif; ?>
    </div><!-- /#internal-nav -->
    <?php endif; ?>



    
    <?php if($preface_first || $preface_middle || $preface_last): ?>
    <div id="preface-wrapper" class="container-<?php print $preface_wrapper_grids; ?> clearfix">
      <?php if($preface_first): ?>
        <div id="preface-first" class="preface <?php print $preface_first_classes; ?>">
          <?php print $preface_first; ?>
        </div><!-- /#preface-first -->
      <?php endif; ?>
      <?php if($preface_middle): ?>
        <div id="preface-middle" class="preface <?php print $preface_middle_classes; ?>">
          <?php print $preface_middle; ?>
        </div><!-- /#preface-middle -->
      <?php endif; ?>
      <?php if($preface_last): ?>
        <div id="preface-last" class="preface <?php print $preface_last_classes; ?>">
          <?php print $preface_last; ?>
        </div><!-- /#preface-last -->
      <?php endif; ?>
    </div><!-- /#preface-wrapper -->
    <?php endif; ?>
    
    <?php if($help || $messages): ?>
    <div class="container-<?php print $default_container_width; ?> clearfix">
      <div class="grid-<?php print $default_container_width; ?>">
        <?php print $help; ?><?php print $messages; ?>
      </div>
    </div><!-- /.container-xx -->
    <?php endif; ?>
 <div id="homeMainContent" >
    <div id="main-content-container" class="container-<?php print $content_container_width; ?> clearfix">
      <div id="main-wrapper" class="column <?php print $main_content_classes; ?>">
        <?php if (!empty($mission)) {
//          print $mission;
        }?>
        <?php if($content_top): ?>
        <div id="content-top">
					<div class="cleared" ></div>
			<?php if (!empty($mainAd)) { echo '<div id="mainAd" >'.$mainAd.'</div>'; } ?>
			<div class="cleared" ></div>

          <?php print $content_top; ?>
        </div><!-- /#content-top -->
        <?php endif; ?>
        <?php if ($tabs): ?>
          <div id="content-tabs" class=""><?php print $tabs; ?></div><!-- /#content-tabs -->
        <?php endif; ?>
    
        <?php if ($title): ?>
          <h1 class="title" id="page-title"><?php print $title; ?></h1>
        <?php endif; ?>
    
        <div id="main-content" class="region clearfix">
          <?php print $content; ?>
        </div><!-- /#main-content -->
        
        <?php if($content_bottom): ?>
        <div id="content-bottom">
          <?php print $content_bottom; ?>
        </div><!-- /#content-bottom -->
        <?php endif; ?>
      </div><!-- /#main-wrapper -->
    
      <?php if ($sidebar_first): ?>
        <div id="sidebar-first" class="column sidebar region <?php print $sidebar_first_classes; ?>">
          <?php print $sidebar_first; ?>
        </div><!-- /#sidebar-first -->
      <?php endif; ?>
    
      <?php if ($sidebar_last): ?>
        <div id="sidebar-last" class="column sidebar region <?php print $sidebar_last_classes; ?>">
          <?php print $sidebar_last; ?>
        </div><!-- /#sidebar-last -->
      <?php endif; ?>
    </div><!-- /#main-content-container -->
 </div> <!-- /#homeMainContent -->

    
    <?php if($postscript_one || $postscript_two || $postscript_three || $postscript_four): ?>
    <div id="postscript-wrapper" class="container-<?php print $postscript_container_width; ?> clearfix">
      <?php if($postscript_one): ?>
        <div id="postscript-one" class="postscript <?php print $postscript_one_classes; ?>">
          <?php print $postscript_one; ?>
        </div><!-- /#postscript-one -->
      <?php endif; ?>
      <?php if($postscript_two): ?>
        <div id="postscript-two" class="postscript <?php print $postscript_two_classes; ?>">
          <?php print $postscript_two; ?>
        </div><!-- /#postscript-two -->
      <?php endif; ?>
      <?php if($postscript_three): ?>
        <div id="postscript-three" class="postscript <?php print $postscript_three_classes; ?>">
          <?php print $postscript_three; ?>
        </div><!-- /#postscript-three -->
      <?php endif; ?>
      <?php if($postscript_four): ?>
        <div id="postscript-four" class="postscript <?php print $postscript_four_classes; ?>">
          <?php print $postscript_four; ?>
        </div><!-- /#postscript-four -->
      <?php endif; ?>
    </div><!-- /#postscript-wrapper -->
    <?php endif; ?>
    
    <?php if($footer_first || $footer_last || $footer_message): ?>
    <div id="footer-wrapper" class="container-<?php print $footer_container_width; ?> clearfix">
      <?php if($footer_first): ?>
        <div id="footer-first" class="<?php print $footer_first_classes; ?>">
          <?php print $footer_first; ?>
        </div><!-- /#footer-first -->
      <?php endif; ?>
      <?php if($footer_last || $footer_message): ?>
        <div id="footer-last" class="<?php print $footer_last_classes; ?>">
          <?php print $footer_last; ?>
          <?php if ($footer_message): ?>
            <div id="footer-message">
              <?php print $footer_message; ?>
			  <?php // print '<div id="bottomSupport"><p class="rtecenter"><a href="http://auroraweb.co.il" target="_blank">פיתוח אתרים - אורורה ווב</p></div>'; ?>
            </div><!-- /#footer-message -->
          <?php endif; ?>
        </div><!-- /#footer-last -->
      <?php endif; ?>
    </div><!-- /#footer-wrapper -->
    <?php endif; ?>
  </div><!-- /#page -->

<script type="text/javascript">

  var _gaq = _gaq || [];
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
</html>
