$(function () {
    //get user token
    var token = GetCookie('user_token');
    GetUsAccount();

    //Get graphic verification code
    GetImgCode();

    //Get phone verification code
    $('.phoneCodeBtn').click(function(){
        var bind_type = '2', $this = $(this), cfm_code = $('#phoneCfmCode').val();
        if(cfm_code <= 0){
            LayerFun('pleaseImgCode');
            return;
        }
        GetPhoneCodeFun(bind_type, $this, cfm_code);
    });

    //Modify phone number binding
    $('.phoneEnable').click(function () {
        //Get country code
        var country_code = $(".selected-flag").attr("title").split("+")[1];
        var cellphone = $('#phone').val(),
            text = country_code + '-' + cellphone,
            text_hash = $('#phoneCode').val(),
            text_type = '4',
            pass_word_hash = hex_sha1($('#password').val());
        if (cellphone == '') {
            LayerFun('phoneNotEmpty');
            return;
        }
        if($('#phoneCode').val() == ''){
            LayerFun('codeNotEmpty');
            return;
        }
        if ($('#password').val() == '') {
            LayerFun('passNotEmpty');
            return;
        }

        TextModify(token, text_type, text, text_hash, pass_word_hash, function (response) {
            if (response.errcode == '0') {
                LayerFun('modifySuccess');
                return;
            }
        }, function (response) {
            LayerFun(response.errcode);
            GetImgCode();
        });
    });
});