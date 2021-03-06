<?php

/**
 * @file
 * Performance module detail logging related functions. Can be overridden by
 * adding $conf['performance_detail_logging'] = 'path/to/your/file' in
 * settings.php.
 */

/**
 * Helper function to store detailed data in database.
 * @param $params
 *  an array containing the following keys: mem, timer, query_count, query_timer
 *  anon, path, language, data.
 * @return void
 */
function performance_log_details($params = array()) {
  db_query("INSERT INTO {performance_detail}
    (path, anon, bytes, ms, timestamp, query_timer, query_count, language, data)
    VALUES ('%s', %d, %d, %d, %d, %d, %d, '%s', '%s')",
    $params['path'],
    $params['anon'],
    $params['mem'],
    (int)$params['timer'],
    time(),
    (int)$params['query_timer'],
    $params['query_count'],
    $params['language'],
    $params['data']
  );
}

/**
 * Detail page callback.
 * @return string
 *  HTML to be displayed by Drupal.
 */
function performance_view_details() {
  drupal_set_title(t('Performance logs: Details'));

  $header = array(
    array('data' => t('#'), 'field' => 'pid', 'sort' => 'desc'),
    array('data' => t('Path'), 'field' => 'path'),
    array('data' => t('Date'), 'field' => 'timestamp'),
    array('data' => t('Memory (MB)'), 'field' => 'bytes'),
    array('data' => t('ms (Total)'), 'field' => 'ms'),
    array('data' => t('Language'), 'field' => 'language'),
    array('data' => t('Anonymous?'), 'field' => 'anon'),
  );
  if (variable_get(PERFORMANCE_QUERY_VAR, 0)) {
    $header[] = array('data' => t('# Queries'), 'field' => 'query_count');
    $header[] = array('data' => t('Query ms'),  'field' => 'query_timer');
  }

  $pager_height = 50;
  $sql = 'SELECT * FROM {performance_detail}';
  $tablesort = tablesort_sql($header);
  $result = pager_query($sql . $tablesort, $pager_height);

  $rows = array();

  while ($data = db_fetch_object($result)) {
    $row_data = array();
    $row_data[] = $data->pid;
    $row_data[] = l($data->path, $data->path);
    $row_data[] = format_date($data->timestamp, 'small');
    $row_data[] = number_format($data->bytes / 1024 / 1024, 2);
    $row_data[] = $data->ms;
    $row_data[] = $data->language;
    $row_data[] = ($data->anon) ? t('Yes') : t('No');

    if (variable_get(PERFORMANCE_QUERY_VAR, 0)) {
      $row_data[] = $data->query_count;
      $row_data[] = $data->query_timer;
    }

    $rows[] = array('data' => $row_data);
  }

  if (empty($rows) && !variable_get('performance_detail', 0)) {
    return t('Detail performance log is not enabled. Go to the !link to enable it.', array('!link' => l(t('settings page'), PERFORMANCE_SETTINGS, array('query' => drupal_get_destination()))));
  }
  elseif (empty($rows)) {
    $rows[] = array(array('data' => t('No log messages available.'), 'colspan' => count($header)));
  }
  elseif (!variable_get('performance_detail', 0)) {
    drupal_set_message(t('Detail performance log is not enabled! Showing stored logs.'), 'warning');
  }

  $output  = theme('table', $header, $rows);
  $output .= theme('pager', NULL, $pager_height, 0);
  $output .= l(t('Clear logs'), 'admin/reports/performance-logging/clear/details');

  return $output;
}

/**
 * Helper function to clear the detail logs.
 * @return void
 */
function performance_clear_details() {
  db_query('TRUNCATE {performance_detail}');
}

/**
 * Helper function to prune detail log on cron.
 * @return void
 */
function performance_prune_details() {
  db_query("DELETE FROM {performance_detail} WHERE timestamp <= %d", time() - (24 * 60 * 60));
}
