$(function () {
    var token = GetCookie('ba_token'), cellphone = '';
    GetBaAccount();
    //    获取绑定信息
    GetBindInformation(token, function (response) {
        if (response.errcode == '0') {
            var data = response.rows,
                security_level = parseInt(response.security_level);
            $('.leave .progress-bar').css('width', security_level * 10 + '%');
            $('.levelNum').text(security_level);

            // 安全等级
            $.each(data, function (i, val) {
                //手机是否绑定
                if(data[i].bind_name == 'cellphone' && data[i].bind_flag == '1'){
                    cellphone = 'cellphone';
                    $('.phoneTime').removeClass('i18n').text($(this)[0].ctime).addClass('isTime');
                    $('.phoneBind').fadeOut('fast');
                    $('.phoneModify').fadeIn('fast');
                    $('.phoneIcon').addClass('greenIcon icon-duihao').removeClass('symbol icon-gantanhao');
                }

                //邮箱是否绑定
                if(data[i].bind_name == 'email' && data[i].bind_flag == '1'){
                    $('.emailTime').removeClass('i18n').text($(this)[0].ctime).addClass('isTime');
                    $('.emailBind').fadeOut('fast');
                    $('.emailModify').fadeIn('fast');
                    $('.emailIcon').addClass('greenIcon icon-duihao').removeClass('symbol icon-gantanhao');
                }

                //google是否认证
                if(data[i].bind_name == 'GoogleAuthenticator' && data[i].bind_flag == '1'){
                    $('.googleTime').removeClass('i18n').text($(this)[0].ctime).addClass('isTime');
                    $('.googleBind').fadeOut('fast');
                    // $('.fileModify').fadeIn('fast');
                    $('.googleIcon').addClass('greenIcon icon-duihao').removeClass('symbol icon-gantanhao');
                }

                //密码hash是否绑定
                if(data[i].bind_name == 'pass_hash' && data[i].bind_flag == '1'){
                    $('.fundPasswordTime').removeClass('i18n').text($(this)[0].ctime).addClass('isTime');
                    $('.fundPasswordBind').fadeOut('fast');
                    $('.fundPasswordModify').fadeIn('fast');
                    $('.fundPasswordIcon').addClass('greenIcon icon-duihao').removeClass('symbol icon-gantanhao');
                }

                //身份认证是否绑定
                if(data[i].bind_name == 'idPhoto' && data[i].bind_flag == '1'){
                    $('.authenticationTime').removeClass('i18n').text($(this)[0].ctime).addClass('isTime');
                    $('.authenticationBind').fadeOut('fast');
                    // $('.authenticationModify').fadeIn('fast');
                    $('.authenticationIcon').addClass('greenIcon icon-duihao').removeClass('symbol icon-gantanhao');
                }
            })
        }
    }, function (response) {
        if (response.errcode == '114') {
            window.location.href = 'BaLogin.html';
        }
        GetErrorCode(response.errcode);
        return;
    });

    //前往资金密码绑定
    $('.fundPasswordBind, .fundPasswordModify').click(function () {
        if(cellphone != 'cellphone') {
            $('#goBindCellPhone').modal('show');
            return;
        }else {
            window.location.href = 'BaFundPasswordBind.html';
        }
    });
    $('.fundPasswordModify').click(function () {
        if(cellphone != 'cellphone') {
            $('#goBindCellPhone').modal('show');
            return;
        }else {
            window.location.href = 'BaFundPasswordModify.html';
        }
    });

    //    登录记录查询
    var api_url = 'log_login.php', limit = 10, offset = 0, n = 0;

    function loginCode(token, limit, offset) {
        var tr = '', pageCount = '';
        ChangeCode(token, limit, offset, api_url, function (response) {
            if (response.errcode == '0') {
                var data = response.rows;
                if(data.length <= 0){
                    $('.eg').hide();
                }
                pageCount = Math.ceil(response.total / limit);
                $('.totalPage').text(pageCount);
                $.each(data, function (i, val) {
                    tr+='<tr>' +
                        '<td class="i18n" name="'+ data[i].lgn_type +'">'+ data[i].lgn_type.substr(0, 20) + '...' +'</td>' +
                        '<td>'+ data[i].ctime +'</td>' +
                        '<td>'+ data[i].ba_ip +'</td>' +
                        '<td>'+ data[i].ip_area +'</td>' +
                        '</tr>';
                });
                $('#login_code').html(tr);
                execI18n();
                if(n == 0){
                    Page(pageCount);
                };
                n++;
            }
        }, function (response) {
            if (response.errcode == '114') {
                window.location.href = 'BaLogin.html';
            }
            GetErrorCode(response.errcode);
            return;
        });
    }
    loginCode(token, limit, offset, api_url);
    //    分页
    function Page(pageCount){
        $('.login_log_code').pagination({
            pageCount: pageCount,
            callback: function (api) {
                offset = (api.getCurrent() - 1) * limit;
                $('.currentPage').text(api.getCurrent());
                loginCode(token, limit, offset, api_url);
            }
        });
    }
});