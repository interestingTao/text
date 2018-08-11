$(function () {
  //一开始渲染页面

  var pageid = 1;
  init(pageid);

  function init() {
    //就需要执行的代码
    getIndexmenu();
  }
  var totalCount;

  function getIndexmenu() {
    //使用zpto发送请求
    $.get("http://193.112.55.79:9090/api/getmoneyctrl", {
      'pageid': pageid
    }, function (res) {
      // console.log(res);
      //template(模板的id，要渲染的数据)
      var html = template("temp", {
        data: res.result
      }, 'json');
      totalCount = Math.ceil(res.totalCount / 10);
      // console.log(totalCount)
      //渲染
      $(".v_ul").html(html);

      // 分页
      var fenHtml = "";
      for (var i = 1; i <= totalCount; i++) {
        fenHtml += "<li oliName=" + i + "/" + totalCount + " oliId=" + i + " >" + i +
          "/" +
          totalCount +
          "</li>";
      }
      $(".imitationSelect").val(pageid + "/" + totalCount);
      // console.log(fenHtml);
      $(".selectUl").html(fenHtml);
    })

  }

  // 点击下一页渲染页面
  next();

  function next() {
    $('.btn_2').click(function () {
      pageid++;
      if (pageid >= 15) {
        pageid = 1;
      }
      getIndexmenu();
    })
  }

  // 点击上一页渲染页面
  first();

  function first() {
    $('.btn_1').click(function () {
      pageid--;
      if (pageid <= 0) {
        pageid = 14;
      }
      getIndexmenu();
    })
  }


  // 选中下拉框渲染页面
  // function select() {
  //   $('#sel').on('change', function () {
  //     pageid = this.value;
  //     // console.log(pageid);
  //     init(pageid);
  //   })
  // }
  select()

  function select() {
    $(document).click(function (event) {
      var targetDom = event.target;


      if ($(targetDom).hasClass("selectBox") || $(targetDom).parents(".selectBox").length !=
        0) {
        var _that = $(this).find(".imitationSelect");
        $(_that).parent().next().toggle(); //ul弹窗展开
        $(_that).next().toggleClass("fa-caret-up") //点击input选择适合，
      } else {
        $(".inputCase .fa").removeClass("fa-caret-up").addClass("fa-caret-down")
        $(".selectUl").hide();
      }
      if ($(targetDom).attr("oliname")) {
        console.log(123);
        $(targetDom).addClass("actived_li").siblings().removeClass("actived_li"); //点击当前的添加。actived_li这个类；其他的移除这个类名
        var oliName = $(targetDom).html(); //定义一个name属性，获取点击的元素属性赋值到当前，方便动态化传值
        var oliId = !$(targetDom).attr("oliId") || $(targetDom); //定义一个id属性，获取点击的元素属性赋值到当前，方便动态化传值
        console.log(oliName);
        $(targetDom).parent().prev().children().val(oliName); //把当前点击的name赋值到显示的input的val里面
        pageid = $(targetDom).attr("oliId");
        getIndexmenu();
      }
    });
  }

})