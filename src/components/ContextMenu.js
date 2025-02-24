import StateSubMenu from './StateSubMenu.js'; // Импортируем подменю

export default function ContextMenu(onStateChange) {
    // Главное меню (первый уровень)
    const $contextMenu = $('<ul>', { id: 'bucketMenu' }).append(
        $('<li>', { id: 'state-menu', text: 'Состояние' }),
        $('<li>', { id: 'used-menu', text: 'Используется' }),
        $('<li>', { id: 'select-all', text: 'Выделить все' })
    );

    // Добавляем главное меню на страницу
    $('body').append($contextMenu);

    $contextMenu.kendoContextMenu({
        target: '.bucket-container',
        filter: '.bucket-container',
        orientation: 'vertical',
        animation: {
            open: { effects: 'fadeIn' },
        },
        select: function (e) {
            const item = $(e.item);
            const bucketId = $('#bucketMenu').data('bucket-id');

            if (item.attr('id') === 'state-menu') {
                // Удаляем предыдущее подменю (если оно существует)
                $('#state-submenu').remove();

                // Открываем подменю рядом с основным
                const menuPosition = $contextMenu.offset();
                const menuWidth = $contextMenu.width();
                StateSubMenu(bucketId, onStateChange, menuPosition.left + menuWidth + 10, menuPosition.top);
            } else if (item.attr('id') === 'used-menu') {
                console.log(`Ковш ${bucketId} используется.`);
            } else if (item.attr('id') === 'select-all') {
                console.log('Выделить все');
            }
        },
    });

    // Обрабатываем правый клик на ковше
    $(document).on('contextmenu', '.bucket-container', function (event) {
        event.preventDefault();
        const bucketId = $(this).data('id');
        $('#bucketMenu').data('bucket-id', bucketId);
        $contextMenu.data('kendoContextMenu').open(event.pageX, event.pageY);
    });
}
