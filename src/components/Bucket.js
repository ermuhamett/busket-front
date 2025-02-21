export class Bucket {
    constructor(id, status = 'empty', coolingTime = 0) {
        this.id = id;
        this.status = status;
        this.coolingTime = coolingTime;
        this.installationTime = null;
        this.element = this.createElement();
    }

    createElement() {
        let bucketElement = $('<div>').addClass('bucket').attr('data-id', this.id);
        this.updateSVG(bucketElement);
        return bucketElement;
    }

    updateSVG(bucketElement) {
        const svgPath = `./svg/${this.status}_bucket.svg`;
        $.get(svgPath, (data) => {
            if (bucketElement) {
                bucketElement.html(data);
                bucketElement.append(`<div class="bucket-id">${this.id}</div>`);
            }
        });
    }

    updateStatus(newStatus) {
        this.status = newStatus;
        this.updateSVG(this.element);
    }

    setCoolingTime(hours) {
        this.coolingTime = hours;
        this.installationTime = new Date();
        this.updateStatus('full');
        this.startCoolingTimer();
    }

    startCoolingTimer() {
        if (this.coolingTime > 0) {
            setTimeout(() => {
                this.updateStatus('empty');
            }, this.coolingTime * 60 * 60 * 1000); // Convert hours to milliseconds
        }
    }
}