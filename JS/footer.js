function toggleFooterContent(button) {
    // Находим следующий элемент после кнопки (это наш список)
    const content = button.nextElementSibling;
    
    // Переключаем класс .show
    if (content.classList.contains('show')) {
        content.classList.remove('show');
    } else {
        // Если хотите, чтобы при открытии одного закрывались другие - раскомментируйте строку ниже:
        // document.querySelectorAll('.footer-content-list.show').forEach(el => el.classList.remove('show'));
        
        content.classList.add('show');
    }
}