document.addEventListener("DOMContentLoaded", () => {
    const modelViewer = document.querySelector('#mv');
    const toggleBtn = document.querySelector('#toggle-annotations-btn');
    if (!modelViewer || !toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        modelViewer.classList.toggle('mv-annotations-visible');
        toggleBtn.textContent = modelViewer.classList.contains('mv-annotations-visible')
            ? 'Скрыть все аннотации'
            : 'Показать все аннотации';
    });
});