document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById('chronologyNav');
    const yearsList = document.querySelector('.chronology-years');
    
    // Если элементов нет на странице, выходим
    if (!nav || !yearsList) return;

    const buttons = Array.from(document.querySelectorAll('.chronology-year'));
    const slides = Array.from(document.querySelectorAll('.chronology-slide'));
    
    let activeIndex = 0;
    let isAnimating = false;

    function setActive(index) {
        // Проверка границ
        if (index < 0) index = 0;
        if (index >= buttons.length) index = buttons.length - 1;
        
        // Обновляем состояние
        activeIndex = index;

        // 1. Управление слайдами (текст слева)
        slides.forEach(slide => {
            const slideIndex = Number(slide.dataset.index);
            if (slideIndex === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // 2. Управление кнопками (годы справа)
        buttons.forEach(btn => {
            const btnIndex = Number(btn.dataset.index);
            if (btnIndex === index) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });

        // 3. МАТЕМАТИКА ЦЕНТРИРОВАНИЯ
        // Находим активную кнопку и её родителя li
        const activeBtn = buttons[index];
        const activeLi = activeBtn.parentElement; // Мы задали li фиксированную высоту в CSS
        
        // Высота всего контейнера (окна просмотра)
        const navHeight = nav.clientHeight;
        // Позиция активного элемента относительно начала списка
        const itemTop = activeLi.offsetTop;
        // Высота самого элемента
        const itemHeight = activeLi.clientHeight;

        // Формула: Сдвиг = (Пол-экрана) - (Положение элемента + Пол-элемента)
        const translateVal = (navHeight / 2) - (itemTop + itemHeight / 2);

        yearsList.style.transform = `translateY(${translateVal}px)`;
    }

    // Обработчики кликов
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setActive(Number(btn.dataset.index));
        });
    });

    // Обработчик колесика мыши (Скролл)
    nav.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (isAnimating) return; // Защита от слишком быстрого скролла
        isAnimating = true;
        
        setTimeout(() => { isAnimating = false; }, 100); // Небольшая задержка

        if (e.deltaY > 0) {
            setActive(activeIndex + 1); // Вниз
        } else {
            setActive(activeIndex - 1); // Вверх
        }
    }, { passive: false });

    // Инициализация (запуск первого кадра)
    // Небольшая задержка, чтобы стили успели примениться и расчет высоты был верным
    setTimeout(() => {
        setActive(0);
    }, 50);
});