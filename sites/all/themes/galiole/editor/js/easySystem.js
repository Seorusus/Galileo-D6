if (!window.addEventListener) {
    window.addEventListener = function (type, listener, useCapture) {
        attachEvent('on' + type, function() { listener(event) });
    }
}

var id='';
var inputObject='';
var htmlEditor='';

window.addEventListener("message", receiveMessage, false); 

function receiveMessage(event ){ 
		
		if (event.origin == host && inputObject != '')  {
			inputObject.val('/files' + event.data);
			$(inputObject).trigger('change');
		}else if(event.origin == host){
			//alert(event.data);
			var id = event.data.replace('block-' , '');
			
			if(event.data == 'dragStoped'){
				
				var dragObj = $('.ui-draggable-dragging');
				$(dragObj).trigger('mouseup');
				
			}else if(id && id != 0){
				$.get("/block/ajax/ajaxform", { id:id },
			    function(data){
			       // alert(data);
			        $('#easyWindow').easyWindow( {content:data, title:'block properties', instance:'blockProperties'});
					
			    });
			}
		}else{
			return;
		}  
	inputObject='';	
}  

$(function(){
	
	$('.BrowseServer').live('click', function(){
		
		window.open(host + '/js/AjaXplorer-core-2.6.1/index.php','file manager','width=700,height=500'); 

		id = $(this).attr('id').replace('browse-' , '');
		inputObject = $(this).parent().find("#"+id);
	
		return false;
		
	});
	
	
	
	
	$('#menu-admin_menu-menus').click(function(e){
		
		$.post($(this).attr('href'), { name: "John", time: "2pm" },
	    function(data){
	       // alert(data);
	       $('#easyWindow').easyWindow( {content:data, title:'Menus', instance:'menu'});
	    });
	    
		
		return false;
	});

	
	$('#menu-category').click(function(e){
		
		$.post("/category/admin/index", { vid:null },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'Category', instance:'category'});
			
	    });
	    
		
		return false;
	});

	
	
	$('#menu-users').click(function(e){
		
		$.post("/user/ajax/index", { uid:null },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'Users', instance:'users'});
			
	    });
	    
		
		return false;
	});

	
	
	$('#menu-roles').click(function(e){
		
		$.post("/user/role/index", { uid:null },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'Roles', instance:'role'});
			
	    });
	    
		
		return false;
	});
	
	$('#menu-user-resources').click(function(e){
		
		$.post("/user/resource/index", { uid:null },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'resources', instance:'resources'});
			
	    });
	    
		
		return false;
	});
	
	$('#menu-user-settings').click(function(e){
		
		$.get("/user/admin/settings", { uid:null },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'User Settings', instance:'user-settings'});
			
	    });
	    
		
		return false;
	});

	
	$('#menu-item38').click(function(e){
		
		//alert('me');
		
		$.get("/variable/settings", { uid:null },
	    function(data){
	        //alert(data);
	       $('#easyWindow').easyWindow( {content:data, title:'Site Settings', instance:'site-settings'});
			
	    });
	    
		
		return false;
	});

	
	
	$('#menu-user-access').click(function(e){
		
		$.get("/user/access/index", { uid:null },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'access', instance:'access'});
			
	    });
	    
		
		return false;
	});

	$('#menu-item51').click(function(e){
		
		//$('.body #admin-iframe').reload();
		
		var documentFrame = $('iframe')[0];
		documentFrame.contentWindow.location.reload(true);
		
				

		return false;
	});

	 
	$('#menu-content, #menu-item113, #menu-item109').click(function(e){
		
		//$('.body #admin-iframe').reload();
		
		var documentFrame = $('iframe')[0];
		var href = $(this).attr('href');
		
		documentFrame.contentWindow.location.href = href ;
		
				

		return false;
	});

	
	$('#menu-content-types').click(function(e){
		
		//$('.body #admin-iframe').reload();
		
		var documentFrame = $('iframe')[0];
		var href = $(this).attr('href');
		
		documentFrame.contentWindow.location.href = href ;
		
				

		return false;
	});

	
	
	
	$('#menu-field-types').click(function(e){
		
		//$('.body #admin-iframe').reload();
		
		var documentFrame = $('iframe')[0];
		var href = $(this).attr('href');
		
		documentFrame.contentWindow.location.href = href ;
		
				

		return false;
	});

	
	
	 
	$('#menu-css-admin').click(function(e){
		
		$.get($(this).attr('href'), { uid:null },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'css', instance:'css'});
			
	    });
	    
		
		return false;
	});
	
	$('#menu-item125').click(function(e){
		
		$.get($(this).attr('href') + '?' + Math.random(1000000), { uid:null },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'cssFiles', instance:'cssFiles'});
			
	    });
	    
		
		return false;
	});

	 
	$('#menu-file-manager').click(function(e){
		
		$.get($(this).attr('href'), { uid:null },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'File Manager', instance:'file'});
			
	    });
	    
		
		return false;
	});
	
	$('#menu-item91').click(function(e){
		
		$.get($(this).attr('href'), { uid:null },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'Layout Editor', instance:'layout'});
			
	    });
	    
		
		return false;
	});

	 
//	$('#menu-blocks_admin').click(function(e){
//		
//		var documentFrame = $('iframe')[0];
//		var href = $(this).attr('href');
//		
//		documentFrame.contentWindow.location.href = href ;
//		
//		return false;
//	});
 
	$('#menu-blocks_admin').click(function(e){
		
		$.get("/block/ajax/index", { },
	    function(data){
	       // alert(data);
	        $('#easyWindow').easyWindow( {content:data, title:'blocks', instance:'blocks'});
			
	    });
	    
		
		return false;
	});
	
	
	
	
	$("ul.topnav li ul").addClass('subnav');
	
	$("ul.topnav li").hover(function() { 
		
		if($(this).find("ul.subnav").is('ul')){
			$(this).addClass('topNavPressed');
			$(this).find("ul.subnav").fadeIn('fast').show();
		}
		
	},function(){
		
		if($(this).find("ul.subnav").is('ul')){
			$(this).removeClass('topNavPressed');
			$(this).find("ul.subnav").fadeOut('fast');
		}
		
		
	});
	
	
//editing functions
	
	$('#editFunction').toggle(function(){
		
		//bind iframe elements to click etc... in order to edit them.
		$(this).text('Stop Editing');
		var id = $(this).attr('id');
		var documentFrame = $('iframe')[0];
		documentFrame.contentWindow.postMessage('edit', host);
		return false;
	},function(){
		
		//unbind iframe elements to click etc...
		$(this).text('Edit');
		
		var documentFrame = $('iframe')[0];
		documentFrame.contentWindow.postMessage('stop edit', host);
		
		
		return false;
	});
	
	
	$('#cssInspect').live('mousedown', function(){
		
		if($(this).text() == 'Stop Inspecting'){
			$(this).text('Inspect Page');
			$('#inspectDom').css('z-index', -50000);
			$('#inspectDom').css('display', 'none');
		}else{
			$(this).text('Stop Inspecting');
			$('#inspectDom').css('z-index', 50000);
			
			
					
			$('#inspectDom').css('display', 'block');
			
			//$('#inspectDom td').html().replace('xmp', 'div');
			if(htmlEditor == ''){
				
			var html = $('#admin-iframe').contents().find("body").html();
			html = html.replace(/<\/?(script(.*))[^>]*>/, ""); 
			html = html.replace(/\n{2,3,4,5,6,7,8,9,10,11,12}/ , "\n"); 
			html = html.replace(/\t{2,3,4,5,6,7,8,9,10,11,12}/ , ""); 
			html = html.replace(/&nbsp;{2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20}/ , "\n"); 
				
			$('#inspectDom #htmlDom').val(html); 	
			
			htmlEditor = CodeMirror.fromTextArea("htmlDom", {
					  parserfile: ["parsexml.js", "parsecss.js", "tokenizejavascript.js", "parsejavascript.js", "parsehtmlmixed.js"],
					  path: "editor/js/codeMiror/js/",
					  width: "800px",
					  // cursorActivity: showRaw,
					  iframeClass: "htmlDomIframe",
					  stylesheet: ["editor/js/codeMiror/css/xmlcolors.css", "editor/js/codeMiror/css/jscolors.css", "editor/js/codeMiror/css/csscolors.css"]
					});
			}		
			
			
		}
		

		return false;
	});
		
		
	$.get('editor/core/controller.php', { uid:null },
    function(data){
       // alert(data);
        $('#easyWindow').easyWindow( {content:data, title:'css', instance:'css'});
		
    });
	    
	
	


	
})