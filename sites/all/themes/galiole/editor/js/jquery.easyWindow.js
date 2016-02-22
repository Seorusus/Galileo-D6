
  var zindex =200;
$.fn.easyWindow = function(options) {

  var opts = $.extend({}, $.fn.easyWindow.defaults, options);

	this.each(function(){ 
		if(opts.show == true){
			
			
			
			if(opts.instance == 'css'){
				
				var cssWindowExist = false;
				
				if( $("#easyWindow-" + opts.instance ).length < 1 ){
				var object = $(this).clone().prependTo(".body").attr('id' , 'easyWindow-' + opts.instance).addClass( 'easyCss').addClass( 'easyWindowSnapTo');
				}else{
					var object = $("#easyWindow-" + opts.instance );
					cssWindowExist = true;
				}
				
				
				object.html('');
				object.css('display', 'block');
				$(object).click(function(){zindex =zindex + 1;$(object).css('z-index', zindex );});
				
				
				var cssHeaderLinks = '<div id="cssHeaderLinks" style="width:2000px;"><ul><li><a class="cssHeaderLinksA" id="browseFiles" href="#">Browse Files</a></li><li><a class="cssHeaderLinksA" id="editStyle" href="#">Edit Style</a></li><li><a class="cssHeaderLinksA" id="editRaw" href="#">Edit Raw Style</a></li></ul><div id="cssHeaderFunctions"><ul><li id="interactSize"></li><li id="interactData"></li><li><a class="cssHeaderLinkSave" id="saveCssChanges" href="#">Apply Changes</a></li><li><a class="cssHeaderLinkSave" id="cancelCssChanges" href="#">Cancel Changes</a></li><li><a class="cssHeaderLinkInteract" id="cssInspect" href="#">Inspect Page</a></li></ul></div></div>';
				var titleContainer = '<div class="easyWindowHeader cssHeader"><div id="TopLeft"></div><div id="TopRight"></div><div id="easyWindowHeaderContent">' + cssHeaderLinks + '<div class="easyWindowControll" id="minPopup" style="float:right;"><h5>-</h5></div></div>';
				var contentContainer = '<div class="easyWindowcontent"><div class="content-container">' + opts.content + '</div></div>'
				
				$(object).append('<div id="shadow"><div id="bottomShadow"><div id="bottomLeftShadow"></div><div id="bottomRightShadow"></div></div><div id="rightShadow"><div id="rightTopShadow"></div></div><div id="topShadow"><div id="topLeftShadow"></div></div><div id="leftShadow"></div></div>');
			
			
				
				$(object).find('#topShadow').draggable({ axis: 'y', iframeFix: true, containment: '.body', drag: function(event, ui){ 


					var topOfObject = $(document).scrollTop();
					
					object.css({ top: ui.offset.top - topOfObject}); 
					object.css({ height: 'auto'}); 
					
//					var thisTop = $(this).css('top');
//					object.find('#testMessage').html(ui.offset.top - topOfObject + ' - ' + thisTop);
					
					
					var iframeHeight = $('#admin-iframe').outerHeight();
					var anotherHeightAttempt =  (ui.offset.top - topOfObject) - iframeHeight;
					var totalIframeHeighttwo = ((iframeHeight + anotherHeightAttempt)) + 'px';
					$('#admin-iframe').css('height', totalIframeHeighttwo);

					}, stop: function(event, ui){
						object.find('#topShadow').css({top:0, left:0, bottom:'', right:''});
						object.find('#topShadow').css('visibility', 'visible');
						
						var topOfObject = $(document).scrollTop();	
						var iframeHeight = $('#admin-iframe').outerHeight();
						var anotherHeightAttempt =  (ui.offset.top - topOfObject) - iframeHeight;
						var totalIframeHeighttwo = ((iframeHeight + anotherHeightAttempt) ) + 'px';
						
						$('#admin-iframe').css('height', totalIframeHeighttwo );
						
					}, start: function(){
						object.find('#topShadow').css('visibility', 'hidden');
						
					}
					
					
					
				});
				
				var iframeHeight = $('#admin-iframe').outerHeight();
				if(!cssWindowExist){
					var totalIframeHeighttwo = (iframeHeight - 227) + 'px';
					$('#admin-iframe').css('height', totalIframeHeighttwo);
				}
				
			}else{
				if( $("#easyWindow-" + opts.instance ).length < 1 ){
					var object = $(this).clone().prependTo(".body").attr('id' , 'easyWindow-' + opts.instance).addClass( 'popupTable').addClass( 'easyWindowSnapTo');
					object.draggable({ iframeFix: true, snapTolerance: 40, snap: '.easyWindowSnapTo', snapMode: 'outer', cancel: ".easyWindowcontent" , containment: '.body', start: function(event, ui){ zindex =zindex + 1;$(object).css('z-index', zindex );}});
				}else if(opts.instance != null){
					var object = $("#easyWindow-" + opts.instance );
					object.draggable({ iframeFix: true, snapTolerance: 40, snap: '.easyWindowSnapTo', snapMode: 'outer',  cancel: ".easyWindowcontent" , containment: '.body', start: function(event, ui){zindex =zindex + 1;$(object).css('z-index', zindex );}});
				}
				
				object.html('');
				object.css('display', 'block');
				$(object).click(function(){zindex =zindex + 1;$(object).css('z-index', zindex );});
				
				var titleContainer = '<div class="easyWindowHeader"><div id="TopLeft"></div><div id="TopRight"></div><div id="easyWindowHeaderContent"><h5 style="float:left;">' + opts.title + '</h5><div id="closePopup" class="easyWindowControll close" style="float:right;"><h5>X</h5></div><div class="easyWindowControll" id="minPopup" style="float:right;"><h5>-</h5></div></div>';
				var contentContainer = '<div class="easyWindowcontent"><div class="content-container">' + opts.content + '</div></div>'
			
			
				
				$(object).append('<div id="resizing"></div>');
				$(object).find('#resizing').draggable({ iframeFix: true, containment: '.body', drag: function(event, ui){ 
				
				if(ui.position.top+16 >= 266){
					object.css({ height:ui.position.top+16 }); 
					var minus = 105; 
					if(object.attr('id') == 'easyWindow-file' || object.attr('id') == 'easyWindow-layout' ){
						minus = 30;
					}else if(object.attr('id') == 'easyWindow-blockProperties'){
						minus = 40;
					}	
						object.find('.easyWindowcontent').find('.bottom').css({ height:(ui.position.top+16)-minus });  
					
				}
				
				if( ui.position.left+16 >= 326){
					object.css({ width:ui.position.left+16 });  
				}
				}, stop: function(){
					object.find('#resizing').css({top:'', left:'', bottom:'0px', right:'0px'});
					
				} });
				
				$(object).append('<div id="shadow"><div id="bottomShadow"><div id="bottomLeftShadow"></div><div id="bottomRightShadow"></div></div><div id="rightShadow"><div id="rightTopShadow"></div></div><div id="topShadow"><div id="topLeftShadow"></div></div><div id="leftShadow"></div></div>');
			
			}
			
			
			$(titleContainer).appendTo(object);
			$(contentContainer).appendTo(object);
			
			$(object).find('#closePopup').click(function(){
				
				if($(object).attr('id') == 'easyWindow-css'){
					$('#admin-iframe').css('height','100%');
					if($(object).find('#interactData').css( 'display') == 'block'){
						$(object).find('#cssInteract').click();		
					}
				}
				$(this).parent().parent().parent().remove();
			});
			
			object.width = $(object).outerWidth();
			object.height = object.outerHeight();
			var OfObject = $(object).offset().top - $(document).scrollTop();
			var screen = (OfObject + object.height) -32;
			
			
			$('.cssHeaderLinksA').click(function (){
				if($(this).parents(".easyCss").css('opacity') == 0.8){
					$(object).find('#maxPopup').click();
				}
				
			});
	
			$(object).find('#minPopup').toggle(function(){
				if($(object).attr('id') == 'easyWindow-css'){
					$('#admin-iframe').css('height','100%');
					$(this).parent().parent().parent().animate({ 
												   height: "32px",
												    top: screen,
												    opacity: 0.8												   
												  }, 500 );
				
												  
				var iframeHeight = $('#admin-iframe').outerHeight();
				var totalIframeHeighttwo = (iframeHeight - 32) + 'px';
				$('#admin-iframe').css('height', totalIframeHeighttwo);
							  
				}else{
					$(this).parent().parent().parent().animate({ 
												    height: "32px",
												    opacity: 0.3												   
												  }, 500 );
				}
				object.find('.content-container').css('height', 0);
				object.find('#shadow').css('display', 'none');
				$(this).html('<h5>+</h5>');
				$(this).attr('id', 'maxPopup');
			},function(){
				object.find('#shadow').css('display', 'block');	
				if($(object).attr('id') == 'easyWindow-css'){	
					$('#admin-iframe').css('height',  OfObject);
					$(this).parent().parent().parent().animate({ 
												    height: object.height,
												     top: OfObject,
												    opacity: 1
												  }, 500 );
								

				}else{  
					$(this).parent().parent().parent().animate({ 
												    height: object.height,
												    opacity: 1
												  }, 500 );
					var minus = 105; 
					if(object.attr('id') == 'easyWindow-file' || object.attr('id') == 'easyWindow-layout'){
						minus = 30;
					}else if(object.attr('id') == 'easyWindow-blockProperties'){
						minus = 40;
					}
					object.find('.easyWindowcontent').find('.bottom').css({ height:(object.height)-minus });  
					
				}
				
				zindex++;
				$(object).css('z-index', zindex );		
								  
				object.find('.content-container').css('height', '100%');
				$(this).parent().parent().parent().css('opacity', 1);
				$(this).html('<h5>-</h5>');
				$(this).attr('id', 'minPopup');
				$(object).find('#resizing').css({'top':''});
				
			});
				
			
			zindex++;
			$(object).css('z-index', zindex );
			
		}else{
			object.css('display', 'none');
		}
		
    return object;
	});  
	
	
};

$.fn.easyWindow.defaults = {
	show: true,
	title: 'title',
	instance: null,
	content: 'content'
};

