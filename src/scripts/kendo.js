// src/scripts/kendo.js

import SlagField from '../components/SlagField.js';

$(document).ready(function () {
  $('#control-panel').kendoPanelBar();

  new SlagField('slag-field');

  $('.bucket').on('click', function () {
    const id = $(this).attr('data-id');
    kendo.alert(`Ковш ${id} выбран`);
  });
});
