$(document).ready(function() {

    // 心的显示效果函数
    function heartDisplay() {
        $(".heartcontainer").mouseover(function() {
            $(this).children(".heart-hide").css("opacity",1);
        });
        $(".heartcontainer").mouseout(function() {
            $(this).children(".heart-hide").css("opacity",0);
        });
    }

    // 点赞处理函数
    function likeHandle() {
        $(".heartcontainer").click(function() {
            var heartId = $(this).attr("value");
            var heartType = $(this).attr("name");
            var localId = heartType + heartId + "like";
            if (localStorage.getItem(localId) == "1") {
                var likeHandle = 1;
            } else {
                var likeHandle = 0;
            }
            $.ajax({
                type: "GET",
                url: "http://127.0.0.1/aweight/like.handle.php?type=" + heartType + "&id=" + heartId + "&likeHandle=" + likeHandle,
                dataTypes: "json",
                success: function(data) {
                    var thisHeart = ".heartcontainer[value=" + heartId + "]";
                    if (data.success && likeHandle) {
                        $(thisHeart).children(".like").html(data.like_num);  // 修改显示数值
                        localStorage.setItem(localId, "0");  // 修改localStorage
                        var heartShowSrc = "images/icon/heart-outline.png";
                        var heartHideSrc = "images/icon/heart-fill.png";
                        // 先作初始修改避免show hide 转换
                        $(thisHeart).children(".heart-show").attr('src', heartShowSrc);
                        $(thisHeart).children(".heart-hide").css('transition', 'all 0ms ease 0ms');
                        // alert("break");
                        $(thisHeart).children(".heart-hide").css("opacity",0);
                        $(thisHeart).one("mouseout",function() {
                            $(thisHeart).children(".heart-hide").attr("src", heartHideSrc);
                            $(thisHeart).children(".heart-hide").css('transition', 'all 1200ms cubic-bezier(0.19, 1, 0.22, 1)');
                        });
                    } else {
                        if (data.success && (!likeHandle)) {
                            $(thisHeart).children(".like").html(data.like_num);  // 修改显示数据
                            localStorage.setItem(localId, "1");  // 修改localStorage
                            var heartShowSrc = "images/icon/heart-fill.png";
                            var heartHideSrc = "images/icon/heart-outline.png";
                            // 先作初始修改避免show hide 转换
                            $(thisHeart).children(".heart-show").attr('src', heartShowSrc);
                            $(thisHeart).children(".heart-hide").css('transition', 'all 0ms ease 0ms');
                            // alert("break");
                            $(thisHeart).children(".heart-hide").css("opacity",0);
                            $(thisHeart).one("mouseout",function() {
                                $(thisHeart).children(".heart-hide").attr("src", heartHideSrc);
                                $(thisHeart).children(".heart-hide").css('transition', 'all 1200ms cubic-bezier(0.19, 1, 0.22, 1)');
                            });
                        } else {
                            alert("数据库操作错误！");
                        }
                    }
                },
                error: function(textStatus, errorThrown) {
                    // alert("数据库返回值错误" + jqXHR.status);
                    alert("系统ajax交互错误: " + textStatus);
                }
            });

        });
    }

    heartDisplay();
    likeHandle();

});
