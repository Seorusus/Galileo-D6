<?

class Featcher{
	
	
	/**
	 * returns html
	 *
	 * @param unknown_type $url
	 */
	public static function fetch( $url ){
		
		
		$client = new Zend_Http_Client();
		
			
		try{
			
			$client->setUri($url);
			$response = $client->request('GET');
			
			$body 		= $response->getBody();
			$headers 	= $response->getHeaders();
			
			 
		} catch (Exception $e ){
			//$row->error = 1;
			echo 'fetch error'; 
			die();
		}
			
		return	$body;
			
				
	}
}