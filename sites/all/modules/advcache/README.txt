Advanced caching module by Robert Douglass
http://drupal.org/project/advcache
Contact: http://drupal.org/user/5449/contact

For Drupal 5.x, specifically rolled against DRUPAL-5-1

## What it does ##
The advanced caching module is mostly a set of patches and a supporting module
to bring caching to Drupal core in places where it is needed yet currently
unavailable. These include caching nodes, comments, taxonomy (terms, trees,
vocabularies and terms-per-node), path aliases, and search results.

The module maintains a series of dedicated cache tables and utilizes Drupal's
caching API to safely and effeciently cache data. The main beneficiary from
these caching strategies will be authenticated users who have only one role
(ie, non-admins). This is a group of site users that are traditionally unaffected
by Drupal's page cache mechanism.

## How it does it ##
Beyond installing and enabling the advcache module, you must apply some or all
of the patches that come with it. The typical pattern for applying patches is:

  cd path/to/Drupal/
  patch < sites/all/modules/advcache/search_cache.patch

You may have to answer some questions about the locations of the files that
are to be patched.

Here is a description of the included patches and whether there are any reasons
you shouldn't use them:

block_cache.patch - Caches the list of enabled blocks per user per theme. This
avoids a very expensive query and the processing of the resultset in PHP.
This patch shaves 1.5 ms off of each and every page load, anonymous as well as
authenticated, on my MacBook. This patch is compatible with the blockcache module.
In fact, the two compliment each other.

comment_cache.patch - Caches built comments. "New" markers show up as expected
and you will still be able to change the display of the comments (flat, threaded
etc.).

forum_cache.patch - Caches the forum structure, which is a relatively heavy
block of PHP code with several SQL queries. This patch violates any
modules that rewrite taxonomy queries. Please notify me of examples of modules
that use db_rewrite_sql to rewrite taxonomy queries so that I can update the
documentation. If you have any such modules do not apply this patch.

node_cache.patch - Caches built nodes for authenticated users with exactly one
role. If you don't ever have this type of user on your site (eg nobody but you,
the site admin, ever logs in), then you don't need this patch. Otherwise this
is perhaps the biggest performance enhancer of the group.

path_cache.patch - Caches the results of drupal_lookup_path() per page. If you
don't have the path module turned on and you don't have any path aliases at all,
you don't need this patch. Otherwise this will cut one query per page for every
link on that page. Thus if you have pages that have hundreds of links, this patch
will cut hundreds of queries from that page. This patch is the same patch that
is currently found here, minus the changes to system.module and system.install:
http://drupal.org/node/100301

search_cache.patch - Caches search results for popular search queries for
authenticated, non-admin users who have only one user role. This patch cannot
work with any node_access moudules (such as organic groups). The patch is smart
enough to do nothing if you have modules that control node access installed,
but if this is the case then you are better of not applying the patch.

taxonomy_cache.patch - Caches built taxonomy trees, terms and vocabularies. Most
importantly, it caches the terms-per-node for nodes. This patch violates any
modules that rewrite taxonomy queries. Please notify me of examples of modules
that use db_rewrite_sql to rewrite taxonomy queries so that I can update the
documentation. If you have any such modules do not apply this patch.

## Upgrading to new releases Advcache ##

Eventually new releases of the advcache module will appear. Improvements and
bugfixes will come along and you'll want to upgrade. Since you have patched
core Drupal files, there are special considerations. You must first unpatch
Drupal. Fortunately this is not any harder than patching in the first place.
To unpatch, you repeat the process that you used when patching, only you use
the -R flag to tell patch to do it in reverse:

  cd path/to/Drupal/
  patch -R < sites/all/modules/advcache/search_cache.patch

## Memcache or other caching backends ##
The fact that these patches all use the generic Drupal caching API is a boon to
anyone who wants to use other caching backends. In particular, top site speeds
can be achieved using these patches in conjunction with the Memcache API and Int-
egration project: http://drupal.org/project/memcache

## TODO ##
- Benchmarks
