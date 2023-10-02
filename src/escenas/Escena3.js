import EscenaBase from "./EscenaBase.js";

let scoreToCatch = 20;

class Escena3 extends EscenaBase {
    constructor() {
        super("Escena3");
    };

    create() {
        this.score = scoreToCatch;

        super.create();

        this.platforms.create(500, 568, 'ground').setScale(2.5).refreshBody().setTint(0xF00000);

        this.platforms.create(600, 400, 'ground').setTint(0xF00000);
        this.platforms.create(150, 250, 'ground').setScale(0.5, 2).refreshBody().setTint(0xF00000);
        this.platforms.create(750, 220, 'ground').setScale(0.5, 2).refreshBody().setTint(0xF00000);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: scoreToCatch - 1,
            setXY: { x: 15, y: 4, stepX: 50 }
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

        if (this.score === 0) {
            this.scene.start('Win')
        }
    };
};

export default Escena3;