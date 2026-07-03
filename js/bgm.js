(function () {
    var TIME_KEY = 'birthday_bgm_time';
    var PLAYING_KEY = 'birthday_bgm_playing';

    function getAudio() {
        return document.querySelector('audio[data-bgm]') || document.querySelector('audio');
    }

    window.bgmSave = function () {
        var audio = getAudio();
        if (!audio) return;
        sessionStorage.setItem(TIME_KEY, String(audio.currentTime));
        sessionStorage.setItem(PLAYING_KEY, audio.paused ? '0' : '1');
    };

    window.bgmPlay = function () {
        var audio = getAudio();
        if (!audio) return;
        sessionStorage.setItem(PLAYING_KEY, '1');
        audio.play().catch(function () {});
    };

    window.bgmGo = function (url) {
        bgmSave();
        location.href = url;
    };

    function restore() {
        var audio = getAudio();
        if (!audio) return;

        var savedTime = parseFloat(sessionStorage.getItem(TIME_KEY) || '0');
        var wasPlaying = sessionStorage.getItem(PLAYING_KEY) === '1';

        function applyAndPlay() {
            if (savedTime > 0) {
                audio.currentTime = savedTime;
            }
            if (wasPlaying) {
                audio.play().catch(function () {
                    document.addEventListener('click', function () {
                        audio.play().catch(function () {});
                    }, { once: true });
                });
            }
        }

        if (audio.readyState >= 1) {
            applyAndPlay();
        } else {
            audio.addEventListener('loadedmetadata', applyAndPlay, { once: true });
        }
    }

    window.addEventListener('beforeunload', bgmSave);
    window.addEventListener('pagehide', bgmSave);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', restore);
    } else {
        restore();
    }
})();
