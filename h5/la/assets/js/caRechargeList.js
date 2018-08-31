$(function () {
    //获取token
    var token = GetCookie('la_token');

    //获取ca交易记录
    var tr = '', ca_id_arr = [], us_id_arr = [], tx_hash_arr = [], qa_flag_span = '';
    GetCaTransaction(token, function (response) {
        if(response.errcode == '0'){
            var rechargeList = response.rows.recharge;
            if(rechargeList == ''){
                GetDataEmpty('caRecharge', '6');
                return;
            }
            $.each(rechargeList, function (i, val) {
                ca_id_arr.push(rechargeList[i].ca_id.substring(0,10) + '...');
                us_id_arr.push(rechargeList[i].us_id.substring(0,10) + '...');
                tx_hash_arr.push(rechargeList[i].tx_hash.substring(0,10) + '...');
                if(rechargeList[i].qa_flag == '0'){
                    qa_flag_span = '<span class="i18n" name="unprocessed">未处理</span>';
                }
                if(rechargeList[i].qa_flag == '1'){
                    qa_flag_span = '<span class="i18n" name="processed">已处理</span>';
                }
                if(rechargeList[i].qa_flag == '2'){
                    qa_flag_span = '<span class="i18n" name="notRejected">已拒绝</span>';
                }
                tr+='<tr>' +
                    '<td><a href="javascript:;" class="ba_id" title="'+ rechargeList[i].ba_id +'">'+ ca_id_arr[i] +'</a></td>' +
                    '<td><a href="javascript:;" class="us_id" title="'+ rechargeList[i].us_id +'">'+ us_id_arr[i] +'</a></td>' +
                    // '<td><span class="asset_id">'+ rechargeList[i].asset_id +'</span></td>' +
                    '<td><span class="base_amount">'+ rechargeList[i].base_amount +'</span></td>' +
                    // '<td><span class="bit_amount">'+ rechargeList[i].bit_amount +'</span></td>' +
                    '<td><span class="tx_hash" title="'+ rechargeList[i].tx_hash +'">'+ tx_hash_arr[i] +'</span></td>' +
                    '<td><span class="tx_time">'+ rechargeList[i].tx_time +'</span></td>' +
                    '<td><span class="qa_flag">'+ qa_flag_text +'</span></td>' +
                    '</tr>'
            });
            $('#caRecharge').html(tr);
            execI18n();
        }
    }, function (response) {
        GetErrorCode(response.errcode);
        return;
    });

    //进入ba详情
    $(document).on('click', '.ca_id', function () {
        var ba_id = $(this).attr('title');
        window.location.href = 'caInfo.html?ba_id=' + ca_id;
    });
    //进入user详情
    $(document).on('click', '.us_id', function () {
        var us_id = $(this).attr('title');
        window.location.href = 'userInfo.html?us_id=' + us_id;
    });

    //条件筛选
    $("input[type=checkbox]").click(function () {
        var className = $(this).val();
        if ($(this).prop('checked')) {
            $('.' + className).fadeIn();
            $('.' + className).children('div').css('display', 'flex');
        } else {
            console.log('empty');
            $('.' + className).fadeOut();
        }
    });

    //点击搜索按钮进行筛选
    $('.searchBtn').click(function () {
        var from_time = $('#from_time').val(), to_time = $('#to_time').val(), tx_time = $('#tx_time').val(),
            qa_id = $('#qa_id').val(), us_id = $('#us_id').val(), us_account_id = $('#us_account_id').val(),
            asset_id = $('#asset_id').val(), ba_account_id = $('#ba_account_id').val(), tx_hash = $('#tx_hash').val(),
            base_amount = $('#base_amount').val(), bit_amount = $('#bit_amount').val(), tx_detail = $('#tx_detail').val(),
            tx_fee = $('#tx_fee').val(), tx_type = $('#tx_type').val(), qa_flag = $('#qa_flag').val(),
            ba_id = $('#ba_id').val();
        SearchCaTransaction(from_time, to_time, tx_time, qa_id, us_id, us_account_id, asset_id, ba_account_id, tx_hash,
            base_amount, bit_amount, tx_detail, tx_fee, tx_type, qa_flag, ba_id, function (response) {
                if(response.errcode == '0'){
                    console.log(response);
                }
            }, function (response) {
                GetErrorCode(response.errcode);
                return;
            })
    });

    //设置开始时间
    $('#from_time').datetimepicker({
        format: 'Y/m/d H:i',
        value: new Date(),
        // minDate: new Date(),//设置最小日期
        // minTime: new Date(),//设置最小时间
        // yearStart: 2018,//设置最小年份
        yearEnd: 2050 //设置最大年份
    });
    //设置结束时间
    $('#to_time, #tx_time').datetimepicker({
        format: 'Y/m/d H:i',
        value: new Date(),
        // minDate: new Date(),//设置最小日期
        // minTime: new Date(),//设置最小时间
        // yearStart: 2018,//设置最小年份
        yearEnd: 2050 //设置最大年份
    });
});