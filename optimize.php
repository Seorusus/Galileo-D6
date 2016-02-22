<?php
$db = mysql_connect('localhost','easysite_galilDB','TxB6Ghwuu91p');
if(!$db) {echo "cannot connect to the database";}else {
  mysql_select_db('easysite_restore');
  $result=mysql_query('OPTIMIZE TABLE accesslog,cache,comments,node,users,watchdog,cache_block,cache_filter,cache_form,cache_page,history,node_revisions,search_total,variable,sessions,semaphore,cache_menu,menu_links,search_dataset,views_display,views_object_cache;');
}
echo mysql_error();



?>