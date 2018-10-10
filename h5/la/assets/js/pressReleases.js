$(function () {
    //Get token
    var token = GetCookie('la_token');
    //get key_code
    var key_code = "";
    GetKeyCode(token, function (response) {
        if (response.errcode == '0') {
            key_code = response.key_code;
        }
    }, function (response) {
        LayerFun(response.errcode);
    });

    $('.summernote').summernote({
        height: 200,
        tabsize: 2,
        lang: 'zh-CN',
        focus: true,
        callbacks: {
            onImageUpload: function (files, editor, $editable) {
                var formData = new FormData();
                formData.append('file', files[0]);
                formData.append('key_code', key_code);
                $.ajax({
                    url: 'http://agent_service.fnying.com/upload_file/upload.php',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        var response = JSON.parse(data), url = response.url;
                        $('.summernote').summernote('insertImage', url, 'img');
                    }
                });
            }
        },
    });

    $(".distributeBtn").click(function () {
        var title = $("#title").val(),
            content = $(".summernote").summernote("code"),
            author = $("#author").val();
        $(".preloader-wrapper").addClass("active");
        Distribute(token, title, content, author, function (response) {
            if (response.errcode == "0") {
                $(".preloader-wrapper").removeClass("active");
                window.location.href = "news.html";
            }

        }, function (response) {
            $(".preloader-wrapper").removeClass("active");
            LayerFun("publishingFailed");
        })

    })
});