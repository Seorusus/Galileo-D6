function mapElements(obj){
	var parentsToMatch = '';
	var itemToMatch = '';
	var map = $(obj).parents().map(function (index) { 
		   			//level = (level) ? level++ : 0;
			         if($(this).attr('class') != 'container' && $(this).attr('class') != 'wrapper' && this.tagName != 'BODY' && this.tagName != 'HTML' ) {    	
			          	
			         	var objId = ($(this).attr('id'))? $(this).attr('id') :'';
					  	var objClass = ($(this).attr('class'))? $(this).attr('class') :'';
					  //	var objTag = (this.tagName)? this.tagName :'&nbsp;';
					  	//parentsToMatch = parentsToMatch + ' ' + objTag;
					  	
					  	
					  	if(objId != '&nbsp;'){
					  		parentsToMatch = parentsToMatch + ' ' + objId;
					  		
					  	}else{
					  		if(objClass != '&nbsp;'){
						  	var classes = objClass;
							var split = classes.match(' ');
							if(split != null){
								var cla = $(this).attr('class').split(' ');
								//cla.sort(cla.length);
								cl = cla.reverse();
								if(cl.length > 0){
									objClass ='';
									for(var i = 0; i <cl.length; i++){
						    			objClass += cl[i];
						    			parentsToMatch = parentsToMatch + ' ' + cl[i];
						    			
						    		}
								} 
							}else{
								parentsToMatch = parentsToMatch + ' ' + objClass;
								
							}
					  	}
					  		
					  	}
					  	
					  		
					  return  parentsToMatch ;
					  
											 	
						
					 
			         }
				 }).get().join(" "); 

		 var item = $(obj).map(function (index) { 
			         	
			         	var objId = ($(this).attr('id'))? $(this).attr('id') :'';
					  	var objClass = ($(this).attr('class'))? $(this).attr('class') :'';
					  	//var objTag = (this.tagName)? this.tagName :'&nbsp;';
					  //	itemToMatch = itemToMatch + ' ' + objTag;
					  	if(objClass != '&nbsp;'){
						  	var classes = objClass;
							var split = classes.match(' ');
							if(split != null){
								var cla = $(this).attr('class').split(' ');
								//cla.sort(cla.length);
								cl = cla.reverse();
								if(cl.length > 0){
									objClass ='';
									for(var i = 0; i <cl.length; i++){
						    			
						    			itemToMatch = itemToMatch + ' ' + cl[i];
									}
								} 
							}else{
								itemToMatch = itemToMatch + ' ' + objClass;
								
								
							}
					  	}
					  	
					  	
					  	if(objId != '&nbsp;'){
					  		itemToMatch = itemToMatch + ' ' + objId;
					  		
					  	}
					  
					  return  objId +  objClass;
					  	
					  	
				 }).get().join(" ");	 
					
	 	return item + parentsToMatch;
}



function activeInspecting(){
	
	$('#admin-iframe').contents().mouseover(function(e){
	   //	if(interact == 'true'){
	    if(navigator.userAgent.search(/msie/i)!= -1) {
	    	$(e.target).css('border','1px solid red');
	    }else{
	    	$(e.target).css('outline','1px solid red');
	    }
	    	
	    	   			
	  		elements = elementTree(e);
	  		
	  		var size = 'W = ' + $(e.target).outerWidth() + '/ H = ' + $(e.target).outerHeight();
	  		
		   	$('#interactData').html( elements );
		   	$('#interactSize').html( size );
		   	
		   	
	   //	};
   });
   



window.addEventListener("message", receiveScrollMessagetwo, false); 
    
  function receiveScrollMessagetwo(event ){  
			if (event.origin !== host)  
			return;  
			
		topDocumentScroll = event.data;
		//if(interact == 'true'){
			
			var target = $(contextObj.target);
			
			target.contextMenu({
		        menu: 'myMenu'
		   		 },
		        function(action, el, pos) {
		        	switch (action){
		        		case 'edit': 
		        		
		        			var str = $('#myMenu').find('#cssSelectorTree').find('#finalSelecotrList').val();
			        		$('#AddSelectorName').val(str);	
							$('#AddSelectorNameButton').trigger('click');	
		        		break;
		        		
		        		case 'find': 
		        		
			        		var str = mapElements(target);
			        		
			        		console.log(str);
			        		
			        		var strPart = str.split(' ');
			        		
			        		var matchedSelectors = Array();
			        		var lastElement;
			        		
			        		for(var y = 0; y < strPart.length; y++){
			        			if(strPart[y]){
				        			$('.css-selctor').each(function(){
				        				var selector = $(this).attr('title').replace(', ', '');
				        				
				        				
				        					var b = selector.indexOf(strPart[y]);
				        					if(b >= 0){
					        					matchedSelectors.push($(this).attr('title'));
					        					lastElement = $(this);	
					        					console.log(b + ' = ' + selector + ' in ' + strPart[y]);
				        					}
				        			
				        				
				        				
				        			});
			        			}
			        			console.log(strPart[y]);
			        		}
			        		
			        		
			        		
							
								
								
							
								
							
								
								
								//var b = str.indexOf(selector);
								//matchedSelectors.push(b);
								//var inarr = $.inArray(selector, str.split(' '))
								
								//if(inarr >= -1){
									//alert(' is - ' + selector);
									//$(this).parent().prepend($(this));
									//$(this).css('outline','1px solid red');
								
									
							
							//$('#selectorUl').scrollTo(lastElement, {duration:1000});
							console.log(matchedSelectors);
							$('#myMenu').css('display', 'none');
		        		break;
		        		
		        		case 'cancel': 
		        			$('#myMenu').css('display', 'none');
		        		break;
		        		
		        		case 'selectors':
		        			$('#myMenu').css('display', 'block');
		        		break;
		        		
		        		 
		        	}
		         });
		         
		         $('#myMenu').draggable({ iframeFix: true, containment: '.body', cancel: "#cssSelectorTree"});
		      $(contextObj.target).trigger('mousedown');   
		      $(contextObj.target).trigger('mouseup');   
		      
		         var parentObj = $(contextObj.target);
				var	stop = false;
			  	$('#myMenu').find('#cssSelectorTree').html('<form id="contextMenuSelectorForm">');
		   		$('#myMenu').find('#cssSelectorTree').html('<table border="0"><tr><th>tag</th><th>id</th><th>class</th><th>clear</th></tr>');
		    
		   		
		   		var parentsToMatch = '';
		   		var parent = $(parentObj).parents().map(function (index) { 
		   			//level = (level) ? level++ : 0;
			         if($(this).attr('class') != 'container' && $(this).attr('class') != 'wrapper' && this.tagName != 'BODY' && this.tagName != 'HTML' ) {    	
			          	
			         	var objId = ($(this).attr('id'))? $(this).attr('id') :'&nbsp;';
					  	var objClass = ($(this).attr('class'))? $(this).attr('class') :'&nbsp;';
					  	var objTag = (this.tagName)? this.tagName :'&nbsp;';
					  	parentsToMatch = parentsToMatch + ' ' + objTag;
					  	if(objClass != '&nbsp;'){
						  	var classes = objClass;
							var split = classes.match(' ');
							if(split != null){
								var cla = $(this).attr('class').split(' ');
								//cla.sort(cla.length);
								cl = cla.reverse();
								if(cl.length > 0){
									objClass ='';
									for(var i = 0; i <cl.length; i++){
						    			objClass += '<input type="radio" value="." name="' + index + '" id="' + cl[i] + '"> .' + cl[i];
						    			parentsToMatch = parentsToMatch + ' .' + cl[i];
						    		}
								} 
							}else{
								parentsToMatch = parentsToMatch + ' .' + objClass;
								objClass = '<input type="radio" value="." name="' + index + '" id="' + objClass + '"> .' + objClass;
							}
					  	}
					  	
					  	if(objId != '&nbsp;'){
					  		parentsToMatch = parentsToMatch + ' #' + objId;
					  		objId = '<input type="radio" name="' + index + '" value="#" id="' + objId +'">#' + objId;
					  	}
					  	
					  		
					  return  '<tr>'+
					 		  '<td><input type="checkbox" value="" id="' + objTag + '" name="tag-'+ index + '">' + objTag + '</td>'+
					  		  '<td>' + objId + '</td>'+
					  	      '<td>' + objClass + '</td><td><span class="clearFields">clear</span></td></tr>';
					  
											 	
						
					 
			         }
				 }).get().reverse().join(" ");
				 var itemToMatch = '';
				 var item = $(parentObj).map(function (index) { 
			         	
			         	var objId = ($(this).attr('id'))? $(this).attr('id') :'&nbsp;';
					  	var objClass = ($(this).attr('class'))? $(this).attr('class') :'&nbsp;';
					  	var objTag = (this.tagName)? this.tagName :'&nbsp;';
					  	itemToMatch = itemToMatch + ' ' + objTag;
					  	if(objClass != '&nbsp;'){
						  	var classes = objClass;
							var split = classes.match(' ');
							if(split != null){
								var cla = $(this).attr('class').split(' ');
								//cla.sort(cla.length);
								cl = cla.reverse();
								if(cl.length > 0){
									objClass ='';
									for(var i = 0; i <cl.length; i++){
						    			objClass += '<input type="radio" value="." name="item" id="' + cl[i] + '"> .' + cl[i];
						    			itemToMatch = itemToMatch + ' .' + cl[i];
									}
								} 
							}else{
								itemToMatch = itemToMatch + ' .' + objClass;
								objClass = '<input type="radio" name="item" value="." id="' + objClass + '"> .' + objClass;
								
							}
					  	}
					  	
					  	
					  	if(objId != '&nbsp;'){
					  		itemToMatch = itemToMatch + ' #' + objId;
					  		objId = '<input type="radio" name="item" value="#" id="' + objId +'">#' + objId;
					  	}
					  
					  return  '<tr>'+
					  	'<td><input type="checkbox" value="" id="' + objTag + '" name="tag">' + objTag + '</td>'+
					  	'<td>' + objId + '</td>'+
					  	'<td>' + objClass + '</td><td><span class="clearFields">clear</span></td></tr>';
					  	
					  	
				 }).get().join(" ");
	
				$('#myMenu').find('#cssSelectorTree table').append(parent);
				$('#myMenu').find('#cssSelectorTree table').append(item);
				$('#myMenu').find('#cssSelectorTree table').append('<tr><td></td><td colspan="2"><input type="radio" name="psedo" value=":" id="hover">hover<input type="radio" name="psedo" value=":" id="active">active<input type="radio" name="psedo" value=":" id="visited">visited<input type="radio" name="psedo" value=":" id="first-child">first-child</td><td><span class="clearFields">clear</span></td></tr>');
				$('#myMenu').find('#cssSelectorTree table').append('<tr><td>result=</td><td colspan="2"><input value="" size="40" id="finalSelecotrList" type="text"/></td></tr>');
				
				 $('</table>').appendTo($('#myMenu').find('#cssSelectorTree table'));
				 $('</form>').appendTo($('#myMenu').find('#cssSelectorTree table'));
			  
		         
	    	$('#myMenu').css('top', top - topDocumentScroll);
	    	$('#myMenu').css('left', left);
	    
	    	$('.clearFields').live('click', function(){
	    		
	    		$(this).parent().parent().find('input:checkbox:checked, input:radio:checked').each(function(index){
	    			$(this).attr('checked', false);
	    			$(this).trigger('change');
	    		});
	    		
	    	});
	    	
      $('#myMenu').find('#cssSelectorTree').find('#finalSelecotrList').val( 	$('#interactData').text());
	    	
	  $('#cssSelectorTree :input').bind('change', function(){
	  		if($(this).attr('id') != 'finalSelecotrList'){
	  			 var item = $('#cssSelectorTree').find('input:checkbox:checked, input:radio:checked').map(function (index) { 
	  			 	
	  			 	if( $(this).attr('id')  != 'finalSelecotrList'){
	  			 		
	  			 		return $(this).val() + $(this).attr('id');
	  			 	}
	  			 }).get().join(" ");
	  			 	
	  			item = item.replace(' .', '.');	
		  		$('#myMenu').find('#cssSelectorTree').find('#finalSelecotrList').val( item);
		  	}
	  	});
	    	
	}  

   
  
  
   
  
     $('#admin-iframe').contents().click(function(e){
     	
     
     	if( e.button != 1 && e.button != 2 && interact == 'true' ) {
     			
	     		contextObj = e;
				top = e.pageY;
				left = e.pageX;
				
		     	var documentFrame = $('iframe')[0];
				documentFrame.contentWindow.postMessage('scroll please', host + '/index/admin');
				
				
			return false;
     	}
     	
	});
      
	
//	function selectorContextMenu(e){
//		//if(interact == 'true'){
//     		 e.stopPropagation();
//	     		elements = elementTree(e);
//		 $('#AddSelectorName').val(elements.toLowerCase());	
//		 $('#AddSelectorNameButton').trigger('click');	
//		 
//		   		return false;
//     	//}
//		
//	}
	
function sortClasses(clas)
{
return clas.length;
}

function elementTree(e){
	
	var elements = '';
	
 	 var parent = $(e.target).parents().map(function () { 
         if($(this).attr('class') != 'container' && $(this).attr('class') != 'wrapper' && this.tagName != 'BODY' && this.tagName != 'HTML' ) {    	
          	
             if($(this).attr('id')){
				 return '#' + $(this).attr('id');
			 }else if($(this).attr('class')){
				var classes = $(this).attr('class');
				var split = classes.match(' ');
				if(split != null){
					var cla = $(this).attr('class').split(' ');
					cla.sort(sortClasses);
					cl = cla.reverse();
					//alert(cl);
					if(cl.length >= 1){
			    		clas = cl[0];
					} 
				}else{
		   			clas =  $(this).attr('class') ;
		   		}
					return this.tagName + '.' + clas;
			}else{
				 return this.tagName;
			}
         }
	 }).get().reverse().join(" ");

 	var target = $(e.target) .map(function () { 
        if($(this).attr('id')){
			 return '#' + $(this).attr('id');
		}else if($(this).attr('class')){
			var classes = $(this).attr('class');
			var split = classes.match(' ');
			if(split != null){
				var cla = $(this).attr('class').split(' ');
				cla.sort(sortClasses);
				cl = cla.reverse();
				if(cl.length >= 1){
		    		clas = cl[0];
				} 
			}else{
	   			clas =  $(this).attr('class') ;
	   		}
				return this.tagName + '.' + clas;
		}else{
			 return this.tagName;
		}
                
	}).get().reverse().join(" ");

		
	elements += parent + ' ' + target;
	
	

	return 	elements;	   	
}
     
     $('#admin-iframe').contents().mouseout(function(e){
     	 if(navigator.userAgent.search(/msie/i)!= -1) {
     	 	if($(e.target).css('border') != '0px solid red'){
	    		$(e.target).css('border','0px solid red');
	    	}
     	 }else{
     	 	if($(e.target).css('outline') != '0px solid red'){
	    		$(e.target).css('outline','0px solid red');
	    	}
	   	};
     	
	   
   });
};