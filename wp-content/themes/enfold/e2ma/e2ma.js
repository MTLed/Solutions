  jQuery("#e2ma_signup2").trigger('reset');
  jQuery("#formHeaderSuccess2").hide();
  jQuery(".ui.checkbox").checkbox();

  /* Get URL */
  var url = window.location.href;
  var array = url.split('index.html');

  /* Get pagename */
  var lastsegment = array[array.length-2];

  if (( lastsegment == "led-university" )) {
    var showlightbox2 = 1;
  } else {
    var showlightbox2 = 0;
  }

  // Show Form
  jQuery('#openform').bind('click', function(e) {

      // Prevents the default action to be triggered. 
      e.preventDefault();

      // Triggering bPopup when click event is fired
      jQuery('.small.modal.lb2').modal('setting', 'transition', 'vertical flip').modal('show');

  });

  // Hide Form
  jQuery('.b-close').bind('click', function(e) {

      // Prevents the default action to be triggered. 
      e.preventDefault();

      // Triggering bPopup when click event is fired
      jQuery('.small.modal.lb2').modal('hide');

  });
  /* Checks for Cookie and shows lightbox if cookie doesn't exist */ 
  if ( jQuery.cookie('PixelPaperLB') == null && showlightbox2 == 1 ) {

      setTimeout(function() {
	      jQuery('.small.modal.lb2').modal('setting', 'transition', 'vertical flip').modal('show');
      }, 15000);
      /* The value directly above controls how long the site waits before showing the form
         5000 ms = 5 second. Adjust as needed */
  }

  /* Check if the cookie exists */
  if ( jQuery.cookie('PixelPaperLB') == null && showlightbox2 == 1 ) {
      // If the cookie doesn't exist, save the cookie with the value of 1
      jQuery.cookie('PixelPaperLB', '1', {
          expires: 30
      });
  }

jQuery("#EmmaSubmit2").click(function(){

jQuery('#e2ma_signup2').form({   
  inline: true,  
    fields: {
            first_name: {
              identifier  : 'member_field_first_name2',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your First Name'
                }
              ]
            },
          email: {
            identifier  : 'email2',
            rules: [
              {
                type   : 'regExp[/^[-a-z0-9~!$%^&*_=+}{\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$/i]',
                prompt : 'Please enter a valid email'
              }
            ]
          }                                                   
        },
      onSuccess: function(){

          $form  = jQuery(this);
          $_form = jQuery(this).find('#e2ma_signup2');
          $form.addClass('loading');
          var email = jQuery("#id_email2").val();
          var fname = jQuery("#id_member_field_first_name2").val();
          var lname = jQuery("#id_member_field_last_name2").val();
          var company = jQuery("#id_member_field_company_name").val();
          var hidden = jQuery("#id_website-inquiry").val();

          /* Get Interests */
          var interests = [];
          jQuery.each(jQuery("input[name='interest']:checked"), function(){            
              interests.push("\""+jQuery(this).val()+"\"");
          });
          
          var accountId = "1777233";
          var groups = "2849361"; /* Whitepaper Form */

          var data = "{\"first_name\": \""+ fname +"\",\"last_name\": \""+ lname +"\",\"company\": \""+ company +"\",\"market-interest\": ["+ interests +"],\"website-inquiry\": \""+ hidden +"\",\"email\": \""+ email +"\",\"optInConfirmation\": false,\"accountId\": \""+accountId+"\",\"groups\": ["+groups+"]}";

          jQuery.ajax({
              type: "POST",
              cache: false,
              url : 'https://signup-collector.e2ma.net/signup',
              data: data,
              contentType: 'application/json',
              dataType: 'text',
              success: function( text ) {
                  var json = text? $.parseJSON(text) : null;
              }
            })
            .done(function(data){
                $form.removeClass('loading');
                jQuery(".replace").fadeOut("fast");
                jQuery("#formHeaderSuccess2").fadeIn("slow");
                jQuery.cookie('PixelPaperLB', '1', {expires: 365});
                
            })
            .fail(function( jqXHR, textStatus ) {
                $form.removeClass('loading');
            }
          );

          return false;
      }
    });  
    });

  jQuery("#e2ma_signup").trigger('reset');
  jQuery("#formHeaderSuccess").hide();

  /* Get URL */
  var url = window.location.href;
  var array = url.split('index.html');

  /* Get pagename */
  var lastsegment = array[array.length-2];

  if (( lastsegment == "design-build" ) || ( lastsegment == "ledrental" ) || ( lastsegment == "retail" ) || ( lastsegment == "house-of-worship" ) || ( lastsegment == "financing" )) {
    var showlightbox = 1;
  } else {
    var showlightbox = 0;
  }

  // Show Form
  jQuery('#openform').bind('click', function(e) {

      // Prevents the default action to be triggered. 
      e.preventDefault();

      // Triggering bPopup when click event is fired
      jQuery('.small.modal.lb').modal('setting', 'transition', 'vertical flip').modal('show');

  });

  // Hide Form
  jQuery('.b-close').bind('click', function(e) {

      // Prevents the default action to be triggered. 
      e.preventDefault();

      // Triggering bPopup when click event is fired
      jQuery('.small.modal.lb').modal('hide');

  });
  /* Checks for Cookie and shows lightbox if cookie doesn't exist */ 
  if ( jQuery.cookie('PixelFlexLB') == null && showlightbox == 1 ) {

      setTimeout(function() {
        jQuery('.small.modal.lb').modal('setting', 'transition', 'vertical flip').modal('show');
      }, 15000);
      /* The value directly above controls how long the site waits before showing the form
         5000 ms = 5 second. Adjust as needed */
  }

  /* Check if the cookie exists */
  if ( jQuery.cookie('PixelFlexLB') == null && showlightbox == 1 ) {
      // If the cookie doesn't exist, save the cookie with the value of 1
      jQuery.cookie('PixelFlexLB', '1', {
          expires: 30
      });
  }

jQuery("#EmmaSubmit").click(function(){
    
jQuery('#e2ma_signup').form({   
  inline: true,  
    fields: {
            first_name: {
              identifier  : 'member_field_first_name',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your First Name'
                }
              ]
            },
          email: {
            identifier  : 'email',
            rules: [
              {
                type   : 'regExp[/^[-a-z0-9~!$%^&*_=+}{\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$/i]',
                prompt : 'Please enter a valid email'
              }
            ]
          }                                                   
        },
      onSuccess: function(){

          $form  = jQuery(this);
          $_form = jQuery(this).find('#e2ma_signup');
          $form.addClass('loading');
          var email = jQuery("#id_email").val();
          var fname = jQuery("#id_member_field_first_name").val();

          var accountId = "1777233";
          var groups = "2744913";

          var data = "{\"first_name\": \""+ fname +"\",\"email\": \""+ email +"\",\"optInConfirmation\": false,\"accountId\": \""+accountId+"\",\"groups\": ["+groups+"]}";

          jQuery.ajax({
              type: "POST",
              cache: false,
              url : 'https://signup-collector.e2ma.net/signup',
              data: data,
              contentType: 'application/json',
              dataType: 'text',
              success: function( text ) {
                  var json = text? $.parseJSON(text) : null;
              }
            })
            .done(function(data){
                $form.removeClass('loading');
                jQuery(".replace").fadeOut("fast");
                jQuery("#formHeaderSuccess").fadeIn("slow");
                jQuery.cookie('PixelFlexLB', '1', {expires: 365});
                
            })
            .fail(function( jqXHR, textStatus ) {
                $form.removeClass('loading');
            }
          );

          return false;
      }
    });
});