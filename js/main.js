const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollToTarget = (selector) => {
    const target = selector && selector !== '#' ? document.querySelector(selector) : null;
    window.scrollTo({ top: target ? target.offsetTop - 80 : 0, behavior: 'smooth' });
};

document.querySelectorAll('[data-target]').forEach((el) => {
    const go = (e) => {
        if (el.tagName === 'A') e.preventDefault();
        scrollToTarget(el.dataset.target);
        document.body.classList.remove('menu-open');
    };
    el.addEventListener('click', go);
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(e); }
    });
});

const header = document.querySelector('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 16);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.body.classList.remove('menu-open');
});

const reveals = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in-view'));
} else {
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) { entry.target.classList.add('in-view'); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
}

const projects = document.querySelectorAll('.project');
if (projects.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
        projects.forEach((p) => p.classList.add('peeked'));
    } else {
        const pio = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                e.target.classList.toggle('peeked', e.isIntersecting);
            });
        }, { rootMargin: '0px 0px -83% 0px' });
        projects.forEach((p) => pio.observe(p));
    }
}

const track = document.querySelector('.stack-track');
if (track && track.children.length) {
    const SPEED = 70; // px/s — kept constant so the strip never speeds up
    // One unique set of chips is the repeating unit (markup ships two identical sets).
    const unit = [...track.children]
        .slice(0, Math.max(1, Math.round(track.children.length / 2)))
        .map((n) => n.cloneNode(true));

    const layout = () => {
        // Freeze + reset so width is measured without the running transform and the
        // animation restarts cleanly (no mid-cycle jump in apparent speed).
        track.style.animation = 'none';
        void track.offsetWidth;
        track.replaceChildren(...unit.map((n) => {
            const c = n.cloneNode(true);
            c.removeAttribute('aria-hidden');
            return c;
        }));
        // Repeat the unit until one half is wider than the viewport (so the -50%
        // loop shows no gap), keeping an even number of sets so both halves match.
        let guard = 0;
        while ((track.scrollWidth < window.innerWidth * 2.2 ||
                (track.children.length / unit.length) % 2 === 1) && guard < 40) {
            unit.forEach((n) => {
                const c = n.cloneNode(true);
                c.setAttribute('aria-hidden', 'true');
                track.appendChild(c);
            });
            guard++;
        }
        // Duration derived from the real (post-font, post-layout) width → fixed px/s.
        const duration = (track.scrollWidth / 2 / SPEED).toFixed(2) + 's';
        track.style.animation = '';
        track.style.animationDuration = duration;
    };

    layout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    window.addEventListener('load', layout);
    window.addEventListener('pageshow', (e) => { if (e.persisted) layout(); });
    let resizeT;
    let lastWidth = window.innerWidth;
    const onResize = () => {
        // Mobile address-bar show/hide fires resize with only a height change —
        // ignore it, since the marquee only depends on width (avoids re-layout jumps).
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        clearTimeout(resizeT);
        resizeT = setTimeout(layout, 200);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
}

const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');

document.querySelectorAll('.project').forEach((p) => {
    const media = p.querySelector('.project-media');
    const title = p.querySelector('.project-top h3');
    if (!media || !title || media.querySelector('.project-logo')) return;

    const wrap = document.createElement('span');
    wrap.className = 'project-logo';
    const name = title.textContent.trim();
    const slug = slugify(name);

    const exts = ['svg', 'png', 'jpg', 'jpeg', 'webp'];
    const img = document.createElement('img');
    img.alt = name;
    img.loading = 'lazy';
    img.decoding = 'async';
    let i = 0;
    img.onerror = () => {
        i += 1;
        if (i < exts.length) img.src = `./images/logos/${slug}.${exts[i]}`;
        else wrap.textContent = name;
    };
    img.src = `./images/logos/${slug}.${exts[0]}`;

    wrap.appendChild(img);
    media.appendChild(wrap);
});

function drawFlowLines() {
    const flow = document.querySelector('.flow');
    if (!flow) return;
    const svg = flow.querySelector('.flow-lines');
    const core = flow.querySelector('.flow-core');
    if (!svg || !core) return;

    const fr = flow.getBoundingClientRect();
    if (fr.width === 0) return;
    const cr = core.getBoundingClientRect();
    const cx = cr.left + cr.width / 2 - fr.left;
    const cy = cr.top + cr.height / 2 - fr.top;

    const curve = (x1, y1, x2, y2) => {
        const mx = (x1 + x2) / 2;
        return `M${x1.toFixed(1)},${y1.toFixed(1)} C${mx.toFixed(1)},${y1.toFixed(1)} ${mx.toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
    };

    const ds = [];
    flow.querySelectorAll('.flow-left .flow-chip').forEach((el) => {
        const r = el.getBoundingClientRect();
        ds.push(curve(r.right - fr.left, r.top + r.height / 2 - fr.top, cx, cy));
    });
    flow.querySelectorAll('.flow-right .flow-card').forEach((el) => {
        const r = el.getBoundingClientRect();
        ds.push(curve(cx, cy, r.left - fr.left, r.top + r.height / 2 - fr.top));
    });

    const paths = ds.map((d) => `<path d="${d}"/>`).join('');
    svg.setAttribute('viewBox', `0 0 ${fr.width.toFixed(1)} ${fr.height.toFixed(1)}`);
    const base = svg.querySelector('.fl-base');
    const fl = svg.querySelector('.fl-flow');
    if (base) base.innerHTML = paths;
    if (fl) fl.innerHTML = paths;
}

drawFlowLines();
window.addEventListener('load', drawFlowLines);
let flowResizeT;
window.addEventListener('resize', () => { clearTimeout(flowResizeT); flowResizeT = setTimeout(drawFlowLines, 150); });

const heroFlow = document.querySelector('.hero-flow');
if (heroFlow && !reduceMotion) {
    let ticking = false;
    const updateHeroFlow = () => {
        ticking = false;
        const r = heroFlow.getBoundingClientRect();
        if (r.height === 0) return;
        const start = window.innerHeight * 0.32;
        const end = -r.height * 0.45;
        if (r.top >= start) {
            heroFlow.style.opacity = '';
            heroFlow.style.transform = '';
            return;
        }
        let p = (r.top - end) / (start - end);
        p = Math.max(0, Math.min(1, p));
        heroFlow.style.opacity = p.toFixed(3);
        heroFlow.style.transform = `translateY(${((1 - p) * -50).toFixed(1)}px) scale(${(0.9 + p * 0.1).toFixed(3)})`;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(updateHeroFlow); ticking = true; }
    }, { passive: true });
    updateHeroFlow();
}

// Subtle scroll parallax on the hero decorations. The CSS float animation drives
// `translate`/`rotate`, so we keep `transform` for parallax — both compose cleanly.
const heroShapes = document.querySelectorAll('.hero-shape');
if (heroShapes.length && !reduceMotion) {
    let shapeTick = false;
    const updateShapes = () => {
        shapeTick = false;
        const y = window.scrollY;
        if (y > window.innerHeight) return;
        heroShapes.forEach((el) => {
            const dir = el.classList.contains('shape-right') ? 1 : -1;
            el.style.transform = `translateY(${(y * 0.18 * dir).toFixed(1)}px)`;
        });
    };
    window.addEventListener('scroll', () => {
        if (!shapeTick) { requestAnimationFrame(updateShapes); shapeTick = true; }
    }, { passive: true });
    updateShapes();
}

// ── Project media sliders: drag/swipe + autoplay every 2s ──
document.querySelectorAll('.media-slider').forEach((slider) => {
    const track = slider.querySelector('.slides');
    const slides = track ? [...track.children] : [];
    if (!track || slides.length < 2) return;

    const dotsWrap = slider.querySelector('.slide-dots');
    let index = 0;

    const dots = slides.map((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slide-dot';
        dot.setAttribute('aria-label', `Imagem ${i + 1}`);
        dot.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); go(i); restart(); });
        if (dotsWrap) dotsWrap.appendChild(dot);
        return dot;
    });

    const render = () => {
        track.style.transform = `translateX(${-index * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    };
    const go = (i) => { index = (i + slides.length) % slides.length; render(); };

    let timer = null;
    let visible = false;
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => { if (!reduceMotion && !timer && visible) timer = setInterval(() => go(index + 1), 2000); };
    const restart = () => { stop(); start(); };

    // Only autoplay while the card is on screen, so it always starts at the first image.
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            visible = entries[0].isIntersecting;
            if (visible) start(); else stop();
        }, { threshold: 0.4 }).observe(slider);
    } else {
        visible = true;
    }

    const width = () => slider.clientWidth || 1;
    let startX = 0, dx = 0, dragging = false;

    slider.addEventListener('pointerdown', (e) => {
        dragging = true; startX = e.clientX; dx = 0;
        track.style.transition = 'none';
        stop();
        try { slider.setPointerCapture(e.pointerId); } catch (_) {}
    });
    slider.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        dx = e.clientX - startX;
        track.style.transform = `translateX(${(-index * 100 + (dx / width()) * 100).toFixed(2)}%)`;
    });
    const release = () => {
        if (!dragging) return;
        dragging = false;
        track.style.transition = '';
        if (Math.abs(dx) > width() * 0.15) go(dx < 0 ? index + 1 : index - 1);
        else render();
        dx = 0;
        restart();
    };
    slider.addEventListener('pointerup', release);
    slider.addEventListener('pointercancel', release);
    slider.addEventListener('dragstart', (e) => e.preventDefault());

    render();
    start();
});

document.getElementById('current-year').textContent = new Date().getFullYear();
