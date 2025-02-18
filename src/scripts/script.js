// Массив с путями к SVG-файлам
const svgFiles = [
    "./svg/blue_bucket.svg",
    "./svg/yellow_bucket.svg",
    "./svg/empty_bucket.svg",
    "./svg/red_bucket.svg",
    "./svg/green_bucket.svg",
    "./svg/no_bucket.svg",
];

// Функция для загрузки SVG по URL
function loadSVG(url, callback) {
    $.get(url, function(data) {
        // Из загруженных данных находим элемент <svg>
        let svg = $(data).find('svg');
        callback(svg);
    });
}

// Функция, создающая контейнер для ковша с заданным номером
// В контейнере сразу появляется статическая подпись, а SVG вставится позже
function createBucketContainer(id) {
    // Создаем контейнер для SVG и подписи (номер ковша)
    let bucketContainer = $('<div class="bucket-container"></div>');
    // Добавляем пустой элемент, куда потом вставим SVG
    let svgPlaceholder = $('<div class="bucket-svg"></div>');
    bucketContainer.append(svgPlaceholder);
    // Добавляем подпись с номером
    bucketContainer.append(`<div class="bucket-id">${id}</div>`);
    return { bucketContainer, svgPlaceholder };
}

// Функция генерации ковшей
// containerId  - селектор контейнера, куда будут добавляться ковши
// bucketCount  - сколько ковшей создать
// startId      - начальный номер (например, 101 или 201)
function generateBuckets(containerId, bucketCount, startId) {
    let container = $(containerId);

    for (let i = 0; i < bucketCount; i++) {
        let bucketNumber = startId + i;
        // Создаем контейнер с подписью (номерация статична)
        let { bucketContainer, svgPlaceholder } = createBucketContainer(bucketNumber);
        // Добавляем контейнер сразу, чтобы нумерация была в нужном порядке
        container.append(bucketContainer);

        // Выбираем случайный SVG из массива
        let randomIndex = Math.floor(Math.random() * svgFiles.length);
        let svgUrl = svgFiles[randomIndex];

        // Загружаем SVG и вставляем в созданный placeholder
        loadSVG(svgUrl, function(svgTemplate) {
            let svgClone = svgTemplate.clone();
            svgClone.attr('id', `bucket-${bucketNumber}`);
            svgClone.addClass('bucket'); // Для стилизации и обработки кликов
            // Удаляем inline-стили, если они есть
            svgClone.find('.bucket-fill').removeAttr('style');
            svgPlaceholder.append(svgClone);
        });
    }

    // Обработчик клика для переключения класса "active" у каждого SVG-ковша
    container.on('click', '.bucket', function() {
        $(this).toggleClass('active');
    });
}

// Инициализация после загрузки документа
$(document).ready(function() {
    // Генерируем 20 ковшей с нумерацией от 101 до 120 в контейнере #bucket-grid-1
    generateBuckets('#bucket-grid-1', 20, 101);
    // Генерируем 20 ковшей с нумерацией от 201 до 220 в контейнере #bucket-grid-2
    generateBuckets('#bucket-grid-2', 20, 201);

    // Пример обработчика для кнопки, который переключает класс "active" для всех SVG-ковшей
    $('#set-color').on('click', function() {
        $('.bucket').each(function() {
            $(this).toggleClass('active');
        });
    });
});
