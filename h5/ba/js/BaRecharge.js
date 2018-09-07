$(function () {
    //get token
    var token = GetUsCookie('user_token');
    var us_level = GetUsCookie('us_level');
    GetUsAccount();

    //get us_id
    var us_id = GetUsCookie('us_id');

    //Get parameters
    var bit_type = GetUsCookie('re_bit_type');

    $('.bit_type').text(bit_type);

    //choose ba
    var api_url = 'assign_recharge_ba.php', ba_id = '', bit_type = bit_type, base_rate='', min_amount='', max_amount='';
    GetBaItem(api_url, token, bit_type, function (response) {
        if (response.errcode == '0') {
            $('.base_rate').text(response.base_rate);
            ba_id = response.ba_id;
            base_rate = response.base_rate;
            min_amount = response.min_amount;
            max_amount = response.max_amount;
            $('.recharge_max_amount').text(max_amount);
            $('.recharge_min_amount').text(min_amount);
            $('.recharge_ctime').text(response.set_time);
            $('.bit_amount').val(response.min_amount);
            if(base_rate <= 0){
                $('.base_amount').val(0);
            }else {
                $('.base_amount').val((response.min_amount) / base_rate);
            }

        }

    }, function (response) {
        LayerFun(response.errcode);
        return;
    });

    //bind input
    $('.bit_amount').bind('input porpertychange', function () {
        if(base_rate <= 0){
            $('.base_amount').val(0);
        }else {
            $('.base_amount').val($('.bit_amount').val() / base_rate);
        }
    });
    $('.base_amount').bind('input porpertychange', function () {
        if(base_rate <= 0){
            $('.base_amount').val(0);
        }else {
            $('.bit_amount').val($(this).val() * base_rate);
        }
    });

    //lockRechargeAmount（Customer recharge request）
    $('.lockAmountBtn').click(function () {
        var base_amount = $('.base_amount').val(),
            bit_amount = $('.bit_amount').val();
        if(bit_amount < min_amount){
            LayerFun('notSmallAmount');
            return;
        }
        if(bit_amount > max_amount){
            LayerFun('notLagAmount');
            return;
        }
        //Lock judgment
        var $this = $(this), btnText = $this.text();
        if (DisableClick($this)) return;
        LockAmount(token, ba_id, base_amount, bit_amount, bit_type, us_level, function (response){//锁定
            if(response.errcode == '0'){
                ActiveClick($this, btnText);
                SetCookie('bit_address',response.bit_address);
                $('#lockRecharge').modal('show');
                readingTime(5);
            }
        }, function(response){
            ActiveClick($this, btnText);
            LayerFun(response.errcode);
            return;
        });
    });
    $('.ruleBtn').click(function () {
        window.location.href = 'BaRechargeAddress.html?bit_type='+bit_type;
    });

    //阅读规则时间倒计时
    function readingTime(time) {
        var timer = null;
        timer = setInterval(function () {
            if (time != 0) {
                time--;
                $('.ruleBtn').text(time + 's').attr('disabled', true);
            } else {
                clearInterval(timer);
                $('.ruleBtn').attr('disabled', false);
                execI18n();
            }
        }, 1000);
    }
});