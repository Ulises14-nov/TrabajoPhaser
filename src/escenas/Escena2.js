import EscenaBase from "./EscenaBase.js";
import Jugador from "./Jugador.js";

let scoreToCatch = 16;

class Escena2 extends EscenaBase {
    constructor() {
        super("Escena2");
    };

    preload() {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('sky', 'src/games/firstgame/assets/sky.png');
        this.load.image('ground', 'src/games/firstgame/assets/platform.png');
        this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.image('bomb', 'src/games/firstgame/assets/bomb.png');
        this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    };

    create() {
        this.score = scoreToCatch;

        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody().setTint(0xFF00FF);

        this.platforms.create(300, 400, 'ground').setTint(0xFF00FF);
        this.platforms.create(50, 250, 'ground').setScale(0.5, 2).refreshBody().setTint(0xFF00FF);
        this.platforms.create(750, 220, 'ground').setTint(0xFF00FF);

        this.player = new Jugador(this, 100, 450);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: scoreToCatch,
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
    };
};

export default Escena2;