/**
 * @class represents a custom card
 */
export class Card {
    private container: PIXI.Container;
    private backgroundTypeSprite: PIXI.Sprite;
    private backgroundCostSprite: PIXI.Sprite;
    private backgroundVPSprite: PIXI.Sprite;

    constructor(
        readonly name: string,
        readonly type: 'Equipment' | 'Hero' | 'Location' | 'Starter' | 'Super Hero' | 'Super Power' | 'Super Villain' | 'Villain' | 'Weakness',
        readonly typePrefix: string = '',
        readonly victoryPoints: number = 1,
        readonly cost: number = 1,
        readonly text: string,
    ) {
        console.log('hi there');
    }

    draw(app: PIXI.Application) {
        this.container = new PIXI.Container();
        this.container.setParent(app.stage);

        this.backgroundTypeSprite = new PIXI.Sprite(PIXI.loader.resources[this.type.toLowerCase()].texture);
        this.backgroundTypeSprite.setParent(this.container);

        this.backgroundCostSprite = new PIXI.Sprite(PIXI.loader.resources['background-cost'].texture);
        this.backgroundCostSprite.setParent(this.container);

        let vpKey = 'normal';
        if (this.victoryPoints < 0) {
            vpKey = 'negative';
        }
        this.backgroundVPSprite = new PIXI.Sprite(PIXI.loader.resources[`background-vp-${vpKey}`].texture);
        this.backgroundVPSprite.setParent(this.container);

        this.container.x = 0;
        this.container.y = 0;
    }
}
