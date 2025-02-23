// src/components/Bucket.js

export default function Bucket(id) {
  const $container = $('<div>')
    .addClass('bucket-container')
    .attr('data-id', id);

  const $bucket = $('<div>').addClass('bucket');
  const $svgContainer = $('<div>').addClass('bucket-svg'); // SVG будет через CSS
  const $label = $('<div>').addClass('bucket-id').text(id);

  $container.append($svgContainer, $label);

  $container.on('click', function () {
    $(this).toggleClass('active');
    kendo.alert(`Ковш ${id} выбран`);
  });

  return $container[0]; // jQuery возвращает объект, а нам нужен обычный DOM-элемент
}
