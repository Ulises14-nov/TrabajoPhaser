const niveles = ['Escena1', 'Escena2', 'Escena3'];
import Jugador from "./Jugador.js";

class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.physics;
        this.scoreText;
        this.gameOver = false;
        this.score;
        this.platforms;
        this.bombs;
        this.stars;
        this.starsCollected = 0;
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
        this.load.image('ground', 'img/platform.png');
        this.load.image('star', 'img/star.png');
        this.load.image('bomb', 'img/bomb.png');
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

        this.scoreText = this.add.text(16, 16, `Estrellas: ${this.score}`, {
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

    collectStar(player, star) {
        star.disableBody(true, true);

        if (this.score % 4 === 0 && this.score > 0) {
            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        };

        this.score -= 1;
        this.starSound.play();
        this.scoreText.setText(`Estrellas: ${this.score}`, {});

        if (this.starsCollected === this.score) {
            const currentSceneIndex = niveles.indexOf(this.scene.key);
            if (currentSceneIndex === niveles.length - 1) {
                this.winSound.play();
                this.scene.start('Gana');
            } else {
                const nextScene = niveles[currentSceneIndex + 1];
                this.nextLevelSound.play();
                this.scene.start(nextScene);
            };
        };
    };

    hitBomb() {
        this.loseSound.play();
        this.player.setTint(0xFF0000);
        this.physics.pause();
        this.player.anims.play('turn_idle');

        setTimeout(() => {
            if (this.player) {
                this.player.destroy();
                this.currentLevel = 0;
                this.scene.start('Pierde');
            }
        }, 500);
    };
};

export default BaseScene;
