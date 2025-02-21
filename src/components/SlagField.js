import { Cell } from './Cell.js';

export class SlagField {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cells = [];
        this.element = this.createElement();
    }

    createElement() {
        let fieldElement = $('<div>').addClass('slag-field');
        for (let i = 0; i < this.rows; i++) {
            let rowElement = $('<div>').addClass('row');
            for (let j = 0; j < this.columns; j++) {
                let cell = new Cell(`${i}-${j}`);
                this.cells.push(cell);
                rowElement.append(cell.element);
            }
            fieldElement.append(rowElement);
        }
        return fieldElement;
    }
}