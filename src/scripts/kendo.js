// src/scripts/kendo.js
import SlagField from '../components/SlagField.js';
import ContextMenu from '../components/ContextMenu.js';
import CooldownDialog from '../components/CooldownDialog.js';

$(document).ready(function () {
  SlagField('slag-field');

  // Инициализация Kendo UI компонентов
  const cooldownDialog = CooldownDialog((id, time) => {
    const $bucket = $(`.bucket-container[data-id='${id}'] .bucket`);
    $bucket.removeClass('empty no-bucket').addClass('slag');
    $bucket.attr('data-cooldown', time);
  });

  // Контекстное меню
  ContextMenu((id, state) => {
    const $bucket = $(`.bucket-container[data-id='${id}'] .bucket`);
    $bucket.removeClass('empty no-bucket slag');

    if (state === 'slag-bucket') {
      $bucket.addClass('red-bucket');
    } else if (state === 'no-bucket') {
      $bucket.addClass('no-bucket');
    } else {
      $bucket.addClass('empty');
    }

    // Также обновим состояние через updateState
    const bucketElement = $(`.bucket-container[data-id='${id}']`).data(
      'bucket'
    );
    if (bucketElement && typeof bucketElement.updateState === 'function') {
      bucketElement.updateState(state);
    } else {
      console.error(
        `Ковш с id ${id} не найден или метод updateState не существует`
      );
    }
  });

  $('.bucket').on('click', function () {
    const id = $(this).attr('data-id');
    kendo.alert(`Ковш ${id} выбран`);
  });
});
