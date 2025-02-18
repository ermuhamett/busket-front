// Массив с путями к SVG-файлам (ковши)
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
        let svg = $(data).find('svg');
        callback(svg);
    });
}

// Создаёт контейнер для ковша с подписью (номер)
function createBucketContainer(id) {
    let bucketContainer = $('<div class="bucket-container"></div>');
    // Чтобы спаннер (с абсолютным позиционированием) располагался внутри
    bucketContainer.css('position', 'relative');

    let svgPlaceholder = $('<div class="bucket-svg"></div>');
    bucketContainer.append(svgPlaceholder);

    // Добавляем подпись с номером (делаем жирной в CSS)
    bucketContainer.append(`<div class="bucket-id">${id}</div>`);

    return { bucketContainer, svgPlaceholder };
}

// Генерирует ковши с заданной нумерацией
function generateBuckets(containerId, bucketCount, startId) {
    let container = $(containerId);

    for (let i = 0; i < bucketCount; i++) {
        let bucketNumber = startId + i;
        let { bucketContainer, svgPlaceholder } = createBucketContainer(bucketNumber);
        container.append(bucketContainer);

        // Случайный выбор одного из доступных SVG-файлов
        let randomIndex = Math.floor(Math.random() * svgFiles.length);
        let svgUrl = svgFiles[randomIndex];

        // Загружаем и вставляем SVG
        loadSVG(svgUrl, function(svgTemplate) {
            let svgClone = svgTemplate.clone();
            svgClone.attr('id', `bucket-${bucketNumber}`);
            svgClone.addClass('bucket');
            // Удаляем inline-стили, если они есть
            svgClone.find('.bucket-fill').removeAttr('style');
            svgPlaceholder.append(svgClone);
        });
    }

    // При клике на ковш добавляем/убираем класс active (выделение)
    container.on('click', '.bucket', function() {
        $(this).toggleClass('active');
    });
}

// Накладывает spanner.svg на выбранные (активные) ковши
function overlaySpannerOnActiveBuckets() {
    let spannerUrl = "./svg/spanner.svg";
    
    loadSVG(spannerUrl, function(spannerSVG) {
        // Для каждого ковша, у которого класс .active
        $('.bucket.active').each(function() {
            let $bucket = $(this);
            let $container = $bucket.closest('.bucket-container');

            // Удаляем предыдущий спаннер (если есть)
            $container.find('.spanner-overlay').remove();
            // Также убираем предыдущую подсветку (если вдруг была)
            $container.removeClass('overlayed');

            // Клонируем спаннер
            let spannerClone = spannerSVG.clone().addClass('spanner-overlay');

            // Добавляем его в контейнер, чтобы он располагался поверх ковша
            $container.append(spannerClone);

            // Добавляем класс, который подсвечивает ковш
            $container.addClass('overlayed');
        });
    });
}

$(document).ready(function() {
    // Генерируем 20 ковшей (101–120)
    generateBuckets('#bucket-grid-1', 20, 101);
    // Генерируем 20 ковшей (201–220)
    generateBuckets('#bucket-grid-2', 20, 201);

    // Клик по кнопке "Overlay Spanner"
    $('#overlay-spanner').on('click', function() {
        overlaySpannerOnActiveBuckets();
    });
});
