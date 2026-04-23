/* ========================================================
   WIA Geulsalim · Accessibility Widget (Vanilla JS · 독립형)
   — 접근성을 주창하는 사이트는 스스로 접근성을 구현해야 한다
   — a11y.wiabook.com 80항목 검사기와 동일 철학
   ======================================================== */
(function () {
    'use strict';

    const STORAGE_KEY = 'wia_a11y_prefs';
    const defaults = {
        fontScale:    1,       // 1.0 ~ 1.5
        contrast:     'normal',// normal | high | dark | inverted
        dyslexia:     false,
        underlineLinks: false,
        bigCursor:    false,
        readingGuide: false,
        stopAnimation: false,
        hideImages:   false,
        tts:          false
    };
    let prefs = { ...defaults, ...loadPrefs() };

    /* ---------- 스타일 주입 ---------- */
    const css = `
    .wia-a11y-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        border: 0;
        border-radius: 50%;
        background: #1e40af;
        color: #fff;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(30, 64, 175, 0.45);
        z-index: 9999;
        transition: transform 0.25s, box-shadow 0.25s;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif;
    }
    .wia-a11y-fab:hover { transform: scale(1.08); box-shadow: 0 12px 32px rgba(30, 64, 175, 0.6); }
    .wia-a11y-fab:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }

    .wia-a11y-panel {
        position: fixed;
        bottom: 92px;
        right: 24px;
        width: 340px;
        max-height: 72vh;
        background: #ffffff;
        color: #0f172a;
        border-radius: 14px;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
        z-index: 9999;
        font-family: 'Pretendard', sans-serif;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(12px) scale(0.96);
        transition: opacity 0.22s, transform 0.22s;
        pointer-events: none;
    }
    .wia-a11y-panel.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
    }
    .wia-a11y-head {
        background: linear-gradient(135deg, #1e40af, #0ea5e9);
        color: #fff;
        padding: 14px 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .wia-a11y-head h3 {
        margin: 0; font-size: 15px; font-weight: 800; letter-spacing: -0.01em;
    }
    .wia-a11y-head .sub { font-size: 10.5px; opacity: 0.85; margin-top: 2px; letter-spacing: 0.3px; }
    .wia-a11y-close {
        background: rgba(255,255,255,0.2); border: 0; color: #fff;
        width: 28px; height: 28px; border-radius: 50%; font-size: 16px;
        cursor: pointer; transition: background 0.2s;
    }
    .wia-a11y-close:hover { background: rgba(255,255,255,0.35); }

    .wia-a11y-body {
        flex: 1; overflow-y: auto; padding: 14px 16px 8px;
    }
    .wia-a11y-section { margin-bottom: 14px; }
    .wia-a11y-section > label.title {
        font-size: 11px; font-weight: 800; color: #64748b; letter-spacing: 1.5px;
        text-transform: uppercase; display: block; margin-bottom: 6px;
    }

    .wia-a11y-toggle {
        display: flex; align-items: center; justify-content: space-between;
        padding: 9px 12px; background: #f1f5f9; border-radius: 8px;
        margin-bottom: 5px; cursor: pointer; font-size: 13px; font-weight: 500;
        transition: background 0.2s;
        user-select: none;
    }
    .wia-a11y-toggle:hover { background: #e2e8f0; }
    .wia-a11y-toggle .emoji { margin-right: 8px; }
    .wia-a11y-toggle .sw {
        width: 36px; height: 20px; background: #cbd5e1; border-radius: 20px;
        position: relative; flex-shrink: 0; transition: background 0.25s;
    }
    .wia-a11y-toggle .sw::after {
        content: ''; position: absolute; top: 2px; left: 2px;
        width: 16px; height: 16px; background: #fff; border-radius: 50%;
        transition: left 0.25s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    }
    .wia-a11y-toggle.on .sw { background: #10b981; }
    .wia-a11y-toggle.on .sw::after { left: 18px; }

    .wia-a11y-buttons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
    .wia-a11y-buttons button {
        padding: 9px 8px; background: #f1f5f9; border: 1px solid transparent;
        border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;
        transition: all 0.2s; color: #0f172a;
        font-family: inherit;
    }
    .wia-a11y-buttons button:hover { background: #e2e8f0; }
    .wia-a11y-buttons button.active {
        background: #1e40af; color: #fff; border-color: #1e40af;
    }

    .wia-a11y-foot {
        padding: 10px 16px; background: #f8fafc; border-top: 1px solid #e2e8f0;
        display: flex; justify-content: space-between; align-items: center;
        font-size: 11px; color: #64748b;
    }
    .wia-a11y-foot a {
        color: #1e40af; text-decoration: none; font-weight: 700;
    }
    .wia-a11y-foot a:hover { text-decoration: underline; }
    .wia-a11y-reset {
        padding: 5px 10px; background: transparent; border: 1px solid #cbd5e1;
        border-radius: 6px; font-size: 11px; cursor: pointer; color: #475569;
        font-family: inherit;
    }
    .wia-a11y-reset:hover { background: #fee2e2; border-color: #fca5a5; color: #991b1b; }

    @media (max-width: 480px) {
        .wia-a11y-panel { width: calc(100vw - 32px); right: 16px; left: 16px; bottom: 88px; }
        .wia-a11y-fab   { bottom: 20px; right: 16px; }
    }

    /* ===== 실제 적용 스타일 (모든 페이지에 영향) ===== */
    html.wia-a11y-font-110 body { font-size: 110% !important; }
    html.wia-a11y-font-125 body { font-size: 125% !important; }
    html.wia-a11y-font-150 body { font-size: 150% !important; }

    html.wia-a11y-contrast-high body,
    html.wia-a11y-contrast-high body * {
        background: #000 !important; color: #fff !important;
        border-color: #fff !important;
    }
    html.wia-a11y-contrast-high body a { color: #ffff00 !important; }

    html.wia-a11y-contrast-dark body,
    html.wia-a11y-contrast-dark body * {
        background-color: #0a0a0a !important; color: #e2e8f0 !important;
    }

    html.wia-a11y-contrast-inverted body { filter: invert(1) hue-rotate(180deg) !important; }
    html.wia-a11y-contrast-inverted body img,
    html.wia-a11y-contrast-inverted body video,
    html.wia-a11y-contrast-inverted body iframe {
        filter: invert(1) hue-rotate(180deg) !important;
    }

    html.wia-a11y-dyslexia body * {
        font-family: 'OpenDyslexic', 'Comic Sans MS', 'Arial', sans-serif !important;
        letter-spacing: 0.05em !important;
        line-height: 1.8 !important;
        word-spacing: 0.15em !important;
    }

    html.wia-a11y-underline-links body a {
        text-decoration: underline !important;
        text-underline-offset: 2px !important;
        text-decoration-thickness: 2px !important;
    }

    html.wia-a11y-big-cursor body { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="black" stroke="white" stroke-width="2" d="M8 4 L8 36 L16 28 L22 40 L28 38 L22 26 L34 26 Z"/></svg>') 0 0, auto !important; }

    html.wia-a11y-stop-animation body *,
    html.wia-a11y-stop-animation body *::before,
    html.wia-a11y-stop-animation body *::after {
        animation-duration: 0s !important;
        animation-iteration-count: 0 !important;
        transition-duration: 0s !important;
    }

    html.wia-a11y-hide-images body img,
    html.wia-a11y-hide-images body video,
    html.wia-a11y-hide-images body svg:not(.wia-a11y-panel svg) {
        visibility: hidden !important;
    }

    /* Reading guide (horizontal line following mouse) */
    .wia-a11y-guide {
        position: fixed; left: 0; right: 0; height: 3px;
        background: #fbbf24; box-shadow: 0 0 12px rgba(251,191,36,0.6);
        z-index: 9998; pointer-events: none;
        transition: top 0.05s linear;
    }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    /* ---------- DOM 생성 ---------- */
    const fab = document.createElement('button');
    fab.className = 'wia-a11y-fab';
    fab.setAttribute('aria-label', '접근성 설정 열기');
    fab.setAttribute('aria-expanded', 'false');
    fab.innerHTML = '♿';
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.className = 'wia-a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', '접근성 설정 패널');
    panel.innerHTML = `
        <div class="wia-a11y-head">
            <div>
                <h3>♿ 접근성 설정</h3>
                <div class="sub">WIA Geulsalim · 실시간 적용</div>
            </div>
            <button class="wia-a11y-close" aria-label="닫기">×</button>
        </div>
        <div class="wia-a11y-body">

            <div class="wia-a11y-section">
                <label class="title">글자 크기</label>
                <div class="wia-a11y-buttons" data-group="fontScale">
                    <button data-val="1">기본</button>
                    <button data-val="1.1">크게</button>
                    <button data-val="1.25">더 크게</button>
                </div>
            </div>

            <div class="wia-a11y-section">
                <label class="title">색상 대비</label>
                <div class="wia-a11y-buttons" data-group="contrast">
                    <button data-val="normal">기본</button>
                    <button data-val="high">고대비</button>
                    <button data-val="dark">어둡게</button>
                </div>
                <div class="wia-a11y-buttons" style="margin-top:6px;" data-group="contrast">
                    <button data-val="inverted" style="grid-column: span 3;">반전 색상</button>
                </div>
            </div>

            <div class="wia-a11y-section">
                <label class="title">가독성·주의</label>
                <div class="wia-a11y-toggle" data-pref="dyslexia">
                    <span><span class="emoji">📖</span>난독증 친화 글꼴</span>
                    <div class="sw"></div>
                </div>
                <div class="wia-a11y-toggle" data-pref="underlineLinks">
                    <span><span class="emoji">🔗</span>링크 밑줄 강조</span>
                    <div class="sw"></div>
                </div>
                <div class="wia-a11y-toggle" data-pref="bigCursor">
                    <span><span class="emoji">🖱️</span>커서 확대</span>
                    <div class="sw"></div>
                </div>
                <div class="wia-a11y-toggle" data-pref="readingGuide">
                    <span><span class="emoji">📏</span>독서 가이드 라인</span>
                    <div class="sw"></div>
                </div>
                <div class="wia-a11y-toggle" data-pref="stopAnimation">
                    <span><span class="emoji">⏸️</span>애니메이션 정지</span>
                    <div class="sw"></div>
                </div>
                <div class="wia-a11y-toggle" data-pref="hideImages">
                    <span><span class="emoji">🚫</span>이미지 숨기기</span>
                    <div class="sw"></div>
                </div>
            </div>

            <div class="wia-a11y-section">
                <label class="title">음성</label>
                <div class="wia-a11y-toggle" data-pref="tts">
                    <span><span class="emoji">🔊</span>선택 텍스트 음성 낭독</span>
                    <div class="sw"></div>
                </div>
                <div style="font-size:10.5px; color:#94a3b8; margin-top:4px; padding-left:4px;">
                    켜두면 텍스트 드래그 선택 시 자동 낭독 (브라우저 내장 TTS · 254 언어)
                </div>
            </div>

        </div>
        <div class="wia-a11y-foot">
            <button class="wia-a11y-reset">모두 초기화</button>
            <div>
                Powered by <a href="https://a11y.wiabook.com" target="_blank" rel="noopener">a11y.wiabook.com</a>
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    const closeBtn  = panel.querySelector('.wia-a11y-close');
    const resetBtn  = panel.querySelector('.wia-a11y-reset');

    /* ---------- 이벤트 ---------- */
    fab.addEventListener('click', () => {
        const open = panel.classList.toggle('open');
        fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
        fab.setAttribute('aria-expanded', 'false');
        fab.focus();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('open')) {
            closeBtn.click();
        }
    });

    // 버튼 그룹 (fontScale · contrast)
    panel.querySelectorAll('[data-group]').forEach(group => {
        const key = group.dataset.group;
        group.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const v = btn.dataset.val;
                prefs[key] = (key === 'fontScale') ? parseFloat(v) : v;
                savePrefs();
                applyPrefs();
            });
        });
    });

    // 토글
    panel.querySelectorAll('[data-pref]').forEach(tog => {
        tog.addEventListener('click', () => {
            const key = tog.dataset.pref;
            prefs[key] = !prefs[key];
            savePrefs();
            applyPrefs();
        });
    });

    resetBtn.addEventListener('click', () => {
        prefs = { ...defaults };
        savePrefs();
        applyPrefs();
    });

    /* ---------- 독서 가이드 (마우스 따라 가로선) ---------- */
    let guide = null;
    function handleMouseMove(e) {
        if (!guide) return;
        guide.style.top = (e.clientY - 1) + 'px';
    }

    /* ---------- TTS (선택 텍스트 낭독) ---------- */
    function handleSelection() {
        if (!prefs.tts) return;
        const sel = window.getSelection();
        const text = sel && sel.toString().trim();
        if (text && text.length > 2 && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = document.documentElement.lang || 'ko-KR';
            utter.rate = 1.0;
            window.speechSynthesis.speak(utter);
        }
    }
    document.addEventListener('mouseup', handleSelection);

    /* ---------- 적용 ---------- */
    function applyPrefs() {
        const html = document.documentElement;

        // font scale
        html.classList.remove('wia-a11y-font-110','wia-a11y-font-125','wia-a11y-font-150');
        if (prefs.fontScale === 1.1) html.classList.add('wia-a11y-font-110');
        else if (prefs.fontScale === 1.25) html.classList.add('wia-a11y-font-125');
        else if (prefs.fontScale === 1.5) html.classList.add('wia-a11y-font-150');

        // contrast
        html.classList.remove('wia-a11y-contrast-high','wia-a11y-contrast-dark','wia-a11y-contrast-inverted');
        if (prefs.contrast !== 'normal') {
            html.classList.add('wia-a11y-contrast-' + prefs.contrast);
        }

        // toggles
        html.classList.toggle('wia-a11y-dyslexia',         prefs.dyslexia);
        html.classList.toggle('wia-a11y-underline-links',  prefs.underlineLinks);
        html.classList.toggle('wia-a11y-big-cursor',       prefs.bigCursor);
        html.classList.toggle('wia-a11y-stop-animation',   prefs.stopAnimation);
        html.classList.toggle('wia-a11y-hide-images',      prefs.hideImages);

        // reading guide
        if (prefs.readingGuide) {
            if (!guide) {
                guide = document.createElement('div');
                guide.className = 'wia-a11y-guide';
                document.body.appendChild(guide);
                document.addEventListener('mousemove', handleMouseMove);
            }
        } else if (guide) {
            document.removeEventListener('mousemove', handleMouseMove);
            guide.remove();
            guide = null;
        }

        // UI sync: 버튼 active state
        panel.querySelectorAll('[data-group]').forEach(group => {
            const key = group.dataset.group;
            group.querySelectorAll('button').forEach(btn => {
                const v = (key === 'fontScale') ? parseFloat(btn.dataset.val) : btn.dataset.val;
                btn.classList.toggle('active', prefs[key] === v);
            });
        });

        // UI sync: 토글 on state
        panel.querySelectorAll('[data-pref]').forEach(tog => {
            tog.classList.toggle('on', !!prefs[tog.dataset.pref]);
        });
    }

    function loadPrefs() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
        catch (e) { return {}; }
    }
    function savePrefs() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (e) {}
    }

    // 초기 적용 (저장된 설정 반영)
    applyPrefs();
})();
