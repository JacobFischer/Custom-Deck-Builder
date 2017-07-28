import './live-editor.scss';
import * as PIXI from 'pixi.js';
import { template, loadTextures, tryToCast, cloneExceptEmpty } from 'src/utils';
import { EditableTable, RowValues, RowData } from 'src/gui/table';
import { cardsHeadings, cardsRows, defaultsHeadings, defaultsRows } from './live-editor-tables';
import { Card, CARD_MAX_WIDTH, CARD_MAX_HEIGHT } from 'src/cards/card/';
import { Tab } from 'src/gui/tabular/';

const tabTemplate = template(require('./live-editor.hbs'));

export class LiveEditorTab extends Tab {
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

    constructor() {
        super('Live Editor', <HTMLElement>tabTemplate());

        this.canvasesElement = this.element.getElementsByClassName('canvases')[0];

        this.scaleSlider = <HTMLInputElement>this.element.getElementsByClassName('canvases-scale-slider')[0];
        this.scaleSlider.addEventListener('input', () => this.resizeCanvases());
        this.scaleSliderPercent = <HTMLElement>this.element.getElementsByClassName('canvases-scale-percent')[0];

        // Defaults Table \\
        this.defaultsTable = new EditableTable(this.element.getElementsByClassName('defaults-table')[0]);
        this.defaultsTable.addColumns(defaultsHeadings);

        this.defaultsTable.on(EditableTable.EventSymbols.rowAdded, (rowValues: RowValues, row: RowData) => {
            row.tr.classList.add('shown');
        });

        this.defaultsTable.addRows(defaultsRows);

        this.defaultsRow = this.defaultsTable.getRow(0);

        // Custom Cards Table \\
        const cardsElement = this.element.getElementsByClassName('cards-table')[0];
        this.cardsTable = new EditableTable(cardsElement);

        this.cardsTable.on(EditableTable.EventSymbols.rowAdded, (rowValues: RowValues, row: RowData) => {
            this.rowAdded(row);
        });

        this.cardsTable.on(EditableTable.EventSymbols.cellChanged, (row: RowData): void => {
            this.renderCard(row);
        });

        this.cardsTable.on(EditableTable.EventSymbols.rowDeleted, (row: RowData) => {
            this.rowDeleted(row);
        });

        // if the defaults rows are edited, update all custom cards
        this.defaultsTable.on(EditableTable.EventSymbols.cellChanged, (): void => {
            for (const row of this.cardsTable.getAllRows()) {
                this.renderCard(row);
            }
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
        const canvas = document.createElement('canvas');

        setTimeout(() => {
            canvas.classList.add('shown');
            row.tr.classList.add('shown')
        }, 50);

        const deleteButton = <HTMLButtonElement>row.values.delete;
        deleteButton.addEventListener('click', () => {
            row.tr.classList.remove('shown');
            canvas.classList.remove('shown');

            setTimeout(() => {
                this.cardsTable.deleteRow(row);
            }, 355); // css animation variable
        });

        const card = new Card(row.values);
        this.cards.set(row, card);

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
            this.checkForErrors(row, card);

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

    private checkForErrors(row: RowData, card: Card) {
        const imageResource = PIXI.loader.resources[card.imageURL];
        const logoResource = PIXI.loader.resources[card.logoURL];
        const imageTD = row.tr.getElementsByClassName('column-imageURL')[0];
        if (imageTD) {
            if (!imageResource || imageResource.error) {
                imageTD.classList.add('error');
            }
            else {
                imageTD.classList.remove('error');
            }
        }
    }
};
