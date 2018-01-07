$(document).ready(function() {
    $('#contactForm').attr("action", "ajaxSend.php")
    $('#contactForm').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
	container: 'tooltip',
	feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            InputName: {
                validators: {
                    notEmpty: {
                    },
                    stringLength: {
                        min: 4,
                        max: 30,
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9äöüÄÖÜß ]+$/,
                        message: 'Der Benutzername darf nur aus Buchstaben und Zahlen bestehen'
                    },
                }
            },
            InputEmail: {
                validators: {
                    notEmpty: {
                    },
                    emailAddress: {
                    }
                }
            },
            InputMessage: {
                validators: {
                    notEmpty: {
                    },
                    stringLength: {
                        min: 15,
                    }
                }
            },
            InputSpamHidden: {
                validators: {
                    regexp: {
			regexp: /^$/i,
                        message: 'Sorry Spam-Bot, du darfst hier keine Mails schreiben!'
                    }
                }
            },
            InputSpam: {
                validators: {
                    notEmpty: {
                    },
                    stringLength: {
                        min: 1,
			max: 1
                    },
		    integer: {
		    },
		    between: {
		        max: 5,
			min: 5,
                        message: 'Bitte das richtige Ergebnis eingeben'
		    }
                }
            },
        }
    })
    .on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the messages divs.
            var formMailreturn = $('#mailreturn');

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.ajax({
		    type: 'POST',
		    url: $form.attr('action'),
		    data: $form.serialize()
	    })
	    .done(function(response) {
              // Make sure that the formMessages div has the 'success' class.
              $(formMailreturn).removeClass('hide');
              $(formMailreturn).addClass('alert-success');

              // Set the message text.
              $(formMailreturn).html('<strong>Danke</strong> ' + response);

	      // fire ga event
	      ga('send', 'event', 'Kontakt', 'Formular', 'gesendet');

            })
	    .fail(function(data) {
              // Make sure that the formMessages div has the 'error' class.
              $(formMailreturn).removeClass('hide');
              $(formMessages).addClass('alert-danger');

              // Set the message text.
              if (data.responseText !== '') {
                $(formMailreturn).html('<strong>Fehler</strong> ' + data.responseText);
              } else {
                $(formMailreturn).html('<strong>Fehler</strong> Beim versenden ihrer Mail ist ein fehler aufgetreten!');
              }

	      // fire ga event
	      ga('send', 'event', 'Kontakt', 'Formular', 'sendefehler');
	      
            })
    });
});

//fire google analytics events
var s2b;
$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() == $(document).height() && !s2b) {
		ga('send', 'event', 'Interaktion', 'Scroll2Bottom');
		s2b = true;
		//console.log('bottom');
	}
});

$('#lnkmail').on('click', function() {
	ga('send', 'event', 'Kontakt', 'Email');
        //console.log('email');
});

$('#lnkphone').on('click', function() {
        ga('send', 'event', 'Kontakt', 'Telefon');
	//console.log('phone');
});

$('#lnkmap').on('click', function() {
        ga('send', 'event', 'Kontakt', 'GoogleMap');
        //console.log('map');
});

$('#lnkfb').on('click', function() {
        ga('send', 'event', 'Kontakt', 'Facebook');
        //console.log('fb');
});

$('#lnkgp').on('click', function() {
        ga('send', 'event', 'Kontakt', 'Google+');
        //console.log('g+');
});

$('#btnreadon').on('click', function() {
        ga('send', 'event', 'Interaktion', 'Weiterlesen');
        //console.log('readon');
});

$('#navwhy').on('click', function() {
        ga('send', 'event', 'Interaktion', 'Navigation', 'Warum');
        //console.log('why');
});

$('#navwhy2').on('click', function() {
	ga('send', 'event', 'Interaktion', 'Navigation', 'Warum');
        //console.log('why2');
});

$('#navoffer').on('click', function() {
	ga('send', 'event', 'Interaktion', 'Navigation', 'Angebot');
        //console.log('offer');
});

$('#navoffer2').on('click', function() {
	ga('send', 'event', 'Interaktion', 'Navigation', 'Angebot');
        //console.log('offer2');
});

$('#navadvant').on('click', function() {
	ga('send', 'event', 'Interaktion', 'Navigation', 'Vorteil');
        //console.log('advant');
});

$('#navadvant2').on('click', function() {
        ga('send', 'event', 'Interaktion', 'Navigation', 'Vorteil');
        //console.log('advant2');
});

$('#navabout').on('click', function() {
        ga('send', 'event', 'Interaktion', 'Navigation', 'Uber Mich');
        //console.log('about');
});

$('#navprice').on('click', function() {
        ga('send', 'event', 'Interaktion', 'Navigation', 'Kosten');
        //console.log('price');
});

$('#navcontact').on('click', function() {
        ga('send', 'event', 'Interaktion', 'Navigation', 'Kontakt');
        //console.log('contact');
});

