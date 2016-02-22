<?php

/**
 * @file
 * XML sitemap integration functions for xmlsitemap.module.
 */

class XMLSitemapException extends Exception {}

class XMLSitemapGenerationException extends XMLSitemapException {}

/**
 * Extended class for writing XML sitemap files.
 */
class XMLSitemapWriter extends XMLWriter {
  protected $uri = NULL;
  protected $sitemapElementCount = 0;
  protected $linkCountFlush = 500;
  protected $sitemap = NULL;
  protected $sitemap_page = NULL;
  protected $rootElement = 'urlset';

  /**
   * Constructor.
   *
   * @param $sitemap
   *   The sitemap array.
   * @param $page
   *   The current page of the sitemap being generated.
   */
  function __construct(stdClass &$sitemap, $page) {
    $this->sitemap = $sitemap;
    $this->sitemap_page = $page;
    $this->uri = xmlsitemap_sitemap_get_file($sitemap, $page);
    $this->openUri($this->uri);
  }

  public function openUri($uri) {
    if ($realpath = realpath($uri)) {
      // Convert to a real path if possible. Sometimes this function returns
      // a FALSE value, so use the original value when that happens.
      $uri = $realpath;
    }
    $return = parent::openUri($uri);
    if (!$return) {
      throw new XMLSitemapGenerationException(t('Could not open file @file for writing.', array('@file' => $uri)));
    }
    return $return;
  }

  public function startDocument($version = '1.0', $encoding = 'UTF-8', $standalone = NULL) {
    $this->setIndent(FALSE);
    $result = parent::startDocument($version, $encoding);
    if (!$result) {
      throw new XMLSitemapGenerationException(t('Unknown error occurred while writing to file @file.', array('@file' => $this->uri)));
    }
    if (variable_get('xmlsitemap_xsl', 1)) {
      $this->writeXSL();
    }
    $this->startElement($this->rootElement, TRUE);
    return $result;
  }

  public function getSitemapUrl($path, array $options = array()) {
    $options += $this->sitemap->uri['options'];
    $options += array(
      'absolute' => TRUE,
      'base_url' => variable_get('xmlsitemap_base_url', $GLOBALS['base_url']),
      'language' => language_default(),
      'alias' => TRUE,
    );
    if (!empty($options['protocol_relative'])) {
      $options['base_url'] = preg_replace('~^https?:~', '', $options['base_url']);
    }
    return url($path, $options);
  }

  /**
   * Add the XML stylesheet to the XML page.
   */
  public function writeXSL() {
    $this->writePi('xml-stylesheet', 'type="text/xsl" href="' . $this->getSitemapUrl('sitemap.xsl', array('protocol_relative' => TRUE)) . '"');
    $this->writeRaw(PHP_EOL);
  }

  /**
   * Return an array of attributes for the root element of the XML.
   */
  public function getRootAttributes() {
    $attributes['xmlns'] = 'http://www.sitemaps.org/schemas/sitemap/0.9';
    if (variable_get('xmlsitemap_developer_mode', 0)) {
      $attributes['xmlns:xsi'] = 'http://www.w3.org/2001/XMLSchema-instance';
      $attributes['xsi:schemaLocation'] = 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd';
    }
    return $attributes;
  }

  public function generateXML() {
    return xmlsitemap_generate_chunk($this->sitemap, $this, $this->sitemap_page);
  }

  public function startElement($name, $root = FALSE) {
    parent::startElement($name);

    if ($root) {
      foreach ($this->getRootAttributes() as $name => $value) {
        $this->writeAttribute($name, $value);
      }
      $this->writeRaw(PHP_EOL);
    }
  }

  /**
   * Write an full XML sitemap element tag.
   *
   * @param $name
   *   The element name.
   * @param $element
   *   An array of the elements properties and values.
   */
  public function writeSitemapElement($name, array &$element) {
    $this->writeElement($name, $element);
    $this->writeRaw(PHP_EOL);

    // After a certain number of elements have been added, flush the buffer
    // to the output file.
    $this->sitemapElementCount++;
    if (($this->sitemapElementCount % $this->linkCountFlush) == 0) {
      $this->flush();
    }
  }

  /**
   * Write full element tag including support for nested elements.
   *
   * @param string $name
   *   The element name.
   * @param string|array $content
   *   The element contents or an array of the elements' sub-elements.
   *
   * @todo Missing a return value since XMLWriter::writeElement() has one.
   */
  public function writeElement($name, $content = NULL) {
    if (is_array($content)) {
      $this->startElement($name);
      $xml_content = format_xml_elements($content);
      // Remove additional spaces from the output.
      $xml_content = str_replace(array(" <", ">\n"), array("<", ">"), $xml_content);
      $this->writeRaw($xml_content);
      $this->endElement();
    }
    else {
      parent::writeElement($name, $content);
    }
  }

  public function getURI() {
    return $this->uri;
  }

  public function getSitemapElementCount() {
    return $this->sitemapElementCount;
  }

  public function endDocument() {
    $return = parent::endDocument();

    if (!$return) {
      throw new XMLSitemapGenerationException(t('Unknown error occurred while writing to file @file.', array('@file' => $this->uri)));
    }

    //if (xmlsitemap_var('gz')) {
    //  $file_gz = $file . '.gz';
    //  file_put_contents($file_gz, gzencode(file_get_contents($file), 9));
    //}

    return $return;
  }

  /**
   * Explicitly define the writeRaw() function since it is not available
   * before PHP 5.2.
   */
  public function writeRaw($content) {
    static $writeraw_parent;

    if (!isset($writeraw_parent)) {
      $writeraw_parent = method_exists('XMLWriter', 'writeRaw');
    }

    return $writeraw_parent ? parent::writeRaw($content) : parent::text($content);
  }
}

class XMLSitemapIndexWriter extends XMLSitemapWriter {
  protected $rootElement = 'sitemapindex';

  function __construct(stdClass &$sitemap, $page = 'index') {
    parent::__construct($sitemap, 'index');
  }

  public function getRootAttributes() {
    $attributes['xmlns'] = 'http://www.sitemaps.org/schemas/sitemap/0.9';
    if (variable_get('xmlsitemap_developer_mode', 0)) {
      $attributes['xmlns:xsi'] = 'http://www.w3.org/2001/XMLSchema-instance';
      $attributes['xsi:schemaLocation'] = 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd';
    }
    return $attributes;
  }

  public function generateXML() {
    $lastmod_format = variable_get('xmlsitemap_lastmod_format', XMLSITEMAP_LASTMOD_MEDIUM);

    for ($i = 1; $i <= $this->sitemap->chunks; $i++) {
      $element = array(
        'loc' => $this->getSitemapUrl('sitemap.xml', array('query' => array('page' => $i))),
        // @todo Use the actual lastmod value of the chunk file.
        'lastmod' => gmdate($lastmod_format, REQUEST_TIME),
      );
      $this->writeSitemapElement('sitemap', $element);
    }
  }
}

/**
 * Implements hook_xmlsitemap_link_info().
 */
function xmlsitemap_xmlsitemap_link_info() {
  return array(
    'frontpage' => array(
      'label' => t('Frontpage'),
      'xmlsitemap' => array(
        'settings callback' => 'xmlsitemap_link_frontpage_settings',
      ),
    ),
  );
}

/**
 * XML sitemap link type settings callback for frontpage link entity.
 */
function xmlsitemap_link_frontpage_settings(&$form) {
  module_load_include('admin.inc', 'xmlsitemap');
  if (user_access('administer site configuration')) {
    $form['#description'] = t('The front page path can be changed in the <a href="@url-frontpage">site information configuration</a>.', array('@url-frontpage' => url('admin/settings/site-information')));
  }
  $form['xmlsitemap_frontpage_priority'] = array(
    '#type' => 'select',
    '#title' => t('Priority'),
    '#options' => xmlsitemap_get_priority_options(),
    '#default_value' => variable_get('xmlsitemap_frontpage_priority', 1.0),
  );
  $form['xmlsitemap_frontpage_changefreq'] = array(
    '#type' => 'select',
    '#title' => t('Change frequency'),
    '#options' => xmlsitemap_get_changefreq_options(),
    '#default_value' => variable_get('xmlsitemap_frontpage_changefreq', XMLSITEMAP_FREQUENCY_DAILY),
  );
  return $form;
}

/**
 * Implements hook_xmlsitemap_link_alter().
 */
function xmlsitemap_xmlsitemap_link_alter(&$link) {
  // Alter the frontpage priority.
  if ($link['type'] == 'frontpage' || $link['loc'] == '' || $link['loc'] == drupal_get_normal_path(variable_get('site_frontpage', 'node'))) {
    $link['priority'] = variable_get('xmlsitemap_frontpage_priority', 1.0);
    $link['changefreq'] = variable_get('xmlsitemap_frontpage_changefreq', XMLSITEMAP_FREQUENCY_DAILY);
  }
}

/**
 * Implements hook_xmlsitemap_links().
 */
function xmlsitemap_xmlsitemap_links() {
  // Frontpage link.
  $links[] = array(
    'type' => 'frontpage',
    'id' => 0,
    'loc' => '',
  );
  return $links;
}

/**
 * Implements hook_xmlsitemap_sitemap_operations().
 */
function xmlsitemap_xmlsitemap_sitemap_operations() {
  $operations['update'] = array(
    'label' => t('Update cached files'),
    'action past' => t('Updated'),
    'callback' => 'xmlsitemap_sitemap_multiple_update',
  );
  return $operations;
}

/**
 * XML sitemap operation callback; regenerate sitemap files using the batch API.
 *
 * @param $smids
 *   An array of XML sitemap IDs.
 *
 * @see xmlsitemap_regenerate_batch()
 */
function xmlsitemap_sitemap_multiple_update(array $smids) {
  module_load_include('generate.inc', 'xmlsitemap');
  $batch = xmlsitemap_regenerate_batch($smids);
  batch_set($batch);
}