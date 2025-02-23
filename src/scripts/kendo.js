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
      cooldownDialog.open(id);
    } else if (state === 'no-bucket') {
      $bucket.addClass('no-bucket');
    } else {
      $bucket.addClass('empty');
    }
  });

  /*new SlagField('slag-field');*/

  $('.bucket').on('click', function () {
    const id = $(this).attr('data-id');
    kendo.alert(`Ковш ${id} выбран`);
  });
});
