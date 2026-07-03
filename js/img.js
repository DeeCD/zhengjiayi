$(function () {

    let li = $('.img-li');
    let leng = li.length;

    // 左右各两张，坐标相对整个屏幕（viewport）
    var positions = [
        { side: 'left',  h: '2%',  v: 'top',    vVal: '8%',  rotate: -10 },
        { side: 'left',  h: '2%',  v: 'bottom', vVal: '10%', rotate: 8 },
        { side: 'right', h: '2%',  v: 'top',    vVal: '10%', rotate: 12 },
        { side: 'right', h: '2%',  v: 'bottom', vVal: '12%', rotate: -6 }
    ];

    function animateFct(i, done) {
        var pos = positions[i] || positions[0];
        var item = li.eq(i);
        var data = {};

        item.css({ top: 'auto', left: 'auto', right: 'auto', bottom: 'auto' });

        if (pos.side === 'left') {
            item.css({
                left: '-120%',
                top: pos.v === 'top' ? pos.vVal : 'auto',
                bottom: pos.v === 'bottom' ? pos.vVal : 'auto'
            });
            data.left = pos.h;
        } else {
            item.css({
                right: '-120%',
                top: pos.v === 'top' ? pos.vVal : 'auto',
                bottom: pos.v === 'bottom' ? pos.vVal : 'auto'
            });
            data.right = pos.h;
        }

        item.css({ zIndex: i + 1, transform: 'rotate(' + pos.rotate + 'deg)' });
        item.find('img').css({ width: '220px', height: '300px' });
        item.show();

        item.stop().animate(data, 2200, done);
    }

    function animateAll(index) {
        if (index >= leng) {
            setTimeout(showMemoriesModal, 1000);
            return;
        }
        animateFct(index, function () {
            setTimeout(function () {
                animateAll(index + 1);
            }, 500);
        });
    }

    function showMemoriesModal() {
        var modal = $('#memoriesModal');
        modal.fadeIn(400);
        modal.find('.memories-btn').on('click', function (e) {
            e.preventDefault();
            bgmGo('Memories.html');
        });
    }

    $('.begin').click(function () {
        $(this).hide();
        bgmPlay();
        animateAll(0);
    });
});
