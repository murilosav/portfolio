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

const track = document.querySelector('.stack-track');
if (track && track.children.length) {
    const setSize = 14;
    const base = [...track.children].slice(0, setSize).map((n) => n.cloneNode(true));
    let sets = Math.round(track.children.length / setSize) || 1;
    let guard = 0;
    while ((track.scrollWidth < window.innerWidth * 2.2 || sets % 2 === 1) && guard < 16) {
        base.forEach((n) => track.appendChild(n.cloneNode(true)));
        sets++;
        guard++;
    }
    track.style.animationDuration = Math.max(20, track.scrollWidth / 2 / 70) + 's';
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

document.getElementById('current-year').textContent = new Date().getFullYear();
