/* ========================================================
   WIA Geulsalim — Main JS
   We're Geulsalim · 우리들의 글살림 · 弘益人間
   ======================================================== */

(function () {
    'use strict';

    const ready = (fn) =>
        document.readyState !== 'loading'
            ? fn()
            : document.addEventListener('DOMContentLoaded', fn);

    ready(() => {
        console.log('[Geulsalim] Ready. 우리들의 글살림. 弘益人間.');

        /* ---------- Scroll-triggered reveal ---------- */
        const revealEls = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window && revealEls.length) {
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            io.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
            );
            revealEls.forEach((el, i) => {
                // small staggered delay for siblings
                el.style.transitionDelay = (i % 8) * 40 + 'ms';
                io.observe(el);
            });
        } else {
            revealEls.forEach((el) => el.classList.add('is-visible'));
        }

        /* ---------- Stat count-up on first view ---------- */
        const statNums = document.querySelectorAll('.stat-card .num');
        if ('IntersectionObserver' in window && statNums.length) {
            const seen = new WeakSet();
            const io2 = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting || seen.has(entry.target)) return;
                    seen.add(entry.target);
                    countUp(entry.target);
                });
            }, { threshold: 0.4 });
            statNums.forEach((n) => io2.observe(n));
        }

        function countUp(el) {
            const raw = el.textContent.trim();
            // preserve comma / non-numeric markers
            const isKoMan = raw.includes('만');
            const numStr = raw.replace(/[^0-9]/g, '');
            const target = parseInt(numStr, 10);
            if (isNaN(target) || target < 4) return;

            const duration = 900;
            const start = performance.now();
            const suffix = isKoMan ? '만' : '';
            const original = raw;

            function tick(now) {
                const elapsed = now - start;
                const pct = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - pct, 3);
                const v = Math.floor(target * eased);
                el.textContent = v.toLocaleString() + suffix;
                if (pct < 1) requestAnimationFrame(tick);
                else el.textContent = original;
            }
            requestAnimationFrame(tick);
        }

        /* ---------- Anchor smooth-scroll ---------- */
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
            a.addEventListener('click', (e) => {
                const id = a.getAttribute('href').slice(1);
                const target = document.getElementById(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        /* ---------- Image zoom (lightbox) ---------- */
        const zoomDialog = document.getElementById('imgZoom');
        if (zoomDialog) {
            const zImg = zoomDialog.querySelector('.img-zoom-img');
            const zCap = zoomDialog.querySelector('.img-zoom-caption');
            const zClose = zoomDialog.querySelector('.img-zoom-close');

            const openZoom = (src, alt, caption) => {
                zImg.src = src;
                zImg.alt = alt || '';
                zCap.textContent = caption || alt || '';
                if (typeof zoomDialog.showModal === 'function') {
                    zoomDialog.showModal();
                } else {
                    zoomDialog.setAttribute('open', '');
                }
            };
            const closeZoom = () => {
                if (typeof zoomDialog.close === 'function' && zoomDialog.open) {
                    zoomDialog.close();
                } else {
                    zoomDialog.removeAttribute('open');
                }
                zImg.src = '';
            };

            document.querySelectorAll('[data-zoom-src]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const caption = btn.closest('figure')?.querySelector('figcaption')?.textContent.trim();
                    openZoom(btn.dataset.zoomSrc, btn.dataset.zoomAlt, caption);
                });
            });

            zClose?.addEventListener('click', closeZoom);
            // 배경(backdrop) 클릭 시 닫기
            zoomDialog.addEventListener('click', (e) => {
                if (e.target === zoomDialog) closeZoom();
            });
            // Esc 키는 <dialog> 자체가 처리하지만, src 비우기 위해 close 이벤트 훅
            zoomDialog.addEventListener('close', () => { zImg.src = ''; });
        }
    });
})();
