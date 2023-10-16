import Jugador from "./Jugador.js";

class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.physics;
        this.scoreText;
        this.scoreTotal;
        this.scoreToCatch;
        this.gameOver = false;
        this.score;
        this.platforms;
        this.bombs;
        this.stars;
        this.starsCollected = 0;
        this.allStars = 48;
    };

    preload() {
        //Audios
        this.load.audio('jumpSound', 'sounds/jumpSound.mp3');
        this.load.audio('starSound', 'sounds/starSound.mp3');
        this.load.audio('nextLevelSound', 'sounds/nextLevelSound.mp3');
        this.load.audio('loseSound', 'sounds/loseSound.mp3');
        this.load.audio('winSound', 'sounds/winSound.mp3');

        //Imagenes
        this.load.image('sky', 'img/sky.png');
        this.load.image('platform', 'img/Plataforma.png');
        this.load.image('platform2', 'img/PlataformaGrande.png');
        this.load.image('bomb', 'img/bomb.png');
        this.load.image('pierde', 'img/Pierde.png');
        this.load.image('gana', 'img/Gana.png');
        this.load.spritesheet('punkWalk', 'img/PunkWalk.png', { frameWidth: 33.2, frameHeight: 48 });
        this.load.spritesheet('punkIdle', 'img/PunkIdle.png', { frameWidth: 34.2, frameHeight: 48 });
        this.load.spritesheet('punkTP', 'img/PunkTP.png', { frameWidth: 33.2, frameHeight: 48 });
        this.load.spritesheet('punkDead', 'img/PunkDead.png', { frameWidth: 34.3, frameHeight: 48 });
        this.load.spritesheet('sandwich', 'img/Sandwich.png', { frameWidth: 36, frameHeight: 36 });
        this.load.spritesheet('dude', 'img/dude.png', { frameWidth: 32, frameHeight: 48 });
    };

    create() {
        //Sonidos
        this.jumpSound = this.sound.add('jumpSound');
        this.starSound = this.sound.add('starSound');
        this.nextLevelSound = this.sound.add('nextLevelSound');
        this.loseSound = this.sound.add('loseSound');
        this.winSound = this.sound.add('winSound');

        this.add.image(500, 300, 'sky').setScale(2);

        this.platforms = this.physics.add.staticGroup();
        this.player = new Jugador(this, 100, 450, this.jumpSound);

        this.scoreTotal = this.add.text(16, 16, `Estrellas: ${this.starsCollected} / ${this.allStars}`, {
            fontFamily: 'VT323, monospace',
            fontSize: '48px',
            fill: '#F4C430'
        });

        this.scoreText = this.add.text(800, 16, `META: ${this.scoreToCatch}`, {
            fontFamily: 'VT323, monospace',
            fontSize: '48px',
            fill: '#F4C430'
        });
    };

    update() {
        if (this.gameOver) {
            return;
        };

        this.player.update(this.input.keyboard.createCursorKeys());
    };

    createSandwich(scoreToCatch, start, distance) {
        this.sandwich = this.physics.add.group({
            key: 'sandwich',
            repeat: scoreToCatch - 1,
            setXY: { x: start, y: 5, stepX: distance }
        });

        this.anims.create({
            key: 'sandwich_anim',
            frames: this.anims.generateFrameNumbers('sandwich', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        this.sandwich.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.anims.play('sandwich_anim');
        });
    };

    collectStar(player, sandwich) {
        sandwich.disableBody(true, true);
        sandwich.anims.play('sandwich_anim');

        if (this.score % 4 === 0 && this.score > 0) {
            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        };

        this.score -= 1;
        this.starsCollected += 1;
        this.starSound.play();
        this.scoreText.setText(`META: ${this.scoreToCatch}`);
        this.scoreTotal.setText(`Estrellas: ${this.starsCollected} / ${this.allStars}`);
    };

    hitBomb() {
        this.player.anims.play('punk_dead', true);

        this.loseSound.play();
        this.player.setTint(0xFF0000);
        this.physics.pause();

        setTimeout(() => {
            if (this.player) {
                this.starsCollected = 0;
                this.player.destroy();
                this.currentLevel = 0;
                this.scene.start('Pierde');
            }
        }, 1500);
    };
};

export default BaseScene;
