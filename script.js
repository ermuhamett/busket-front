function loadSVG(url, callback) {
    $.get(url, function(data) {
        let svg = $(data).find('svg');
        callback(svg);
    });
}

function createBucket(id, svgTemplate) {
    let svgClone = svgTemplate.clone();
    svgClone.attr('id', `bucket-${id}`);
    svgClone.addClass('bucket'); // Добавляем класс bucket
    svgClone.find('path').addClass(getRandomColorClass()); // Устанавливаем начальный цвет

    // Удаляем inline-стиль и устанавливаем класс с градиентом
    let pathElement = svgClone.find('path');
    pathElement.removeAttr('style')
               .addClass(getRandomColorClass()); // Применяем градиентный цвет
               
    // Создаем контейнер для SVG и номера
    let bucketContainer = $('<div class="bucket-container"></div>');
    bucketContainer.append(svgClone);
    bucketContainer.append(`<div class="bucket-id">${id}</div>`); // Добавляем номер ковша

    return bucketContainer;
}

function generateBuckets(containerId, bucketCount, startId, svgUrl) {
    loadSVG(svgUrl, function(svgTemplate) {
        let container = $(containerId);
        for (let i = 0; i < bucketCount; i++) {
            let bucket = createBucket(startId + i, svgTemplate);
            container.append(bucket);
        }

        // Добавляем обработчик клика для каждого ковша
        $('.bucket').on('click', function() {
            $(this).toggleClass('active'); // Добавляем/удаляем класс активности
        });
    });
}

function getRandomColorClass() {
    const colors = [
        'red-gradient',
        'yellow-gradient',
        'blue-gradient',
        'green-gradient'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Динамическая отрисовка ковшей
$(document).ready(function() {
    generateBuckets('#bucket-grid-1', 20, 101, 'bucket.svg'); // 20 ковшей, начиная с 101
    generateBuckets('#bucket-grid-2', 20, 201, 'bucket.svg'); // 20 ковшей, начиная с 201

    // Смена цвета ковшей по нажатию кнопки
    $('#set-color').on('click', function() {
        $('.bucket path').each(function() {
            $(this).removeAttr('style'); // удаляем inline-стиль
            let randomColorClass = getRandomColorClass(); // Получаем случайный цвет
            $(this).attr('class', randomColorClass); // Устанавливаем новый цвет
        });
    });
});