import EscenaBase from "./EscenaBase.js";

let scoreToCatch = 16;

class Escena2 extends EscenaBase {
    constructor() {
        super("Escena2");
    };

    create() {
        this.score = scoreToCatch;

        super.create();

        this.platforms.create(500, 568, 'ground').setScale(2.5).refreshBody().setTint(0xFF00FF);

        this.platforms.create(300, 400, 'ground').setTint(0xFF00FF);
        this.platforms.create(50, 250, 'ground').setScale(0.5, 2).refreshBody().setTint(0xFF00FF);
        this.platforms.create(750, 220, 'ground').setTint(0xFF00FF);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: scoreToCatch - 1,
            setXY: { x: 20, y: 4, stepX: 50 }
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

export default Escena2;