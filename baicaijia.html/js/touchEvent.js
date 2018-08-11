// touchEvent(dom).tap(function () {console.log("自己封装的tap");})

function touchEvent(dom) {
    var obj = {
        tap: function (callback) {
            var startTime;
            var startX, startY;
            dom.addEventListener("touchstart", function (e) {
                // 1 判断手指的个数
                if (e.touches.length > 1) {
                    return;
                }

                // 2 记录按下的时间  
                // Date.now()  返回 1970 1 1 到现在的时间戳 毫秒 
                // var st=new Date();
                // st.getTime();
                startTime = Date.now();

                // 3 获取开始的坐标 
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;

                // console.log(startTime,startX,startY);

            })
            dom.addEventListener("touchend", function (e) {
                // 1 判断手指的个数
                if (e.changedTouches.length > 1) {
                    return;
                }

                // 2 
                var endTime = Date.now();
                // 判断按下时长
                if (endTime - startTime > 300) {
                    return;
                }

                // 3 获取松开手的坐标
                var endX = e.changedTouches[0].clientX;
                var endY = e.changedTouches[0].clientY;

                // 判断滑动的距离  5px
                // 要判断距离 一定要加上绝对值 
                if (Math.abs(endX - startX) > 5 || Math.abs(endY - startY) > 5) {
                    return;
                }


                // 通过验证  此时可以 触发 tap的点击的逻辑
                // console.log("自己的tap");
                callback && callback(e);
            })

        },
        swipe: function (callback) {
            // 按下的时间
            var startTime;
            //  按下的坐标
            var startX, startY;

            // 按下
            dom.addEventListener("touchstart", function (e) {
                // 1 判断手指的个数
                if (e.touches.length > 1) {
                    return;
                }

                // 2 记录按下的时间
                startTime = Date.now();

                // 3 记录按下的坐标
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            })

            // 离开 
            dom.addEventListener("touchend", function (e) {
                // 1 判断手指的个数
                if (e.changedTouches.length > 1) {
                    return;
                }

                // 2 计算时间
                var endTime = Date.now();

                // 判断
                if (endTime - startTime > 800) {
                    return;
                }

                // 3 距离 和方向
                var endX = e.changedTouches[0].clientX;
                var endY = e.changedTouches[0].clientY;

                // 滑动的方向
                var direction;
                // 先判断距离
                if (Math.abs(endX - startX) > 5) {
                    // 在水平方向上发生了移动
                    direction = endX > startX ? "right" : "left";
                } else if (Math.abs(endY - startY) > 5) {
                    // 在垂直方向上发生了移动 
                    direction = endY > startY ? "down" : "up";
                } else {
                    // 没有发生移动
                    return;
                }


                // 触发滑动的逻辑
                // console.log(direction);
                callback && callback(direction);
            })


        }
    };
    return obj;
}