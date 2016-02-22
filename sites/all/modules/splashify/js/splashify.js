Drupal.behaviors.splashify = function(context) {
  $(window).load(function() {
    var settings = Drupal.settings;
    var splash = $.jStorage.get("splash");
    var nowtimeSeconds = settings.splashify.js_nowtime;
    var splashalways = settings.splashify.js_splash_always;
    if (!splash || (splash < nowtimeSeconds) || (splashalways == '1')) {
      // Set when the splash variable should expire.
      $.jStorage.set("splash", settings.splashify.js_expiretime);

      // If we are displaying each splash page in sequence, we need to
      // determine the next url.
      if (settings.splashify.js_mode_settings.urls) {
        var new_url_index = 0;
        var last_url = $.jStorage.get('splashlasturl', '');
        var what_urls = settings.splashify.js_mode_settings.urls;
        var last_url_index = what_urls.indexOf(last_url);
        if (last_url_index > -1 && last_url_index+1 < settings.splashify.js_mode_settings.total_urls) {
          new_url_index = last_url_index + 1;
        }
        var url = what_urls[new_url_index];
        $.jStorage.set('splashlasturl', url);

        // We have the correct url, now set the main url value.
        settings.splashify.js_mode_settings.url = url;
      }

      // Do the splash action.
      if (settings.splashify.js_mode == 'colorbox') {
        if (!settings.splashify.js_mode_settings.html) {
          // Display in the full site template.
          $.colorbox({
            transition:'elastic',
            iframe:'true',
            href:settings.splashify.js_mode_settings.url,
            width:settings.splashify.js_mode_settings.size_width,
            height:settings.splashify.js_mode_settings.size_height
          });
        }
        else {
          // Just display the HTML.
          $.colorbox({
            html:settings.splashify.js_mode_settings.html,
            width:settings.splashify.js_mode_settings.size_width,
            height:settings.splashify.js_mode_settings.size_height
          });
        }
      } else if (settings.splashify.js_mode == 'redirect') {
        // Redirect
        window.location.replace(settings.splashify.js_mode_settings.url);
      } else if (settings.splashify.js_mode == 'window') {
        // Open a popup window
        window.open(settings.splashify.js_mode_settings.url, 'splash', settings.splashify.js_mode_settings.size);
      }
    }
  });
};
