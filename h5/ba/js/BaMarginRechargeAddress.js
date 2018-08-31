$(function () {
   //获取token
    var token = GetCookie('ba_token');
    GetBaAccount();

    //获取充值地址get_bit_address_recharge.php
    function GetRechargeFun(){
        var tr = '', bind_agent_id = '', utime = '';
        GetMarginAddress(token, function (response) {
            if(response.errcode == '0'){
                var data = response.rows;
                if(data == false){
                    GetDataEmpty('addressBox', '3');
                }
                $.each(data, function (i, val) {
                    if(data[i].bind_agent_id == null){
                        bind_agent_id = '';
                    }else {
                        bind_agent_id = data[i].bind_agent_id;
                    }
                    if(data[i].utime == null){
                        utime = '';
                    }else {
                        utime = data[i].utime;
                    }

                    tr += '<tr>' +
                        '<td>'+ data[i].bit_address +'</td>' +
                        '<td>'+ bind_agent_id +'</td>' +
                        '<td></td>' +
                        '</tr>';
                    $('#addressBox').html(tr);
                });
            }
        }, function (response) {
            GetDataFail('addressBox', '3');
            GetErrorCode(response.errcode);
            return;
        });
    }
    GetRechargeFun();

    $('.addAddressBtn').click(function () {
        var bit_address = $('.rechargeMarginAddress').val();
        if(bit_address.length <= 0){
            LayerFun('addressNotEmpty');
            return;
        }
        AddMarginRechargeAddress(token, bit_address, function (response) {
            if(response.errcode == '0'){
                $('.rechargeMarginAddress').val('');
                GetRechargeFun();
            }
        }, function (response) {
            GetErrorCode(response.errcode);
        })
    })


});