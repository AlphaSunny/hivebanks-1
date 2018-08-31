// 设置cookies函数
function SetCookie(name, value) {
    var now = new Date();
    var time = now.getTime();
    // 有效期2小时
    time += 3600 * 1000 * 2;
    now.setTime(time);
    document.cookie = name + "=" + escape(value) + '; expires=' + now.toUTCString();
}

// 取cookies函数
function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);

    if (arr == null) {
        window.location.href = 'CaLogin.html';
    }
}

// 取us_cookies函数
function GetUsCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);

    if (arr == null) {
        window.location.href = 'CaLogin.html';
    }
}

// 删除cookie函数
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cookieVal = GetCookie(name);
    if (cookieVal != null) document.cookie = name + "=" + cookieVal + ";expires=" + exp.toGMTString();
}

// 取得URL参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// Email格式检查
function IsEmail(s) {
    var patrn = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
    return patrn.exec(s);
}

//获取配置文件
var config_api_url = '', config_h5_url = '', userLanguage = getCookie('userLanguage');
$.ajax({
    url: '../../assets/json/config_url.json',
    async: false,
    type: "GET",
    dataType: "json",
    success: function (data) {
        config_api_url = data.api_url;
        config_h5_url = data.h5_url;
        $('.base_type').text(data.benchmark_type.toUpperCase());
        $('.ca_currency').text(data.ca_currency.toUpperCase());
        SetCookie('ca_currency', data.ca_currency.toUpperCase());
        SetCookie('benchmark_type', data.benchmark_type.toUpperCase());
        if(!userLanguage){
            SetCookie('userLanguage', data.userLanguage);
        }else {
            return;
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {

    }
});

// 调用API共通函数
function CallApi(api_url, post_data, suc_func, error_func) {

    var api_site = config_api_url + 'api/ca/';

    post_data = post_data || {};
    suc_func = suc_func || function () {
    };
    error_func = error_func || function () {
    };
    $.ajax({
        url: api_site + api_url,
        dataType: "jsonp",
        data: post_data,
        success: function (response) {
            //console.log(json.stringify(response));
            // API返回失败
            if (response.errcode != 0) {
                error_func(response);
            } else {
                // 成功处理数据
                suc_func(response);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // API错误异常
            var response = {"errcode": -1, "errmsg": '系统异常，请稍候再试'};
            // 异常处理
            error_func(response);
        }
    });
}

// 调用USER API共通函数
function CallUserApi(api_url, post_data, suc_func, error_func) {

    var api_site = config_api_url + 'api/user/';

    post_data = post_data || {};
    suc_func = suc_func || function () {
    };
    error_func = error_func || function () {
    };

    $.ajax({
        url: api_site + api_url,
        dataType: "jsonp",
        data: post_data,
        success: function (response) {
            //console.log(json.stringify(response));
            // API返回失败
            if (response.errcode != 0) {
                error_func(response);
            } else {
                // 成功处理数据
                suc_func(response);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // API错误异常
            var response = {"errcode": -1, "errmsg": '系统异常，请稍候再试'};
            // 异常处理
            error_func(response);
        }
    });
}

// 调用la API注册函数
function CallLaApi(api_url, post_data, suc_func, error_func) {
    var api_site = config_api_url + 'api/la/admin/admin/';
    post_data = post_data || {};
    suc_func = suc_func || function () {
    };
    error_func = error_func || function () {
    };
    $.ajax({
        url: api_site + api_url,
        dataType: "jsonp",
        data: post_data,
        success: function (response) {
            // API返回失败
            if (response.errcode != 0) {
                error_func(response);
            } else {
                // 成功处理数据
                suc_func(response);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // API错误异常
            var response = {"errcode": -1, "errmsg": '系统异常，请稍候再试'};
            // 异常处理
            error_func(response);
        }
    });
}

//ca充值保证金la函数
function CallLaBase(api_url, post_data, suc_func, error_func) {
    var api_site = config_api_url + 'api/base/';
    post_data = post_data || {};
    suc_func = suc_func || function () {
    };
    error_func = error_func || function () {
    };
    $.ajax({
        url: api_site + api_url,
        dataType: "jsonp",
        data: post_data,
        success: function (response) {
            // API返回失败
            if (response.errcode != 0) {
                error_func(response);
            } else {
                // 成功处理数据
                suc_func(response);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // API错误异常
            var response = {"errcode": -1, "errmsg": '系统异常，请稍候再试'};
            // 异常处理
            error_func(response);
        }
    });
}

//检查是否允许注册
function RegisterSwitch(type, suc_func, error_func) {
    var api_url = 'reg_lock.php',
        post_data = {
            'type' : type
        };
    CallLaApi(api_url, post_data, suc_func, error_func);
}

//获取图形验证码
function GetImgCode() {
    var src = config_api_url + 'api/inc/code.php';
    $('#email_imgCode').attr("src", src);
    $('#phone_imgCode').attr("src", src);
}

//邮箱注册
function EmailRegister(email, pass_word_hash, suc_func, error_func) {
    var api_url = 'mst_reg_email.php',
        post_data = {
            'email': email,
            'pass_word_hash': pass_word_hash
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//邮箱登录处理
function EmailLogin(email, pass_word_hash, cfm_code, suc_func, error_func) {
    var api_url = 'lgn_email.php',
        post_data = {
            'email': email,
            'pass_word_hash': pass_word_hash,
            'cfm_code': cfm_code
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//手机注册
function PhoneRegister(country_code, cellphone, pass_word_hash, sms_code, suc_func, error_func) {
    var api_url = 'mst_reg_phone.php',
        post_data = {
            'country_code': country_code,
            'cellphone': cellphone,
            'pass_word_hash': pass_word_hash,
            'sms_code': sms_code,
        };
    CallApi(api_url, post_data, suc_func, error_func);
};

// 重置密码(邮箱)
function ResetEmailPassword(email, cfm_code, pass_word_hash, suc_func, error_func) {
    var api_url = 'rst_pw_email.php',
        post_data = {
            'email': email,
            'cfm_code': cfm_code,
            'pass_word_hash': pass_word_hash
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//重置邮箱密码--获取验证码
function GetEmailCode(email, suc_func, error_func) {
    var api_url = 'cfm_email_preform.php',
        post_data = {
            'email': email
        };
    CallApi(api_url, post_data, suc_func, error_func)
}

// 重置密码(手机)
function ResetPhonePassword(country_code, cellphone, sms_code, pass_word_hash, suc_func, error_func) {
    var api_url = 'rst_pw_phone.php',
        post_data = {
            'country_code': country_code,
            'cellphone': cellphone,
            'sms_code': sms_code,
            'pass_word_hash': pass_word_hash
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//登录失败倒计时
function CountDown(count, ErrorNum, LoginBtn, input, LoginError) {
    var counts = count;
    if (counts != 0) {
        counts--;
        ErrorNum.text(counts);
        LoginBtn.attr('disabled', true);
        input.attr('disabled', true);
    } else {
        LoginBtn.attr('disabled', false);
        input.attr('disabled', false);
        input.val('');
        LoginError.fadeOut('fast');
        // email_cfm_code = drawPic();
        return;
    }

    setTimeout(function () {
        CountDown(counts, ErrorNum, LoginBtn, input, LoginError)
    }, 1000)
};

//获取手机验证码
function GetPhoneCode(cellphone, country_code, bind_type, cfm_code, suc_func, error_func) {
    var api_url = 'sms_send.php',
        post_data = {
            'cellphone': cellphone,
            'country_code': country_code,
            'bind_type': bind_type,
            'cfm_code': cfm_code
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//手机登录处理
function PhoneLogin(country_code, cellphone, pass_word_hash, sms_code, cfm_code, suc_func, error_func) {
    var api_url = 'lgn_phone.php',
        post_data = {
            'country_code': country_code,
            'cellphone': cellphone,
            'pass_word_hash': pass_word_hash,
            'sms_code': sms_code,
            'cfm_code': cfm_code
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//ca充值保证金
function RechargeManage(token, base_amount, suc_func, error_func) {
    var api_url = 'ca_recharge_quest.php',
        post_data = {
            'token': token,
            'base_amount': base_amount
        };
    CallLaBase(api_url, post_data, suc_func, error_func);
}

//ca提现保证金
function WithdrawManage(token, base_amount, fun_pass, suc_func, error_func) {
    var api_url = 'ca_withdraw_quest.php',
        post_data = {
            'token': token,
            'base_amount': base_amount,
            'fun_pass': fun_pass
        };
    CallLaBase(api_url, post_data, suc_func, error_func);
}

//获取保证金提现地址
function GetMarginWithdrawAddress(token, suc_func, error_func) {
    var api_url = 'get_bit_address_withdraw.php',
        post_data = {
            'token': token
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//添加保证金提现地址
function AddMarginWithdrawAddress(token, bit_address, fun_pass, suc_func, error_func) {
    var api_url = 'bit_address_withdraw_add.php',
        post_data = {
            'token': token,
            'bit_address': bit_address,
            'fun_pass': fun_pass
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//获取CA基本信息
function GetCaInformation(token, suc_func, error_func) {
    var api_url = 'mst_info_base.php',
        post_data = {
            'token': token
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//修改ca昵称
function ModifyNickName(token, ca_account, suc_func, error_func) {
    var api_url = 'alter_ca_account.php',
        post_data = {
            'token': token,
            'ca_account': ca_account
        };
    CallApi(api_url, post_data, suc_func, error_func);
};

//获取CA绑定信息
function GetCaBindInformation(token, suc_func, error_func) {
    var api_url = 'mst_info_bind.php',
        post_data = {
            'token': token
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

// CA变动记录-登录记录
function AllRecord(token, limit, offset, api_url, suc_func, error_func) {
    var post_data = {
        'token': token,
        'limit': limit,
        'offset': offset
    };
    CallApi(api_url, post_data, suc_func, error_func);
}

//获取银行列表
function GetBankList(token, suc_func, error_func) {
    var api_url = 'ca_channel_list.php',
        post_data = {
            'token': token
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//添加银行
function AddAgencyType(token, ca_channel, card_nm, name, idNum, pass_word_hash, suc_func, error_func) {
    var api_url = 'ca_asset_account_add.php',
        post_data = {
            'token': token,
            'ca_channel': ca_channel,
            'card_nm': card_nm,
            'name': name,
            'idNum': idNum,
            'pass_word_hash': pass_word_hash
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//获取添加的类型
function GetAddAgencyType(token, suc_func, error_func) {
    var api_url = 'ca_get_asset_account.php',
        post_data = {
            'token': token
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

// 文本绑定
function TextBind(token, text_type, text, text_hash, suc_func, error_func) {
    var api_url = 'bnd_text.php',
        post_data = {
            'token': token,
            'text_type': text_type,
            'text': text,
            'text_hash': text_hash,
            // 'pass_word_hash': pass_word_hash
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

// 文本修改
function TextModify(token, text_type, text, text_hash, pass_word_hash, suc_func, error_func) {
    var api_url = 'change_text.php',
        post_data = {
            'token': token,
            'text_type': text_type,
            'text': text,
            'text_hash': text_hash,
            'pass_word_hash': pass_word_hash
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

// 文件绑定
function FileBind(token, file_type, file_url, file_hash, suc_func, error_func) {
    var api_url = 'bnd_file.php',
        post_data = {
            'token': token,
            'file_type': file_type,
            'file_url': file_url,
            'file_hash': file_hash,
            // 'pass_word_hash': pass_word_hash
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//HASH绑定
function Hash(token, hash_type, hash, pass_word_hash, phone, phoneCode, suc_func, error_func) {
    var api_url = 'bnd_hash.php',
        post_data = {
            'token': token,
            'hash': hash,
            'phone': phone,
            'phoneCode': phoneCode,
            'hash_type': hash_type,
            'pass_word_hash': pass_word_hash
        };
    CallApi(api_url, post_data, suc_func, error_func);
};

//google绑定
function GoogleBind(token, email, suc_func, error_func) {
    var api_url = 'bnd_Google.php',
        post_data = {
            'token': token,
            'email': email
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//google验证
function GoogleVerify(token, code, suc_func, error_func) {
    var api_url = 'cfm_Google.php',
        post_data = {
            'token': token,
            'code': code
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//获取符合充值条件的CA列表
function GetMeetCaList(api_url, token, base_amount, suc_func, error_func) {
    var post_data = {
        'token': token,
        'base_amount': base_amount
    };
    CallApi(api_url, post_data, suc_func, error_func);
}

//获取符合提现条件的CA列表
function GetMeetWithdrawCaList(api_url, token, base_amount, suc_func, error_func) {
    var post_data = {
        'token': token,
        'base_amount': base_amount
    };
    CallApi(api_url, post_data, suc_func, error_func);
}

//分配充值提现ca
function GetAssignCa(api_url, token, ca_channel, suc_func, error_func) {
    var post_data = {
        'token': token,
        'ca_channel': ca_channel
    };
    CallApi(api_url, post_data, suc_func, error_func);
}

//锁定充值金额(充值请求)LockWithdrawAmount
function LockRechargeAmount(token, ca_id, base_amount, bit_amount, ca_channel, us_level, suc_func, error_func) {
    var api_url = 'us_recharge_quest.php',
        post_data = {
            'token': token,
            'ca_id': ca_id,
            'base_amount': base_amount,
            'bit_amount': bit_amount,
            'ca_channel': ca_channel,
            'us_level': us_level
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//获取用户余额
function GetUserBaseInfo(token, suc_func, error_func) {
    var api_url = 'info_base.php',
        post_data = {
            'token': token
        };
    CallUserApi(api_url, post_data, suc_func, error_func);
}

//获取us_account_id
function GetUsAccountId(token, ca_channel, suc_func, error_func) {
    var api_url = 'get_specified_bank_card_list.php',
        post_data = {
            'token': token,
            'cash_channel': ca_channel
        };
    CallUserApi(api_url, post_data, suc_func, error_func);
}

//锁定提现金额(提现请求)
function LockWithdrawAmount(token, ca_id, base_amount, bit_amount, ca_channel, us_level, us_account_id, suc_func, error_func) {
    var api_url = 'us_withdraw_quest.php',
        post_data = {
            'token': token,
            'ca_id': ca_id,
            'base_amount': base_amount,
            'bit_amount': bit_amount,
            'ca_channel': ca_channel,
            'us_level': us_level,
            'us_account_id': us_account_id
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//获取充值提现汇率列表
function GetRateList(token, suc_func, error_func) {
    var api_url = 'get_recharge_withdraw_rate.php',
        post_data = {
            'token': token
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//设置充值汇率
function SetRechargeRate(token, rate, minAmount, maxAmount, time, level, ca_channel, pass_word_hash, suc_func, error_func) {
    var api_url = 'set_recharge_rate.php',
        post_data = {
            'token': token,
            'recharge_rate': rate,
            'recharge_min_amount': minAmount,
            'recharge_max_amount': maxAmount,
            'limit_time': time,
            'recharge_us_level': level,
            'ca_channel': ca_channel,
            'pass_word_hash': pass_word_hash,
        };
    CallApi(api_url, post_data, suc_func, error_func)
}

//设置提现汇率
function SetWithdrawRate(token, rate, minAmount, maxAmount, time, level, ca_channel, pass_word_hash, suc_func, error_func) {
    var api_url = 'set_withdraw_rate.php',
        post_data = {
            'token': token,
            'withdraw_rate': rate,
            'withdraw_min_amount': minAmount,
            'withdraw_max_amount': maxAmount,
            'limit_time': time,
            'withdraw_us_level': level,
            'ca_channel': ca_channel,
            'pass_word_hash': pass_word_hash,
        };
    CallApi(api_url, post_data, suc_func, error_func)
}

//获取用户充值提现处理列表
function GetRechargeWithdrawList(api_url, token, type, suc_func, error_func) {
    var api_url = api_url,
        post_data = {
            'token': token,
            'type': type
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//充值请求确认处理
function RechargeConfirm(token, qa_id, type, suc_func, error_func) {
    var api_url = 'recharge_confirm.php',
        post_data = {
            'token': token,
            'type': type,
            'qa_id': qa_id
        };
    CallApi(api_url, post_data, suc_func, error_func);
};

//提现请求确认处理
function WithdrawConfirm(token, qa_id, type, transfer_tx_hash, suc_func, error_func) {
    var api_url = 'withdraw_confirm.php',
        post_data = {
            'token': token,
            'qa_id': qa_id,
            'type': type,
            'transfer_tx_hash': transfer_tx_hash
        };
    CallApi(api_url, post_data, suc_func, error_func);
}

//user提现订单详情
function GetWithdrawInfo(token, suc_func, error_func) {
    var api_url = 'order_ca_withdraw_list.php',
        post_data = {
            'token': token
        };
    CallUserApi(api_url, post_data, suc_func, error_func);
}

/**
 * 禁用按钮
 * @param $this 按钮对象
 * @param btnText 按钮文本内容 默认为"处理中"
 * @return {boolean}
 */
function DisableClick($this, btnText) {
    if (!$this) {
        console.warn("$this 不能为空");
        return true;
    }
    var status = Number($this.attr('data-clickStatus') || 1);
    if (status == 0) {
        return true;
    }

    btnText = btnText ? btnText : "loading...";
    $this.attr('data-clickStatus', 0);
    $this.html(btnText);
    return false;
}

/**
 * 激活按钮
 * @param $this 按钮对象
 * @param btnText 按钮文本内容 默认为"处理中"
 */
function ActiveClick($this, btnText) {
    if (!$this) {
        console.warn("$this 不能为空");
        return;
    }
    btnText = btnText ? btnText : "确认";
    $this.attr('data-clickStatus', 1);
    $this.html(btnText);
}

/**
 * 初始化页面loading加载
 * */
window.onload = function () {
    if (document.readyState === 'complete') {
        document.body.style.overflow = "auto";
        var loading = document.querySelector(".loading");
        loading.parentNode.removeChild(loading);
    }
};