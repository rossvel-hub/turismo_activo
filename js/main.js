
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(e){
        var check = true;
        var formularioInfo = {
            'name': $("input[name='name']").val(),
            'email': $("input[name='email']").val(),
            'telephone': $("input[name='telephone']").val()
        };

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        };

        if(check == false){
            return check;
        }

        // POST data to the php file
        $.ajax({ 
            url: 'mail/mail.php', 
            data: formularioInfo,
            type: 'POST',
            success: function (data) {
                // For Notification
                //document.getElementById("sendMailForm").reset();
                $('.validate-form').trigger("reset");
                var $alertDiv = $(".mailResponse");
                $alertDiv.show();
                $alertDiv.find('.alert').removeClass('alert-danger alert-success');
                $alertDiv.find('.mailResponseText').text("");
                if(data.error){
                    $alertDiv.find('.alert').addClass('alert-danger');
                    $alertDiv.find('.mailResponseText').text("Error: intente de nuevo mas tarde.");
                }else{
                    $alertDiv.find('.alert').addClass('alert-success');
                    $alertDiv.find('.mailResponseText').text("Sus datos fueron ingresados exitosamente.");
                }
            }
        });
        e.preventDefault();
        
        
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else if($(input).attr('name') == 'name') {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


    //logica para la animacion de diapositivas
    $('#slides').each(function(){
        var delay = 5000;
        var speed = 1000;
        var itemSlide = $(this).find('.slides-item');
        var nowSlide = 0;

        $(itemSlide).hide();
        $(itemSlide[nowSlide]).show();
        nowSlide++;
        if(nowSlide >= itemSlide.length) {nowSlide = 0;}

        setInterval(function(){
            $(itemSlide).fadeOut(speed);
            $(itemSlide[nowSlide]).fadeIn(speed);
            nowSlide++;
            if(nowSlide >= itemSlide.length) {nowSlide = 0;}
        },delay);
    });
    

})(jQuery);