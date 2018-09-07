$(function () {
    //get token
    var token = GetCookie('ba_token');
    GetBaAccount();

    GetImgCode();
    $('#phone_imgCode').click(function () {
        GetImgCode();
    });

    //Get binding information
    GetBindInformation(token, function (response) {
        if(response.errcode == '0'){
            var data = response.rows, cellphone = "";
            $.each(data, function (i, val) {
                if(data[i].bind_name == 'cellphone' &&  data[i].bind_flag == '1'){
                    cellphone = data[i].bind_name;
                    return;
                }
            });
            if(cellphone != "cellphone"){
                $("#goBindCellPhone").modal('show');
            }
        }
    }, function (response) {
        LayerFun(response.errcode);
        return;
    });


    //Get phone verification code
    $('.phoneCodeBtn').click(function () {
        var bind_type = '4', $this = $(this), cfm_code = $('#phoneCfmCode').val();
        if(cfm_code <= 0){
            LayerFun('pleaseImgCode');
            return;
        }
        GetPhoneCodeFun(bind_type, $this, cfm_code);
    });

    //Binding fund password
    $('.fundPasswordEnable').click(function () {
        var hash_type = 'pass_hash',
            // Get country code
            country_code = $('.selected-dial-code').text().split("+")[1],
            phone = country_code + '-' + $('#phone').val(),
            phoneCode = $('#phoneCode').val(),
            hash = hex_sha1($('#fundPassword').val()),
            password = $('#password').val(),
            pass_word_hash = hex_sha1(password);
        if ($('#fundPassword').val() == '') {
            LayerFun('funPassword');
            return;
        }

        if ($('#phone').val() == '') {
            LayerFun('phone');
            return;
        }

        if ($('#phoneCode').val() == '') {
            LayerFun('phone_code');
            return;
        }

        if (password == '') {
            LayerFun('password');
            return;
        }
        //hashFund password binding
        var $this = $(this), btnText = $this.text();
        if (DisableClick($this)) return;
        Hash(token, hash_type, hash, pass_word_hash, phone, phoneCode, function (response) {
            if (response.errcode == '0') {
                LayerFun('bind');
                ActiveClick($this, btnText);
                window.location.href = 'BaSecurity.html';
            }
        }, function (response) {
            ActiveClick($this, btnText);
            LayerFun(response.errcode);
            return;
        })
    })
});