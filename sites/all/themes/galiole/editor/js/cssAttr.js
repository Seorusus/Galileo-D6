
$('.jPicker').find('.Ok').live('click' , function(){
	if($(this).parents('.jPicker').prev('input.color').val() == ''){
		$(this).parents('.jPicker').prev('input.color').val('transparent');
	}
	$(this).parents('.jPicker').prev('input.color').trigger('change');
});




$('#attributes :input').change(function(){
	var sel = $('#attributes #selector').val();
	var attr = $(this).attr('id');
	var val = $(this).val();
	if($(this).attr('id') == 'moz-border-radius'){
		attr = '-' + attr;
	
	};
	if($(this).attr('id') == 'content'){
	
		str=val.replace(/\\'/g,'\'');
		str=str.replace(/\\"/g,'"');
		str=str.replace(/\\0/g,'\0');
		str=str.replace(/\\\\/g,'\\');
		
		val = str;
	
	};
	
	if( attr.match('color') ){
		if(val != 'transparent' && val != null){
			val = '#'+val;
		}
	}	
	 
	
	
	$('.easyCss').css('cursor', 'wait');
	$.post("editor/core/controller.php", { action:'save', selector:sel , attr:attr , value:val , file:currentFile},
	  function(data){
	  	$('.easyCss').css('cursor', 'default');
	  }); 
	  
	if( attr.match('Image')){
		val = 'url(css/'+val+')';
	};
	
	$('#admin-iframe').contents().find(sel).css( attr ,  val ); 
	//$('a#saveCssChanges').css('background-color', 'red');
	//$(sel).css( attr ,  val );
});

$('#saveCssChanges').click(function(){
	//alert('yes. me!!');
	var m = '';
	$('#attributes :input').each(function(){
		m = m+ $(this).attr('id') + '=' + $(this).val() + '|';
	});
	$('.easyCss').css('cursor', 'wait');
	$.post("editor/core/controller.php", { action:'save', data:m , file:currentFile},
	  function(d){
	  	$('.easyCss').css('cursor', 'default');
	  	$('a#saveCssChanges').css('background-color', 'transparent');
	  })
});


$('#cancelCssChanges').click(function(){
	
	$('.easyCss').css('cursor', 'wait');
	$.post("/css/admin/cancel", {   },
	  function(data){
	  	for( var i in data ){
	  		$('#admin-iframe').contents().find(data[i].selector).css( data[i].attr ,  data[i].value );
	  	}
	  	$('.easyCss').css('cursor', 'default');
	  	$('a#saveCssChanges').css('background-color', 'transparent');
	  }, "json")
});



$('.cssHeaderLinksA').click(function(){
	
	var id = 'css-edit-' + $(this).attr('id');
	
	$('#cssHeaderLinks ul li').removeClass('selected');
	$('.cssHeaderLinksA').removeClass('selected');
	
	$(this).parent().addClass('selected');
	$(this).addClass('selected');
	
	
	$('#' + id).css('display' ,'block');
	
	return false;
});



$('.bg-position-determine').hover(function(){
	$(this).css('border', '1px solid #5F5F5F');
},function(){
	$(this).css('border', '1px solid #DFDFDF');
});
$('.bg-position-determine').click(function(){
	var id = $(this).attr('id').replace('position-no-', '');
	var pos = 'center';

	
	switch(id){
		case '1':
			pos = 'top left';
		break;
		
		case '2':
			pos = 'top';
		break;
		
		case '3':
			pos = 'top right';
		break;
		
		case '4':
			pos = 'left';
		break;
		
		case '5':
			pos = 'center';
		break;
		
		case '6':
			pos = 'right';
		break;
		
		case '7':
			pos = 'bottom left';
		break;
		
		case '8':
			pos = 'bottom';
		break;
		
		case '9':
			pos = 'bottom right';
		break;
		default: 
		pos = pos;
		break;
	}
	
	$(this).parents('td').find('#background-position').val(pos);
	$(this).parents('td').find('#background-position').trigger('change');
	
});



$('#uniformSelect').toggle(function(){
	$('#hideWhenUnified').css('display', 'none');
	$(this).html('not uniform');
	$('#whenUnified').html('border:');
	
	$('.border-width, .border-color, .border-style').bind('change', borderChange);
	
	
	
},function(){
	$('#hideWhenUnified').css('display', 'block');
	$(this).html('uniform border?');
	$('#whenUnified').html('top:');
	$('#border-top-width, #border-top-style, #border-top-color ').unbind('change', borderChange);
});
 

function borderChange(){
	var borderWhat = $(this).attr('id').replace('border-top-' , '');
	var val = $(this).val();
	
	$('.border-' + borderWhat).each(function(){
		if($(this).attr('id') != 'border-top-' + borderWhat){
		$(this).val(val);
		$(this).trigger('change');
		};
	});
	
};


$('#Unified-margin').toggle(function(){
	$('.hideWhenUnified-margin').css('visibility', 'visible');
	$(this).html('Unified Margin');
	$('#when-Unified-margin').html('margin-top:');
	$('#margin-top ').unbind('change', marginChange);
},function(){
	$('.hideWhenUnified-margin').css('visibility', 'hidden');
	$(this).html('not uniform');
	$('#when-Unified-margin').html('margin:');
	$('#margin-top').bind('change', marginChange);
});
 $('#margin-top').bind('change', marginChange);




function marginChange(){
	
	var val = $(this).val();
	
	$('.margin').each(function(){
		$(this).val(val);
		$(this).trigger('change');
	});
	
};
 


$('#Unified-padding').toggle(function(){
	$('.hideWhenUnified-padding').css('visibility', 'visible');
	$(this).html('Unified padding');
	$('#when-Unified-padding').html('padding-top:');
	$('#padding-top ').unbind('change', paddingChange);
},function(){
	$('.hideWhenUnified-padding').css('visibility', 'hidden');
	$(this).html('not uniform');
	$('#when-Unified-padding').html('padding:');
	
	$('#padding-top').bind('change', paddingChange);
});
 
$('#padding-top').bind('change', paddingChange);



function paddingChange(){
	
	var val = $(this).val();
	
	$('.padding').each(function(){
		$(this).val(val);
		$(this).trigger('change');
	});
	
};
 


