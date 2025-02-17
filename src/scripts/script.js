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

    // Удаляем inline-стиль и устанавливаем класс с градиентом
    let pathElements = svgClone.find('.bucket-fill');
    pathElements.removeAttr('style')
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

function updateGradientColors() {
    const gradients = [
        { id: 'red-gradient', colors: ['#ff0000', '#f3ebeb', '#ff0000'] },
        { id: 'yellow-gradient', colors: ['#ffff00', '#ffffcc', '#ffff00'] },
        { id: 'blue-gradient', colors: ['#0000ff', '#ccccff', '#0000ff'] },
        { id: 'green-gradient', colors: ['#00ff00', '#ccffcc', '#00ff00'] }
    ];

    gradients.forEach(gradient => {
        const stops = $(`#${gradient.id} stop`);
        stops.eq(0).css('stop-color', gradient.colors[0]);
        stops.eq(1).css('stop-color', gradient.colors[1]);
        stops.eq(2).css('stop-color', gradient.colors[2]);
    });
}

// Динамическая отрисовка ковшей
$(document).ready(function() {
    let standartBucket = "./svg/bucket.svg";
    let redBucket = "./svg/red_bucket.svg";
    let superBucket = "./svg/bucket2.svg";
    generateBuckets('#bucket-grid-1', 20, 101, standartBucket); // 20 ковшей, начиная с 101
    generateBuckets('#bucket-grid-2', 20, 201, superBucket); // 20 ковшей, начиная с 201

    // Смена цвета ковшей по нажатию кнопки
    $('#set-color').on('click', function() {
        $('.bucket .bucket-fill').each(function() {
            $(this).removeAttr('style'); // удаляем inline-стиль
            let randomColorClass = getRandomColorClass(); // Получаем случайный цвет
            $(this).attr('class', `bucket-fill ${randomColorClass}`); // Устанавливаем новый цвет
        });
        updateGradientColors(); // Обновляем цвета градиентов
    });
});