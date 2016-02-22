navigator.sayswho= (function(){
  var N= navigator.appName, ua= navigator.userAgent, tem;
  var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
  M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
  return M;
 })();

$(document).ready(function(){
	//alert('imhere : ' + navigator.sayswho[0] );
	if (navigator.sayswho[0] == 'Safari') {
		//alert('imhere');
		$(".homelink").addClass("homelink_safari");
		$(".logolink").addClass("logolink_safari");
		$(".cultureButton").addClass("cultureButton_safari");
		$(".publishnow").addClass("publishnow_safari");
	}	
	
	if($('marquee').is('marquee')){
		$('marquee').marquee().mouseover(function () {
		  $(this).trigger('stop');
		}).mouseout(function () {
		  $(this).trigger('start');
		}).mousemove(function (event) {
		  if ($(this).data('drag') == true) {
		    this.scrollTop = $(this).data('scrollY') + ($(this).data('y') - event.clientY);
		  }
		}).mousedown(function (event) {
		  $(this).data('drag', true).data('y', event.clientY).data('scrollY', this.scrollTop);
		}).mouseup(function () {
		  $(this).data('drag', false);
		});
	}
	
	$('#block-views-home_page_images-block_1 h3.subject').click(function(){
		
		$('#block-views-home_page_images-block_1 h3.subject').css('background','#ffffff');
		$('#block-views-home_page_images-block_1 h3.subject').css('color','#000000');
		$(this).css('background','#CE0606');
		$(this).css('color','#ffffff');
		
		var id = $(this).attr('id').replace('caurt-', '');
		$('#block-views-home_page_images-block_1 .inner-block').css('display', 'none');
		$('#block-views-home_page_images-block_1 .inner-block').css('visibility', 'hidden');
		$('#caur-' + id).css('display', 'block');
		$('#caur-' + id).css('visibility', 'visible');
		
	});
	$('#block-views-home_page_videos-block_1 h3.subject').click(function(){
		
		$('#block-views-home_page_videos-block_1 h3.subject').css('background','#ffffff');
		$('#block-views-home_page_videos-block_1 h3.subject').css('color','#000000');
		$(this).css('background','#CE0606');
		$(this).css('color','#ffffff');
		
		var id = $(this).attr('id').replace('caurt-', '');
		$('#block-views-home_page_videos-block_1 .inner-block').css('display', 'none');
		$('#block-views-home_page_videos-block_1 .inner-block').css('visibility', 'hidden');
		$('#caur-' + id).css('display', 'block');
		$('#caur-' + id).css('visibility', 'visible');
		
	});
	
	$('.tabbedA').click(function(){
		var id = $(this).attr('id');
		$('.tabbedA').parent('li').css('background','#ffffff');
		$('.tabbedA').css('color','#000000');
		$(this).parent('li').css('background','#CE0606');
		$(this).css('color','#ffffff');
		$('.tabbed_block-container').each(function(){
			if($(this).attr('id').replace('content-', '') == id){
				$(this).removeClass('tabbed_block-hide');
			}else{
				$(this).addClass('tabbed_block-hide');
			}
		});
	});
	
	$('#mainContent img').each(function(){
		
		var alt = $(this).attr('alt');
		var title = $(this).attr('title');
		if(title == '' && alt!= ''){ 
			 $(this).attr('title', alt);
		}
	});
	
	var width = screen.width;
	if(width < 1250){
		$('#leftFloatingAd').remove();
		$('#rightFloatingAd').remove();
	}
		
	if($('#views_slideshow_singleframe_main_1')){
		//$('#views_slideshow_singleframe_main_1').cycle('stop');
		$('#views_slideshow_singleframe_pager_1').cycle('pause');
		$('#views_slideshow_singleframe_teaser_section_1').cycle('pause');
	}

	if($('#attachments')){
		$('#attachments a').attr('target', '_blank');
	}
	
	if($('#node-200')){
		$('#node-200 #mainContent a').each(function(){
//			$(this).attr('target', '_blank');
		});
		$('#node-200 #block-menu_block-1 a').each(function(){
//			$(this).attr('target', '_blank');
		});
		
		
	}
	
//	if($('.view-node-gallery-gallery-image-views')){
//		
//		$('.views-view-grid td').each(function(){
//			var title = $(this).find('.views-field-field-gallery-image-fid a').find('img').attr('title');
//			var realTitle = $(this).find('.views-field-field-gallery-image-title-value-1').find('a').text();
//			$(this).find('.views-field-field-gallery-image-fid a').replace(title,realTitle);
//			console.log(title);
//			console.log(realTitle);
//		});
//		
//		
//		
//	}
//




//	if($('.view-node-gallery-gallery-image-views')){
//		$('.view-node-gallery-gallery-image-views table.views-view-grid tr td .views-field-field-gallery-image-title-value span').each(function(){
//			var str = $(this).text();
//			var href = $(this).parents('td').find('.views-field-field-gallery-image-fid').find('a').attr('href');
//			if(str == ''){
//				$(this).html('<a href="' + href + '">לתמונה</a>');
//				$(this).parents('td').find('.views-field-field-gallery-image-fid').find('a').find('img').attr('title', '').attr('alt', '');
//			}else{
//				$(this).html('<a href="' + href + '">' + str + '</a>');
//				$(this).parents('td').find('.views-field-field-gallery-image-fid').find('a').find('img').attr('title', str).attr('alt', str);
//			}
//			
//		});
//		
//	}
	
//	if($('.view-node-gallery-gallery-image-views')){
//		var title = $('.node-node_gallery-image .image-preview a img').attr('title');
//		if(title){
//			$('.node-node_gallery-image .image-preview a').append('<span class="extraTitle">' + title + '</span>');
//		}
//		
//	}
	
	if($('.view-node-gallery-gallery-image-views')){
		$('.view-node-gallery-gallery-image-views').prepend('<center style="margin-bottom:15px;"><a class="mazeget" href="/">מצגת תמונות</a></center>');
		$('.mazeget').click(function(){
			$('.view-node-gallery-gallery-image-views table.views-view-grid td:first .views-field-field-gallery-image-fid').find('a').click();
			return false;
		});
	}
	
	$('#mainContent a img').each(function(){
		
		$(this).parents('a').css('text-decoration', 'none');
			
	});
	
	if($('.node-type-gallery-image').is('body')){
		
		var title = $('.field-field-gallery-image img').attr('title');
		if($('#mainContent h2').text() != ''){
			var title = $('#mainContent h2').text();
			$('.field-field-gallery-image img').attr('title', title);
			$('.field-field-gallery-image img').attr('alt', title);
		}else if(title.indexOf("img") != -1){
			$('.field-field-gallery-image img').attr('title', '');
			$('.field-field-gallery-image img').attr('alt', '');
		}
	}
	
	
	if($(".node-type-gallery .gallery-images-list ul")){
		$(".node-type-gallery .gallery-images-list ul").append('<li></li><li></li><li></li>');
	}
// ie only call to round corners - call selector - class, id - and give wanted radius
if (navigator.appVersion.indexOf("MSIE") != -1){ 
	
	//$('#homeMainContent ul.pager .pager-next a').css('margin-top', '-50px');
//	DD_roundies.addRule('.container', '10px');
//	DD_roundies.addRule('#footerArea', '0 0 10px 10px');
//	DD_roundies.addRule('#footer', '0 0 10px 10px');
//	DD_roundies.addRule('.arttabs_primary li', '5px 5px 0 0');
//	DD_roundies.addRule('.redBlock', '7px');
//	DD_roundies.addRule('.greyBlock', '7px');
//	DD_roundies.addRule('#topMenu #search-box', '7px');
//	DD_roundies.addRule('.jcarousel-skin-tango .jcarousel-container', '10px');
//	DD_roundies.addRule('#block-tabbed_block-0 .inner-block .tabbed_block-nav li', '7px 7px 0 0');
//	DD_roundies.addRule('.redBlock h3.subject', '7px 7px 0 0');
//	DD_roundies.addRule('#topMenu .form-submit', '7px 0 0 7px');
//	DD_roundies.addRule('#block-views-home_page_images-block_1 h3.subject', '7px 7px 0 0');
//	DD_roundies.addRule('#block-views-home_page_videos-block_1 h3.subject', '7px 7px 0 0');
//	DD_roundies.addRule('.redBlock .inner-block', '0 0 7px 7px');

 
	
}
	
 
});

