$(function () {
    var token = GetCookie('ba_token'), limit = 10, offset = 0;
    GetBaAccount();

    //获取基准类型
    var base_type = GetCookie('benchmark_type');

    // 获取用户基本信息
    GetBasicInformation(token, function (response) {
        if (response.errcode == '0') {
            $('.bit_type').text(response.bit_type);
            $('.base_amount').text(response.base_amount);
            $('.lock_amount').text(response.lock_amount);
        }
    }, function (response) {
        return;
    });
    //获取用户充值待处理订单列表
    var api_url = 'log_us_recharge.php', type = '1', tr = '', bit_address = [], tx_hash = [];
    RechargeWithdrawCodeQuery(token, api_url, type, function (response) {
        if (response.errcode == '0') {
            var data = response.rows;
            if(data == false){
                GetDataEmpty('rechargePendingTable', '6');
                return;
            }
            $.each(data, function (i, val) {
                tr += '<tr class="rechargePendingList">' +
                    '<td><span>' + data[i].us_id + '</span></td>' +
                    '<td><span>' + data[i].base_amount + '</span></td>' +
                    '<td><span>' + data[i].asset_id + '</span>/<span>' + base_type + '</span></td>' +
                    '<td><span>' + data[i].bit_address + '</span></td>' +
                    '<td><span>' + data[i].tx_time + '</span></td>' +
                    '<td>' +
                    '<a class="btn btn-success btn-sm confirmBtn">' +
                    '<span class="i18n" name="confirmations">Confirmations</span>' +
                    '</a>' +
                    '<span class="qa_id none">' + data[i].qa_id + '</span>' +
                    '</td>' +
                    '</tr>'
            });
            $('#rechargePendingTable').html(tr);
            execI18n();
        }
    }, function (response) {
        GetDataFail('rechargePendingTable', '6');
        GetErrorCode(response.errcode);
        return;
    });

    //提现确认处理
    var qa_id = '', _this = '';
    $(document).on('click', '.confirmBtn', function () {
        $('#confirmModal').modal('show');
        qa_id = $(this).next('.qa_id').text();
        _this = $(this);
    });
    $('.againConfirmBtn').click(function () {
        var type = '1', $this = $(this), btnText = $this.text();
        if (DisableClick($this)) return;
        RechargeConfirm(token, qa_id, type, function (response) {
            if (response.errcode == '0') {
                ActiveClick($this, btnText);
                $('#confirmModal').modal('hide');
                _this.closest('.rechargePendingList').remove();
                $('.lock_amount').text(response.lock_amount);
                LayerFun('suc_processing');
                return;
            }
        }, function (response) {
            ActiveClick($this, btnText);
            GetErrorCode(response.errcode);
            return;
        })
    })
});