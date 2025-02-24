import Bucket from './Bucket.js';

export default function SlagField(containerId) {
  const $container = window.$('#' + containerId).empty(); // Очищаем контейнер перед генерацией
  const rows = 4,
    cols = 20; // Количество рядов и столбцов

  const $bucketGrid = $('<div>').addClass('bucket-grid-container');

  for (let row = 0; row < rows; row++) {
    const $rowContainer = $('<div>').addClass('bucket-grid mb-4'); // mb-4 - Bootstrap отступ

    for (let col = 0; col < cols; col++) {
      const bucketNumber = (row + 1) * 100 + (col + 1); // 101-120, 201-220 и т.д.

      // Генерируем ковш через Bucket.js
      const bucketElement = Bucket(bucketNumber);

      $rowContainer.append(bucketElement.element);
      // Сохраняем bucketElement в данных jQuery для дальнейшего использования
      $(bucketElement.element).data('bucket', bucketElement);
    }

    $bucketGrid.append($rowContainer);
  }

  $container.append($bucketGrid);
}
