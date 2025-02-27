export default function StateSubMenu(bucketId, onStateChange, posX, posY) {
    // Подменю для "Состояние"
    const $stateSubMenu = $('<ul>', { id: 'state-submenu' }).append(
      $('<li>', { id: 'no-bucket', text: 'Нет ковша' }),
      $('<li>', { id: 'empty-bucket', text: 'Пустой ковш' }),
      $('<li>', { id: 'slag-bucket', text: 'Ковш со шлаком' })
    );

    // Добавляем подменю на страницу
    $('body').append($stateSubMenu);

    // Позиционируем подменю
    $stateSubMenu.css({
        position: 'absolute',
        left: posX + 'px',  // Позиционируем подменю справа от основного меню
        top: posY + 'px',   // Совпадающая вертикальная позиция
        zIndex: 1001,       // Высокий z-index для отображения поверх
    });

    // Инициализируем как обычный список с событием выбора
    $stateSubMenu.on('click', 'li', function () {
        const itemId = $(this).attr('id');

        if (itemId === 'no-bucket') {
            onStateChange(bucketId, 'no-bucket');
        } else if (itemId === 'empty-bucket') {
            onStateChange(bucketId, 'empty-bucket');
        } else if (itemId === 'slag-bucket') {
            onStateChange(bucketId, 'slag-bucket');
        }

        // Закрываем подменю после выбора
        closeSubMenu();
    });

    // Функция закрытия подменю
    function closeSubMenu() {
        $stateSubMenu.remove();
        $(document).off('click.submenu'); // Отключаем обработчик кликов вне подменю
        $(document).off('keydown.submenu'); // Отключаем обработчик клавиши Esc
    }

    // Закрываем подменю, если клик происходит вне его области
    setTimeout(() => {
        $(document).on('click.submenu', function (e) {
            if (!$(e.target).closest('#state-submenu').length) {
                closeSubMenu();
            }
        });
    }, 0);

    // Закрытие подменю при нажатии клавиши Esc
    $(document).on('keydown.submenu', function (e) {
        if (e.key === 'Escape') {
            closeSubMenu();
        }
    });
}
