/*
 * jQuery 1.2.6 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008/06/23 22:58:52 $
 * $Rev: 5685 $
 */
(function(){var _jQuery=window.jQuery,_$=window.$;var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context);};var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this;}if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3])return jQuery().find(selector);return jQuery(elem);}selector=[];}}else
return jQuery(context).find(selector);}else if(jQuery.isFunction(selector))return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return this.setArray(jQuery.makeArray(selector));},jquery:"1.2.6",size:function(){return this.length;},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num];},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret;},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this;},each:function(callback,args){return jQuery.each(this,callback,args);},index:function(elem){var ret=-1;return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this);},attr:function(name,value,type){var options=name;if(name.constructor==String)if(value===undefined)return this[0]&&jQuery[type||"attr"](this[0],name);else{options={};options[name]=value;}return this.each(function(i){for(name in options)jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name));});},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)value=undefined;return this.attr(key,value,"curCSS");},text:function(text){if(typeof text!="object"&&text!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this]);});});return ret;},wrapAll:function(html){if(this[0])jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)elem=elem.firstChild;return elem;}).append(this);return this;},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html);});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)this.appendChild(elem);});},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)this.insertBefore(elem,this.firstChild);});},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this);});},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});},end:function(){return this.prevObject||jQuery([]);},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem);});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems);},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0];}else
return this.cloneNode(true);});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)this[expando]=null;});if(events===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var events=jQuery.data(this,"events");for(var type in events)for(var handler in events[type])jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data);});return ret;},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i);})||jQuery.multiFilter(selector,this));},not:function(selector){if(selector.constructor==String)if(isSimple.test(selector))return this.pushStack(jQuery.multiFilter(selector,this,true));else
selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector;});},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=='string'?jQuery(selector):jQuery.makeArray(selector))));},is:function(selector){return!!selector&&jQuery.multiFilter(selector,this).length>0;},hasClass:function(selector){return this.is("."+selector);},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)return value;values.push(value);}}return values;}else
return(this[0].value||"").replace(/\r/g,"");}return undefined;}if(value.constructor==Number)value+='';return this.each(function(){if(this.nodeType!=1)return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0);});if(!values.length)this.selectedIndex=-1;}else
this.value=value;});},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value);},replaceWith:function(value){return this.after(value).remove();},eq:function(i){return this.slice(i,i+1);},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},andSelf:function(){return this.add(this.prevObject);},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length)data=jQuery.data(this[0],key);return data===undefined&&parts[1]?this.data(parts[0]):data;}else
return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value);});},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)elems.reverse();}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script"))scripts=scripts.add(elem);else{if(elem.nodeType==1)scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem);}});scripts.each(evalScript);});}};jQuery.fn.init.prototype=jQuery.fn;function evalScript(i,elem){if(elem.src)jQuery.ajax({url:elem.src,async:false,dataType:"script"});else
jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)elem.parentNode.removeChild(elem);}function now(){return+new Date;}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2;}if(typeof target!="object"&&typeof target!="function")target={};if(length==i){target=this;--i;}for(;i<length;i++)if((options=arguments[i])!=null)for(var name in options){var src=target[name],copy=options[name];if(target===copy)continue;if(deep&&copy&&typeof copy=="object"&&!copy.nodeType)target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy);else if(copy!==undefined)target[name]=copy;}return target;};var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep)window.jQuery=_jQuery;return jQuery;},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"");},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body;},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)script.text=data;else
script.appendChild(document.createTextNode(data));head.insertBefore(script,head.firstChild);head.removeChild(script);}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])jQuery.cache[id]={};if(data!==undefined)jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id;},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])break;if(!name)jQuery.removeData(elem);}}else{try{delete elem[expando];}catch(e){if(elem.removeAttribute)elem.removeAttribute(expando);}delete jQuery.cache[id];}},each:function(object,callback,args){var name,i=0,length=object.length;if(args){if(length==undefined){for(name in object)if(callback.apply(object[name],args)===false)break;}else
for(;i<length;)if(callback.apply(object[i++],args)===false)break;}else{if(length==undefined){for(name in object)if(callback.call(object[name],name,object[name])===false)break;}else
for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}return object;},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value;},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))elem.className+=(elem.className?" ":"")+className;});},remove:function(elem,classNames){if(elem.nodeType==1)elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className);}).join(" "):"";},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1;}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}callback.call(elem);for(var name in options)elem.style[name]=old[name];},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0;});val-=Math.round(padding+border);}if(jQuery(elem).is(":visible"))getWH();else
jQuery.swap(elem,props,getWH);return Math.max(0,val);}return jQuery.curCSS(elem,name,force);},curCSS:function(elem,name,force){var ret,style=elem.style;function color(elem){if(!jQuery.browser.safari)return false;var ret=defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")=="";}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");return ret==""?"1":ret;}if(jQuery.browser.opera&&name=="display"){var save=style.outline;style.outline="0 solid black";style.outline=save;}if(name.match(/float/i))name=styleFloat;if(!force&&style&&style[name])ret=style[name];else if(defaultView.getComputedStyle){if(name.match(/float/i))name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle&&!color(elem))ret=computedStyle.getPropertyValue(name);else{var swap=[],stack=[],a=elem,i=0;for(;a&&color(a);a=a.parentNode)stack.unshift(a);for(;i<stack.length;i++)if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block";}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";for(i=0;i<swap.length;i++)if(swap[i]!=null)stack[i].style.display=swap[i];}if(name=="opacity"&&ret=="")ret="1";}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase();});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft;}}return ret;},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)return;if(elem.constructor==Number)elem+='';if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">";});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild);}elem=jQuery.makeArray(div.childNodes);}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)ret.push(elem);else
ret=jQuery.merge(ret,elem);});return ret;},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)return undefined;var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;name=notxml&&jQuery.props[name]||name;if(elem.tagName){var special=/href|src|style/.test(name);if(name=="selected"&&jQuery.browser.safari)elem.parentNode.selectedIndex;if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)throw"type property can't be changed";elem[name]=value;}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name))return elem.getAttributeNode(name).nodeValue;return elem[name];}if(msie&&notxml&&name=="style")return jQuery.attr(elem.style,"cssText",value);if(set)elem.setAttribute(name,""+value);var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr;}if(msie&&name=="opacity"){if(set){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+''=="NaN"?"":"alpha(opacity="+value*100+")");}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+'':"";}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase();});if(set)elem[name]=value;return elem[name];},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"");},makeArray:function(array){var ret=[];if(array!=null){var i=array.length;if(i==null||array.split||array.setInterval||array.call)ret[0]=array;else
while(i)ret[--i]=array[i];}return ret;},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)if(array[i]===elem)return i;return-1;},merge:function(first,second){var i=0,elem,pos=first.length;if(jQuery.browser.msie){while(elem=second[i++])if(elem.nodeType!=8)first[pos++]=elem;}else
while(elem=second[i++])first[pos++]=elem;return first;},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i]);}}}catch(e){ret=array;}return ret;},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++)if(!inv!=!callback(elems[i],i))ret.push(elems[i]);return ret;},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!=null)ret[ret.length]=value;}return ret.concat.apply([],ret);}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});jQuery.each({parent:function(elem){return elem.parentNode;},parents:function(elem){return jQuery.dir(elem,"parentNode");},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret));};});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)jQuery(args[i])[original](this);});};});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)this.removeAttribute(name);},addClass:function(classNames){jQuery.className.add(this,classNames);},removeClass:function(classNames){jQuery.className.remove(this,classNames);},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames);},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this);});if(this.parentNode)this.parentNode.removeChild(this);}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild);}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments);};});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px");};});function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2]);},"#":function(a,i,m){return a.getAttribute("id")==m[2];},":":{lt:function(a,i,m){return i<m[3]-0;},gt:function(a,i,m){return i>m[3]-0;},nth:function(a,i,m){return m[3]-0==i;},eq:function(a,i,m){return m[3]-0==i;},first:function(a,i){return i==0;},last:function(a,i,m,r){return i==r.length-1;},even:function(a,i){return i%2==0;},odd:function(a,i){return i%2;},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a;},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a;},"only-child":function(a){return!jQuery.nth(a.parentNode.lastChild,2,"previousSibling");},parent:function(a){return a.firstChild;},empty:function(a){return!a.firstChild;},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0;},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden";},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden";},enabled:function(a){return!a.disabled;},disabled:function(a){return a.disabled;},checked:function(a){return a.checked;},selected:function(a){return a.selected||jQuery.attr(a,"selected");},text:function(a){return"text"==a.type;},radio:function(a){return"radio"==a.type;},checkbox:function(a){return"checkbox"==a.type;},file:function(a){return"file"==a.type;},password:function(a){return"password"==a.type;},submit:function(a){return"submit"==a.type;},image:function(a){return"image"==a.type;},reset:function(a){return"reset"==a.type;},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button");},input:function(a){return/input|select|textarea|button/i.test(a.nodeName);},has:function(a,i,m){return jQuery.find(m[3],a).length;},header:function(a){return/h\d/i.test(a.nodeName);},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length;}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r);}return cur;},find:function(t,context){if(typeof t!="string")return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)for(var c=ret[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true;}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n);}if(m=="+")break;}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true;}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length);}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]];}else{re2=quickClass;m=re2.exec(t);}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[];}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag));}if(m[1]==".")r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break;}r=tmp;}ret=r;}t=t.replace(re2,"");}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t);}}if(t)ret=[];if(ret&&context==ret[0])ret.shift();done=jQuery.merge(done,ret);return done;},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)tmp.push(r[i]);}return tmp;},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break;}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)tmp.push(a);}r=tmp;}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;merge[id]=true;}var add=false;if(first==0){if(node.nodeIndex==last)add=true;}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)add=true;if(add^not)tmp.push(node);}r=tmp;}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object")fn=fn[m[2]];if(typeof fn=="string")fn=eval("false||function(a,i){return "+fn+";}");r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r);},not);}}return{r:r,t:t};},dir:function(elem,dir){var matched=[],cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)matched.push(cur);cur=cur[dir];}return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])if(cur.nodeType==1&&++num==result)break;return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=elem)r.push(n);}return r;}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)return;if(jQuery.browser.msie&&elem.setInterval)elem=window;if(!handler.guid)handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=this.proxy(fn,function(){return fn.apply(this,arguments);});handler.data=data;}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered)return jQuery.event.handle.apply(arguments.callee.elem,arguments);});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)elem.addEventListener(type,handle,false);else if(elem.attachEvent)elem.attachEvent("on"+type,handle);}}handlers[handler.guid]=handler;jQuery.event.global[type]=true;});elem=null;},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)=="."))for(var type in events)this.remove(elem,type+(types||""));else{if(types.type){handler=types.handler;types=types.type;}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)delete events[type][handler.guid];else
for(handler in events[type])if(!parts[1]||events[type][handler].type==parts[1])delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)elem.detachEvent("on"+type,jQuery.data(elem,"handle"));}ret=null;delete events[type];}}});}for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle");}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true;}if(!elem){if(this.global[type])jQuery("*").add([window,document]).trigger(type,data);}else{if(elem.nodeType==3||elem.nodeType==8)return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});data[0][expando]=true;}data[0].type=type;if(exclusive)data[0].exclusive=true;var handle=jQuery.data(elem,"handle");if(handle)val=handle.apply(elem,data);if((!fn||(jQuery.nodeName(elem,'a')&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)val=false;if(event)data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)val=ret;}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]();}catch(e){}}this.triggered=false;}return val;},handle:function(event){var val,ret,namespace,all,handlers;event=arguments[0]=jQuery.event.fix(event||window.event);namespace=event.type.split(".");event.type=namespace[0];namespace=namespace[1];all=!namespace&&!event.exclusive;handlers=(jQuery.data(this,"events")||{})[event.type];for(var j in handlers){var handler=handlers[j];if(all||handler.type==namespace){event.handler=handler;event.data=handler.data;ret=handler.apply(this,arguments);if(val!==false)val=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}}return val;},fix:function(event){if(event[expando]==true)return event;var originalEvent=event;event={originalEvent:originalEvent};var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");for(var i=props.length;i;i--)event[props[i]]=originalEvent[props[i]];event[expando]=true;event.preventDefault=function(){if(originalEvent.preventDefault)originalEvent.preventDefault();originalEvent.returnValue=false;};event.stopPropagation=function(){if(originalEvent.stopPropagation)originalEvent.stopPropagation();originalEvent.cancelBubble=true;};event.timeStamp=event.timeStamp||now();if(!event.target)event.target=event.srcElement||document;if(event.target.nodeType==3)event.target=event.target.parentNode;if(!event.relatedTarget&&event.fromElement)event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0);}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)event.metaKey=event.ctrlKey;if(!event.which&&event.button)event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event;},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;return proxy;},special:{ready:{setup:function(){bindReady();return;},teardown:function(){return;}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseenter";return jQuery.event.handle.apply(this,arguments);}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseleave";return jQuery.event.handle.apply(this,arguments);}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data);});},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);return(fn||data).apply(this,arguments);});return this.each(function(){jQuery.event.add(this,type,one,fn&&data);});},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn);});},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn);});},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn);},toggle:function(fn){var args=arguments,i=1;while(i<args.length)jQuery.event.proxy(fn,args[i++]);return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;event.preventDefault();return args[this.lastToggle++].apply(this,arguments)||false;}));},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut);},ready:function(fn){bindReady();if(jQuery.isReady)fn.call(document,jQuery);else
jQuery.readyList.push(function(){return fn.call(this,jQuery);});return this;}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document);});jQuery.readyList=null;}jQuery(document).triggerHandler("ready");}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}jQuery.ready();})();if(jQuery.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}jQuery.ready();},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}if(numStyles===undefined)numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}jQuery.ready();})();}jQuery.event.add(window,"load",jQuery.ready);}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode;}catch(error){parent=elem;}return parent==elem;};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind();});jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!='string')return this._load(url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}callback=callback||function(){};var type="GET";if(params)if(jQuery.isFunction(params)){callback=params;params=null;}else{params=jQuery.param(params);type="POST";}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res]);}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val};}):{name:elem.name,value:val};}).get();}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});var jsc=now();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null;}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type});},getScript:function(url,callback){return jQuery.get(url,null,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={};}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type});},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings);},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string")s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?";}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json";}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}if(head)head.removeChild(script);};}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&type=="GET"){var ts=now();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"");}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null;}if(s.global&&!jQuery.active++)jQuery.event.trigger("ajaxStart");var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script);}};}head.appendChild(script);return undefined;}var requestDone=false;var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(s.username)xhr.open(type,s.url,s.async,s.username,s.password);else
xhr.open(type,s.url,s.async);try{if(s.data)xhr.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default);}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;xhr.abort();return false;}if(s.global)jQuery.event.trigger("ajaxSend",[xhr,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null;}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter);}catch(e){status="parsererror";}}if(status=="success"){var modRes;try{modRes=xhr.getResponseHeader("Last-Modified");}catch(e){}if(s.ifModified&&modRes)jQuery.lastModified[s.url]=modRes;if(!jsonp)success();}else
jQuery.handleError(s,xhr,status);complete();if(s.async)xhr=null;}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)setTimeout(function(){if(xhr){xhr.abort();if(!requestDone)onreadystatechange("timeout");}},s.timeout);}try{xhr.send(s.data);}catch(e){jQuery.handleError(s,xhr,null,e);}if(!s.async)onreadystatechange();function success(){if(s.success)s.success(data,status);if(s.global)jQuery.event.trigger("ajaxSuccess",[xhr,s]);}function complete(){if(s.complete)s.complete(xhr,status);if(s.global)jQuery.event.trigger("ajaxComplete",[xhr,s]);if(s.global&&!--jQuery.active)jQuery.event.trigger("ajaxStop");}return xhr;},handleError:function(s,xhr,status,e){if(s.error)s.error(xhr,status,e);if(s.global)jQuery.event.trigger("ajaxError",[xhr,s,e]);},active:0,httpSuccess:function(xhr){try{return!xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(filter)data=filter(data,type);if(type=="script")jQuery.globalEval(data);if(type=="json")data=eval("("+data+")");return data;},param:function(a){var s=[];if(a.constructor==Array||a.jquery)jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value));});else
for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this));});else
s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+");}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove();}}).end();},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none";}).end();},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]();});},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback);},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback);},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback);},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback);},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return opt.complete.call(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow;}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit;}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit);}else
e.custom(start,val,"");}});return true;});},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx";}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this);}});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1);}});if(!gotoEnd)this.dequeue();return this;}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array));}return q;};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this);});};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={};}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block";},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd);}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null;}},13);}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block";}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p]);}if(done)this.options.complete.call(this.elem);return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}return true;}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now;},scrollTop:function(fx){fx.elem.scrollTop=fx.now;},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now);},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit;}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop);}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent;}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode;}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));}results={top:top,left:left};}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true));}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0;}return results;};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}return results;},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent);}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val;}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method];};});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br);};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0);};});})();;

var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'themes': {}, 'locale': {} };

/**
 * Set the variable that indicates if JavaScript behaviors should be applied
 */
Drupal.jsEnabled = document.getElementsByTagName && document.createElement && document.createTextNode && document.documentElement && document.getElementById;

/**
 * Attach all registered behaviors to a page element.
 *
 * Behaviors are event-triggered actions that attach to page elements, enhancing
 * default non-Javascript UIs. Behaviors are registered in the Drupal.behaviors
 * object as follows:
 * @code
 *    Drupal.behaviors.behaviorName = function () {
 *      ...
 *    };
 * @endcode
 *
 * Drupal.attachBehaviors is added below to the jQuery ready event and so
 * runs on initial page load. Developers implementing AHAH/AJAX in their
 * solutions should also call this function after new page content has been
 * loaded, feeding in an element to be processed, in order to attach all
 * behaviors to the new content.
 *
 * Behaviors should use a class in the form behaviorName-processed to ensure
 * the behavior is attached only once to a given element. (Doing so enables
 * the reprocessing of given elements, which may be needed on occasion despite
 * the ability to limit behavior attachment to a particular element.)
 *
 * @param context
 *   An element to attach behaviors to. If none is given, the document element
 *   is used.
 */
Drupal.attachBehaviors = function(context) {
  context = context || document;
  if (Drupal.jsEnabled) {
    // Execute all of them.
    jQuery.each(Drupal.behaviors, function() {
      this(context);
    });
  }
};

/**
 * Encode special characters in a plain-text string for display as HTML.
 */
Drupal.checkPlain = function(str) {
  str = String(str);
  var replace = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
  for (var character in replace) {
    var regex = new RegExp(character, 'g');
    str = str.replace(regex, replace[character]);
  }
  return str;
};

/**
 * Translate strings to the page language or a given language.
 *
 * See the documentation of the server-side t() function for further details.
 *
 * @param str
 *   A string containing the English string to translate.
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 * @return
 *   The translated string.
 */
Drupal.t = function(str, args) {
  // Fetch the localized version of the string.
  if (Drupal.locale.strings && Drupal.locale.strings[str]) {
    str = Drupal.locale.strings[str];
  }

  if (args) {
    // Transform arguments before inserting them
    for (var key in args) {
      switch (key.charAt(0)) {
        // Escaped only
        case '@':
          args[key] = Drupal.checkPlain(args[key]);
        break;
        // Pass-through
        case '!':
          break;
        // Escaped and placeholder
        case '%':
        default:
          args[key] = Drupal.theme('placeholder', args[key]);
          break;
      }
      str = str.replace(key, args[key]);
    }
  }
  return str;
};

/**
 * Format a string containing a count of items.
 *
 * This function ensures that the string is pluralized correctly. Since Drupal.t() is
 * called by this function, make sure not to pass already-localized strings to it.
 *
 * See the documentation of the server-side format_plural() function for further details.
 *
 * @param count
 *   The item count to display.
 * @param singular
 *   The string for the singular case. Please make sure it is clear this is
 *   singular, to ease translation (e.g. use "1 new comment" instead of "1 new").
 *   Do not use @count in the singular string.
 * @param plural
 *   The string for the plural case. Please make sure it is clear this is plural,
 *   to ease translation. Use @count in place of the item count, as in "@count
 *   new comments".
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   Based on the first character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 *   Note that you do not need to include @count in this array.
 *   This replacement is done automatically for the plural case.
 * @return
 *   A translated string.
 */
Drupal.formatPlural = function(count, singular, plural, args) {
  var args = args || {};
  args['@count'] = count;
  // Determine the index of the plural form.
  var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : ((args['@count'] == 1) ? 0 : 1);

  if (index == 0) {
    return Drupal.t(singular, args);
  }
  else if (index == 1) {
    return Drupal.t(plural, args);
  }
  else {
    args['@count['+ index +']'] = args['@count'];
    delete args['@count'];
    return Drupal.t(plural.replace('@count', '@count['+ index +']'));
  }
};

/**
 * Generate the themed representation of a Drupal object.
 *
 * All requests for themed output must go through this function. It examines
 * the request and routes it to the appropriate theme function. If the current
 * theme does not provide an override function, the generic theme function is
 * called.
 *
 * For example, to retrieve the HTML that is output by theme_placeholder(text),
 * call Drupal.theme('placeholder', text).
 *
 * @param func
 *   The name of the theme function to call.
 * @param ...
 *   Additional arguments to pass along to the theme function.
 * @return
 *   Any data the theme function returns. This could be a plain HTML string,
 *   but also a complex object.
 */
Drupal.theme = function(func) {
  for (var i = 1, args = []; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args);
};

/**
 * Parse a JSON response.
 *
 * The result is either the JSON object, or an object with 'status' 0 and 'data' an error message.
 */
Drupal.parseJson = function (data) {
  if ((data.substring(0, 1) != '{') && (data.substring(0, 1) != '[')) {
    return { status: 0, data: data.length ? data : Drupal.t('Unspecified error') };
  }
  return eval('(' + data + ');');
};

/**
 * Freeze the current body height (as minimum height). Used to prevent
 * unnecessary upwards scrolling when doing DOM manipulations.
 */
Drupal.freezeHeight = function () {
  Drupal.unfreezeHeight();
  var div = document.createElement('div');
  $(div).css({
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '1px',
    height: $('body').css('height')
  }).attr('id', 'freeze-height');
  $('body').append(div);
};

/**
 * Unfreeze the body height
 */
Drupal.unfreezeHeight = function () {
  $('#freeze-height').remove();
};

/**
 * Wrapper around encodeURIComponent() which avoids Apache quirks (equivalent of
 * drupal_urlencode() in PHP). This function should only be used on paths, not
 * on query string arguments.
 */
Drupal.encodeURIComponent = function (item, uri) {
  uri = uri || location.href;
  item = encodeURIComponent(item).replace(/%2F/g, '/');
  return (uri.indexOf('?q=') != -1) ? item : item.replace(/%26/g, '%2526').replace(/%23/g, '%2523').replace(/\/\//g, '/%252F');
};

/**
 * Get the text selection in a textarea.
 */
Drupal.getSelection = function (element) {
  if (typeof(element.selectionStart) != 'number' && document.selection) {
    // The current selection
    var range1 = document.selection.createRange();
    var range2 = range1.duplicate();
    // Select all text.
    range2.moveToElementText(element);
    // Now move 'dummy' end point to end point of original range.
    range2.setEndPoint('EndToEnd', range1);
    // Now we can calculate start and end points.
    var start = range2.text.length - range1.text.length;
    var end = start + range1.text.length;
    return { 'start': start, 'end': end };
  }
  return { 'start': element.selectionStart, 'end': element.selectionEnd };
};

/**
 * Build an error message from ahah response.
 */
Drupal.ahahError = function(xmlhttp, uri) {
  if (xmlhttp.status == 200) {
    if (jQuery.trim($(xmlhttp.responseText).text())) {
      var message = Drupal.t("An error occurred. \n@uri\n@text", {'@uri': uri, '@text': xmlhttp.responseText });
    }
    else {
      var message = Drupal.t("An error occurred. \n@uri\n(no information available).", {'@uri': uri, '@text': xmlhttp.responseText });
    }
  }
  else {
    var message = Drupal.t("An HTTP error @status occurred. \n@uri", {'@uri': uri, '@status': xmlhttp.status });
  }
  return message;
}

// Global Killswitch on the <html> element
if (Drupal.jsEnabled) {
  // Global Killswitch on the <html> element
  $(document.documentElement).addClass('js');
  // 'js enabled' cookie
  document.cookie = 'has_js=1; path=/';
  // Attach all behaviors.
  $(document).ready(function() {
    Drupal.attachBehaviors(this);
  });
}

/**
 * The default themes.
 */
Drupal.theme.prototype = {

  /**
   * Formats text for emphasized display in a placeholder inside a sentence.
   *
   * @param str
   *   The text to format (plain-text).
   * @return
   *   The formatted text (html).
   */
  placeholder: function(str) {
    return '<em>' + Drupal.checkPlain(str) + '</em>';
  }
};
;
// $Id: og.js,v 1.9.2.3 2010/01/24 14:44:56 amitaibu Exp $

// Content type form
Drupal.behaviors.og_content_type = function() {
  // Disable the group limit textarea if the content type is not a standard group post
  $('input[name="og_content_type_usage"]').click(function(){
    if (!$('#edit-og-content-type-usage-group-post-standard').attr('checked')) {
      $('#edit-og-max-groups').attr('disabled','disabled');
    } else {
      $('#edit-og-max-groups').removeAttr('disabled');
    }
  });
  
  // Initial check to see if content type is standard group post
  if (!$('#edit-og-content-type-usage-group-post-standard').attr('checked')) {
    $('#edit-og-max-groups').attr('disabled','disabled');
  };
}


Drupal.verticalTabs = Drupal.verticalTabs || {};

Drupal.verticalTabs.og_nodeapi = function() {
  var values = [];
  $('.vertical-tabs-og_nodeapi #edit-og-groups :selected')
    .each(function (i, selected) {
      values[i] = $(selected).text();
    });

  return values.join(', ');
}

Drupal.verticalTabs.og = function() {
  var type = $('.vertical-tabs-og input[type=radio]:checked').val();
  
  switch (type) {
    case 'group':
      return Drupal.t('Group node');
      break;
      
    case 'omitted':
      return Drupal.t('May not be posted into a group.');
      break;
      
    case 'group_post_standard':
      return Drupal.t('Standard group post');
      break;
      
    case 'group_post_wiki':
      return Drupal.t('Wiki group post');
      break;
  }
}
;
// $Id$

/**
 * @file
 * OM Maximenu script
 *
 * @author: Daniel Honrade http://drupal.org/user/351112
 *
 */
  
$(document).ready(function(){
	//back to top scroll function. Any link with a hash (#) will scroll to that id on the page
	$('.om-maximenu li.om-leaf a').addClass('om-autoscroll');

	$('a.om-autoscroll[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
			  var targetOffset = $target.offset().top;
				  //targetOffset = targetOffset - 90;
				$('html,body').animate({scrollTop: targetOffset - 0}, 500);
				return false;
			}
		}
	});
	// stay open
	$('.om-maximenu-open input').each(function() {
		//alert($(this).attr('checked'));
		// jQuery 1.7 has changed it's value checking for checkbox to checked instead of true
	  if(($(this).attr('checked') == true) || ($(this).attr('checked') == 'checked')) {
	    $(this).parent().parent().addClass('open');
	    $(this).parent().parent().parent().addClass('open');			
	    $(this).parent().parent().removeClass('closed');
	  }
	  else {
	    $(this).parent().parent().removeClass('open');
	    $(this).parent().parent().parent().removeClass('open');			
	    $(this).parent().parent().addClass('closed');
	  }
	});
	$('.om-maximenu-open input').click(function() {
		//alert($(this).attr('checked'));
	  if(($(this).attr('checked') == true) || ($(this).attr('checked') == 'checked')) {
	    $(this).parent().parent().addClass('open');
	    $(this).parent().parent().parent().addClass('open');			
	    $(this).parent().parent().removeClass('closed');
	  }
	  else {
	    $(this).parent().parent().removeClass('open');
	    $(this).parent().parent().parent().removeClass('open');			
	    $(this).parent().parent().addClass('closed');
	  }
	});	
	// image hover replacement
  $('.om-maximenu img.om-hover').hover(function () {
    var src = $(this).attr('src');
    var altsrc = src.replace(/([^.]+)(\.[^.]+$)/, '$1_hover$2');
    $(this).attr({ src: altsrc, altsrc: src });
  },function () {
    var src = $(this).attr('src');
    var altsrc = src.replace(/_hover/, '');
    $(this).attr({ src: altsrc, altsrc: src });
  });
});	
;
/*
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.88 (08-JUN-2010)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.2.6 or later
 */
(function($){var ver="2.88";if($.support==undefined){$.support={opacity:!($.browser.msie)};}function debug(s){if($.fn.cycle.debug){log(s);}}function log(){if(window.console&&window.console.log){window.console.log("[cycle] "+Array.prototype.join.call(arguments," "));}}$.fn.cycle=function(options,arg2){var o={s:this.selector,c:this.context};if(this.length===0&&options!="stop"){if(!$.isReady&&o.s){log("DOM not ready, queuing slideshow");$(function(){$(o.s,o.c).cycle(options,arg2);});return this;}log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));return this;}return this.each(function(){var opts=handleArguments(this,options,arg2);if(opts===false){return;}opts.updateActivePagerLink=opts.updateActivePagerLink||$.fn.cycle.updateActivePagerLink;if(this.cycleTimeout){clearTimeout(this.cycleTimeout);}this.cycleTimeout=this.cyclePause=0;var $cont=$(this);var $slides=opts.slideExpr?$(opts.slideExpr,this):$cont.children();var els=$slides.get();if(els.length<2){log("terminating; too few slides: "+els.length);return;}var opts2=buildOptions($cont,$slides,els,opts,o);if(opts2===false){return;}var startTime=opts2.continuous?10:getTimeout(els[opts2.currSlide],els[opts2.nextSlide],opts2,!opts2.rev);if(startTime){startTime+=(opts2.delay||0);if(startTime<10){startTime=10;}debug("first timeout: "+startTime);this.cycleTimeout=setTimeout(function(){go(els,opts2,0,(!opts2.rev&&!opts.backwards));},startTime);}});};function handleArguments(cont,options,arg2){if(cont.cycleStop==undefined){cont.cycleStop=0;}if(options===undefined||options===null){options={};}if(options.constructor==String){switch(options){case"destroy":case"stop":var opts=$(cont).data("cycle.opts");if(!opts){return false;}cont.cycleStop++;if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);}cont.cycleTimeout=0;$(cont).removeData("cycle.opts");if(options=="destroy"){destroy(opts);}return false;case"toggle":cont.cyclePause=(cont.cyclePause===1)?0:1;checkInstantResume(cont.cyclePause,arg2,cont);return false;case"pause":cont.cyclePause=1;return false;case"resume":cont.cyclePause=0;checkInstantResume(false,arg2,cont);return false;case"prev":case"next":var opts=$(cont).data("cycle.opts");if(!opts){log('options not found, "prev/next" ignored');return false;}$.fn.cycle[options](opts);return false;default:options={fx:options};}return options;}else{if(options.constructor==Number){var num=options;options=$(cont).data("cycle.opts");if(!options){log("options not found, can not advance slide");return false;}if(num<0||num>=options.elements.length){log("invalid slide index: "+num);return false;}options.nextSlide=num;if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;}if(typeof arg2=="string"){options.oneTimeFx=arg2;}go(options.elements,options,1,num>=options.currSlide);return false;}}return options;function checkInstantResume(isPaused,arg2,cont){if(!isPaused&&arg2===true){var options=$(cont).data("cycle.opts");if(!options){log("options not found, can not resume");return false;}if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;}go(options.elements,options,1,(!opts.rev&&!opts.backwards));}}}function removeFilter(el,opts){if(!$.support.opacity&&opts.cleartype&&el.style.filter){try{el.style.removeAttribute("filter");}catch(smother){}}}function destroy(opts){if(opts.next){$(opts.next).unbind(opts.prevNextEvent);}if(opts.prev){$(opts.prev).unbind(opts.prevNextEvent);}if(opts.pager||opts.pagerAnchorBuilder){$.each(opts.pagerAnchors||[],function(){this.unbind().remove();});}opts.pagerAnchors=null;if(opts.destroy){opts.destroy(opts);}}function buildOptions($cont,$slides,els,options,o){var opts=$.extend({},$.fn.cycle.defaults,options||{},$.metadata?$cont.metadata():$.meta?$cont.data():{});if(opts.autostop){opts.countdown=opts.autostopCount||els.length;}var cont=$cont[0];$cont.data("cycle.opts",opts);opts.$cont=$cont;opts.stopCount=cont.cycleStop;opts.elements=els;opts.before=opts.before?[opts.before]:[];opts.after=opts.after?[opts.after]:[];opts.after.unshift(function(){opts.busy=0;});if(!$.support.opacity&&opts.cleartype){opts.after.push(function(){removeFilter(this,opts);});}if(opts.continuous){opts.after.push(function(){go(els,opts,0,(!opts.rev&&!opts.backwards));});}saveOriginalOpts(opts);if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg){clearTypeFix($slides);}if($cont.css("position")=="static"){$cont.css("position","relative");}if(opts.width){$cont.width(opts.width);}if(opts.height&&opts.height!="auto"){$cont.height(opts.height);}if(opts.startingSlide){opts.startingSlide=parseInt(opts.startingSlide);}else{if(opts.backwards){opts.startingSlide=els.length-1;}}if(opts.random){opts.randomMap=[];for(var i=0;i<els.length;i++){opts.randomMap.push(i);}opts.randomMap.sort(function(a,b){return Math.random()-0.5;});opts.randomIndex=1;opts.startingSlide=opts.randomMap[1];}else{if(opts.startingSlide>=els.length){opts.startingSlide=0;}}opts.currSlide=opts.startingSlide||0;var first=opts.startingSlide;$slides.css({position:"absolute",top:0,left:0}).hide().each(function(i){var z;if(opts.backwards){z=first?i<=first?els.length+(i-first):first-i:els.length-i;}else{z=first?i>=first?els.length-(i-first):first-i:els.length-i;}$(this).css("z-index",z);});$(els[first]).css("opacity",1).show();removeFilter(els[first],opts);if(opts.fit&&opts.width){$slides.width(opts.width);}if(opts.fit&&opts.height&&opts.height!="auto"){$slides.height(opts.height);}var reshape=opts.containerResize&&!$cont.innerHeight();if(reshape){var maxw=0,maxh=0;for(var j=0;j<els.length;j++){var $e=$(els[j]),e=$e[0],w=$e.outerWidth(),h=$e.outerHeight();if(!w){w=e.offsetWidth||e.width||$e.attr("width");}if(!h){h=e.offsetHeight||e.height||$e.attr("height");}maxw=w>maxw?w:maxw;maxh=h>maxh?h:maxh;}if(maxw>0&&maxh>0){$cont.css({width:maxw+"px",height:maxh+"px"});}}if(opts.pause){$cont.hover(function(){this.cyclePause++;},function(){this.cyclePause--;});}if(supportMultiTransitions(opts)===false){return false;}var requeue=false;options.requeueAttempts=options.requeueAttempts||0;$slides.each(function(){var $el=$(this);this.cycleH=(opts.fit&&opts.height)?opts.height:($el.height()||this.offsetHeight||this.height||$el.attr("height")||0);this.cycleW=(opts.fit&&opts.width)?opts.width:($el.width()||this.offsetWidth||this.width||$el.attr("width")||0);if($el.is("img")){var loadingIE=($.browser.msie&&this.cycleW==28&&this.cycleH==30&&!this.complete);var loadingFF=($.browser.mozilla&&this.cycleW==34&&this.cycleH==19&&!this.complete);var loadingOp=($.browser.opera&&((this.cycleW==42&&this.cycleH==19)||(this.cycleW==37&&this.cycleH==17))&&!this.complete);var loadingOther=(this.cycleH==0&&this.cycleW==0&&!this.complete);if(loadingIE||loadingFF||loadingOp||loadingOther){if(o.s&&opts.requeueOnImageNotLoaded&&++options.requeueAttempts<100){log(options.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH);setTimeout(function(){$(o.s,o.c).cycle(options);},opts.requeueTimeout);requeue=true;return false;}else{log("could not determine size of image: "+this.src,this.cycleW,this.cycleH);}}}return true;});if(requeue){return false;}opts.cssBefore=opts.cssBefore||{};opts.animIn=opts.animIn||{};opts.animOut=opts.animOut||{};$slides.not(":eq("+first+")").css(opts.cssBefore);if(opts.cssFirst){$($slides[first]).css(opts.cssFirst);}if(opts.timeout){opts.timeout=parseInt(opts.timeout);if(opts.speed.constructor==String){opts.speed=$.fx.speeds[opts.speed]||parseInt(opts.speed);}if(!opts.sync){opts.speed=opts.speed/2;}var buffer=opts.fx=="shuffle"?500:250;while((opts.timeout-opts.speed)<buffer){opts.timeout+=opts.speed;}}if(opts.easing){opts.easeIn=opts.easeOut=opts.easing;}if(!opts.speedIn){opts.speedIn=opts.speed;}if(!opts.speedOut){opts.speedOut=opts.speed;}opts.slideCount=els.length;opts.currSlide=opts.lastSlide=first;if(opts.random){if(++opts.randomIndex==els.length){opts.randomIndex=0;}opts.nextSlide=opts.randomMap[opts.randomIndex];}else{if(opts.backwards){opts.nextSlide=opts.startingSlide==0?(els.length-1):opts.startingSlide-1;}else{opts.nextSlide=opts.startingSlide>=(els.length-1)?0:opts.startingSlide+1;}}if(!opts.multiFx){var init=$.fn.cycle.transitions[opts.fx];if($.isFunction(init)){init($cont,$slides,opts);}else{if(opts.fx!="custom"&&!opts.multiFx){log("unknown transition: "+opts.fx,"; slideshow terminating");return false;}}}var e0=$slides[first];if(opts.before.length){opts.before[0].apply(e0,[e0,e0,opts,true]);}if(opts.after.length>1){opts.after[1].apply(e0,[e0,e0,opts,true]);}if(opts.next){$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,opts.rev?-1:1);});}if(opts.prev){$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,opts.rev?1:-1);});}if(opts.pager||opts.pagerAnchorBuilder){buildPager(els,opts);}exposeAddSlide(opts,els);return opts;}function saveOriginalOpts(opts){opts.original={before:[],after:[]};opts.original.cssBefore=$.extend({},opts.cssBefore);opts.original.cssAfter=$.extend({},opts.cssAfter);opts.original.animIn=$.extend({},opts.animIn);opts.original.animOut=$.extend({},opts.animOut);$.each(opts.before,function(){opts.original.before.push(this);});$.each(opts.after,function(){opts.original.after.push(this);});}function supportMultiTransitions(opts){var i,tx,txs=$.fn.cycle.transitions;if(opts.fx.indexOf(",")>0){opts.multiFx=true;opts.fxs=opts.fx.replace(/\s*/g,"").split(",");for(i=0;i<opts.fxs.length;i++){var fx=opts.fxs[i];tx=txs[fx];if(!tx||!txs.hasOwnProperty(fx)||!$.isFunction(tx)){log("discarding unknown transition: ",fx);opts.fxs.splice(i,1);i--;}}if(!opts.fxs.length){log("No valid transitions named; slideshow terminating.");return false;}}else{if(opts.fx=="all"){opts.multiFx=true;opts.fxs=[];for(p in txs){tx=txs[p];if(txs.hasOwnProperty(p)&&$.isFunction(tx)){opts.fxs.push(p);}}}}if(opts.multiFx&&opts.randomizeEffects){var r1=Math.floor(Math.random()*20)+30;for(i=0;i<r1;i++){var r2=Math.floor(Math.random()*opts.fxs.length);opts.fxs.push(opts.fxs.splice(r2,1)[0]);}debug("randomized fx sequence: ",opts.fxs);}return true;}function exposeAddSlide(opts,els){opts.addSlide=function(newSlide,prepend){var $s=$(newSlide),s=$s[0];if(!opts.autostopCount){opts.countdown++;}els[prepend?"unshift":"push"](s);if(opts.els){opts.els[prepend?"unshift":"push"](s);}opts.slideCount=els.length;$s.css("position","absolute");$s[prepend?"prependTo":"appendTo"](opts.$cont);if(prepend){opts.currSlide++;opts.nextSlide++;}if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg){clearTypeFix($s);}if(opts.fit&&opts.width){$s.width(opts.width);}if(opts.fit&&opts.height&&opts.height!="auto"){$slides.height(opts.height);}s.cycleH=(opts.fit&&opts.height)?opts.height:$s.height();s.cycleW=(opts.fit&&opts.width)?opts.width:$s.width();$s.css(opts.cssBefore);if(opts.pager||opts.pagerAnchorBuilder){$.fn.cycle.createPagerAnchor(els.length-1,s,$(opts.pager),els,opts);}if($.isFunction(opts.onAddSlide)){opts.onAddSlide($s);}else{$s.hide();}};}$.fn.cycle.resetState=function(opts,fx){fx=fx||opts.fx;opts.before=[];opts.after=[];opts.cssBefore=$.extend({},opts.original.cssBefore);opts.cssAfter=$.extend({},opts.original.cssAfter);opts.animIn=$.extend({},opts.original.animIn);opts.animOut=$.extend({},opts.original.animOut);opts.fxFn=null;$.each(opts.original.before,function(){opts.before.push(this);});$.each(opts.original.after,function(){opts.after.push(this);});var init=$.fn.cycle.transitions[fx];if($.isFunction(init)){init(opts.$cont,$(opts.elements),opts);}};function go(els,opts,manual,fwd){if(manual&&opts.busy&&opts.manualTrump){debug("manualTrump in go(), stopping active transition");$(els).stop(true,true);opts.busy=false;}if(opts.busy){debug("transition active, ignoring new tx request");return;}var p=opts.$cont[0],curr=els[opts.currSlide],next=els[opts.nextSlide];if(p.cycleStop!=opts.stopCount||p.cycleTimeout===0&&!manual){return;}if(!manual&&!p.cyclePause&&!opts.bounce&&((opts.autostop&&(--opts.countdown<=0))||(opts.nowrap&&!opts.random&&opts.nextSlide<opts.currSlide))){if(opts.end){opts.end(opts);}return;}var changed=false;if((manual||!p.cyclePause)&&(opts.nextSlide!=opts.currSlide)){changed=true;var fx=opts.fx;curr.cycleH=curr.cycleH||$(curr).height();curr.cycleW=curr.cycleW||$(curr).width();next.cycleH=next.cycleH||$(next).height();next.cycleW=next.cycleW||$(next).width();if(opts.multiFx){if(opts.lastFx==undefined||++opts.lastFx>=opts.fxs.length){opts.lastFx=0;}fx=opts.fxs[opts.lastFx];opts.currFx=fx;}if(opts.oneTimeFx){fx=opts.oneTimeFx;opts.oneTimeFx=null;}$.fn.cycle.resetState(opts,fx);if(opts.before.length){$.each(opts.before,function(i,o){if(p.cycleStop!=opts.stopCount){return;}o.apply(next,[curr,next,opts,fwd]);});}var after=function(){$.each(opts.after,function(i,o){if(p.cycleStop!=opts.stopCount){return;}o.apply(next,[curr,next,opts,fwd]);});};debug("tx firing; currSlide: "+opts.currSlide+"; nextSlide: "+opts.nextSlide);opts.busy=1;if(opts.fxFn){opts.fxFn(curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}else{if($.isFunction($.fn.cycle[opts.fx])){$.fn.cycle[opts.fx](curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}else{$.fn.cycle.custom(curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}}}if(changed||opts.nextSlide==opts.currSlide){opts.lastSlide=opts.currSlide;if(opts.random){opts.currSlide=opts.nextSlide;if(++opts.randomIndex==els.length){opts.randomIndex=0;}opts.nextSlide=opts.randomMap[opts.randomIndex];if(opts.nextSlide==opts.currSlide){opts.nextSlide=(opts.currSlide==opts.slideCount-1)?0:opts.currSlide+1;}}else{if(opts.backwards){var roll=(opts.nextSlide-1)<0;if(roll&&opts.bounce){opts.backwards=!opts.backwards;opts.nextSlide=1;opts.currSlide=0;}else{opts.nextSlide=roll?(els.length-1):opts.nextSlide-1;opts.currSlide=roll?0:opts.nextSlide+1;}}else{var roll=(opts.nextSlide+1)==els.length;if(roll&&opts.bounce){opts.backwards=!opts.backwards;opts.nextSlide=els.length-2;opts.currSlide=els.length-1;}else{opts.nextSlide=roll?0:opts.nextSlide+1;opts.currSlide=roll?els.length-1:opts.nextSlide-1;}}}}if(changed&&opts.pager){opts.updateActivePagerLink(opts.pager,opts.currSlide,opts.activePagerClass);}var ms=0;if(opts.timeout&&!opts.continuous){ms=getTimeout(els[opts.currSlide],els[opts.nextSlide],opts,fwd);}else{if(opts.continuous&&p.cyclePause){ms=10;}}if(ms>0){p.cycleTimeout=setTimeout(function(){go(els,opts,0,(!opts.rev&&!opts.backwards));},ms);}}$.fn.cycle.updateActivePagerLink=function(pager,currSlide,clsName){$(pager).each(function(){$(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);});};function getTimeout(curr,next,opts,fwd){if(opts.timeoutFn){var t=opts.timeoutFn.call(curr,curr,next,opts,fwd);while((t-opts.speed)<250){t+=opts.speed;}debug("calculated timeout: "+t+"; speed: "+opts.speed);if(t!==false){return t;}}return opts.timeout;}$.fn.cycle.next=function(opts){advance(opts,opts.rev?-1:1);};$.fn.cycle.prev=function(opts){advance(opts,opts.rev?1:-1);};function advance(opts,val){var els=opts.elements;var p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}if(opts.random&&val<0){opts.randomIndex--;if(--opts.randomIndex==-2){opts.randomIndex=els.length-2;}else{if(opts.randomIndex==-1){opts.randomIndex=els.length-1;}}opts.nextSlide=opts.randomMap[opts.randomIndex];}else{if(opts.random){opts.nextSlide=opts.randomMap[opts.randomIndex];}else{opts.nextSlide=opts.currSlide+val;if(opts.nextSlide<0){if(opts.nowrap){return false;}opts.nextSlide=els.length-1;}else{if(opts.nextSlide>=els.length){if(opts.nowrap){return false;}opts.nextSlide=0;}}}}var cb=opts.onPrevNextEvent||opts.prevNextClick;if($.isFunction(cb)){cb(val>0,opts.nextSlide,els[opts.nextSlide]);}go(els,opts,1,val>=0);return false;}function buildPager(els,opts){var $p=$(opts.pager);$.each(els,function(i,o){$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);});opts.updateActivePagerLink(opts.pager,opts.startingSlide,opts.activePagerClass);}$.fn.cycle.createPagerAnchor=function(i,el,$p,els,opts){var a;if($.isFunction(opts.pagerAnchorBuilder)){a=opts.pagerAnchorBuilder(i,el);debug("pagerAnchorBuilder("+i+", el) returned: "+a);}else{a='<a href="#">'+(i+1)+"</a>";}if(!a){return;}var $a=$(a);if($a.parents("body").length===0){var arr=[];if($p.length>1){$p.each(function(){var $clone=$a.clone(true);$(this).append($clone);arr.push($clone[0]);});$a=$(arr);}else{$a.appendTo($p);}}opts.pagerAnchors=opts.pagerAnchors||[];opts.pagerAnchors.push($a);$a.bind(opts.pagerEvent,function(e){e.preventDefault();opts.nextSlide=i;var p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}var cb=opts.onPagerEvent||opts.pagerClick;if($.isFunction(cb)){cb(opts.nextSlide,els[opts.nextSlide]);}go(els,opts,1,opts.currSlide<i);});if(!/^click/.test(opts.pagerEvent)&&!opts.allowPagerClickBubble){$a.bind("click.cycle",function(){return false;});}if(opts.pauseOnPagerHover){$a.hover(function(){opts.$cont[0].cyclePause++;},function(){opts.$cont[0].cyclePause--;});}};$.fn.cycle.hopsFromLast=function(opts,fwd){var hops,l=opts.lastSlide,c=opts.currSlide;if(fwd){hops=c>l?c-l:opts.slideCount-l;}else{hops=c<l?l-c:l+opts.slideCount-c;}return hops;};function clearTypeFix($slides){debug("applying clearType background-color hack");function hex(s){s=parseInt(s).toString(16);return s.length<2?"0"+s:s;}function getBg(e){for(;e&&e.nodeName.toLowerCase()!="html";e=e.parentNode){var v=$.css(e,"background-color");if(v.indexOf("rgb")>=0){var rgb=v.match(/\d+/g);return"#"+hex(rgb[0])+hex(rgb[1])+hex(rgb[2]);}if(v&&v!="transparent"){return v;}}return"#ffffff";}$slides.each(function(){$(this).css("background-color",getBg(this));});}$.fn.cycle.commonReset=function(curr,next,opts,w,h,rev){$(opts.elements).not(curr).hide();opts.cssBefore.opacity=1;opts.cssBefore.display="block";if(w!==false&&next.cycleW>0){opts.cssBefore.width=next.cycleW;}if(h!==false&&next.cycleH>0){opts.cssBefore.height=next.cycleH;}opts.cssAfter=opts.cssAfter||{};opts.cssAfter.display="none";$(curr).css("zIndex",opts.slideCount+(rev===true?1:0));$(next).css("zIndex",opts.slideCount+(rev===true?0:1));};$.fn.cycle.custom=function(curr,next,opts,cb,fwd,speedOverride){var $l=$(curr),$n=$(next);var speedIn=opts.speedIn,speedOut=opts.speedOut,easeIn=opts.easeIn,easeOut=opts.easeOut;$n.css(opts.cssBefore);if(speedOverride){if(typeof speedOverride=="number"){speedIn=speedOut=speedOverride;}else{speedIn=speedOut=1;}easeIn=easeOut=null;}var fn=function(){$n.animate(opts.animIn,speedIn,easeIn,cb);};$l.animate(opts.animOut,speedOut,easeOut,function(){if(opts.cssAfter){$l.css(opts.cssAfter);}if(!opts.sync){fn();}});if(opts.sync){fn();}};$.fn.cycle.transitions={fade:function($cont,$slides,opts){$slides.not(":eq("+opts.currSlide+")").css("opacity",0);opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.opacity=0;});opts.animIn={opacity:1};opts.animOut={opacity:0};opts.cssBefore={top:0,left:0};}};$.fn.cycle.ver=function(){return ver;};$.fn.cycle.defaults={fx:"fade",timeout:4000,timeoutFn:null,continuous:0,speed:1000,speedIn:null,speedOut:null,next:null,prev:null,onPrevNextEvent:null,prevNextEvent:"click.cycle",pager:null,onPagerEvent:null,pagerEvent:"click.cycle",allowPagerClickBubble:false,pagerAnchorBuilder:null,before:null,after:null,end:null,easing:null,easeIn:null,easeOut:null,shuffle:null,animIn:null,animOut:null,cssBefore:null,cssAfter:null,fxFn:null,height:"auto",startingSlide:0,sync:1,random:0,fit:0,containerResize:1,pause:0,pauseOnPagerHover:0,autostop:0,autostopCount:0,delay:0,slideExpr:null,cleartype:!$.support.opacity,cleartypeNoBg:false,nowrap:0,fastOnEvent:0,randomizeEffects:1,rev:0,manualTrump:true,requeueOnImageNotLoaded:true,requeueTimeout:250,activePagerClass:"activeSlide",updateActivePagerLink:null,backwards:false};})(jQuery);
/*
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.72
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($){$.fn.cycle.transitions.none=function($cont,$slides,opts){opts.fxFn=function(curr,next,opts,after){$(next).show();$(curr).hide();after();};};$.fn.cycle.transitions.scrollUp=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var h=$cont.height();opts.cssBefore={top:h,left:0};opts.cssFirst={top:0};opts.animIn={top:0};opts.animOut={top:-h};};$.fn.cycle.transitions.scrollDown=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var h=$cont.height();opts.cssFirst={top:0};opts.cssBefore={top:-h,left:0};opts.animIn={top:0};opts.animOut={top:h};};$.fn.cycle.transitions.scrollLeft=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var w=$cont.width();opts.cssFirst={left:0};opts.cssBefore={left:w,top:0};opts.animIn={left:0};opts.animOut={left:0-w};};$.fn.cycle.transitions.scrollRight=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var w=$cont.width();opts.cssFirst={left:0};opts.cssBefore={left:-w,top:0};opts.animIn={left:0};opts.animOut={left:w};};$.fn.cycle.transitions.scrollHorz=function($cont,$slides,opts){$cont.css("overflow","hidden").width();opts.before.push(function(curr,next,opts,fwd){$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.left=fwd?(next.cycleW-1):(1-next.cycleW);opts.animOut.left=fwd?-curr.cycleW:curr.cycleW;});opts.cssFirst={left:0};opts.cssBefore={top:0};opts.animIn={left:0};opts.animOut={top:0};};$.fn.cycle.transitions.scrollVert=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push(function(curr,next,opts,fwd){$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.top=fwd?(1-next.cycleH):(next.cycleH-1);opts.animOut.top=fwd?curr.cycleH:-curr.cycleH;});opts.cssFirst={top:0};opts.cssBefore={left:0};opts.animIn={top:0};opts.animOut={left:0};};$.fn.cycle.transitions.slideX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(opts.elements).not(curr).hide();$.fn.cycle.commonReset(curr,next,opts,false,true);opts.animIn.width=next.cycleW;});opts.cssBefore={left:0,top:0,width:0};opts.animIn={width:"show"};opts.animOut={width:0};};$.fn.cycle.transitions.slideY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(opts.elements).not(curr).hide();$.fn.cycle.commonReset(curr,next,opts,true,false);opts.animIn.height=next.cycleH;});opts.cssBefore={left:0,top:0,height:0};opts.animIn={height:"show"};opts.animOut={height:0};};$.fn.cycle.transitions.shuffle=function($cont,$slides,opts){var i,w=$cont.css("overflow","visible").width();$slides.css({left:0,top:0});opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);});if(!opts.speedAdjusted){opts.speed=opts.speed/2;opts.speedAdjusted=true;}opts.random=0;opts.shuffle=opts.shuffle||{left:-w,top:15};opts.els=[];for(i=0;i<$slides.length;i++){opts.els.push($slides[i]);}for(i=0;i<opts.currSlide;i++){opts.els.push(opts.els.shift());}opts.fxFn=function(curr,next,opts,cb,fwd){var $el=fwd?$(curr):$(next);$(next).css(opts.cssBefore);var count=opts.slideCount;$el.animate(opts.shuffle,opts.speedIn,opts.easeIn,function(){var hops=$.fn.cycle.hopsFromLast(opts,fwd);for(var k=0;k<hops;k++){fwd?opts.els.push(opts.els.shift()):opts.els.unshift(opts.els.pop());}if(fwd){for(var i=0,len=opts.els.length;i<len;i++){$(opts.els[i]).css("z-index",len-i+count);}}else{var z=$(curr).css("z-index");$el.css("z-index",parseInt(z)+1+count);}$el.animate({left:0,top:0},opts.speedOut,opts.easeOut,function(){$(fwd?this:curr).hide();if(cb){cb();}});});};opts.cssBefore={display:"block",opacity:1,top:0,left:0};};$.fn.cycle.transitions.turnUp=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.cssBefore.top=next.cycleH;opts.animIn.height=next.cycleH;});opts.cssFirst={top:0};opts.cssBefore={left:0,height:0};opts.animIn={top:0};opts.animOut={height:0};};$.fn.cycle.transitions.turnDown=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssFirst={top:0};opts.cssBefore={left:0,top:0,height:0};opts.animOut={height:0};};$.fn.cycle.transitions.turnLeft=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.cssBefore.left=next.cycleW;opts.animIn.width=next.cycleW;});opts.cssBefore={top:0,width:0};opts.animIn={left:0};opts.animOut={width:0};};$.fn.cycle.transitions.turnRight=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.animIn.width=next.cycleW;opts.animOut.left=curr.cycleW;});opts.cssBefore={top:0,left:0,width:0};opts.animIn={left:0};opts.animOut={width:0};};$.fn.cycle.transitions.zoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,false,true);opts.cssBefore.top=next.cycleH/2;opts.cssBefore.left=next.cycleW/2;opts.animIn={top:0,left:0,width:next.cycleW,height:next.cycleH};opts.animOut={width:0,height:0,top:curr.cycleH/2,left:curr.cycleW/2};});opts.cssFirst={top:0,left:0};opts.cssBefore={width:0,height:0};};$.fn.cycle.transitions.fadeZoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,false);opts.cssBefore.left=next.cycleW/2;opts.cssBefore.top=next.cycleH/2;opts.animIn={top:0,left:0,width:next.cycleW,height:next.cycleH};});opts.cssBefore={width:0,height:0};opts.animOut={opacity:0};};$.fn.cycle.transitions.blindX=function($cont,$slides,opts){var w=$cont.css("overflow","hidden").width();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.width=next.cycleW;opts.animOut.left=curr.cycleW;});opts.cssBefore={left:w,top:0};opts.animIn={left:0};opts.animOut={left:w};};$.fn.cycle.transitions.blindY=function($cont,$slides,opts){var h=$cont.css("overflow","hidden").height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssBefore={top:h,left:0};opts.animIn={top:0};opts.animOut={top:h};};$.fn.cycle.transitions.blindZ=function($cont,$slides,opts){var h=$cont.css("overflow","hidden").height();var w=$cont.width();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssBefore={top:h,left:w};opts.animIn={top:0,left:0};opts.animOut={top:h,left:w};};$.fn.cycle.transitions.growX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.cssBefore.left=this.cycleW/2;opts.animIn={left:0,width:this.cycleW};opts.animOut={left:0};});opts.cssBefore={width:0,top:0};};$.fn.cycle.transitions.growY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.cssBefore.top=this.cycleH/2;opts.animIn={top:0,height:this.cycleH};opts.animOut={top:0};});opts.cssBefore={height:0,left:0};};$.fn.cycle.transitions.curtainX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true,true);opts.cssBefore.left=next.cycleW/2;opts.animIn={left:0,width:this.cycleW};opts.animOut={left:curr.cycleW/2,width:0};});opts.cssBefore={top:0,width:0};};$.fn.cycle.transitions.curtainY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false,true);opts.cssBefore.top=next.cycleH/2;opts.animIn={top:0,height:next.cycleH};opts.animOut={top:curr.cycleH/2,height:0};});opts.cssBefore={left:0,height:0};};$.fn.cycle.transitions.cover=function($cont,$slides,opts){var d=opts.direction||"left";var w=$cont.css("overflow","hidden").width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);if(d=="right"){opts.cssBefore.left=-w;}else{if(d=="up"){opts.cssBefore.top=h;}else{if(d=="down"){opts.cssBefore.top=-h;}else{opts.cssBefore.left=w;}}}});opts.animIn={left:0,top:0};opts.animOut={opacity:1};opts.cssBefore={top:0,left:0};};$.fn.cycle.transitions.uncover=function($cont,$slides,opts){var d=opts.direction||"left";var w=$cont.css("overflow","hidden").width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);if(d=="right"){opts.animOut.left=w;}else{if(d=="up"){opts.animOut.top=-h;}else{if(d=="down"){opts.animOut.top=h;}else{opts.animOut.left=-w;}}}});opts.animIn={left:0,top:0};opts.animOut={opacity:1};opts.cssBefore={top:0,left:0};};$.fn.cycle.transitions.toss=function($cont,$slides,opts){var w=$cont.css("overflow","visible").width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);if(!opts.animOut.left&&!opts.animOut.top){opts.animOut={left:w*2,top:-h/2,opacity:0};}else{opts.animOut.opacity=0;}});opts.cssBefore={left:0,top:0};opts.animIn={left:0};};$.fn.cycle.transitions.wipe=function($cont,$slides,opts){var w=$cont.css("overflow","hidden").width();var h=$cont.height();opts.cssBefore=opts.cssBefore||{};var clip;if(opts.clip){if(/l2r/.test(opts.clip)){clip="rect(0px 0px "+h+"px 0px)";}else{if(/r2l/.test(opts.clip)){clip="rect(0px "+w+"px "+h+"px "+w+"px)";}else{if(/t2b/.test(opts.clip)){clip="rect(0px "+w+"px 0px 0px)";}else{if(/b2t/.test(opts.clip)){clip="rect("+h+"px "+w+"px "+h+"px 0px)";}else{if(/zoom/.test(opts.clip)){var top=parseInt(h/2);var left=parseInt(w/2);clip="rect("+top+"px "+left+"px "+top+"px "+left+"px)";}}}}}}opts.cssBefore.clip=opts.cssBefore.clip||clip||"rect(0px 0px 0px 0px)";var d=opts.cssBefore.clip.match(/(\d+)/g);var t=parseInt(d[0]),r=parseInt(d[1]),b=parseInt(d[2]),l=parseInt(d[3]);opts.before.push(function(curr,next,opts){if(curr==next){return;}var $curr=$(curr),$next=$(next);$.fn.cycle.commonReset(curr,next,opts,true,true,false);opts.cssAfter.display="block";var step=1,count=parseInt((opts.speedIn/13))-1;(function f(){var tt=t?t-parseInt(step*(t/count)):0;var ll=l?l-parseInt(step*(l/count)):0;var bb=b<h?b+parseInt(step*((h-b)/count||1)):h;var rr=r<w?r+parseInt(step*((w-r)/count||1)):w;$next.css({clip:"rect("+tt+"px "+rr+"px "+bb+"px "+ll+"px)"});(step++<=count)?setTimeout(f,13):$curr.css("display","none");})();});opts.cssBefore={display:"block",opacity:1,top:0,left:0};opts.animIn={left:0};opts.animOut={left:0};};})(jQuery);;
// $Id: views_slideshow.js,v 1.1.2.1.2.39 2010/07/01 03:29:08 redndahead Exp $

/**
 *  @file
 *  A simple jQuery SingleFrame Div Slideshow Rotator.
 */

/**
 * This will set our initial behavior, by starting up each individual slideshow.
 */
Drupal.behaviors.viewsSlideshowSingleFrame = function (context) {
  $('.views_slideshow_singleframe_main:not(.viewsSlideshowSingleFrame-processed)', context).addClass('viewsSlideshowSingleFrame-processed').each(function() {
    var fullId = '#' + $(this).attr('id');
    var settings = Drupal.settings.viewsSlideshowSingleFrame[fullId];
    settings.targetId = '#' + $(fullId + " :first").attr('id');
    settings.paused = false;

    settings.opts = {
      speed:settings.speed,
      timeout:parseInt(settings.timeout),
      delay:parseInt(settings.delay),
      sync:settings.sync==1,
      random:settings.random==1,
      pause:false,
      allowPagerClickBubble:(settings.pager_hover==1 || settings.pager_click_to_page),
      prev:(settings.controls > 0)?'#views_slideshow_singleframe_prev_' + settings.vss_id:null,
      next:(settings.controls > 0)?'#views_slideshow_singleframe_next_' + settings.vss_id:null,
      pager:(settings.pager > 0)?'#views_slideshow_singleframe_pager_' + settings.vss_id:null,
      nowrap:parseInt(settings.nowrap),
      pagerAnchorBuilder: function(idx, slide) {
        var classes = 'pager-item pager-num-' + (idx+1);
        if (idx == 0) {
          classes += ' first';
        }
        if ($(slide).siblings().length == idx) {
          classes += ' last';
        }

        if (idx % 2) {
          classes += ' odd';
        }
        else {
          classes += ' even';
        }
        
        var theme = 'viewsSlideshowPager' + settings.pager_type;
        return Drupal.theme.prototype[theme] ? Drupal.theme(theme, classes, idx, slide, settings) : '';
      },
      after:function(curr, next, opts) {
        // Used for Image Counter.
        if (settings.image_count) {
          $('#views_slideshow_singleframe_image_count_' + settings.vss_id + ' span.num').html(opts.currSlide + 1);
          $('#views_slideshow_singleframe_image_count_' + settings.vss_id + ' span.total').html(opts.slideCount);
        }
      },
      before:function(curr, next, opts) {
        // Remember last slide.
        if (settings.remember_slide) {
          createCookie(settings.vss_id, opts.currSlide + 1, settings.remember_slide_days);
        }

        // Make variable height.
        if (settings.fixed_height == 0) {
          //get the height of the current slide
          var $ht = $(this).height();
          //set the container's height to that of the current slide
          $(this).parent().animate({height: $ht});
        }
      },
      cleartype:(settings.ie.cleartype == 'true')? true : false,
      cleartypeNoBg:(settings.ie.cleartypenobg == 'true')? true : false
    }
    
    // Set the starting slide if we are supposed to remember the slide
    if (settings.remember_slide) {
      var startSlide = readCookie(settings.vss_id);
      if (startSlide == null) {
        startSlide = 0;
      }
      settings.opts.startingSlide =  startSlide;
    }

    if (settings.pager_hover == 1) {
      settings.opts.pagerEvent = 'mouseover';
      settings.opts.pauseOnPagerHover = true;
    }

    if (settings.effect == 'none') {
      settings.opts.speed = 1;
    }
    else {
      settings.opts.fx = settings.effect;
    }

    // Pause on hover.
    if (settings.pause == 1) {
      $('#views_slideshow_singleframe_teaser_section_' + settings.vss_id).hover(function() {
        $(settings.targetId).cycle('pause');
      }, function() {
        if (settings.paused == false) {
          $(settings.targetId).cycle('resume');
        }
      });
    }

    // Pause on clicking of the slide.
    if (settings.pause_on_click == 1) {
      $('#views_slideshow_singleframe_teaser_section_' + settings.vss_id).click(function() { 
        viewsSlideshowSingleFramePause(settings);
      });
    }

    // Add additional settings.
		if (settings.advanced != "\n") {
      var advanced = settings.advanced.split("\n");
      for (i=0; i<advanced.length; i++) {
        var prop = '';
        var value = '';
        var property = advanced[i].split(":");
        for (j=0; j<property.length; j++) {
          if (j == 0) {
            prop = property[j];
          }
          else if (j == 1) {
            value = property[j];
          }
          else {
            value += ":" + property[j];
          }
        }

        // Need to evaluate so true, false and numerics aren't a string.
        if (value == 'true' || value == 'false' || IsNumeric(value)) {
          value = eval(value);
        }
        else {
          // Parse strings into functions.
          var func = value.match(/function\s*\((.*?)\)\s*\{(.*)\}/i);
          if (func) {
            value = new Function(func[1].match(/(\w+)/g), func[2]);
          }
        }
	
        // Call both functions if prop was set previously.
        if (typeof(value) == "function" && prop in settings.opts) {
          var callboth = function(before_func, new_func) {
            return function() {
              before_func.apply(null, arguments);
              new_func.apply(null, arguments);
            };
          };
          settings.opts[prop] = callboth(settings.opts[prop], value);
        }
        else {
          settings.opts[prop] = value;
        }
      }
    }
    
    $(settings.targetId).cycle(settings.opts);
    $(settings.targetId).cycle('pause');

    // Start Paused
    if (settings.start_paused) {
      viewsSlideshowSingleFramePause(settings);
    }
    
    // Pause if hidden.
    if (settings.pause_when_hidden) {
      var checkPause = function(settings) {
        // If the slideshow is visible and it is paused then resume.
        // otherwise if the slideshow is not visible and it is not paused then
        // pause it.
        var visible = viewsSlideshowSingleFrameIsVisible(settings.targetId, settings.pause_when_hidden_type, settings.amount_allowed_visible);
        if (visible && settings.paused) {
          viewsSlideshowSingleFrameResume(settings);
        }
        else if (!visible && !settings.paused) {
          viewsSlideshowSingleFramePause(settings);
        }
      }
     
      // Check when scrolled.
      $(window).scroll(function() {
       checkPause(settings);
      });
      
      // Check when the window is resized.
      $(window).resize(function() {
        checkPause(settings);
      });
    }
  
    // Show image count for people who have js enabled.
    $('#views_slideshow_singleframe_image_count_' + settings.vss_id).show();

    if (settings.controls > 0) {
      // Show controls for people who have js enabled browsers.
      $('#views_slideshow_singleframe_controls_' + settings.vss_id).show();
      
      $('#views_slideshow_singleframe_playpause_' + settings.vss_id).click(function(e) {
      	if (settings.paused) {
      	  viewsSlideshowSingleFrameResume(settings);
      	}
      	else {
      	  viewsSlideshowSingleFramePause(settings);
      	}
        e.preventDefault();
      });
    }
  });
}

// Pause the slideshow 
viewsSlideshowSingleFramePause = function (settings) {
  //make Resume translatable
  var resume = Drupal.t('Resume');

  $(settings.targetId).cycle('pause');
  if (settings.controls > 0) {
    $('#views_slideshow_singleframe_playpause_' + settings.vss_id)
      .addClass('views_slideshow_singleframe_play')
      .addClass('views_slideshow_play')
      .removeClass('views_slideshow_singleframe_pause')
      .removeClass('views_slideshow_pause')
      .text(resume);
  }
  settings.paused = true;
}

// Resume the slideshow
viewsSlideshowSingleFrameResume = function (settings) {
  $(settings.targetId).cycle('resume');
  if (settings.controls > 0) {
    $('#views_slideshow_singleframe_playpause_' + settings.vss_id)
      .addClass('views_slideshow_singleframe_pause')
      .addClass('views_slideshow_pause')
      .removeClass('views_slideshow_singleframe_play')
      .removeClass('views_slideshow_play')
      .text('Pause');
  }
  settings.paused = false;
}

Drupal.theme.prototype.viewsSlideshowPagerThumbnails = function (classes, idx, slide, settings) {
  var href = '#';
  if (settings.pager_click_to_page) {
    href = $(slide).find('a').attr('href');
  }
  return '<div class="' + classes + '"><a href="' + href + '"><img src="' + $(slide).find('img').attr('src') + '" /></a></div>';
}

Drupal.theme.prototype.viewsSlideshowPagerNumbered = function (classes, idx, slide, settings) {
  var href = '#';
  if (settings.pager_click_to_page) {
    href = $(slide).find('a').attr('href');
  }
  return '<div class="' + classes + '"><a href="' + href + '">' + (idx+1) + '</a></div>';
}

// Verify that the value is a number.
function IsNumeric(sText) {
  var ValidChars = "0123456789";
  var IsNumber=true;
  var Char;

  for (var i=0; i < sText.length && IsNumber == true; i++) { 
    Char = sText.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) {
      IsNumber = false;
    }
  }
  return IsNumber;
}

/**
 * Cookie Handling Functions
 */
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else {
    var expires = "";
  }
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length,c.length);
    }
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

/**
 * Checks to see if the slide is visible enough.
 * elem = element to check.
 * type = The way to calculate how much is visible.
 * amountVisible = amount that should be visible. Either in percent or px. If
 *                it's not defined then all of the slide must be visible.
 *
 * Returns true or false
 */
function viewsSlideshowSingleFrameIsVisible(elem, type, amountVisible) {
  // Get the top and bottom of the window;
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var docViewLeft = $(window).scrollLeft();
  var docViewRight = docViewLeft + $(window).width();

  // Get the top, bottom, and height of the slide;
  var elemTop = $(elem).offset().top;
  var elemHeight = $(elem).height();
  var elemBottom = elemTop + elemHeight;
  var elemLeft = $(elem).offset().left;
  var elemWidth = $(elem).width();
  var elemRight = elemLeft + elemWidth;
  var elemArea = elemHeight * elemWidth;
  
  // Calculate what's hiding in the slide.
  var missingLeft = 0;
  var missingRight = 0;
  var missingTop = 0;
  var missingBottom = 0;
  
  // Find out how much of the slide is missing from the left.
  if (elemLeft < docViewLeft) {
    missingLeft = docViewLeft - elemLeft;
  }

  // Find out how much of the slide is missing from the right.
  if (elemRight > docViewRight) {
    missingRight = elemRight - docViewRight;
  }
  
  // Find out how much of the slide is missing from the top.
  if (elemTop < docViewTop) {
    missingTop = docViewTop - elemTop;
  }

  // Find out how much of the slide is missing from the bottom.
  if (elemBottom > docViewBottom) {
    missingBottom = elemBottom - docViewBottom;
  }
  
  // If there is no amountVisible defined then check to see if the whole slide
  // is visible.
  if (type == 'full') {
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
    && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop)
    && (elemLeft >= docViewLeft) && (elemRight <= docViewRight)
    && (elemLeft <= docViewRight) && (elemRight >= docViewLeft));
  }
  else if(type == 'vertical') {
    var verticalShowing = elemHeight - missingTop - missingBottom;
    
    // If user specified a percentage then find out if the current shown percent
    // is larger than the allowed percent.
    // Otherwise check to see if the amount of px shown is larger than the
    // allotted amount.
    if (amountVisible.indexOf('%')) {
      return (((verticalShowing/elemHeight)*100) >= parseInt(amountVisible));
    }
    else {
      return (verticalShowing >= parseInt(amountVisible));
    }
  }
  else if(type == 'horizontal') {
    var horizontalShowing = elemWidth - missingLeft - missingRight;
    
    // If user specified a percentage then find out if the current shown percent
    // is larger than the allowed percent.
    // Otherwise check to see if the amount of px shown is larger than the
    // allotted amount.
    if (amountVisible.indexOf('%')) {
      return (((horizontalShowing/elemWidth)*100) >= parseInt(amountVisible));
    }
    else {
      return (horizontalShowing >= parseInt(amountVisible));
    }
  }
  else if(type == 'area') {
    var areaShowing = (elemWidth - missingLeft - missingRight) * (elemHeight - missingTop - missingBottom);
    
    // If user specified a percentage then find out if the current shown percent
    // is larger than the allowed percent.
    // Otherwise check to see if the amount of px shown is larger than the
    // allotted amount.
    if (amountVisible.indexOf('%')) {
      return (((areaShowing/elemArea)*100) >= parseInt(amountVisible));
    }
    else {
      return (areaShowing >= parseInt(amountVisible));
    }
  }
}

;
// $Id: views_slideshow.js,v 1.1.2.2.2.35 2010/07/01 03:29:08 redndahead Exp $

/**
 * @file
 * A simple jQuery ThumbnailHover Div Slideshow Rotator.
 */

/**
 * This will set our initial behavior, by starting up each individual slideshow.
 */
Drupal.behaviors.viewsSlideshowThumbnailHover = function (context) {
  $('.views_slideshow_thumbnailhover_main:not(.viewsSlideshowThumbnailHover-processed)', context).addClass('viewsSlideshowThumbnailHover-processed').each(function() {
    var fullId = '#' + $(this).attr('id');
    var settings = Drupal.settings.viewsSlideshowThumbnailHover[fullId];
    settings.targetId = '#' + $(fullId + " :first").attr('id');
		settings.paused = false;
		
    settings.opts = {
      speed:settings.speed,
      timeout:parseInt(settings.timeout),
      delay:parseInt(settings.delay),
      sync:settings.sync==1,
      random:settings.random==1,
      pause:false,
      allowPagerClickBubble:(settings.pager_event=='click')? false : true,
      pager:(settings.pager_event == 'hoverIntent') ? null : '#views_slideshow_breakout_teasers_' + settings.vss_id,
      nowrap:parseInt(settings.nowrap),
      pagerAnchorBuilder:(settings.pager_event == 'hoverIntent') ? null : function(idx, slide) { 
        return '#views_slideshow_thumbnailhover_div_breakout_teaser_' + settings.vss_id + '_' + idx; 
      },
      after:function(curr, next, opts) {
        // Used for Image Counter.
        if (settings.image_count) {
          $('#views_slideshow_thumbnailhover_image_count_' + settings.vss_id + ' span.num').html(opts.currSlide + 1);
          $('#views_slideshow_thumbnailhover_image_count_' + settings.vss_id + ' span.total').html(opts.slideCount);
        }
      },
      before:function(current, next, opts) {
        // Remember last slide.
        if (settings.remember_slide) {
          createCookie(settings.view_id, opts.currSlide + 1, settings.remember_slide_days);
        }

        // Make variable height.
        if (settings.fixed_height == 0) {
          //get the height of the current slide
          var $ht = $(this).height();
          //set the container's height to that of the current slide
          $(this).parent().animate({height: $ht});
        }
        
        var currId = (currId=$(current).attr('id')).substring(currId.lastIndexOf('_')+1)
        var nextId = (nextId=$(next).attr('id')).substring(nextId.lastIndexOf('_')+1)
        $('#views_slideshow_thumbnailhover_div_breakout_teaser_' + settings.vss_id + '_' + currId).removeClass('activeSlide');
        $('#views_slideshow_thumbnailhover_div_breakout_teaser_' + settings.vss_id + '_' + nextId).addClass('activeSlide');
      },
      pagerEvent: (settings.pager_event == 'hoverIntent') ? null : settings.pager_event,
      prev:(settings.controls > 0)?'#views_slideshow_thumbnailhover_prev_' + settings.vss_id:null,
      next:(settings.controls > 0)?'#views_slideshow_thumbnailhover_next_' + settings.vss_id:null,
      cleartype:(settings.ie.cleartype == 'true')? true : false,
      cleartypeNoBg:(settings.ie.cleartypenobg == 'true')? true : false
    };

    // Set the starting slide if we are supposed to remember the slide
    if (settings.remember_slide) {
      var startSlide = readCookie(settings.view_id);
      if (startSlide == null) {
        startSlide = 0;
      }
      settings.opts.startingSlide =  startSlide;
    }

    if (settings.effect == 'none') {
      settings.opts.speed = 1;
    }
    else {
      settings.opts.fx = settings.effect;
    }

    // Pause on hover.
    if (settings.pause == 1) {
      $('#views_slideshow_thumbnailhover_teaser_section_' + settings.vss_id).hover(function() {
        $(settings.targetId).cycle('pause');
      }, function() {
        if (settings.paused == false) {
          $(settings.targetId).cycle('resume');
        }
      });
    }

    // Pause on clicking of the slide.
    if (settings.pause_on_click == 1) {
      $('#views_slideshow_thumbnailhover_teaser_section_' + settings.vss_id).click(function() { 
        viewsSlideshowThumbnailHoverPause(settings);
      });
    }
    
    // Add additional settings.
		if (settings.advanced != "\n") {
      var advanced = settings.advanced.split("\n");
      for (i=0; i<advanced.length; i++) {
        var prop = '';
        var value = '';
        var property = advanced[i].split(":");
        for (j=0; j<property.length; j++) {
          if (j == 0) {
            prop = property[j];
          }
          else if (j == 1) {
            value = property[j];
          }
          else {
            value += ":" + property[j];
          }
        }

        // Need to evaluate so true, false and numerics aren't a string.
        if (value == 'true' || value == 'false' || IsNumeric(value)) {
          value = eval(value);
        }
        else {
          // Parse strings into functions.
          var func = value.match(/function\s*\((.*?)\)\s*\{(.*)\}/i);
          if (func) {
            value = new Function(func[1].match(/(\w+)/g), func[2]);
          }
        }
	
        // Call both functions if prop was set previously.
        if (typeof(value) == "function" && prop in settings.opts) {
          var callboth = function(before_func, new_func) {
            return function() {
              before_func.apply(null, arguments);
              new_func.apply(null, arguments);
            };
          };
          settings.opts[prop] = callboth(settings.opts[prop], value);
        }
        else {
          settings.opts[prop] = value;
        }
      }
    }

    $(settings.targetId).cycle(settings.opts);

    // Start Paused
    if (settings.start_paused) {
      viewsSlideshowThumbnailHoverPause(settings);
    }
    
    // Pause if hidden.
    if (settings.pause_when_hidden) {
      var checkPause = function(settings) {
        // If the slideshow is visible and it is paused then resume.
        // otherwise if the slideshow is not visible and it is not paused then
        // pause it.
        var visible = viewsSlideshowThumbnailHoverIsVisible(settings.targetId, settings.pause_when_hidden_type, settings.amount_allowed_visible);
        if (visible && settings.paused) {
          viewsSlideshowThumbnailHoverResume(settings);
        }
        else if (!visible && !settings.paused) {
          viewsSlideshowThumbnailHoverPause(settings);
        }
      }
     
      // Check when scrolled.
      $(window).scroll(function() {
       checkPause(settings);
      });
      
      // Check when window is resized.
      $(window).resize(function() {
        checkPause(settings);
      });
    }

    // Show image count for people who have js enabled.
    $('#views_slideshow_thumbnailhover_image_count_' + settings.vss_id).show();
    
    if (settings.pager_event == 'hoverIntent') {
      $('#views_slideshow_thumbnailhover_breakout_teasers_' + settings.vss_id + ' .views_slideshow_thumbnailhover_div_breakout_teaser').each(function(i,obj) {
        $(obj).hoverIntent(
          function() {
            $('.views_slideshow_thumbnailhover_div_breakout_teaser').removeClass('activeSlide');
            var id = $(this).attr('id');
            id = parseInt(id.substring(id.lastIndexOf('_')+1));
            $(settings.targetId).cycle(id);
            $('#views_slideshow_thumbnailhover_div_breakout_teaser_' + settings.vss_id + '_' + id).addClass('activeSlide');
            $(settings.targetId).cycle('stop');
          },
          function() {
            var id = $(this).attr('id');
            settings.opts.startingSlide = parseInt(id.substring(id.lastIndexOf('_')+1));
            $(settings.targetId).cycle(settings.opts);
          }
        );
      });
    }

    if (settings.controls > 0) {
      // Show controls for people who have js enabled browsers.
      $('#views_slideshow_thumbnailhover_controls_' + settings.vss_id).show();
      
      $('#views_slideshow_thumbnailhover_playpause_' + settings.vss_id).click(function(e) {
        if (settings.paused) {
          viewsSlideshowThumbnailHoverResume(settings);
        }
        else {
          viewsSlideshowThumbnailHoverPause(settings);
        }
        e.preventDefault();
      });
    }
  });
}

// Pause the slideshow 
viewsSlideshowThumbnailHoverPause = function (settings) {
  //make Resume translatable
  var resume = Drupal.t('Resume');

  $(settings.targetId).cycle('pause');
  if (settings.controls > 0) {
    $('#views_slideshow_thumbnailhover_playpause_' + settings.vss_id)
      .addClass('views_slideshow_thumbnailhover_play')
      .addClass('views_slideshow_play')
      .removeClass('views_slideshow_thumbnailhover_pause')
      .removeClass('views_slideshow_pause')
      .text(resume);
  }
  settings.paused = true;
}

// Resume the slideshow
viewsSlideshowThumbnailHoverResume = function (settings) {
  $(settings.targetId).cycle('resume');
  if (settings.controls > 0) {
    $('#views_slideshow_thumbnailhover_playpause_' + settings.vss_id)
      .addClass('views_slideshow_thumbnailhover_pause')
      .addClass('views_slideshow_pause')
      .removeClass('views_slideshow_thumbnailhover_play')
      .removeClass('views_slideshow_play')
      .text('Pause');
  }
  settings.paused = false;
}

// Verify that the value is a number.
function IsNumeric(sText) {
  var ValidChars = "0123456789";
  var IsNumber=true;
  var Char;

  for (var i=0; i < sText.length && IsNumber == true; i++) { 
    Char = sText.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) {
      IsNumber = false;
    }
  }
  return IsNumber;
}

/**
 * Cookie Handling Functions
 */
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else {
    var expires = "";
  }
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length,c.length);
    }
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

/**
 * Checks to see if the slide is visible enough.
 * elem = element to check.
 * amountVisible = amount that should be visible. Either in percent or px. If
 *                it's not defined then all of the slide must be visible.
 *
 * Returns true or false
 */
function viewsSlideshowThumbnailHoverIsVisible(elem, type, amountVisible) {
  // Get the top and bottom of the window;
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var docViewLeft = $(window).scrollLeft();
  var docViewRight = docViewLeft + $(window).width();

  // Get the top, bottom, and height of the slide;
  var elemTop = $(elem).offset().top;
  var elemHeight = $(elem).height();
  var elemBottom = elemTop + elemHeight;
  var elemLeft = $(elem).offset().left;
  var elemWidth = $(elem).width();
  var elemRight = elemLeft + elemWidth;
  var elemArea = elemHeight * elemWidth;
  
  // Calculate what's hiding in the slide.
  var missingLeft = 0;
  var missingRight = 0;
  var missingTop = 0;
  var missingBottom = 0;
  
  // Find out how much of the slide is missing from the left.
  if (elemLeft < docViewLeft) {
    missingLeft = docViewLeft - elemLeft;
  }

  // Find out how much of the slide is missing from the right.
  if (elemRight > docViewRight) {
    missingRight = elemRight - docViewRight;
  }
  
  // Find out how much of the slide is missing from the top.
  if (elemTop < docViewTop) {
    missingTop = docViewTop - elemTop;
  }

  // Find out how much of the slide is missing from the bottom.
  if (elemBottom > docViewBottom) {
    missingBottom = elemBottom - docViewBottom;
  }
  
  // If there is no amountVisible defined then check to see if the whole slide
  // is visible.
  if (type == 'full') {
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
    && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop)
    && (elemLeft >= docViewLeft) && (elemRight <= docViewRight)
    && (elemLeft <= docViewRight) && (elemRight >= docViewLeft));
  }
  else if(type == 'vertical') {
    var verticalShowing = elemHeight - missingTop - missingBottom;
    
    // If user specified a percentage then find out if the current shown percent
    // is larger than the allowed percent.
    // Otherwise check to see if the amount of px shown is larger than the
    // allotted amount.
    if (amountVisible.indexOf('%')) {
      return (((verticalShowing/elemHeight)*100) >= parseInt(amountVisible));
    }
    else {
      return (verticalShowing >= parseInt(amountVisible));
    }
  }
  else if(type == 'horizontal') {
    var horizontalShowing = elemWidth - missingLeft - missingRight;
    
    // If user specified a percentage then find out if the current shown percent
    // is larger than the allowed percent.
    // Otherwise check to see if the amount of px shown is larger than the
    // allotted amount.
    if (amountVisible.indexOf('%')) {
      return (((horizontalShowing/elemWidth)*100) >= parseInt(amountVisible));
    }
    else {
      return (horizontalShowing >= parseInt(amountVisible));
    }
  }
  else if(type == 'area') {
    var areaShowing = (elemWidth - missingLeft - missingRight) * (elemHeight - missingTop - missingBottom);
    
    // If user specified a percentage then find out if the current shown percent
    // is larger than the allowed percent.
    // Otherwise check to see if the amount of px shown is larger than the
    // allotted amount.
    if (amountVisible.indexOf('%')) {
      return (((areaShowing/elemArea)*100) >= parseInt(amountVisible));
    }
    else {
      return (areaShowing >= parseInt(amountVisible));
    }
  }
}
;
/**
 * @file
 * jQuery-based keyboard shortcuts.
 */
Drupal.behaviors.initKeyboardShortcuts = function(context) {
  $(document).keydown(function(event) {
    if (event.which == '37') {
      // left arrow
      if ($('td.image-navigator-prev a').length > 0) {
        window.location.href = $('td.image-navigator-prev a').attr('href');
      }
    }
    if (event.which == '39') {
      // right arrow
      if ($('td.image-navigator-next a').length > 0) {
        window.location.href = $('td.image-navigator-next a').attr('href');
      }
    }
  });
}
;
function populateElement(selector, defvalue) {
    if($.trim($(selector).val()) == "") {
        $(selector).val(defvalue);
    }
    $(selector).focus(function() {
        if($(selector).val() == defvalue) {
            $(selector).val("");
        }
    });
    $(selector).blur(function() {
        if($.trim($(selector).val()) == "") {
            $(selector).val(defvalue);
        }
    });
 }

$(document).ready(function(){
	// give the search box some fancy stuff
	populateElement('#search-box input.form-text, #search-block-form input.form-text', 'search...');
	// define sliders for the admin page for theme-settings.php
});;
