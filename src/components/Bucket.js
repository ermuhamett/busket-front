// src/components/Bucket.js

const SVG_PATHS = {
  'no-bucket': './svg/no_bucket.svg',
  'empty-bucket': './svg/empty_bucket.svg',
  'slag-bucket': './svg/red_bucket.svg',
};

export default function Bucket(id) {
  const $container = $('<div>')
    .addClass('bucket-container')
    .attr('data-id', id);

  const $bucket = $('<div>').addClass('bucket-svg'); // SVG будет через CSS
  const $label = $('<div>').addClass('bucket-id').text(id);

  $container.append($bucket, $label);

  $container.on('click', function () {
    $(this).toggleClass('active');
    kendo.alert(`Ковш ${id} выбран`);
  });

  // Функция для изменения состояния ковша
  function updateBucketState(state) {
    // Получаем путь к SVG файлу из объекта по ключу состояния
    const svgPath = SVG_PATHS[state];
    if (svgPath) {
      // Если путь существует, задаем фоновое изображение
      $bucket.css('background-image', `url(${svgPath})`);
    } else {
      console.error(`Состояние ${state} не поддерживается`);
    }
  }

  // Возвращаем сам элемент контейнера и функцию для обновления состояния
  return {
    element: $container[0],
    updateState: updateBucketState,
  };
}
