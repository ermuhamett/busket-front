export default function ContextMenu(onStateChange) {
  const $menu = $('<ul>', { id: 'bucketMenu' }).append(
    $('<li>')
      .text('Состояние')
      .append(
        $('<ul>')
          .append($('<li>', { id: 'no-bucket', text: 'Нет ковша' }))
          .append($('<li>', { id: 'empty-bucket', text: 'Пустой ковш' }))
          .append($('<li>', { id: 'slag-bucket', text: 'Ковш со шлаком' }))
      ),
    $('<li>')
      .text('Используется')
      .append(
        $('<ul>')
          .append($('<li>', { id: 'used-yes', text: 'Да' }))
          .append($('<li>', { id: 'used-no', text: 'Нет' }))
      ),
    $('<li>', { id: 'select-all', text: 'Выделить все' })
  );

  $('body').append($menu);

  $menu.kendoContextMenu({
    target: '.bucket-container',
    filter: '.bucket-container',
    orientation: 'vertical', // Стандартная вертикальная ориентация
    animation: {
      open: { effects: 'fadeIn' }, // Анимация появления
    },
    select: function (e) {
      const item = $(e.item);
      const bucketId = $('#bucketMenu').data('bucket-id');

      if (item.attr('id') === 'no-bucket') {
        onStateChange(bucketId, 'no-bucket');
      } else if (item.attr('id') === 'empty-bucket') {
        onStateChange(bucketId, 'empty-bucket');
      } else if (item.attr('id') === 'slag-bucket') {
        onStateChange(bucketId, 'slag-bucket');
      } else if (item.attr('id') === 'used-yes') {
        console.log(`Ковш ${bucketId} помечен как используемый.`);
      } else if (item.attr('id') === 'used-no') {
        console.log(`Ковш ${bucketId} помечен как неиспользуемый.`);
      }
    },
  });

  $(document).on('contextmenu', '.bucket-container', function (event) {
    event.preventDefault();
    const bucketId = $(this).data('id');
    $('#bucketMenu').data('bucket-id', bucketId);
    $menu.data('kendoContextMenu').open(event.pageX, event.pageY);
  });
}
