// Gentle petals that drift behind the tree and the letter after "Enter Her World" is clicked.
(function () {
    var btn = document.querySelector('#lock-screen .btn-main');
    if (!btn) return;
    btn.addEventListener('click', function () {
        setTimeout(function () {
            var count = window.innerWidth < 820 ? 10 : 18;   // lower this number for fewer petals
            for (var i = 0; i < count; i++) {
                var p = document.createElement('div');
                var s = 8 + Math.random() * 9;
                p.className = 'petal';
                p.style.left = (Math.random() * 100) + 'vw';
                p.style.width = s + 'px';
                p.style.height = s * 0.8 + 'px';
                p.style.animationDuration = (14 + Math.random() * 12) + 's';
                p.style.animationDelay = (-Math.random() * 20) + 's';
                p.style.setProperty('--sway', ((Math.random() - 0.5) * 160) + 'px');
                document.body.appendChild(p);
            }
        }, 2500);
    });
})();
