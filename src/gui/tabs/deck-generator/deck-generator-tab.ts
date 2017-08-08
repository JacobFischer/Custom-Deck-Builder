import './deck-generator-tab.scss';
import { Tab } from 'src/gui/tabular/';
import { template, replaceAll, expand } from 'src/utils/';
import { basename, normalize } from 'path';
import { DeckBuilder } from 'src/cards/deck-builder';
import * as filesaver  from 'file-saver';
import * as store from 'store';

const tabTemplate = template(require('./deck-generator-tab.hbs'));

export class DeckGeneratorTab extends Tab {
    private inputElement: HTMLInputElement;
    private fakeLabelElement: HTMLElement;
    private noneSelectedElement: HTMLElement;
    private generateButton: HTMLButtonElement;
    private maxCardsXInput: HTMLInputElement;
    private maxCardsYInput: HTMLInputElement;
    private progressBarElement: HTMLElement;
    private generationLog: HTMLUListElement;
    private downloadButton: HTMLButtonElement;
    private generationDiv: HTMLElement;

    private generatedZip: Blob;

    constructor() {
        super('Deck Generator', <HTMLElement>tabTemplate());

        this.fakeLabelElement = <HTMLElement>this.element.getElementsByClassName('file-name')[0];
        this.noneSelectedElement = <HTMLElement>this.fakeLabelElement.getElementsByClassName('none-selected')[0];
        this.generateButton = <HTMLButtonElement>this.element.getElementsByClassName('generate-button')[0];
        this.maxCardsXInput = <HTMLInputElement>this.element.getElementsByClassName('max-cards-x-input')[0];
        this.maxCardsYInput = <HTMLInputElement>this.element.getElementsByClassName('max-cards-y-input')[0];
        this.progressBarElement = <HTMLElement>this.element.getElementsByClassName('progress-bar-foreground')[0];
        this.generationLog = <HTMLUListElement>this.element.getElementsByClassName('generation-log')[0];
        this.downloadButton = <HTMLButtonElement>this.element.getElementsByClassName('download-button')[0];
        this.inputElement = <HTMLInputElement>this.element.getElementsByClassName('csv-file-selector')[0];
        this.generationDiv = <HTMLElement>this.element.getElementsByClassName('generation')[0];

        this.inputElement.addEventListener('change', () => this.updateFileInput());
        this.generateButton.addEventListener('click', () => this.generate());
        this.downloadButton.addEventListener('click', () => this.download());

        this.setupCardDimension(this.maxCardsXInput, 'x', 10, 7);
        this.setupCardDimension(this.maxCardsYInput, 'y', 7, 5);

        this.maxCardsXInput.value = String(store.get('max-cards-x') || 7);
        this.maxCardsXInput.addEventListener('change', () => {
            store.set('max-cards-x', Number(this.maxCardsXInput.value));
        });

        this.maxCardsYInput.value = String(store.get('max-cards-y') || 5);
        this.maxCardsYInput.addEventListener('change', () => {
            store.set('max-cards-y', Number(this.maxCardsYInput.value));
        });

        this.updateFileInput();
    }

    private updateFileInput(): void {
        const fakeValue = this.inputElement.value;
        this.fakeLabelElement.innerHTML = basename(replaceAll(fakeValue, '\\', '/'));

        if (!fakeValue) {
            this.fakeLabelElement.appendChild(this.noneSelectedElement);
        }
        this.generateButton.disabled = !fakeValue;
        this.generateButton.title = fakeValue
            ? ''
            : 'Please select a file to generate you deck from.';
    }

    private setupCardDimension(input: HTMLInputElement, coordinate: string, max: number, startingValue: number): void {
        const id = `max-cards-${coordinate}`;
        input.value = String(store.get(id) || startingValue);
        input.min = '2';
        input.max = `${max}`;
        input.addEventListener('change', () => {
            let value = input.valueAsNumber;

            if (!value || value > Number(input.max) || value < Number(input.min)) {
                value = startingValue;
            }

            store.set(id, value);
            input.valueAsNumber = value;
        });
    }

    private generate(): void {
        const file = this.inputElement.files[0];
        if (file) {
            expand(this.generationDiv).then(() => this.startGenerating(file));
        }
    }

    private startGenerating(file: File) {
        this.generateButton.disabled = true;
        this.inputElement.disabled = true;
        this.maxCardsXInput.disabled = true;
        this.maxCardsYInput.disabled = true;

        this.log('Reading local file...');

        const reader = new FileReader();
        reader.readAsText(file);
        reader.addEventListener('load', () => {
            const width = Number(this.maxCardsXInput.value);
            const height = Number(this.maxCardsYInput.value);
            const deckBuilder = new DeckBuilder(width, height);
            this.generateButton.innerText = 'Generating...';

            deckBuilder.on(DeckBuilder.EventSymbols.error, (error: string) => {
                this.log(error, true);
            });

            let batches = 1;
            let currentBatch = 1;
            deckBuilder.on(DeckBuilder.EventSymbols.parsed, (numNormalCards: number, numOversizedCards: number) => {
                this.log(`File parsed. ${numNormalCards} normal sized cards found. ${numOversizedCards} oversized cards found.`);
                const cardsPerBatch = width * height;
                batches = Math.ceil(numNormalCards / cardsPerBatch) + Math.ceil(numOversizedCards / cardsPerBatch);
                this.setProgress(0.02);
            });

            deckBuilder.on(DeckBuilder.EventSymbols.batchStart, (batch: number) => {
                currentBatch = batch;
                this.setProgress((currentBatch - 1)/ batches);
                this.log(`Batch ${currentBatch}/${batches} - Downloading card images.`);
            });

            deckBuilder.on(DeckBuilder.EventSymbols.batchTexturesLoaded, (batch: number) => {
                this.setProgress((currentBatch - 0.6667) / batches);
                this.log(`Batch ${currentBatch}/${batches} - All card images downloaded.`);
            });

            deckBuilder.on(DeckBuilder.EventSymbols.batchComplete, (batch: number) => {
                this.setProgress((currentBatch - 0.3333) / batches);
                this.log(`Batch ${currentBatch}/${batches} - Rendering completed.`);
            });

            deckBuilder.on(DeckBuilder.EventSymbols.doneRendering, (batch: number) => {
                this.setProgress(0.9);
                this.log(`All card batches have been rendered.`);
                this.log(`Zipping up cards into one achieve.`);
            });

            deckBuilder.on(DeckBuilder.EventSymbols.zipped, (batch: number) => {
                this.setProgress(1); // done!
                this.log(`Zip file ready for download.`);
                this.generateButton.innerText = 'Generated!';
                this.downloadButton.disabled = false;
            });

            deckBuilder.buildCards(reader.result)
                .then((zip: Blob) => {
                    this.generatedZip = zip;
                })
                .catch((err: Error) => {
                    this.log(err.message, true);
                    this.log('Deck generation aborted due to fatal error', true);
                });
        });
    }

    private log(str: string, error?: boolean): void {
        const li = document.createElement('li');

        if (error) {
            str = `Error: ${str}`;
            li.classList.add('error');
        }

        li.innerHTML = str;
        this.generationLog.appendChild(li);
    }

    private setProgress(scale: number) {
        const percent = scale * 100;
        this.progressBarElement.style.width = `${percent}%`;
        this.progressBarElement.innerHTML = `${percent.toFixed(0)}%`;
    }

    private download() {
        if (this.generatedZip) {
            filesaver.saveAs(this.generatedZip, 'generated-deck.zip');
        }
    }
}
