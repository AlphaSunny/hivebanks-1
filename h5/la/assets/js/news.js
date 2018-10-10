$(function () {
    //get token
    var token = GetCookie("la_token");

    function GetNewsListFun() {
        //get news list
        $(".preloader-wrapper").addClass("active");
        GetNewsList(token, function (response) {
            if (response.errcode == "0") {
                $(".preloader-wrapper").removeClass("active");
                var data = response.rows, tr = "";
                if (data == null) {
                    GetDataEmpty("newsList", "4");
                    return;
                }
                $.each(data, function (i, val) {
                    tr += "<tr class='newsItem'>" +
                        "<td><span>" + data[i].title + "</span></td>" +
                        "<td><span>" + data[i].author + "</span></td>" +
                        "<td><span>" + data[i].ctime + "</span></td>" +
                        "<td>" +
                        "<span class='news_id none'>" + data[i].news_id + "</span>" +
                        "<button class='btn btn-success modifyNewsBtn i18n' name='modify'>modify</button>" +
                        "<button class='btn btn-danger margin-left-2 deleteNewsBtn i18n' name='delete'>delete</button>" +
                        "</td>" +
                        "</tr>"
                });
                $("#newsList").html(tr);
                execI18n();
            }

        }, function (response) {
            $(".preloader-wrapper").removeClass("active");
            GetDataFail("newsList", "4");
            LayerFun(response.errcode);
        });
    }
    GetNewsListFun();

    //delete news
    $(document).on("click", ".deleteNewsBtn", function () {
        var news_id = $(this).siblings(".news_id").text(), _this = $(this);
        $(".preloader-wrapper").addClass("active");
        DeleteNews(token, news_id, function (response) {
            if (response.errcode == "0") {
                $(".preloader-wrapper").removeClass("active");
                LayerFun("successfullyDeleted");
                _this.closest(".newsItem").remove();
                GetNewsListFun();
            }
        }, function (response) {
            $(".preloader-wrapper").removeClass("active");
            LayerFun("failedToDelete");
        })
    })

});