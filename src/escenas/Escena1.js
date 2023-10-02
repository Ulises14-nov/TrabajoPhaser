import EscenaBase from "./EscenaBase.js";

let scoreToCatch = 12;

class Escena1 extends EscenaBase {
    constructor() {
        super("Escena1");
    };

    create() {
        this.score = scoreToCatch;

        super.create();

        this.platforms.create(500, 568, 'ground').setScale(2.5).refreshBody();

        this.platforms.create(500, 400, 'ground').setScale(0.5, 2).refreshBody();
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: scoreToCatch - 1,
            setXY: { x: 15, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.bombs = this.physics.add.group();

        this.scoreText = this.add.text(16, 16, 'Estrellas: ' + scoreToCatch, { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    };
};

export default Escena1;