// Cute layer: a little cat peeks over the letter, and "Bye" gets a "No, no, no..." back.
$(function () {
    var css =
        '#cat{position:absolute;top:-62px;right:34px;width:96px;z-index:1000;cursor:pointer;display:none;-webkit-tap-highlight-color:transparent}' +
        '#cat svg{width:100%;display:block;overflow:visible}' +
        '#cat .eye{transform-box:fill-box;transform-origin:center;animation:catblink 5s infinite}' +
        '#cat .ear-l{transform-box:fill-box;transform-origin:bottom center;animation:cattwitch 7s infinite}' +
        '#cat-bubble{position:absolute;bottom:100%;right:0;margin-bottom:6px;width:max-content;max-width:190px;padding:8px 14px;border-radius:14px;background:#f3e9e4;color:#2a1830;font:italic 600 16px/1.3 "Cormorant Garamond",Georgia,serif;opacity:0;transform:translateY(6px);transition:.35s;pointer-events:none}' +
        '#cat-bubble.on{opacity:1;transform:none}' +
        '#cat-bubble:after{content:"";position:absolute;top:100%;right:30px;border:7px solid transparent;border-top-color:#f3e9e4}' +
        '#final-popup.nono{animation:nono .5s}' +
        '@keyframes catblink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}' +
        '@keyframes cattwitch{0%,90%,100%{transform:rotate(0)}94%{transform:rotate(-12deg)}}' +
        '@keyframes nono{0%,100%{transform:translate(-50%,-50%)}25%{transform:translate(calc(-50% - 9px),-50%)}75%{transform:translate(calc(-50% + 9px),-50%)}}';
    $('<style>').text(css).appendTo('head');

    var fur = '#f6e9e2', edge = '#e2cdc4', ink = '#2a1830';
    var cat =
        '<div id="cat"><div id="cat-bubble"></div>' +
        '<svg viewBox="0 0 96 70" xmlns="http://www.w3.org/2000/svg">' +
        '<polygon class="ear-l" points="14,38 20,6 44,22" fill="' + fur + '" stroke="' + edge + '"/>' +
        '<polygon points="82,38 76,6 52,22" fill="' + fur + '" stroke="' + edge + '"/>' +
        '<polygon points="20,30 23,14 36,23" fill="#f2a7bb"/><polygon points="76,30 73,14 60,23" fill="#f2a7bb"/>' +
        '<ellipse cx="48" cy="44" rx="40" ry="26" fill="' + fur + '" stroke="' + edge + '"/>' +
        '<ellipse class="eye" cx="34" cy="42" rx="3.4" ry="4.4" fill="' + ink + '"/>' +
        '<ellipse class="eye" cx="62" cy="42" rx="3.4" ry="4.4" fill="' + ink + '"/>' +
        '<circle cx="24" cy="52" r="5" fill="#f7a8bb" opacity=".6"/><circle cx="72" cy="52" r="5" fill="#f7a8bb" opacity=".6"/>' +
        '<path d="M45 49h6l-3 3.5z" fill="#e58aa3"/>' +
        '<path d="M48 52.5q-3 4-6.5 1.5M48 52.5q3 4 6.5 1.5" stroke="' + ink + '" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
        '<path d="M12 48L2 46M12 52L2 54M84 48L94 46M84 52L94 54" stroke="#cdb7ae" stroke-linecap="round"/>' +
        '<ellipse cx="30" cy="68" rx="9" ry="5" fill="' + fur + '" stroke="' + edge + '"/>' +
        '<ellipse cx="66" cy="68" rx="9" ry="5" fill="' + fur + '" stroke="' + edge + '"/>' +
        '</svg></div>';
    $('#text').append(cat);

    // Only the lines from your own letter
    var lines = ['Happy 23rd Birthday, Christine! 🎂', 'No, no, no… stay! 🐾', 'Waiting for you…', 'Stay a little longer 🥺', 'I love you so much ❤️'];
    var timer, last = 0;
    function say(msg) {
        $('#cat-bubble').text(msg).addClass('on');
        clearTimeout(timer);
        timer = setTimeout(function () { $('#cat-bubble').removeClass('on'); }, 3600);
    }
    $('#cat').on('click', function () {
        var i; do { i = 1 + Math.floor(Math.random() * (lines.length - 1)); } while (i === last);
        last = i; say(lines[i]);
        if (typeof triggerHearts === 'function') triggerHearts(6);
    });
    var poll = setInterval(function () {
        if ($('#code').css('display') !== 'none') {
            clearInterval(poll);
            $('#cat').fadeIn(800);
            setTimeout(function () { say(lines[0]); }, 1200);
        }
    }, 400);

    // Final popup: Bye -> "No, no, no..." -> she can stay (and close)
    var origClose = window.closePopup, stayed = false;
    $('#final-popup .btn-main').text('Bye 👋');
    window.closePopup = function () {
        if (stayed) { origClose(); return; }
        stayed = true;
        $('#final-popup p').html('<span class="highlight-dancing">No, no, no…</span><br>Stay a little longer. 🥺');
        $('#final-popup .btn-main').text("Okay, I'll stay 🥰");
        $('#final-popup').addClass('nono');
        setTimeout(function () { $('#final-popup').removeClass('nono'); }, 600);
        if (typeof triggerHearts === 'function') triggerHearts(25);
    };
});
