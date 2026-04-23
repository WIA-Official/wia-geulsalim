/* 데모 간 내비게이션 — F11 녹화용
   키보드:
     → / Space / Enter  : 다음 데모
     ←                   : 이전 데모
     H                   : 힌트 숨김
     Esc                 : 랜딩으로 (optional)
*/
(function () {
    'use strict';

    // 경로 정규화
    const path = location.pathname.replace(/\/index\.html?$/, '/').replace(/\/{2,}/g, '/');

    const NAV = {
        '/demo/restore/': {
            prevHref: '/',
            prevLabel: '← 메인',
            nextHref: '/demo/transform/',
            nextLabel: 'Demo 2 · 구조화'
        },
        '/demo/transform/': {
            prevHref: '/demo/restore/',
            prevLabel: '← Demo 1',
            nextHref: '/demo/epub/',
            nextLabel: 'Demo 3 · EPUB 복원'
        },
        '/demo/epub/': {
            prevHref: '/demo/transform/',
            prevLabel: '← Demo 2',
            nextHref: '/demo/multimodal/',
            nextLabel: 'Demo 4 · 멀티모달'
        },
        '/demo/multimodal/': {
            prevHref: '/demo/epub/',
            prevLabel: '← Demo 3',
            nextHref: '/',
            nextLabel: '메인 · 마무리'
        }
    };

    const entry = NAV[path];
    if (!entry) return;

    // 버튼 생성
    const bar = document.createElement('div');
    bar.className = 'demo-nav';
    bar.innerHTML =
        '<a class="demo-nav-prev" href="' + entry.prevHref + '" aria-label="이전">' +
            entry.prevLabel + '<span class="k">←</span>' +
        '</a>' +
        '<a class="demo-nav-next" href="' + entry.nextHref + '" aria-label="다음">' +
            entry.nextLabel + ' →<span class="k">Space</span>' +
        '</a>';
    document.body.appendChild(bar);

    // 힌트
    const hint = document.createElement('div');
    hint.className = 'demo-hint';
    hint.textContent = 'Space / → : 다음 데모   |   ← : 이전';
    document.body.appendChild(hint);

    // 키보드 바인딩
    document.addEventListener('keydown', function (e) {
        // 텍스트 입력 중이면 무시
        const tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
            e.preventDefault();
            location.href = entry.nextHref;
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            location.href = entry.prevHref;
        } else if (e.key === 'h' || e.key === 'H') {
            bar.style.display = bar.style.display === 'none' ? 'flex' : 'none';
        } else if (e.key === 'Escape') {
            location.href = '/';
        }
    });
})();
