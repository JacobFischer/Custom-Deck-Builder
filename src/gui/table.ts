import { toCamelCase } from 'src/utils';
import { EventEmitter } from 'events';
import * as uuid from 'uuid/v4';

export type RowValue = number | string | Node | boolean;
export type RowValues = {[key: string]: RowValue};

export interface ColumnData {
    id?: string,

    /** Display name to use, defaults to the id if not given */
    name?: string,

    type?: 'number' | 'string' | 'node' | 'boolean',
    defaultValue?: RowValue,
    allowedValues?: RowValue[],
    transform?: (originalValue: RowValue, row?: RowData) => RowValue,
    notEditable?: boolean,
    longText?: boolean,
    color?: boolean,
    rowsTitle?: string,
    title?: string,
    inputAttributes?: {[key: string]: any},
};

export interface RowData {
    index: number,
    values: RowValues,
    tr: HTMLTableRowElement,
    tds: HTMLTableDataCellElement[],
};

/**
 * @class A simple wrapper around a <table> that emits events on editing
 */
export class EditableTable extends EventEmitter {
    readonly columns: ColumnData[];
    readonly rows: RowData[];

    private parent: Node;
    private table = document.createElement('table');
    private headingsRow = document.createElement('tr');
    private headings = new Map<string, HTMLTableHeaderCellElement>();

    static EventSymbols = {
        rowAdded: Symbol('rowAdded'),
        cellChanged: Symbol('cellChanged'),
        rowDeleted: Symbol('rowDeleted'),
    };

    constructor(parent: Node, columns?: string[] | ColumnData[], rows?: any[]) {
        super();

        this.parent = parent;
        this.columns = [];
        this.rows = [];
        this.table.classList.add('gui-table');
        this.table.appendChild(this.headingsRow);
        this.parent.appendChild(this.table);

        if (columns) {
            this.addColumns(columns);
        }

        if (rows) {
            this.addRows(rows);
        }
    }

    public addColumns(columns: (string | ColumnData)[]): void {
        for (const column of columns) {
            this.formatColumn(column);
        }
        this.updateColumns();
    }

    public addColumn(column: string | ColumnData): void {
        this.formatColumn(column);
        this.updateColumns();
    }

    public addRows(rows: any[]): void {
        for (const row of rows) {
            this.formatRow(row);
        }
        this.updateRows(true);
    }

    public addRow(values: any): void {
        this.formatRow(values);
        this.updateRows(true);
    }

    private formatColumn(column: string | ColumnData) {
        if (typeof(column) == 'string') {
            column = <ColumnData>{
                id: column,
            };
        }

        if (!column.name) {
            column.name = column.id;
        }

        if (!column.id) {
            column.id = toCamelCase(column.name);
        }

        column.type = column.type || 'string';

        switch (column.type) {
            case 'string':
                column.defaultValue = '';
                column.transform = column.transform || String;
                break;
            case 'number':
                column.defaultValue = 0;
                column.transform = column.transform || Number;
                break;
            case 'boolean':
                column.transform = column.transform || Boolean;
                if (column.defaultValue === undefined) {
                    column.defaultValue = Boolean(column.defaultValue);
                }
                break;
            case 'node':
                column.notEditable = true;
                column.transform = val => val;
                if (!column.defaultValue) {
                    throw new Error('Node values require default value to clone from');
                }
                break;
        }

        this.columns.push(column);
    }

    private updateColumns(): void {
        if (this.headings.size < this.columns.length) {
            const newColumns = this.columns.slice(this.headings.size);
            for (const column of newColumns) {
                const hr = document.createElement('th');
                hr.innerHTML = column.name;
                this.headingsRow.appendChild(hr);
                this.headings.set(column.id, hr);
            }

            this.updateRows(false);
        }
    }

    private formatRow(values: any): void {
        if (values instanceof Array) {
            const obj: any = {};
            for (let i = 0; i < this.columns.length; i++) {
                const column = this.columns[i];
                obj[column.id] = values[i];
            }
            values = obj;
        }

        // now row is an object
        const row = <RowData>{
            index: this.rows.length,
            values: values,
            tr: document.createElement('tr'),
            tds: [],
        };
        this.rows.push(row);

        for (const column of this.columns) {
            if (column.type === 'node') {
                // we need to clone the default node for this new row
                let cloning = (<any>column.defaultValue);
                let clone = cloning.cloneNode();
                clone.innerHTML = cloning.innerHTML;
                row.values[column.id] = clone;
            }

            if (column.allowedValues) {
                if (column.allowedValues.indexOf(row.values[column.id]) === -1) {
                    row.values[column.id] = column.allowedValues[0];
                }
            }

            if (row.values[column.id] === undefined) {
                row.values[column.id] = column.defaultValue;
            }

            row.values[column.id] = column.transform(row.values[column.id], row);
        }

        this.emit(EditableTable.EventSymbols.rowAdded, row.values, row);
    }

    private updateRows(added: boolean): void {
        for (const row of this.rows) {
            if (!row.tr.parentElement) {
                this.table.appendChild(row.tr);
            }

            for (let i = row.tds.length; i < this.columns.length; i++) {
                const id = `cell-${uuid()}`;
                const column = this.columns[i];
                const td = document.createElement('td');
                td.setAttribute('class', `column-${column.id}`);
                const wrapper = document.createElement('div');
                td.appendChild(wrapper);

                if (column.type === 'node') {
                    wrapper.appendChild(<Node>row.values[column.id]);
                }

                if (!column.notEditable) {
                    let child: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                    let event = 'change';
                    let checkbox = false;
                    if (column.allowedValues) {
                        // then they edit via drop down menu
                        child = document.createElement('select');
                        for (const value of column.allowedValues) {
                            const option = document.createElement('option');
                            option.setAttribute('value', String(value));
                            option.innerText = String(value);
                            child.appendChild(option);
                        }
                    }
                    else if (column.longText) {
                        // a text area is needed
                        child = document.createElement('textarea');
                    }
                    else {
                        // a normal input
                        child = document.createElement('input');
                        let inputType = 'text';
                        switch(column.type) {
                            case 'boolean':
                                inputType = 'checkbox';
                                event = 'click';
                                checkbox = true;
                                const label = document.createElement('label');
                                label.setAttribute('for', id);
                                wrapper.appendChild(label);
                                break;
                            case 'number':
                                inputType = 'number';
                                break;
                            case 'string':
                                if (column.color) {
                                    inputType = 'color';
                                }
                                break;
                        }
                        child.setAttribute('type', inputType);
                    }

                    if (checkbox) {
                        (<any>child).checked = row.values[column.id];
                    }
                    else {
                        child.value = String(row.values[column.id]);
                    }

                    if (column.inputAttributes) {
                        for (const attribute of Object.keys(column.inputAttributes)) {
                            child.setAttribute(attribute, String(column.inputAttributes[attribute]));
                        }
                    }

                    child.id = id;
                    wrapper.insertBefore(child, wrapper.firstChild);

                    let lastValue: any = child.value;
                    child.addEventListener(event, () => {
                        let newValue: any = child.value;
                        if (checkbox) {
                            newValue = (<HTMLInputElement>child).checked;
                        }

                        const untransformed = newValue;
                        newValue = column.transform(newValue, row);

                        if (lastValue !== newValue) {
                            row.values[column.id] = column.transform(newValue, row);
                            this.emit(EditableTable.EventSymbols.cellChanged, row, column, newValue);

                            lastValue = newValue;
                        }

                        if (newValue !== untransformed) {
                            if (checkbox) {
                                (<any>child).checked = newValue;
                            }
                            else {
                                child.value = newValue;
                            }
                        }
                    });
                }
                else if (column.type !== 'node') {
                    wrapper.innerHTML = String(row.values[column.id]);
                }

                if (column.rowsTitle) {
                    td.title = column.rowsTitle;
                }

                row.tds.push(td);
                row.tr.appendChild(td);
            }
        }
    }

    public getRow(index: number): RowData {
        if (index > -1 && index < this.rows.length) {
            return this.rows[index];
        }

        throw new RangeError(`${index} not in range of table with ${this.rows.length} rows.`);
    }

    public getAllRows(): RowData[] {
        return this.rows.slice();
    }

    public deleteRow(index: number | RowData): void {
        if (typeof(index) === 'object') {
            index = index.index;
        }

        this.getRow(index); // does a range check for us

        let row = this.rows[index];
        this.rows.splice(index, 1);
        for (let i = index; i < this.rows.length; i++) {
            this.rows[i].index = i;
        }
        row.tr.remove(); // from the DOM

        this.emit(EditableTable.EventSymbols.rowDeleted, row);
    }
}
