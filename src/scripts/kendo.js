import { SlagField } from '../components/SlagField.js';

$(document).ready(() => {
    if ($('#slag-field').length) {
        const slagField = new SlagField(5, 8);
        $('#slag-field').append(slagField.element);

        $('#cooling-time-button').kendoButton({
            click: () => {
                let coolingTime = prompt('Enter cooling time in hours:');
                if (coolingTime) {
                    slagField.cells.forEach(cell => {
                        if (cell.bucket.status === 'full') {
                            cell.bucket.setCoolingTime(parseInt(coolingTime));
                        }
                    });
                    alert(`Cooling time set to ${coolingTime} hours for all full buckets.`);
                }
            }
        });
    } else {
        console.error("Element #slag-field не найден!");
    }
});