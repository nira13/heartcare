(function($) {
	"use strict";
	$(document).ready(function() {

		/**
		* Validate form Booking
		*/
		$(".appointment_post_form").validate({	  
		  submitHandler: function(form) {
		  	$('.modal').addClass('loading');
		  	var data = $(form).serialize();
	        	$.ajax({
	            url: ajaxurl,
	            type:'POST',
	            dataType: 'json',
	            data:  'action=appointment_post&' + data,
	            error: function(jqXHR, textStatus, errorThrown){   
	            	$('.modal').removeClass("loading");                                     
				      console.error("The following error occured: " + textStatus, errorThrown);                                                       
				    },
	        }).done(function(reponse) {
	        		$('.modal').removeClass("loading");
	        		if (reponse.status == "success") {
	            	$('.appointment-message').html( reponse.msg );
	            	$('.appointment-message').addClass("alert alert-success");
	            	$('.appointment-message').removeClass("alert-danger");
	            	$('.appointment-message').focus();
	            	$(".appointment_post_form input, .appointment_post_form textarea").val('');
	            	$('.appointment_action').val("appointment_post");
	            }else{
	            	$('.appointment-message').html( reponse.msg );
	            	$('.appointment-message').addClass("alert alert-danger");
	            	$('.appointment-message').removeClass("alert-success");
	            	$('.appointment-message').focus();
	            }  
	        });
	      
		  },
		  errorContainer: ".mesagetooltips",
  		  errorLabelContainer: ".mesagetooltips",
		  rules: {
		    appointment_date: {
		      required: true,
		      date: true
		    },
		    appointment_mail: {
		      required: true,
		      email: true,
		    },
		    appointment_phone: {
		      required: true,
		      number: true
		    }
		  	}, // end Rule
		  	messages: {
			   appointment_name: "Please specify your name",
			   appointment_mail: {
			      required: "We need your email address to contact you",
			      email: "Your email address must be in the format of name@domain.com"
			   },
			   appointment_phone: {
			      required: "We need your phone number to contact you",
			      number: "Required is number"
			   },

  			}
		});

		// load datetime picker
		$('.appointment_date').each(function(){
			$(this).datetimepicker({
	  			timepicker:false,
	  			format:'m/d/Y'
  			});
		});
		$('.appointment_time').datetimepicker({
  			datepicker:false,
  			format:'H:i'
		});
	});
}(jQuery));