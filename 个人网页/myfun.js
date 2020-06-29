$(function () {

    function test() {
        console.log("niaho");
    }
    var myVideo1 = $("#myVideo");
    // 视频总时间
 
    // 当视频可以播放的时候就执行这个函数
    myVideo1.bind('canplay', function () {

        var theLeft =  $('#void_radius').position().left; 
        myVideo1[0].volume = theLeft;
        console.log( '出始声音的值' + theLeft);

        // 点击播放
        $("#stopCondition_img").click(function () {
            $("#startCondition").css('display', 'block');
            $("#stopCondition").css('display', 'none');
           
            if (myVideo1[0].paused) {
                myVideo1[0].play();
            }
        });
        // 点击暂停
        $("#startCondition_img").click(function () {
            $("#startCondition").css('display', 'none');
            $("#stopCondition").css('display', 'block');
            if (myVideo1[0].play) {
                myVideo1[0].pause();
            }
        });
        // 更新时间
        myVideo1.bind("timeupdate", function () {
            // 实际时间
            var nowTime = myVideo1[0].currentTime;
            $("#nowTime").text(timeToString(nowTime));
            // 总时间
           var allTime = myVideo1[0].duration;

            // 进度条走动实现
            var activeProgress =Math.floor(nowTime / allTime * 100 )+ "%";
            $("#progress").css({'width':activeProgress});
          
            // 圆点自动走动
            var scoll =Math.floor (nowTime / allTime  * 364 ) - 3 +  "px";
               $("#progress_btn").css({'left':scoll});


        });
        // 总时间
        var time = myVideo1[0].duration;
        $('#allTime').text(timeToString(time));
        // 进度条点击加快
        $('#progress_content').click(function (event) {
            var cur_a = event.offsetX;
            var tol_a = $('#progress_content').width();
            var persent = cur_a / tol_a * 100 + '%';
            $('#progress').css('width', persent);
            // 点击圆点实现
            $("#progress_btn").css({ position: "absolute", 'left': cur_a - 10 + "px" });
            //  实际声音实现
            myVideo1[0].currentTime = (cur_a / tol_a) * myVideo1[0].duration;
        });

        // 声音的调整
        $('#voidContent').click(function (event) {
            var cur_w = event.offsetX;
            var tol_w = $('#voidContent').width();
            var persent = cur_w / tol_w * 100 + '%';
            $('#voidProgress').css('width', persent);
            //  点击圆点实现
            $("#void_radius").css({ position: "absolute", 'left': cur_w - 10 + "px" });
            // 实际进度实现
            myVideo1[0].volume = cur_w / tol_w;

            console.log(cur_w);
            if(cur_w == 0){
                myVideo1[0].volume=0;
            }

            // if()
        });
        // 全屏实现
        $('#fullSree_img').click(function () {
            if (myVideo1[0].webkitRequestFullScreen) {
                myVideo1[0].webkitRequestFullScreen();
            } else if (myVideo1[0].mozRequestFullScreen) {
                myVideo1[0].mozRequestFullScreen();
            } else if (myVideo1[0].msRequestFullscreen()) {
                myVideo1[0].msRequestFullscreen();
            }
        });

    });

});
// 更新时间的函数
function timeToString(time) {
    var second = Math.floor(time % 60);
    var mind = Math.floor(time / 60);
    mind = mind < 9 ? ("0" + mind) : (mind + "");
    second = second < 9 ? ("0" + second) : (second + "");
    return mind + ":" + second;

}