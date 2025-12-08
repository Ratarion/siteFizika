document.addEventListener("DOMContentLoaded", () => {
    const yearsList = document.querySelector('.chronology-years');
    if (!yearsList) return; // защита — если нет хронологии

    const years = Array.from(document.querySelectorAll('.chronology-year'));
    const slides = Array.from(document.querySelectorAll('.chronology-slide'));
    let activeIndex = 0;
    let wheelCooldown = false;

    function setActive(index, opts = {}) {
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;
        if (index === activeIndex && !opts.force) return;

        slides.forEach(s => s.classList.toggle('active', Number(s.dataset.index) === index));
        years.forEach(y => {
            const i = Number(y.dataset.index);
            y.classList.toggle('active', i === index);
            y.setAttribute('aria-pressed', i === index);
        });

        const activeBtn = years[index];
        const itemCenter = activeBtn.offsetTop + (activeBtn.clientHeight / 2);
        yearsList.style.transform = `translateY(calc(50% - ${itemCenter}px))`;

        activeIndex = index;
    }

    years.forEach(btn => {
        btn.addEventListener('click', () => setActive(Number(btn.dataset.index)));
        btn.addEventListener('keydown', e => {
            if (e.key === 'ArrowUp') { setActive(activeIndex - 1); e.preventDefault(); }
            if (e.key === 'ArrowDown') { setActive(activeIndex + 1); e.preventDefault(); }
        });
    });

    document.getElementById('chronologyNav')?.addEventListener('wheel', e => {
        e.preventDefault();
        if (wheelCooldown) return;
        wheelCooldown = true;
        setTimeout(() => wheelCooldown = false, 80);
        e.deltaY > 0 ? setActive(activeIndex + 1) : setActive(activeIndex - 1);
    }, { passive: false });

    setTimeout(() => setActive(0, { force: true }), 100);
});