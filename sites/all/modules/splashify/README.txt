DRUPAL SPLASHIFY MODULE
------------------------
Maintainers:
  Chris Roane (http://drupal.org/user/1283000)
Requires - Drupal 7, Library and jStorage (jQuery plugin)
License - GPL (see LICENSE)


1.0 OVERVIEW
-------------
Splashify is a full featured splash page module that is designed to be search
engine friendly. It is originally based on the Drupal 6 Splash module. It
allows you to specify a page to be displayed anywhere on your site, using one
of a few different delivery options (redirect, popup window or ColorBox). The
module also provides options specific to mobile devices.

The main focus of this module is the following:
- Be search engine friendly by redirecting via JavaScript (when applicable).
- Allow specific options for mobile devices.
- Allow different ways in delivering the splash page.
- Use ColorBox for displaying the splash page in a lightbox.
- You can have the system pick from a random list of splash pages, have a
list of splash pages show up in a specified order, display the specified
text/html in the site template or display the text/html full screen.


2.0 INSTALLATION
-----------------
1. Download and enable the "Libraries" Drupal module.
Link: http://drupal.org/project/libraries

2. Download the jStorage library. You will want to put the files either in
/sites/all/libraries/jstorage/ or /sites/[site_name]/libraries/jstorage/ .
Below is a direct link to download the zip file.
Link: https://github.com/andris9/jStorage/zipball/master

2. Download and enable the latest version of the Splashify module.
Link: http://drupal.org/sandbox/chrisroane/1423456

3. Configure the module. If the system can't find the jStorage library, it will
display an error.
Link: /config/system/splashify


2.1 CONFIGURATION
------------------
Go to "Configuration" -> "System" -> "Splashify" to find all the configuration
options.


3.0 PROBLEMS OR FEATURE REQUESTS
---------------------------------
First make sure an issue doesn't already exist. If it doesn't, create a new
issue: http://drupal.org/node/add/project-issue/1423456


LAST UPDATED
-------------
02/10/2012


SPONSORS
--------
This module has been sponsored by The Brick Factory (thebrickfactory.com).
