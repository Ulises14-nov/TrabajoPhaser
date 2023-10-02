import EscenaBase from "./EscenaBase.js";
import Jugador from "./Jugador.js";

let scoreToCatch = 12;

class Escena1 extends EscenaBase {
    constructor() {
        super("Escena1");
        this.player;
    };

    create() {
        this.score = scoreToCatch;

        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(400, 400, 'ground').setScale(0.5, 2).refreshBody();
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = new Jugador(this, 100, 450);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: scoreToCatch,
            setXY: { x: 11, y: 0, stepX: 70 }
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