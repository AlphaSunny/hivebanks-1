$(function () {
    var ca_channel = GetQueryString('ca_channel'),
        card_nm = GetQueryString('card_nm'),
        bit_amount = GetQueryString('bit_amount'),
        base_amount = GetQueryString('base_amount'),
        name = window.location.search,
        start = decodeURIComponent(name).indexOf('name='),
        end = decodeURIComponent(name).indexOf('&card_nm=');
    $('.bit_amount').text(bit_amount);
    $('.base_amount').text(base_amount);
    $('.card_nm').text(card_nm);
    $('.name').text(decodeURIComponent(name).substring(start + 5, end));
    $('.rechargeTypeImg').attr("src", "img/" + ca_channel.toLowerCase() + ".png");

    //复制充值地址
    $('.copy_address').click(function () {
        new ClipboardJS('.copy_address');
        LayerFun('copySuccess');
        return;
    })
});