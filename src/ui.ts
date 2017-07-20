import './ui.scss';
import { template, loadTextures, tryToCast, cloneExceptEmpty } from './utils';
import { EditableTable, TableEventSymbols, RowValues, RowData } from './table';
import { cardsHeadings, cardsRows, defaultsHeadings, defaultsRows } from './ui-tables';
import { Card, CARD_MAX_WIDTH, CARD_MAX_HEIGHT } from './card';
import * as PIXI from 'pixi.js';


const uiTemplate = template(require('./ui.hbs'));

/**
 * The User Interface to interact with this custom card builder project
 */
export class UI {
    readonly parent: HTMLElement;
    private element: HTMLElement;
    private canvasesElement: Element;
    private scaleSlider: HTMLInputElement;
    private scaleSliderPercent: HTMLElement;

    private defaultsTable: EditableTable;
    private cardsTable: EditableTable;

    private app: PIXI.Application;
    private pixiGraphics: PIXI.Graphics;

    private cards = new Map<RowData, Card>();
    private canvases = new Map<RowData, HTMLCanvasElement>();

    private defaultsRow: RowData;

    constructor(element: HTMLElement) {
        this.parent = element;
        this.element = <HTMLElement>uiTemplate();
        this.parent.appendChild(this.element);
        this.canvasesElement = this.element.getElementsByClassName('canvases')[0];

        // adds the user agent to the document for css styling per browser
        document.documentElement.setAttribute("data-browser", navigator.userAgent);
        document.title = this.element.getElementsByTagName('h1')[0].innerHTML;

        this.scaleSlider = <HTMLInputElement>this.element.getElementsByClassName('canvases-scale-slider')[0];
        this.scaleSlider.addEventListener('input', () => this.resizeCanvases());
        this.scaleSliderPercent = <HTMLElement>this.element.getElementsByClassName('canvases-scale-percent')[0];

        // Defaults Table \\
        this.defaultsTable = new EditableTable(this.element.getElementsByClassName('defaults-table')[0]);
        this.defaultsTable.addColumns(defaultsHeadings);
        this.defaultsTable.addRows(defaultsRows);

        this.defaultsRow = this.defaultsTable.getRow(0);

        // Custom Cards Table \\
        const cardsElement = this.element.getElementsByClassName('cards-table')[0];
        this.cardsTable = new EditableTable(cardsElement);

        this.cardsTable.on(TableEventSymbols.rowAdded, (rowValues: RowValues, row: RowData) => {
            this.rowAdded(row);
        });

        this.cardsTable.on(TableEventSymbols.cellChanged, (row: RowData): void => {
            this.renderCard(row);
        });

        this.cardsTable.on(TableEventSymbols.rowDeleted, (row: RowData) => {
            this.rowDeleted(row);
        });

        this.app = new PIXI.Application(CARD_MAX_WIDTH, CARD_MAX_HEIGHT, {antialias: true, transparent: true});
        //document.body.appendChild(this.app.view);

        this.pixiGraphics = new PIXI.Graphics();
        this.app.stage.addChild(this.pixiGraphics);

        this.cardsTable.addColumns(cardsHeadings);
        this.cardsTable.addRows(cardsRows);

        const addRowButton = <HTMLButtonElement>this.element.getElementsByClassName('add-row-button')[0];
        addRowButton.addEventListener('click', () => {
            this.cardsTable.addRow(cardsRows[0]);
        });
    }

    private rowAdded(row: RowData) {
        const deleteButton = <HTMLButtonElement>row.values.delete;
        deleteButton.addEventListener('click', () => {
            this.cardsTable.deleteRow(row);
        });

        const card = new Card(row.values);
        this.cards.set(row, card);

        const canvas = document.createElement('canvas');
        this.canvases.set(row, canvas);
        this.canvasesElement.appendChild(canvas);

        this.renderCard(row);
    }

    private rowDeleted(row: RowData) {
        this.cards.delete(row);
        this.canvases.get(row).remove();
        this.canvases.delete(row);
    }

    private renderCard(row: RowData) {
        const card = this.cards.get(row);
        const canvas = this.canvases.get(row);

        // clear the renderer
        this.pixiGraphics.beginFill(0x000000, 0);
        this.pixiGraphics.drawRect(0, 0, card.pxWidth, card.pxHeight);

        const defaults = cloneExceptEmpty(this.defaultsRow.values);
        const args = cloneExceptEmpty(defaults, row.values);

        card.setFrom(args);

        card.render().then((container: PIXI.Container) => {
            this.app.stage.addChild(container);
            this.app.render();

            canvas.width = card.pxWidth;
            canvas.height = card.pxHeight;
            canvas.getContext('2d').drawImage(this.app.view, 0, 0);
            this.app.stage.removeChild(container);

            this.resizeCanvases(canvas);
        });
    }

    private resizeCanvases(canvas?: HTMLCanvasElement) {
        const scale = Number(this.scaleSlider.value);
        this.scaleSliderPercent.innerHTML = `${Math.round(scale * 10000) / 100}%`;

        let elements;
        if (canvas) {
            elements = [canvas];
        }
        else {
            elements = this.canvasesElement.getElementsByTagName('canvas');
        }

        for (const element of elements) {
            const width = Number(element.getAttribute('width'));
            const height = Number(element.getAttribute('height'));
            element.style.width = String(width * scale);
            element.style.height = String(height * scale);
        }
    };
}
