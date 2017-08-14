import { EventEmitter } from "events";
import { toCamelCase } from "src/utils/string";
import * as uuid from "uuid/v4";

/** Valid types for a Row's value (cell) */
export type RowValue = number | string | Node | boolean;

/** key/value mapping of column names to cell values for a row */
export interface IRowValues {[key: string]: RowValue; }

/**
 * All variables associated with a column, row agnostic
 */
export interface IColumnData {
    id?: string;

    /** Display name to use, defaults to the id if not given */
    name?: string;

    type?: "number" | "string" | "node" | "boolean";
    defaultValue?: RowValue;
    allowedValues?: RowValue[];
    transform?: (originalValue: RowValue, row?: IRowData) => RowValue;
    notEditable?: boolean;
    longText?: boolean;
    color?: boolean;
    rowsTitle?: string;
    title?: string;
    inputAttributes?: {[key: string]: any};
}

/**
 * All the variable associated with a row, column(s) agnostic
 */
export interface IRowData {
    index: number;
    values: IRowValues;
    tr: HTMLTableRowElement;
    tds: HTMLTableDataCellElement[];
}

/** A simple wrapper around a <table> that emits events on editing */
export class EditableTable extends EventEmitter {
    /** Symbols emitted by this Table for certain events */
    public static EventSymbols = {
        /** Emitted when a new row is added to this table */
        rowAdded: Symbol("rowAdded"),

        /** Emitted when an existing cell is modified in this table */
        cellChanged: Symbol("cellChanged"),

        /** Emitted when a row is deleted from this table */
        rowDeleted: Symbol("rowDeleted"),
    };

    /** The columns of this table */
    public readonly columns: IColumnData[];

    /** The rows in this table */
    public readonly rows: IRowData[];

    /** The parent node in the DOM of this table */
    private parent: Node;

    /** the table element we control */
    private table = document.createElement("table");

    /** the tr row that acts as the headings in the table */
    private headingsRow = document.createElement("tr");

    /** map of column names (strings) to their heading cell element */
    private headings = new Map<string, HTMLTableHeaderCellElement>();

    /**
     * Creates a new Table on some HTML element in the DOM
     * @param parent the parent element to attach a table to
     * @param columns optional columns to initialize
     * @param rows optional row values to put in cells (must have columns)
     */
    constructor(parent: Node, columns?: string[] | IColumnData[], rows?: any[]) {
        super();

        this.parent = parent;
        this.columns = [];
        this.rows = [];
        this.table.classList.add("gui-table");
        this.table.appendChild(this.headingsRow);
        this.parent.appendChild(this.table);

        if (columns) {
            this.addColumns(columns);
        }

        if (rows) {
            this.addRows(rows);
        }
    }

    /**
     * Adds columns to this table at the end
     * @param columns the list of columns to add to the table. Can be strings,
     *                or fully formed ColumnData
     */
    public addColumns(columns: Array<string | IColumnData>): void {
        for (const column of columns) {
            this.formatColumn(column);
        }
        this.updateColumns();
    }

    /**
     * Adds a single column to this table at the end
     * @param column the name of the column to add, or fully formed ColumnData
     */
    public addColumn(column: string | IColumnData): void {
        this.formatColumn(column);
        this.updateColumns();
    }

    /**
     * Adds rows to add to the bottom of the table
     * @param rows the list of rows to add
     */
    public addRows(rows: any[]): void {
        for (const row of rows) {
            this.formatRow(row);
        }
        this.updateRows(true);
    }

    /**
     * Adds row to add to the bottom of the table
     * @param row the single row to add
     */
    public addRow(row: any): void {
        this.formatRow(row);
        this.updateRows(true);
    }

    /**
     * Gets a row's data at a given index
     * @param index the index of the row, if out of bounds an Error will be
     *              thrown
     * @returns the row at the given index
     */
    public getRow(index: number): IRowData {
        if (index > -1 && index < this.rows.length) {
            return this.rows[index];
        }

        throw new RangeError(`${index} not in range of table with ${this.rows.length} rows.`);
    }

    /**
     * Gets a copy of the array of all the rows
     * @returns a copy of the array of all the rows
     */
    public getAllRows(): IRowData[] {
        return this.rows.slice();
    }

    /**
     * deletes a row at the given index, or throws an Error if none exists there
     * @param index the index of the row to delete
     */
    public deleteRow(index: number | IRowData): void {
        if (typeof(index) === "object") {
            index = index.index;
        }

        this.getRow(index); // does a range check for us

        const row = this.rows[index];
        this.rows.splice(index, 1);
        for (let i = index; i < this.rows.length; i++) {
            this.rows[i].index = i;
        }
        row.tr.remove(); // from the DOM

        this.emit(EditableTable.EventSymbols.rowDeleted, row);
    }

    /**
     * Formats a column, creating the html elements and verifying the input is
     * valid
     * @param column the string name or fully formed ColumnData to add and
     *               format
     */
    private formatColumn(column: string | IColumnData): void {
        if (typeof(column) === "string") {
            column = {
                id: column,
            } as IColumnData;
        }

        if (!column.name) {
            column.name = column.id;
        }

        if (!column.id) {
            column.id = toCamelCase(column.name);
        }

        column.type = column.type || "string";

        switch (column.type) {
            case "string":
                column.defaultValue = "";
                column.transform = column.transform || String;
                break;
            case "number":
                column.defaultValue = 0;
                column.transform = column.transform || Number;
                break;
            case "boolean":
                column.transform = column.transform || Boolean;
                if (column.defaultValue === undefined) {
                    column.defaultValue = Boolean(column.defaultValue);
                }
                break;
            case "node":
                column.notEditable = true;
                column.transform = (val) => val;
                if (!column.defaultValue) {
                    throw new Error("Node values require default value to clone from");
                }
                break;
        }

        this.columns.push(column);
    }

    /**
     * Internally updates the columns and ensures they are added to the DOM
     */
    private updateColumns(): void {
        if (this.headings.size < this.columns.length) {
            const newColumns = this.columns.slice(this.headings.size);
            for (const column of newColumns) {
                const hr = document.createElement("th");
                hr.innerHTML = column.name;
                this.headingsRow.appendChild(hr);
                this.headings.set(column.id, hr);
            }

            this.updateRows(false);
        }
    }

    /**
     * Formats a row to create its RowData, and verifies its input is valid
     * @param values the values (cells) in the row that make it up
     */
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
        const row: IRowData = {
            index: this.rows.length,
            values,
            tr: document.createElement("tr"),
            tds: [],
        };

        this.rows.push(row);

        for (const column of this.columns) {
            if (column.type === "node") {
                // we need to clone the default node for this new row
                const cloning = (column.defaultValue as any);
                const clone = cloning.cloneNode();
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

    /**
     * Internally updates the rows and ensures they are added to the DOM
     * @param added if rows were added before this was called
     */
    private updateRows(added: boolean): void {
        for (const row of this.rows) {
            if (!row.tr.parentElement) {
                this.table.appendChild(row.tr);
            }

            for (let i = row.tds.length; i < this.columns.length; i++) {
                const id = `cell-${uuid()}`;
                const column = this.columns[i];
                const td = document.createElement("td");
                td.setAttribute("class", `column-${column.id}`);
                const wrapper = document.createElement("div");
                td.appendChild(wrapper);

                if (column.type === "node") {
                    wrapper.appendChild(row.values[column.id] as Node);
                }

                if (!column.notEditable) {
                    let child: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                    let event = "change";
                    let checkbox = false;
                    if (column.allowedValues) {
                        // then they edit via drop down menu
                        child = document.createElement("select");
                        for (const value of column.allowedValues) {
                            const option = document.createElement("option");
                            option.setAttribute("value", String(value));
                            option.innerText = String(value);
                            child.appendChild(option);
                        }
                    }
                    else if (column.longText) {
                        // a text area is needed
                        child = document.createElement("textarea");
                    }
                    else {
                        // a normal input
                        child = document.createElement("input");
                        let inputType = "text";
                        switch (column.type) {
                            case "boolean":
                                inputType = "checkbox";
                                event = "click";
                                checkbox = true;
                                const label = document.createElement("label");
                                label.setAttribute("for", id);
                                wrapper.appendChild(label);
                                break;
                            case "number":
                                inputType = "number";
                                break;
                            case "string":
                                if (column.color) {
                                    inputType = "color";
                                }
                                break;
                        }
                        child.setAttribute("type", inputType);
                    }

                    if (checkbox) {
                        (child as any).checked = row.values[column.id];
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
                            newValue = (child as HTMLInputElement).checked;
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
                                (child as any).checked = newValue;
                            }
                            else {
                                child.value = newValue;
                            }
                        }
                    });
                }
                else if (column.type !== "node") {
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
}
