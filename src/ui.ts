import { template } from './utils';
import { EditableTable, TableEventSymbols, RowValues, RowData } from './table';
import { cardsHeadings, cardsRows, defaultsHeadings, defaultsRows } from './ui-tables';

const uiTemplate = template(require('./ui.hbs'));

/**
 * The User Interface to interact with this custom card builder project
 */
export class UI {
    readonly parent: HTMLElement;
    private element: HTMLElement;

    private defaultsTable: EditableTable;
    private cardsTable: EditableTable;

    constructor(element: HTMLElement) {
        this.parent = element;
        this.element = <HTMLElement>uiTemplate();
        this.parent.appendChild(this.element);

        // Defaults Table \\
        this.defaultsTable = new EditableTable(this.element.getElementsByClassName('defaults-table')[0]);
        this.defaultsTable.addColumns(defaultsHeadings);
        this.defaultsTable.addRows(defaultsRows);

        // Custom Cards Table \\
        const cardsElement = this.element.getElementsByClassName('cards-table')[0];
        this.cardsTable = new EditableTable(cardsElement);

        this.cardsTable.on(TableEventSymbols.rowAdded, (rowValues: RowValues, row: RowData) => {
            const deleteButton = <HTMLButtonElement>row.values.delete;
            deleteButton.addEventListener('click', () => {
                this.cardsTable.deleteRow(row);
            });
        });

        this.cardsTable.addColumns(cardsHeadings);
        this.cardsTable.addRows(cardsRows);

        const button = document.createElement('button');
        cardsElement.appendChild(button);
        button.innerHTML = 'Add Row';
        button.addEventListener('click', () => {
            this.cardsTable.addRow([]);
        });
    }
}
