<?


//	$fileContents = file_get_contents("../../" . $file);
//		
//		$cssContents = explode("\n", $fileContents);
//		 
//		$flag = false;
//		$newCss = Array();
//		
//		foreach ($cssContents as $cssLine){
//			$liner = false;
//			//$selector = str_replace('{','',$cssLine);
//			$selector = (strstr($cssLine,'{') == '{')? str_replace('{','',$cssLine) : null;
//			
//			if( $selector == $slectedSelector){
//				$flag = true;
//				$newCss[] = $selector . "{" ;
//				$liner = true;
//			}elseif($selector != null){
//				$newCss[] = $selector . "{";
//				$liner = true;
//			}
//			
//			if(strstr($cssLine,'}') == '}'){
//				$flag = false;
//				$newCss[] = "}" ;
//				$liner = true;
//			}
//			
//			if($selector != $slectedSelector && $flag == true){
//				$line = explode(':',$cssLine);
//				$attr =  trim($line[0]);
//				$val = str_replace(';','',$line[1]);
//				if($attr == $attrib){
//					
//					if($attr == 'background-Image'){
//						$val = 'url("' . trim($value) . '")';
//					}elseif(strstr($attr,'color') == 'color'){
//						$val = ($value == '#' || $value == "") ?  null : trim($value) ;
//					}elseif($val != $value && ($value != null || $value != "")){
//						$val = $value;
//					}elseif($value == null || $value == ""){
//						unset($cssContents[$cssLine]);
//					}
//				
//					$newCss[] = "\t" . $attr . ":" . $val . ";";
//					$liner = true;
//				}
//			}
//			if($liner == false){
//				$newCss[] = "\t" . $attrib . ":" . $value . ";";
//			}
//		}
//	$newContent = implode("\n", $newCss);
//	print_r($newContent);
//	$fileBytes = file_put_contents("../../" . $file, $newContent);
	
	
//	$fileContents = file_get_contents("../../" . $file);
//		
//		
//		// build an array -> selector[attrib => ///, value => val...,] 
//		
//		include('parser.php');
//		
//		$parser = new CssParser();
//		
//		if(!empty($fileContents)){
//			$parser->load_string($fileContents);
//			$parser->parse(false);
//		}	
//		
//		$oldCss = $parser->parsed['css'];
//	
//		// ok we have the array - oldCss... now compare it with the newCss and make the required changes.
//		switch ($attrib){
//			case 'background-Image':
//				$value = 'url("' . trim($value) . '")';
//			break;
//			
//		}
//		if(strstr($attrib,'color') == 'color'){
//			
//			$value = ($value == '#' || $value == "") ?  null : trim($value) ;
//		}
//		
//		$oldCss[$slectedSelector][$attrib]=trim($value);
//
//		if($value == null || $value == ""){
//			unset($oldCss[$slectedSelector][$attrib]);
//	
//		}
//		$parser->parsed['css']= $oldCss;
//		$fileBytes = file_put_contents("../../" . $file, $parser->glue());



$file = $_POST['file'];
if(!$file) {$file = $_GET['file'];}
$action = $_POST['action'];

$slectedSelector = $_POST['selector'];
$attrib = $_POST['attr'];
$value = $_POST['value'];
$newName = $_POST['newName'];
$newCss = $_POST['newCss'];


$selectorID = $_POST['selector'];

if($action == 'save'){
	

		include("Parser2.php");
		
		$css = new Css_Model_Parser();
		$css->Parse("../../" . $file);
		if(null == $value){
			$css->delAttr($slectedSelector, $attrib);
		}else{
			if($attrib == 'background-image'){
				$value = 'url(' . trim($value) . ')';
			}elseif(strstr($attrib,'color') == 'color'){
				$value = ($value == '#' || $value == "") ?  null : trim($value) ;
			}
				
			$newAtribVal = "\t" . $attrib . ":" . $value . ";";
			$css->add($slectedSelector,$newAtribVal);
			
		}
		//print_r($css->GetCSS());
		$fileBytes = file_put_contents("../../" . $file, $css->GetCSS());
		echo($fileBytes);
}elseif($action == 'newSelector'){
	
	$newSelectorString = $slectedSelector . '{' . "\n" . '}' . "\n"; 
	
	$fileHandle = fopen("../../" . $file, "a");
	if(fwrite($fileHandle, $newSelectorString) === false){
		
		echo 'problem writing to file';
	}else{
		echo 'file saved';
	}
	fclose($fileHandle);
	
}elseif($action == 'removeSelector'){
	
		include("Parser2.php");
		
		$css = new Css_Model_Parser();
		$css->Parse("../../" . $file);
		//$newAtribVal = "\t" . $attrib . ":" . $value . ";";
		$css->delSection($slectedSelector);
		
		//print_r($css->GetCSS());
		$fileBytes = file_put_contents("../../" . $file, $css->GetCSS());
	
}elseif($action == 'renameSelector'){
	
	function array_change_key_name( $orig, $new, &$array )
		{
		    foreach ( $array as $k => $v )
		        $return[ $k === $orig ? $new : $k ] = ( is_array( $v ) ? array_change_key_name( $orig, $new, $v ) : $v );
		    return $return;
		}

		include("Parser2.php");
		
		$css = new Css_Model_Parser();
		$css->Parse("../../" . $file);
		//$newAtribVal = "\t" . $attrib . ":" . $value . ";";
		$new_array = array_change_key_name( $slectedSelector, $newName, $css->css );
		$css->css = $new_array;
		
		//print_r($css->GetCSS());
		$fileBytes = file_put_contents("../../" . $file, $css->GetCSS());
		echo 'ok';
}elseif($action == 'getRaw'){
	
	$fileContents = file_get_contents("../../" . $file);
	$rawCss = $fileContents;
	
	echo $rawCss;
	
}elseif($action == 'saveRaw'){
	
	$fileContents = file_put_contents("../../" . $file, $newCss);
	//$rawCss = $fileContents;
	
	//echo $rawCss;
	
}elseif($selectorID != null){
	
		$fileContents = file_get_contents("../../" . $file);
		
		$cssContents = explode("\n", $fileContents);
		 
		$flag == false;
		$attrVal = Array();
		
		foreach ($cssContents as $cssLine){
			
			$selector = str_replace('{','',$cssLine);
			
			if( $selector == $selectorID){
				$flag = true;
			}
			
			if($flag && $cssLine == '}'){
				$flag = false;
			}
			
			if($selector != $selectorID && $flag){
				$attribs = explode(':',$cssLine);
				$attr = '"' . trim($attribs[0]) . '"';
				$val = str_replace(';','',$attribs[1]);
				$attrVal[trim($attr)] = trim($val);
			}
			
		}
		
	echo jsencode($attrVal);
		

}elseif($file != null){
	
	$fileContents = file_get_contents("../../" . $file);
	
	//print_r($rawCss);
	include('parser.php');
	
	$parser = new CssParser();
	
	if(!empty($fileContents)){
		$parser->load_string(stripslashes($fileContents));
		$parser->parse(false);
	}	
	
	include('index-selector-list.phtml');  

	
}elseif($file == null){
	
	$files= array();
	
	$dir = opendir('../../');
	
	
	
	while ($read = readdir($dir))
	{
	
	if ($read!='.' && $read!='..'){
		$cssFile = strstr($read,'.css');
		if($cssFile){
			$files[] = $read;
		}
	}
	
	}
	
	
	
	closedir($dir); 
	
//	$fileContents = file_get_contents("../../ie-fix.css");
//	$rawCss = $fileContents;
	
	include('index.phtml');  

}

//
//class Css_AdminController extends Easy_Controller_Action {
//	
//	
//	
//	public function preDispatch(){
//		$this->_helper->layout->disableLayout();
//		$this->_helper->viewRenderer->setNoRender( true );
//	}
//	
//	
//	public function indexAction(){
//		
//		
////		$selectors 	= $this -> _getParam("selectors"  );
////		$selector 	= $this -> _getParam("selector" , "" );
////		$cardID 	= $this -> _getParam("cardID");
//		
//		
//		//$this -> view -> selectors = $selectors;
//		
//		$m = new Css_Model_DbTable_Css();
//		$s = $m->select()->group('selector');
//		$rows = $m->fetchAll($s);
//		$this -> view -> rows = $rows;
//		
//		$mf = new Css_Model_DbTable_CssFiles();
//		
//		$files = $mf->fetchAll();
//		$this -> view -> files = $files;
//		
//		$info = $m->info();
//		$this -> view -> fields = $info['cols'];
//		
//		
//		$this->render('index' , 'default');
//		
////		
////		if( $this -> getRequest() -> isPost() ){
////			
////			//Zend_Debug::dump( $_POST);
////			
////			$row -> setFromArray( $_POST );
////			$row -> save();
////			
////			$this -> saveCssFile();
////			
////			//die(__LINE__);
////			$this -> getHelper("redirector") -> gotoRoute();
////		}
////		
//	}
//	
//	
//	public function filemanagerAction(){
//		$this->render('file-Manager' , 'default');
//	}
//		
//	
//	
//	public function selectorAction(){
//		
//		$rowID = $this->_getParam('rowID');
//	
//		
//		$m = new Css_Model_DbTable_Css();
//		$s = $m->select()->where('id = ?' , $rowID);
//		$row = $m->fetchRow( $s );
//		
//		
//		
//		echo Zend_Json::encode( $row->toArray() );
//	}
//	
//	
//	public function importAction(){
//		
//		$base_path 	= $this->getRequest()->getServer('DOCUMENT_ROOT');
//		$file 		= $this->_getParam('file');
//		
//		$filename = $base_path .  "/css/$file.css";
//		//$f = file_get_contents( );
//		
//		
//		if( false ){
//			$p = new Css_Model_Parser(false);
//			$p->Parse($filename);
//			
//			
//			Zend_Debug::dump( $p -> css );
//			$m = new Css_Model_DbTable_Css();
//			$m->delete();
//			
//			$rows = array();
//			foreach ($p->css as $selector => $selectorData ) {
//				$row = $m -> createRow($selectorData);
//				$row->selector = $selector;
//				$row->save();
//			}
//		
//		}
//		
//		require_once(dirname(__FILE__) . '/../models/SirPepe-CSS-Parser-4445f99/parser.php');
//		
//		$p = new CssParser();
//		$p->load_file($filename);
//		$p->parse();
//		
//		Zend_Debug::dump( $p -> parsed['css'] );
//		
//		$m = new Css_Model_DbTable_Css();
//		$m->delete('');
//		
//		$rows = array();
//		foreach ($p -> parsed['css'] as $selector => $selectorData ) {
//			$row = $m -> createRow($selectorData);
//			$row->selector = $selector;
//			$row->save();
//		}	
//			
//		//$p->
//		
//		
//		die(__METHOD__);
//		
//		
//	}
//	
//	
//	protected function saveCssFile($filer){
//		
//		$base_path = $this->getRequest()->getServer('DOCUMENT_ROOT');
//		$cssFile = ($filer)? $filer : 'style';
//		$filename 	= ($filer)?  "$filer.css" : 'style.css';
//		$path 		= $base_path . '/css/';
//		
//		$file = $path . $filename;
//		
//		$cssTable = new Css_Model_DbTable_Css();
//		$s = $cssTable->select()->where('file = ?' , $cssFile );
//		$rows = $cssTable->fetchAll($s);
//		
//		$css = '';
//		
//		foreach ($rows as $row ) {
//			
//			if( $row->selector ){
//				
//				
//				$s = $row->selector;
//				$s .= '{' . "\n";
//				foreach ($row->toArray() as $k=>$v) {
//					
//					switch ($k) {
//						case 'id':
//						case 'selector':
//						case 'cardID':
//						case 'file':
//							
//							break;
//					
//						case 'background-image':
//							if( $v != ''){
//								$s .= "$k:url($v);" . "\n";
//							}
//							break;
//					
//						default:
//							if( $v != ''){
//								$s .= "$k:$v;" . "\n";
//							}
//							break;
//					}
//				}
//					
//				
//				$s .= '}' . "\n";
//				$css .= $s;
//			}
//		}
//		
//		
//		if( is_file( $file ) ){
//			
//			file_put_contents( $file , $css );
//		}
//		
////		
////		$cardID = $this -> _getParam("cardID" , null );
////		
////		$m = new Wizard_Model_DbTable_Css();
////		$rows = $m -> fetchAll("cardID = $cardID");
////		
////		$string = "";
////		foreach ($rows as $row) {
////			$c = new SiteBuilder_Css_Selector($row);
////			
////			$string .= $c -> toString();
////			
////		}
////		
////		
////		$m2 = new Card_Model_DbTable_Card();
////		$card = $m2 -> fetchRow("cardID = $cardID");
////		
////		$sub = $card -> subdomain;
////		
////		$cssFile = APPLICATION_PATH . "/../../public_html/$sub/css/styles.css";
//		
//		
//		
//	}
//	
//	
//	public function saveAction(){
//		
//		$file = $this->_getParam('file');
//		
//		$previewTable 	= new Css_Model_DbTable_CssPreview();
//		$cssTable 		= new Css_Model_DbTable_Css();
//		
//		$rows = $previewTable->fetchAll();
//		
//		foreach ($rows as $row) {
//			
//			$s = $cssTable->select()
//				->where('selector = ? ' , $row->selector)
//				->where('file = ? ' , $row->file)
//				;
//			$r = $cssTable->fetchRow($s);
//			
//			//$data = $row->toArray();
//			//unset($data['id']);
//			
//			$attr 	= $row->attr;
//			$value 	= $row->value;	
//			
//			if( $r ){
//				$r->$attr=$value;
//			} else {
//				
//				$d['selector'] = $row->selector;
//				$d[$attr] =$value;
//				$d['file'] =$row->file;
//
//				$r = $cssTable->createRow( $d );
//			}
//			
//			 
//			
//			$r->save();
//			
//			//echo 'saved!';
//			//echo $row->selector .'|' . $row->attr . '|' . $row->value . '|' . $r->id . "\n";
//			//Zend_Debug::dump( $r );
//		}
//		
//		$this->saveCssFile($file);
//
//		$this->getDB()->getConnection()->exec('TRUNCATE TABLE `css_preview`');
//		
//		
////		
////		return;
////		
////		if( $this->getRequest()->isPost() ){
////			
////			$pairs= array();
////			
////			$data = $_POST['data'];
////			
////			$data = explode('|' , $data );
////			
////			foreach ($data as $r ) {
////				$row = explode('=' , $r );
////				$pairs[$row[0]]=$row[1];
////			}
////			Zend_Debug::dump( $pairs );
////			
////			$id = $pairs['id'];
////			
////			$m = new Css_Model_DbTable_Css();
////			
////			$row = $m->fetchRow( $m->select()->where('id = ? ' , $id ));
////			
////			if( $row ){
////				$row->setFromArray($pairs);
////				$row->save();
////			}
////			
////		}
////		//Zend_Debug::dump( $_POST );
//		
//	}
//	
//	
//	public function previewAction(){
//		
//		
//		
//		$selector 	= $this->_getParam('selector');
//		$attr 		= $this->_getParam('attr');
//		$value 		= $this->_getParam('value');
//		$file 		= $this->_getParam('file');
//		
//		//echo $selector . ' ' . $attr . ' ' . $value;
//		try { 
//			$m = new Css_Model_DbTable_CssPreview();
//			//echo $selector . ' ' . $attr . ' ' . $value;
//			$s = $m->select()
//				->where('selector = ? ' , $selector)
//				->where('attr = ? ' 	, $attr)
//				->where('file = ? ' 	, $file)
//				;
//			//echo $selector . ' ' . $attr . ' ' . $value;
//			$row = $m->fetchRow($s);
//			
//			//echo $row->id;
//			
//			
//			if( $row ){
//				$row->value = $value;
//				
//			} else {
//				
//				$row = $m->createRow( array(
//					'selector' => $selector,
//					'attr'	   => $attr,
//					'value'	   => $value,
//					'file'	   => $file,
//				));
//			}
//			//Zend_Debug::dump( $row );
//			$row->save();
//		} catch(Exception $e ){
//			echo $e->getMessage();
//		}
//		//echo 'finnished';
//	}
//	
//	public function newselectorAction(){
//		
//		
//		$selector = $this->_getParam('selector');
//		$file = $this->_getParam('file');
//		
//		$m = new Css_Model_DbTable_Css();
//		$row = $m->fetchRow($m->select()->where('selector = ?', $selector)->where('file = ?', $file));
//		if(!$row){
//		$row = $m->createRow(
//			array(
//				'selector' => $selector,
//				'file' => $file
//				
//			)
//		);
//		
//		$row->save();
//		}
//		echo $row->id;
//	}
//	
//	public function renameselectorAction(){
//		
//		$file = $this->_getParam('file');
//		$selectorName = $this->_getParam('selector');
//		$selectorID = $this->_getParam('id');
//		
//		
//		$m = new Css_Model_DbTable_Css();
//		$row = $m->fetchRow($m->select()->where('id = ?', $selectorID));
//		if($row){
//			$row->selector = $selectorName;
//			$row->save();
//			
//			$this->saveCssFile($file);
//			
//			echo 'ok';
//		}
//		
//	}
//	
//	public function removeselectorAction(){
//		
//		
//		
//		$id = $this->_getParam('id');
//		
//		$m1 = new Css_Model_DbTable_Css();
//		$m2 = new Css_Model_DbTable_CssPreview();
//		
//		$m1 -> delete("id=$id");
//		$m2 -> delete("id=$id");
//		
//		echo 'done';
//	}
//	
//	
//	public function cancelAction(){
//		
//		$previewTable 	= new Css_Model_DbTable_CssPreview();
//		$cssTable 		= new Css_Model_DbTable_Css();
//		$fallBack 		= array();
//		
//		$rows 		= $previewTable->fetchAll();
//		$css 	=  array();
//		
//		foreach ($cssTable->fetchAll() as $row_css ) {
//			$css[$row_css->selector] = $row_css;
//		}
//		
//		foreach ($rows as $row) {
//			
//			$one = array(
//				'selector'	=> $row->selector,
//				'attr' 		=> $row->attr,
//				'value'		=> '',
//			);
//			
//			if( isset($css[$row->selector])){
//			
//				$r = $css[$row->selector];
//				$attr 	= $row->attr;
//				$value = $r->$attr;
//				
//				$one['value'] = $value;
//			}
//			
//			
//			$fallBack[] = $one;
//		}
//		
//		$this->getDB()->getConnection()->exec('TRUNCATE TABLE `css_preview`');
//		echo Zend_Json::encode( $fallBack );
//	}
//
//	
//	public function cssfilesAction(){
//		
//		
//		
//		//$id = $this->_getParam('id');
//		
//		//$m1 = new Css_Model_DbTable_Css();
//		$m = new Css_Model_DbTable_CssFiles();
//		
//		$this->view->files = $m -> fetchAll();
//		
//		$this->render('cssFiles');
//	}
//	
//	public function newcssfileAction(){
//		
//		$name = $this->_getParam('name');
//		
//		$m = new Css_Model_DbTable_CssFiles();
//		
//		$row = $m->fetchRow($m->select()->where('name = ?', $name));
//		
//		if(!$row){
//			$row = $m->createRow(
//				array(
//					'name' => $name
//				)
//			);
//			$row->save();
//		}
//		
//		$this->view->files = $m -> fetchAll();
//		
//		$this->render('css-files-bottom');
//		
//	}
//	
//	public function deletecssfileAction(){
//		
//		$id = $this->_getParam('id');
//		
//		$m = new Css_Model_DbTable_CssFiles();
//		
//		$m -> delete("id=$id");
//		
//		echo 'ok';
//	}
//	
//	
//	public function changecssfileAction(){
//		
//		$id = $this->_getParam('id');
//		
//		$mf = new Css_Model_DbTable_CssFiles();
//		$name = $mf->fetchRow("id=$id");
//		
//		$m = new Css_Model_DbTable_Css();
//		$s = $m->select()->where('file = ?' , $name->name )->group('selector');
//		$rows = $m->fetchAll($s);
//		$this -> view -> rows = $rows;
//		
//		$this->render('index-selector-list');
//	}
//	
//	
//	
//}

function jsencode( $obj, $json = false ){
	switch( gettype( $obj ) ){
		case 'array':
		case 'object':
			$code = array();
			// is it anything other than a simple linear array
			if( array_keys($obj) !== range(0, count($obj) - 1) ){
				foreach( $obj as $key => $val ){
					$code []= $json ?
						'"' . $key . '":' . jsencode( $val ) :
						$key . ':' . jsencode( $val );
				}
				$code = '{' . implode( ',', $code ) . '}';
			} else {
				foreach( $obj as $val ){
					$code []= jsencode( $val );
				}
				$code = '[' . implode( ',', $code ) . ']';
			}
			return $code;
			break;
		case 'boolean':
			return $obj ? 'true' : 'false' ;
			break;
		case 'integer':
		case 'double':
			return floatVal( $obj );
			break;
		case 'NULL':
		case 'resource':
		case 'unknown':
			return 'null';
			break;
		default:
			return '"' . addslashes( $obj ) . '"';
	}
}
