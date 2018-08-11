$(function () {
    // 获取idproductId;
    var productId = location.search.slice(11);

    // console.log(productId);
    // 发送请求渲染页面
    $.get('http://193.112.55.79:9090/api/getmoneyctrlproduct', {
        'productid': productId
    }, function (res) {
        var data = res.result[0];

        console.log(data);
        //模板引擎
        var html = template('temp', {
            'data': data
        });
        $('.main').html(html);
    }, 'json')


    $('#top').tap(function () {
        $('html').scrollTop(0);
    })

    /* 发表评论 */
    // 事件委托
    $(".main").on("tap", "#ctl00_ContentBody_Button1", function () {
        var val = $("textarea").val().trim();
        console.log(val)
        if (val == "") {
            console.log(123);
            return false;
        };

        // 3 获取本地存储中的数据 数组 [] | 真正的数组
        // 获取已经存在的数据 => 数组
        var arr = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];

        //3.5 先判断以前有没有数据 有存在 删除掉以前的数据 
        for (var i = 0; i < arr.length; i++) {
            var element = arr[i];
            // 判断数组中是否存在有相同的数据
            if (element == val) {
                // 删除
                // arr.splice(要删除数据的索引,要删除几个)
                arr.splice(i, 1);
            }
        }

        // 4 把值插入到数组中
        // unshift()把数据插入到数组的头部里 
        arr.unshift(val);

        // 5 转类型
        var jsonArr = JSON.stringify(arr);

        // 6 存入到本地存储中
        localStorage.setItem("goods", jsonArr);

        // 7 马上更新数据
        renderData()
        $(".tiShi").css({
            opacity: 1,
            transition: "opacity 1s"
        })
        setTimeout(function () {
            $(".tiShi").css({
                opacity: 0,
                transition: "opacity 1s"
            })
        }, 2000)
    })
    //获取当前时间
    function p(s) {
        return s < 10 ? '0' + s : s;
    }

    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
    // console.log(now);
    function renderData() {
        /* 
        1 获取本地存储中的数据
        2 循环 
            动态拼接 li标签
        3 把html字符串渲染到ul标签里面!!! 
         */
        // 1
        var arr = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];

        // 2 循环
        var htmlStr = "";
        for (var i = 0; i < arr.length; i++) {
            // 每一个要渲染的数据选项
            var data = arr[0];
            var htmlStr = "<li>" + "<div class = 'userimg'>" +
                "<img src='../img/3-1FQ5154432.jpg'>" +
                "</div>" +
                "<div class='con'>" +
                "<div class='name clearfix'>" +
                "<div class= 'username'>" + "社会我进哥" + "</div>" + "<div class='time'>" + now +
                "</div>" +
                "</div>" +
                "<div class='content'>" + data + "</div>" +
                "</div>" + "</li>";
        }
        // 3 拼接结束了
        $(".list ul").prepend(htmlStr);
        $("textarea").val("");
    }
})