import { Bucket } from './Bucket.js';

export class Cell {
    constructor(id) {
        this.id = id;
        this.bucket = new Bucket(id);
        this.element = this.createElement();
    }

    createElement() {
        let cellElement = $('<div>').addClass('cell').append(this.bucket.element);
        cellElement.on('click', this.handleLeftClick.bind(this));
        cellElement.on('contextmenu', this.handleRightClick.bind(this));
        return cellElement;
    }

    handleLeftClick(event) {
        event.preventDefault();
        alert(`Bucket ID: ${this.bucket.id}\nStatus: ${this.bucket.status}\nInstallation Time: ${this.bucket.installationTime}`);
    }

    handleRightClick(event) {
        event.preventDefault();
        let newStatus = prompt('Enter new status (empty, full, no_bucket):', this.bucket.status);
        if (newStatus && confirm('Are you sure?')) {
            this.bucket.updateStatus(newStatus);
        }
    }
}