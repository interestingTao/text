$(function () {
    // navTmp
    $.ajax({
        type: 'get',
        url: 'http://193.112.55.79:9090/api/getbaicaijiatitle',
        // data:{},
        dataType: 'json',
        success: function (res) {
            console.log(res);
            var htmlStr = template("navTmp", {
                data: res.result
            })
            // console.log(htmlStr.data);
            $("nav ul").html(htmlStr);
        }
    })


    // goodsTmpa
    var id = 0;
    suib(id);
    function suib(id) {
        $.ajax({
            type: 'get',
            url: 'http://193.112.55.79:9090/api/getbaicaijiaproduct',
            dataType: 'json',
            data: {
                titleid: id
            },
            success: function (res) {
                console.log(res);
                var htmlStr = template("goodsTmp", {
                    data: res.result,
                })
                $(".goods ul").html(htmlStr);
            }
        })
    }

    $("nav").on("click", "li", function () {
        // console.log(this);
         id = $(this).attr("id");
        suib(id);
        // console.log(titleid);

    })


    // 导航栏滑动
    navScroll();

    function navScroll(params) {
        var nav_ul = document.querySelector('.nav').getElementsByTagName("ul")[0];
        var lis_a = nav_ul.getElementsByTagName("a");
        var myScroll = new IScroll('.nav', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false
        });
        // 给li添加被选中类名
        touchEvent(nav_ul).tap(function (e) {
            // console.log(e.target);
            var liDom = e.target;
            myScroll.scrollToElement(liDom);
            activeLi(liDom);
        })

        function activeLi(dom) {
            for (var i = 0; i < lis_a.length; i++) {
                var li_a = lis_a[i];
                li_a.classList.remove("active");
            }
            dom.classList.add("active");
        }
    }

})