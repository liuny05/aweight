$(document).ready(function() {

    //本是用来做动画的，后来用CSS做了，性能更好且可以方便地实现过渡效果
    /*
    $(".midpic1").mouseover(function() {
        $(this).attr('src', "images/midpic1_hover.jpg");
    });
    $(".midpic1").mouseout(function() {
        $(this).attr('src', "images/midpic1.jpg");
    });
    $(".midpic2").mouseover(function() {
        $(this).attr('src', "images/midpic2_hover.jpg");
    });
    $(".midpic2").mouseout(function() {
        $(this).attr('src', "images/midpic2.jpg");
    });
    */


    $(".midpic2, .midpic2-min").click(function() {
        // ajax填充文章
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1/aweight/article.ajax.php", // 此处容易被SQL注入！！！
            dataTypes: "json",
            success: function(data) {
                $(".photocontainer").html("");
                if (data) {
                    var str = '<p class="articlehead">Article<div class="articleheadunderline"></div></p>';
                    $.each(data, function(name, value) {
                        str += "<div class='articlelist'><a href='article.show.php?id=" + value.id + "' target='_blank' class='article-title'>" + value.title + "<br/>" + "</a><span class='article-author'>作者：" + value.author + "</span><span class='article-dateline'>日期：" + DatelineFormat(value.dateline) + "</span><p class='article-description'>" + value.description + "</p></div>";
                    });
                    $(".articlecontainer").html(str);
                } else {
                    $(".articlecontainer").html("没有文章！");
                }
            },
            error: function(jqXHR) {
                alert("填充文章发生错误" + jqXHR.status);
            }
        });
        // 平滑流动函数，依赖smoothScroll（JQ插件）
        $.smoothScroll({
            scrollTarget: '#jumpflag'
        });

    });


    $(".midpic1, .midpic1-min").click(function() {
        // ajax填充图片
        $.ajax({
            type: "GET",
            // async: false,
            url: "http://127.0.0.1/aweight/photo.ajax.php", // 此处容易被SQL注入！！！
            dataTypes: "json",
            success: function(data) {
                $(".articlecontainer").html("");
                if (data) {
                    var str = '<p class="photohead">Photography<div class="photoheadunderline"></div></p>';
                    $.each(data, function(name, value) {
                        var localId = "photo" + value.id + "like";
                        if (localStorage.getItem(localId) == "1") {
                            var heartShowSrc = "images/icon/heart-fill.png";
                            var heartHideSrc = "images/icon/heart-outline.png";
                        } else {
                            var heartShowSrc = "images/icon/heart-outline.png";
                            var heartHideSrc = "images/icon/heart-fill.png";
                        }
                        str += '<div class="photolist"><a href="photo.show.php?id=' + value.id + '" target="_blank"><img src="' + value.cover_path + '" class="photo-content"></a><p class="photo-description">' + value.description + '</p><div class="photo-gap"></div><div class="heartcontainer" name="photo" value="' + value.id + '"><img src="' + heartShowSrc + '" class="heart-show"><img src="' + heartHideSrc + '" class="heart-hide"><span class="like">' + value.like_num + '</span></div><a href="photo.show.php?id=' + value.id + '" target="_blank" class="photo-date-a"><span class="glyphicon glyphicon-calendar photo-cal-icon"></span><span class="photo-dateline">' + DatelineFormat(value.dateline) + '</span></a><a href="photo.show.php?id=' + value.id + '" target="_blank" class="photo-date-a"><span class="photo-num">#' + value.photo_num + 'P</span></a></div>';
                    });
                    $(".photocontainer").html(str);
                    likeHandle();
                    heartDisplay();
                } else {
                    $(".photocontainer").html("没有图片！");
                }
            },
            error: function(jqXHR) {
                alert("填充图片发生错误" + jqXHR.status);
            }
        });
        // 平滑流动函数，依赖smoothScroll（JQ插件）
        $.smoothScroll({
            scrollTarget: '#jumpflag'
        });

    });


    // 心的显示效果函数
    function heartDisplay() {
        $(".heartcontainer").mouseover(function() {
            $(this).children(".heart-hide").css("opacity", 1);
        });
        $(".heartcontainer").mouseout(function() {
            $(this).children(".heart-hide").css("opacity", 0);
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
                        $(thisHeart).children(".like").html(data.like_num); // 修改显示数值
                        localStorage.setItem(localId, "0"); // 修改localStorage
                        var heartShowSrc = "images/icon/heart-outline.png";
                        var heartHideSrc = "images/icon/heart-fill.png";
                        // 先作初始修改避免show hide 转换
                        $(thisHeart).children(".heart-show").attr('src', heartShowSrc);
                        $(thisHeart).children(".heart-hide").css('transition', 'all 0ms ease 0ms');
                        // alert("break");
                        $(thisHeart).children(".heart-hide").css("opacity", 0);
                        $(thisHeart).one("mouseout", function() {
                            $(thisHeart).children(".heart-hide").attr("src", heartHideSrc);
                            $(thisHeart).children(".heart-hide").css('transition', 'all 1200ms cubic-bezier(0.19, 1, 0.22, 1)');
                        });
                    } else {
                        if (data.success && (!likeHandle)) {
                            $(thisHeart).children(".like").html(data.like_num); // 修改显示数据
                            localStorage.setItem(localId, "1"); // 修改localStorage
                            var heartShowSrc = "images/icon/heart-fill.png";
                            var heartHideSrc = "images/icon/heart-outline.png";
                            // 先作初始修改避免show hide 转换
                            $(thisHeart).children(".heart-show").attr('src', heartShowSrc);
                            $(thisHeart).children(".heart-hide").css('transition', 'all 0ms ease 0ms');
                            // alert("break");
                            $(thisHeart).children(".heart-hide").css("opacity", 0);
                            $(thisHeart).one("mouseout", function() {
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

    // 日期格式化函数
    function DatelineFormat(dateline) {
        var dateInt = parseInt(dateline);
        var mydate = new Date(dateInt*1000);
        return mydate.toLocaleDateString();
    }

});
