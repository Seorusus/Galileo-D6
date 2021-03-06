// $Id: simplenews.js,v 1.1.4.1 2010/08/19 01:53:44 mirodietiker Exp $

/**
 * Set text of Save button dependent on the selected send option.
 */
Drupal.behaviors.simplenewsCommandSend = function (context) {
  var simplenewsSendButton = function () {
    switch ($(".simplenews-command-send :radio:checked").val()) {
      case '0':
        $('.simplenews-submit').attr({value: Drupal.t('Save')});
        break;
      case '1':
        $('.simplenews-submit').attr({value: Drupal.t('Save and send')});
        break;
      case '2':
        $('.simplenews-submit').attr({value: Drupal.t('Save and send test')});
        break;
    }
  }
  
  // Update send button at page load and when a send option is selected.
  $(function() { simplenewsSendButton(); });
  $(".simplenews-command-send").click( function() { simplenewsSendButton(); });
  
  
}
