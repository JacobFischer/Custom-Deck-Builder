import * as PIXI from "pixi.js";
import { Card, CARD_MAX_HEIGHT, CARD_MAX_WIDTH } from "src/cards/card/";
import { EditableTable, IRowData, IRowValues } from "src/gui/table";
import { Tab } from "src/gui/tabular/";
import { clone, select, template } from "src/utils/";
import * as store from "store";
import { cardsHeadings, cardsRows, defaultsHeadings, defaultsRows } from "./live-editor-tables";
import * as hbs from "./live-editor.hbs";
import "./live-editor.scss";

const tabTemplate = template(hbs as any);

/** The Live Editor tab of a Tabular */
export class LiveEditorTab extends Tab {
    /** The container element for all rendered card canvases */
    private canvasesElement: HTMLElement;

    /** The scale slider element */
    private scaleSlider: HTMLInputElement;

    /** The scale slider percent text element */
    private scaleSliderPercent: HTMLElement;

    /** The add row button element */
    private addRowButton: HTMLButtonElement;

    /** The reset to defaults button element */
    private resetToDefaultsButton: HTMLButtonElement;

    /** The defaults EditableTable */
    private defaultsTable: EditableTable;

    /** The custom cards EditableTable */
    private cardsTable: EditableTable;

    /** The PIXI application that we use to render cards off screen */
    private app: PIXI.Application;

    /** The PIXI.Graphics we use to clear the canvas before a re-render */
    private clearGraphics: PIXI.Graphics;

    /** The maximum number of cards users can create before we stop them */
    private maxCustomCards: number = 6;

    /** The warning container for when there are too many cards */
    private tooManyCardsElement: HTMLElement;

    /**
     * Row to card mapping of all custom cards
     * As all cards as static when not changed we store the results in a canvas
     * outside of the PIXI instance, so we can manipulate them like regular DOM
     * elements
     */
    private cards = new Map<IRowData, Card>();

    /** Row to card's canvas of all custom cards */
    private canvases = new Map<IRowData, HTMLCanvasElement>();

    /** Creates a new instance of the LiveEditorTab */
    constructor() {
        super("Live Editor", tabTemplate() as HTMLElement);

        this.tooManyCardsElement = select(this.element, ".too-many-cards");
        this.canvasesElement = select(this.element, ".canvases");
        this.addRowButton = select(this.element, ".add-row-button") as HTMLButtonElement;

        this.scaleSlider = select(this.element, ".canvases-scale-slider") as HTMLInputElement;
        this.scaleSlider.addEventListener("input", () => this.resizeCanvases());

        this.scaleSliderPercent = select(this.element, ".canvases-scale-percent");
        this.scaleSlider.value = store.get("card-scale") || 0.5;

        // Defaults Table \\
        this.defaultsTable = new EditableTable(select(this.element, ".defaults-table"));
        this.defaultsTable.addColumns(defaultsHeadings);

        this.defaultsTable.on(EditableTable.EventSymbols.rowAdded, (rowValues: IRowValues, row: IRowData) => {
            setTimeout(() => row.tr.classList.add("shown"), 50);
        });

        // if the defaults rows are edited, update all custom cards
        this.defaultsTable.on(EditableTable.EventSymbols.cellChanged, (row: IRowData): void => {
            this.updateStore(this.defaultsTable);
            this.renderAllCards();
        });

        this.defaultsTable.addRows(store.get("card-defaults") || defaultsRows);

        // Custom Cards Table \\
        const cardsElement = select(this.element, ".cards-table");
        this.cardsTable = new EditableTable(cardsElement);

        this.cardsTable.on(EditableTable.EventSymbols.rowAdded, (rowValues: IRowValues, row: IRowData) => {
            this.updateStore(this.cardsTable);
            this.rowAdded(row);
        });

        this.cardsTable.on(EditableTable.EventSymbols.cellChanged, (row: IRowData) => {
            this.updateStore(this.cardsTable);
            this.renderCard(row);
        });

        this.cardsTable.on(EditableTable.EventSymbols.rowDeleted, (row: IRowData) => {
            this.updateStore(this.cardsTable);
            this.rowDeleted(row);
        });

        // Rendering related tasks \\
        this.app = new PIXI.Application(CARD_MAX_WIDTH, CARD_MAX_HEIGHT, {antialias: true, transparent: true});

        this.clearGraphics = new PIXI.Graphics();
        this.app.stage.addChild(this.clearGraphics);

        this.cardsTable.addColumns(cardsHeadings);
        this.cardsTable.addRows(store.get("cards") || cardsRows);

        this.addRowButton.addEventListener("click", () => {
            this.cardsTable.addRow(cardsRows[0]);
        });

        this.resetToDefaultsButton = select(this.element, ".reset-to-defaults") as HTMLButtonElement;
        this.resetToDefaultsButton.addEventListener("click", () => {
            this.resetToDefaults();
        });
    }

    /**
     * Invoked when a row is added to the Custom Cards table
     * @param row the row that was added, we need to render it
     */
    private rowAdded(row: IRowData): void {
        const canvas = document.createElement("canvas");

        setTimeout(() => {
            canvas.classList.add("shown");
            row.tr.classList.add("shown");
        }, 50);

        const deleteButton = row.values.delete as HTMLButtonElement;
        deleteButton.addEventListener("click", () => {
            row.tr.classList.remove("shown");
            canvas.classList.remove("shown");
            this.checkMaxCards(this.cardsTable.rows.length - 1);

            setTimeout(() => {
                this.cardsTable.deleteRow(row);
            }, 355); // css animation variable
        });

        const card = new Card(row.values);
        this.cards.set(row, card);

        this.canvases.set(row, canvas);
        this.canvasesElement.appendChild(canvas);

        this.renderCard(row);
        this.checkMaxCards(this.cardsTable.rows.length);
    }

    /**
     * Invoked when a row is deleted from the Custom Cards table
     * @param row the row that was deleted, we will remove its canvas and card
     */
    private rowDeleted(row: IRowData): void {
        this.updateStore(this.cardsTable);

        this.cards.delete(row);
        this.canvases.get(row).remove();
        this.canvases.delete(row);
    }

    /**
     * (re) renders all cards, invoked when a card wide (Card Default) row is
     * edited
     */
    private renderAllCards(): void {
        for (const row of this.cardsTable.getAllRows()) {
            this.renderCard(row);
        }
    }

    /**
     * (re)-renders a card to its canvas asynchronous
     * @param row the row of the card to render
     */
    private renderCard(row: IRowData): void {
        const card = this.cards.get(row);
        const canvas = this.canvases.get(row);

        // clear the renderer
        this.clearGraphics.beginFill(0x000000, 0);
        this.clearGraphics.drawRect(0, 0, card.pxWidth, card.pxHeight);

        const defaults = clone(this.defaultsTable.getRow(0).values);
        const args = clone(defaults, row.values);

        card.setFrom(args);

        card.render().then((container: PIXI.Container) => {
            this.checkForErrors(row, card);

            this.app.stage.addChild(container);
            this.app.render();

            canvas.width = card.pxWidth;
            canvas.height = card.pxHeight;
            canvas.getContext("2d").drawImage(this.app.view, 0, 0);
            this.app.stage.removeChild(container);

            this.resizeCanvases(canvas);
        });
    }

    /**
     * Resizes all card canvases. Invoked when the scale slider is changed
     * @param canvas a specific and singular canvas to scale, or all if this
     *               is omitted
     */
    private resizeCanvases(canvas?: HTMLCanvasElement): void {
        const scale = Number(this.scaleSlider.value);
        const asPercent = Math.round(scale * 10000) / 100;
        this.scaleSliderPercent.innerHTML = `${asPercent}%`;
        store.set("card-scale", scale);

        let elements;
        if (canvas) {
            elements = [canvas];
        }
        else {
            elements = this.canvasesElement.getElementsByTagName("canvas");
        }

        for (const element of elements) {
            const width = Number(element.getAttribute("width"));
            const height = Number(element.getAttribute("height"));

            element.style.width = `${width * scale}px`;
            element.style.height = `${height * scale}px`;
        }
    }

    /**
     * Checks for errors such as image url cells that are invalid urls that
     * cannot be loaded
     * @param row the row to check for errors in
     * @param card the card to check for errors in
     */
    private checkForErrors(row: IRowData, card: Card): void {
        this.checkIfImageLoaded(row, card, "imageURL");
        this.checkIfImageLoaded(this.defaultsTable.rows[0], card, "logoURL");
    }

    /**
     * Checks if a given image URL has been loaded into the PIXI.Loader
     * @param row the row to check for
     * @param card the card to card images from
     * @param key the column key we are checking, such as 'imageURL' or
     *            'logoURL'
     */
    private checkIfImageLoaded(row: IRowData, card: Card, key: string): void {
        const resource = PIXI.loader.resources[(card as any)[key]];
        const td = row.tr.getElementsByClassName(`column-${key}`)[0];

        td.classList.toggle("error", Boolean(resource.error) || !resource || !resource.texture);
    }

    /**
     * Updates the store library with custom cards so page reloads do not loose
     * card editing progress
     * @param table the table to store
     */
    private updateStore(table: EditableTable): void {
        const storeKey = table === this.cardsTable
            ? "cards"
            : "card-defaults";

        store.set(storeKey, table.rows.map((row: IRowData) => row.values));
    }

    /**
     * Resets all EditableTables to their default values, and clears stores
     */
    private resetToDefaults(): void {
        const cards = this.cardsTable.rows.slice();
        for (const row of cards) {
            row.tr.classList.remove("shown");
            this.canvases.get(row).classList.remove("shown");
        }

        const defaults = this.defaultsTable.rows.slice();
        for (const row of defaults) {
            row.tr.classList.remove("shown");
        }

        this.scaleSlider.value = String(0.5);

        setTimeout(() => {
            for (const row of cards) {
                this.cardsTable.deleteRow(row);
            }

            for (const row of defaults) {
                this.defaultsTable.deleteRow(row);
            }

            setTimeout(() => {
                this.defaultsTable.addRows(defaultsRows);
                this.updateStore(this.defaultsTable);

                this.cardsTable.addRows(cardsRows);
                this.updateStore(this.cardsTable);
            }, 50);
        }, 355);
    }

    /**
     * Checks if the user hit the maximum number of cards and we need to show or
     * hide elements accordingly
     * @param numberOfCards the number of cards there will be
     */
    private checkMaxCards(numberOfCards: number): void {
        const tooManyCards = (numberOfCards >= this.maxCustomCards);

        this.addRowButton.disabled = tooManyCards;
        this.tooManyCardsElement.classList.toggle("collapsed", !tooManyCards);
    }
}
