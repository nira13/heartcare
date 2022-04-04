jQuery(document).ready(function($){
    $(".owl-carousel-play .owl-carousel").each( function(){
        var config = {
            navigationText: ["<span class='fa fa-angle-left'></span>","<span class='fa fa-angle-right'></span>"],
            paginationSpeed : 200,
            autoHeight: true,
            responsive: true,
            navSpeed : 10,
        }; 

        var owl = $(this);
        if( $(this).data('slide') == 1 ){
            config.singleItem = true;
        }else {
            config.items = $(this).data( 'slide' );
        }

        if ($(this).data('autoplay')) {
            config.autoPlay = $(this).data('autoplay');
        }

        if ($(this).data('speed')) {
            config.slideSpeed = $(this).data('speed');
        }
        if ($(this).data('slideby')) {
            config.slideBy = $(this).data('slideby');
        }
        if ($(this).data('loop')) {
            config.loop = $(this).data('loop');
        }
        if ($(this).data('margin')) {
            config.margin = $(this).data('margin');
        }
        if ($(this).data('navigation')) {
            config.navigation = $(this).data('navigation');
        }
        if ($(this).data('pagination')) {
            config.pagination = $(this).data('pagination');
        }
        if ($(this).data('rtl')) {
            config.rtl = $(this).data('rtl');
        }
        if ($(this).data('mousedrag')) {
            config.mouseDrag = $(this).data('mousedrag');
        }
        if ($(this).data('touchdrag')) {
            config.touchDrag = $(this).data('touchdrag');
        }
        if ($(this).data('customitem')) {
            config.itemsCustom = $(this).data('customitem');
        }
        if ($(this).data('desktop')) {
            config.itemsDesktop = [1199,$(this).data('desktop')];
        }
        if ($(this).data('desktopsmall')) {
            config.itemsDesktopSmall = [979,$(this).data('desktopsmall')];
        }
        if ($(this).data('tablet')) {
            config.itemsTablet = [768,$(this).data('tablet')];
        }
        if ($(this).data('tabletsmall')) {
            config.itemsTabletSmall = [640,$(this).data('tabletsmall')];
        }
        if ($(this).data('mobile')) {
            config.itemsMobile = [479,$(this).data('mobile')];
        }
        $(this).owlCarousel( config );
        $('.opalmedical-left',$(this).parent()).click(function(){
          owl.trigger('owl.prev');
          return false; 
        });
        $('.opalmedical-right',$(this).parent()).click(function(){
            owl.trigger('owl.next');
            return false; 
        });
    } );

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");

    $("#sync2").on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo",number);
    });

    $('form.opalmedical-contact-form').submit(function(){

        var data = $('form.opalmedical-contact-form').serialize();

        $.ajax({
            url: ajaxurl,
            type:'POST',
            dataType: 'json',
            data:  'action=send_email_contact&' + data
        }).done(function(reponse) {
            var $parent = $('form.opalmedical-contact-form').parent();
            $("form.opalmedical-contact-form input,form.opalmedical-contact-form textarea").val('');
            if( $parent.find('#doctor-contact-notify').length > 0 ){
                $parent.find('#doctor-contact-notify').html( reponse.msg  );
            }else {
                $('.opalmedical-contact-forms').prepend('<p id="doctor-contact-notify" class="'+ reponse.status +'">'+ reponse.msg +'</p>');
            }
        });

        return false;
    });

    //------------------
    /*
    * Light Box for Form Booking Ajax
    */
    $('.btn-appointment ').each(function() { 
        $(this).attr('href',ajaxurl+"?action=appointment_form");
        $(this).magnificPopup({
          type: 'ajax',
          focus: '.appointment_name',
          midClick: true,
          closeBtnInside:true,
          callbacks: {
            ajaxContentAdded: function() {
                /**
                * Validate form Booking
                */
                $(".appointment_post_form_v2").validate({    
                  submitHandler: function(form) {
                    $('.modal').addClass('loading');
                    var data = $(form).serialize();
                        $.ajax({
                        url: ajaxurl,
                        type:'POST',
                        dataType: 'json',
                        data:  'action=appointment_post&' + data
                    }).done(function(reponse) {
                            $('.modal').removeClass("loading");
                            if (reponse.status == "success") {
                            $('.appointment-message').html( reponse.msg );
                            $('.appointment-message').addClass("alert alert-success");
                            $('.appointment-message').removeClass("alert-danger");
                            $('.appointment-message').focus();
                            $(".appointment_post_form_v2 input, .appointment_post_form_v2 textarea").val('');
                            $('.appointment_action').val("appointment_post");
                        }else{
                            $('.modal').removeClass("loading");
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
                // Ajax content is loaded and appended to DOM
                $('.appointment_date').datetimepicker({
                    timepicker:false,
                    format:'m/d/Y'
                });
                // Ajax content is loaded and appended to DOM
                $('.appointment_time').datetimepicker({
                    datepicker:false,
                    format:'H:i'
                });
            },
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '.appointment_name';
                }
            },
            close:function() {
                $('.appointment-message').html('');
                $('.appointment-message').removeClass('alert alert-success');

            },
            }  
        });
        
    });

    jQuery(".box-info").fitVids();

    $( '.departments-filter a' ).click( function() {
        $('.departments-all').hide();
        $( '.'+$(this).data('target') ).show();
    } );
    /* end */
    //------------------
    /**
    * Light Box for Video
    */
    $('.popup-youtube').each(function() { // the containers for all your galleries
        $(this).magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    });

});