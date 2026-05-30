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

const flow = document.querySelector('.hero-flow');
if (flow && !reduceMotion) {
    const sources = [
        { icon: 'python', label: 'Python' },
        { icon: 'django', label: 'Django' },
        { icon: 'javascript', label: 'JavaScript' },
        { icon: 'postgresql', label: 'PostgreSQL' },
        { icon: 'docker', label: 'Docker' },
        { icon: 'redis', label: 'Redis' },
        { icon: 'flask', label: 'Flask' },
        { icon: 'celery', label: 'Celery' },
        { icon: 'nginx', label: 'Nginx' },
    ];
    const outputs = [
        { t: 'E-commerce', s: 'checkout · catálogo' },
        { t: 'Plataforma SaaS', s: 'assinaturas · painel' },
        { t: 'Automação', s: 'RPA · scripts' },
        { t: 'API REST', s: 'integrações' },
        { t: 'Dashboard', s: 'métricas · dados' },
        { t: 'Integração IA', s: 'chatbots · análise' },
        { t: 'Web Scraping', s: 'coleta de dados' },
    ];
    const chips = [...flow.querySelectorAll('.flow-chip')];
    const cards = [...flow.querySelectorAll('.flow-card')];
    let si = chips.length, oi = cards.length, timer = null;

    const swap = (el, fn) => {
        el.classList.add('flow-swapping');
        setTimeout(() => { fn(); el.classList.remove('flow-swapping'); }, 300);
    };

    const tick = () => {
        chips.forEach((chip, k) => {
            const s = sources[(si + k) % sources.length];
            swap(chip, () => {
                chip.querySelector('img').src = `./svg/${s.icon}.svg`;
                chip.querySelector('span').textContent = s.label;
            });
        });
        si = (si + chips.length) % sources.length;
        cards.forEach((card, k) => {
            const o = outputs[(oi + k) % outputs.length];
            swap(card, () => {
                card.querySelector('.fc-title').textContent = o.t;
                card.querySelector('.fc-sub').textContent = o.s;
            });
        });
        oi = (oi + cards.length) % outputs.length;
    };

    new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !timer) timer = setInterval(tick, 2800);
        else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
    }).observe(flow);
}

document.getElementById('current-year').textContent = new Date().getFullYear();
