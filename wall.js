// Photo wall: on wide screens, pin photos on the empty side margins, one by one, while the secret letter types.
// On phones and narrow windows nothing changes: the photos stay inside the letter as before.
$(function () {
    var css =
        '.wall-pic{position:fixed;z-index:1;pointer-events:none;box-sizing:border-box;background:#fff;padding:8px 8px 24px;' +
        'box-shadow:0 16px 30px -12px rgba(0,0,0,.8);opacity:0;transform:translateY(14px) rotate(var(--r));transition:opacity 1.4s ease,transform 1.4s ease}' +
        '.wall-pic.on{opacity:1;transform:rotate(var(--r))}' +
        '.wall-pic img{display:block;width:100%;height:100%;object-fit:cover}' +
        '.wall-pic:before{content:"";position:absolute;top:-11px;left:50%;width:64px;height:20px;margin-left:-32px;transform:rotate(-4deg);' +
        'background:repeating-linear-gradient(45deg,rgba(242,167,187,.95) 0 6px,rgba(255,238,244,.95) 6px 12px);box-shadow:0 1px 4px rgba(0,0,0,.3)}' +
        'body:not(.wall-on) .wall-pic{display:none}' +
        'body.wall-on #photo-row{display:none!important}';
    $('<style>').text(css).appendTo('head');

    // ratio = width / height. Order = reveal order. Edit this list to change the photos.
    var items = [
        { src: 'photos/sky.jpg',     side: 'L', ratio: 4 / 3, rot: -4 },
        { src: 'photos/trees.jpg',   side: 'R', ratio: 3 / 4, rot: 3 },
        { src: 'photos/funny.jpg',   side: 'L', ratio: 3 / 4, rot: 3 },
        { src: 'photos/flowers.jpg', side: 'R', ratio: 3 / 4, rot: -3 }
    ];
    items.forEach(function (it) {
        it.el = $('<div class="wall-pic"><img alt="" src="' + it.src + '"></div>').css('--r', it.rot + 'deg').appendTo('body');
    });

    function layout() {
        var W = window.innerWidth, H = window.innerHeight;
        var scale = Math.min(W / 1100, H / 680) * 0.95;      // same scale the page uses for its stage
        var margin = (W - 1100 * scale) / 2;                 // empty space on each side
        var on = W > 820 && margin >= 170;
        $('body').toggleClass('wall-on', on);
        if (!on) return;
        ['L', 'R'].forEach(function (side) {
            var list = items.filter(function (i) { return i.side === side; });
            var wmax = Math.min(200, margin - 40), f = 1, sizes, total, gap;
            for (;;) {
                sizes = list.map(function (i) { var w = wmax * f; return { w: w, h: w / i.ratio }; });
                total = sizes.reduce(function (a, s) { return a + s.h; }, 0);
                gap = (H - total) / (list.length + 1);
                if (gap >= 16 || f < 0.45) break;
                f *= 0.92;
            }
            var top = gap;
            list.forEach(function (it, k) {
                var s = sizes[k];
                var x = side === 'L' ? (margin - s.w) / 2 : W - margin + (margin - s.w) / 2;
                it.el.css({ width: s.w, height: s.h, left: x, top: top });
                top += s.h + gap;
            });
        });
    }
    layout();
    $(window).on('resize', layout);

    // Start pinning photos once the secret letter begins; one every 14 seconds
    var poll = setInterval(function () {
        if ($('#special-wish-container').css('display') !== 'none') {
            clearInterval(poll);
            items.forEach(function (it, k) {
                setTimeout(function () { it.el.addClass('on'); }, 2000 + k * 14000);
            });
        }
    }, 500);
});
