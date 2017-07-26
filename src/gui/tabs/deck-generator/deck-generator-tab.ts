import './deck-generator-tab.scss';
import { Tab } from 'src/gui/tabular/';
import { template, replaceAll } from 'src/utils';
import { basename, normalize } from 'path';
import { DeckBuilder } from 'src/cards/deck-builder';
import * as filesaver  from 'file-saver';

const tabTemplate = template(require('./deck-generator-tab.hbs'));

export class DeckGeneratorTab extends Tab {
    private inputElement: HTMLInputElement;
    private fakeLabelElement: HTMLElement;
    private noneSelectedElement: HTMLElement;
    private generateButton: HTMLButtonElement;
    private progressBarElement: HTMLElement;
    private generationLog: HTMLUListElement;
    private downloadButton: HTMLButtonElement;

    private generatedZip: Blob;

    constructor() {
        super('Deck Generator', <HTMLElement>tabTemplate());

        this.fakeLabelElement = <HTMLElement>this.element.getElementsByClassName('file-name')[0];
        this.noneSelectedElement = <HTMLElement>this.fakeLabelElement.getElementsByClassName('none-selected')[0];
        this.generateButton = <HTMLButtonElement>this.element.getElementsByClassName('generate-button')[0];
        this.progressBarElement = <HTMLElement>this.element.getElementsByClassName('progress-bar-foreground')[0];
        this.generationLog = <HTMLUListElement>this.element.getElementsByClassName('generation-log')[0];
        this.downloadButton = <HTMLButtonElement>this.element.getElementsByClassName('download-button')[0];
        this.inputElement = <HTMLInputElement>this.element.getElementsByClassName('csv-file-selector')[0];

        this.inputElement.addEventListener('change', () => this.updateFileInput());
        this.generateButton.addEventListener('click', () => this.generate());
        this.downloadButton.addEventListener('click', () => this.download());

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

    private generate(): void {
        const file = this.inputElement.files[0];
        if (file) {
            this.generateButton.disabled = true;
            this.inputElement.disabled = true;

            this.log('Reading local file...');

            const reader = new FileReader();
            reader.readAsText(file);
            reader.addEventListener('load', () => {
                const width = Number((<HTMLInputElement>this.element.getElementsByClassName('max-cards-x-input')[0]).value);
                const height = Number((<HTMLInputElement>this.element.getElementsByClassName('max-cards-y-input')[0]).value);
                const deckBuilder = new DeckBuilder(width, height);

                deckBuilder.on(DeckBuilder.EventSymbols.error, (error: string) => {
                    this.log(error, true);
                });

                let batches = 1;
                let currentBatch = 1;
                deckBuilder.on(DeckBuilder.EventSymbols.parsed, (numNormalCards: number, numOversizedCards: number) => {
                    this.log(`File parsed. ${numNormalCards} normal sized cards found. ${numOversizedCards} oversized cards found.`);
                    const cardsPerBatch = width * height;
                    batches = Math.ceil(numNormalCards / cardsPerBatch) + Math.ceil(numOversizedCards / cardsPerBatch);
                    this.setProgress(0.01);
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
                    this.downloadButton.disabled = false;
                });

                deckBuilder.buildCards(reader.result).then((zip: Blob) => {
                    this.generatedZip = zip;
                });
            });
        }
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
