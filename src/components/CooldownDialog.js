// src/components/CooldownDialog.js
export default function CooldownDialog(onConfirm) {
  const $dialog = $('<div>', { id: 'cooldownDialog' }).append(
    $('<p>').text('Выберите время остывания:'),
    $('<input>', { id: 'cooldownTime' }),
    $('<button>', { id: 'confirmCooldown', text: 'OK' })
  );

  $('body').append($dialog);

  $dialog.kendoWindow({
    width: '300px',
    title: 'Выбор времени',
    visible: false,
    modal: true,
  });

  $('#cooldownTime').kendoDropDownList({
    dataSource: [1, 2, 5, 10, 15, 20, 30, 45],
    optionLabel: 'Выберите время...',
  });

  $('#confirmCooldown').on('click', function () {
    const time = $('#cooldownTime').val();
    const bucketId = $('#cooldownDialog').data('bucket-id');

    if (time) {
      onConfirm(bucketId, time);
      kendo.alert(`Выбрано ${time} мин. для ковша ${bucketId}`);
      $dialog.data('kendoWindow').close();
    }
  });

  return {
    open: (bucketId) => {
      $('#cooldownDialog')
        .data('bucket-id', bucketId)
        .data('kendoWindow')
        .open();
    },
  };
}
