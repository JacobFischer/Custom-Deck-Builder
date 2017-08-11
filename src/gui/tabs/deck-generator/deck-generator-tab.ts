import * as filesaver from "file-saver";
import { basename } from "path";
import { DeckBuilder } from "src/cards/deck-builder";
import { Tab } from "src/gui/tabular/";
import { expand, replaceAll, select, template } from "src/utils/";
import * as store from "store";
import * as hbs from "./deck-generator-tab.hbs";
import "./deck-generator-tab.scss";

const tabTemplate = template(hbs as any);

/** The Deck Generator tab part of the GUI */
export class DeckGeneratorTab extends Tab {
    /** The file input element (that is hidden) */
    private inputElement: HTMLInputElement;

    /** The label of the input element that acts as the input */
    private fakeLabelElement: HTMLElement;

    /** None selected text element */
    private noneSelectedElement: HTMLElement;

    /** generate button element */
    private generateButton: HTMLButtonElement;

    /** x max number input for cards per column */
    private maxCardsXInput: HTMLInputElement;

    /** y max number input for cards per row */
    private maxCardsYInput: HTMLInputElement;

    /** the fake progress bar element to expand on progress */
    private progressBarElement: HTMLElement;

    /** the generation log (ul) of events during generation */
    private generationLog: HTMLUListElement;

    /** the download button */
    private downloadButton: HTMLButtonElement;

    /** the section of the tab shown once generation has started */
    private generationDiv: HTMLElement;

    /** The resulting zip file once generation has finished */
    private generatedZip: Blob;

    /**
     * Creates a Deck Generator Tab
     */
    constructor() {
        super("Deck Generator", tabTemplate() as HTMLElement);

        this.fakeLabelElement = select(this.element, ".file-name");
        this.noneSelectedElement = select(this.fakeLabelElement, ".none-selected");
        this.generateButton = select(this.element, ".generate-button") as HTMLButtonElement;
        this.maxCardsXInput = select(this.element, ".max-cards-x-input") as HTMLInputElement;
        this.maxCardsYInput = select(this.element, ".max-cards-y-input") as HTMLInputElement;
        this.progressBarElement = select(this.element, ".progress-bar-foreground");
        this.generationLog = select(this.element, ".generation-log") as HTMLUListElement;
        this.downloadButton = select(this.element, ".download-button") as HTMLButtonElement;
        this.inputElement = select(this.element, ".csv-file-selector") as HTMLInputElement;
        this.generationDiv = select(this.element, ".generation");

        this.inputElement.addEventListener("change", () => this.updateFileInput());
        this.generateButton.addEventListener("click", () => this.generate());
        this.downloadButton.addEventListener("click", () => this.download());

        this.setupCardDimension(this.maxCardsXInput, "x", 10, 7);
        this.setupCardDimension(this.maxCardsYInput, "y", 7, 5);

        this.maxCardsXInput.value = String(store.get("max-cards-x") || 7);
        this.maxCardsXInput.addEventListener("change", () => {
            store.set("max-cards-x", Number(this.maxCardsXInput.value));
        });

        this.maxCardsYInput.value = String(store.get("max-cards-y") || 5);
        this.maxCardsYInput.addEventListener("change", () => {
            store.set("max-cards-y", Number(this.maxCardsYInput.value));
        });

        this.updateFileInput();
    }

    /**
     * Invoked when the file input is updates so its label can visually update
     */
    private updateFileInput(): void {
        const fakeValue = this.inputElement.value;
        this.fakeLabelElement.innerHTML = basename(replaceAll(fakeValue, "\\", "/"));

        if (!fakeValue) {
            this.fakeLabelElement.appendChild(this.noneSelectedElement);
        }
        this.generateButton.disabled = !fakeValue;
        this.generateButton.title = fakeValue
            ? ""
            : "Please select a file to generate you deck from.";
    }

    /**
     * Sets up a card dimension input box
     * @param input the input to setup
     * @param coordinate the coordinate of the axis this input represents
     * @param max the maximum value of the input
     * @param startingValue the preferred starting value of the input (not max)
     */
    private setupCardDimension(
        input: HTMLInputElement,
        coordinate: "x" | "y",
        max: number,
        startingValue: number,
    ): void {
        const id = `max-cards-${coordinate}`;
        input.value = String(store.get(id) || startingValue);
        input.min = "2";
        input.max = `${max}`;
        input.addEventListener("change", () => {
            let value = input.valueAsNumber;

            if (!value || value > Number(input.max) || value < Number(input.min)) {
                value = startingValue;
            }

            store.set(id, value);
            input.valueAsNumber = value;
        });
    }

    /**
     * Expands the generation part of the tab
     */
    private generate(): void {
        const file = this.inputElement.files[0];
        if (file) {
            expand(this.generationDiv).then(() => this.startGenerating(file));
        }
    }

    /**
     * Starts generating a deck
     * @param file the csv file to generate the deck from
     */
    private startGenerating(file: File): void {
        this.generateButton.disabled = true;
        this.inputElement.disabled = true;
        this.maxCardsXInput.disabled = true;
        this.maxCardsYInput.disabled = true;

        this.log("Reading local file...");

        const reader = new FileReader();
        reader.readAsText(file);
        reader.addEventListener("load", () => {
            const width = Number(this.maxCardsXInput.value);
            const height = Number(this.maxCardsYInput.value);
            const deckBuilder = new DeckBuilder(width, height);
            this.generateButton.innerText = "Generating...";

            deckBuilder.on(DeckBuilder.EventSymbols.error, (error: string) => {
                this.log(error, true);
            });

            let batches = 1;
            let currentBatch = 1;
            const renderingProgress = 0.9;
            deckBuilder.on(DeckBuilder.EventSymbols.parsed, (numNormalCards: number, numOversizedCards: number) => {
                this.log("File parsed.");
                this.log(` &bull; ${numNormalCards} normal sized cards found.`);
                this.log(` &bull; ${numOversizedCards} oversized cards found.`);

                const cardsPerBatch = width * height;
                batches = Math.ceil(numNormalCards / cardsPerBatch) + Math.ceil(numOversizedCards / cardsPerBatch);
                this.setProgress(0.02);
            });

            deckBuilder.on(DeckBuilder.EventSymbols.batchStart, (batch: number) => {
                currentBatch = batch;
                this.setProgress(renderingProgress * ((currentBatch - 1) / batches));
                this.log(`Batch ${currentBatch}/${batches} - Downloading card images.`);
            });

            deckBuilder.on(DeckBuilder.EventSymbols.batchTexturesLoaded, (batch: number) => {
                this.setProgress(renderingProgress * (currentBatch - 0.6667) / batches);
                this.log(`Batch ${currentBatch}/${batches} - All card images downloaded.`);
            });

            deckBuilder.on(DeckBuilder.EventSymbols.batchComplete, (batch: number) => {
                this.setProgress(renderingProgress * (currentBatch - 0.3333) / batches);
                this.log(`Batch ${currentBatch}/${batches} - Rendering completed.`);
            });

            deckBuilder.on(DeckBuilder.EventSymbols.doneRendering, (batch: number) => {
                this.setProgress(renderingProgress);
                this.log(`All card batches have been rendered.`);
                this.log(`Zipping up cards into one achieve.`);
            });

            deckBuilder.on(DeckBuilder.EventSymbols.zipped, (batch: number) => {
                this.setProgress(1); // done!
                this.log(`Zip file ready for download.`);
                this.generateButton.innerText = "Generated!";
                this.downloadButton.disabled = false;
            });

            deckBuilder.buildCards(reader.result)
                .then((zip: Blob) => {
                    this.generatedZip = zip;
                })
                .catch((err: Error) => {
                    this.log(err.message, true);
                    this.log("Deck generation aborted due to fatal error", true);
                });
        });
    }

    /**
     * Logs a string to the generation log
     * @param str The string to log
     * @param error true if this string is a logged error,
     *              false or omitted otherwise
     */
    private log(str: string, error?: boolean): void {
        const li = document.createElement("li");

        if (error) {
            str = `Error: ${str}`;
            li.classList.add("error");
        }

        li.innerHTML = str;
        this.generationLog.appendChild(li);
    }

    private setProgress(scale: number): void {
        const percent = scale * 100;
        this.progressBarElement.style.width = `${percent}%`;
        this.progressBarElement.innerHTML = `${percent.toFixed(0)}%`;
    }

    private download(): void {
        if (this.generatedZip) {
            filesaver.saveAs(this.generatedZip, "generated-deck.zip");
        }
    }
}
