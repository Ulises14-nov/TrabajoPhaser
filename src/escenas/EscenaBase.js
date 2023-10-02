const niveles = ['Escena1', 'Escena2', 'Escena3'];
import Jugador from "./Jugador.js";

class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.scoreText;
        this.gameOver = false;
        this.score;
        this.platforms;
        this.bombs;
        this.stars;
        this.starsCollected = 0;
        this.totalStarsInLevel = 0;
    };

    preload() {
        try {
            this.load.setBaseURL('https://labs.phaser.io');
            this.load.image('sky', 'src/games/firstgame/assets/sky.png');
            this.load.image('ground', 'src/games/firstgame/assets/platform.png');
            this.load.image('star', 'src/games/firstgame/assets/star.png');
            this.load.image('bomb', 'src/games/firstgame/assets/bomb.png');
            this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        } catch (error) {
            // Manejo de errores
            console.error('Error durante la carga de imágenes:', error);

            // // Carga de imágenes en local en caso de error
            // this.load.image('sky', '../public/img/sky.png');
            // this.load.image('ground', '../public/img/platform.png');
            // this.load.image('star', '../public/img/star.png');
            // this.load.image('bomb', '../public/img/bomb.png');
            // this.load.spritesheet('dude', '../public/img/dude.png', { frameWidth: 32, frameHeight: 48 });
        }
    };

    create() {
        this.add.image(500, 300, 'sky').setScale(2);

        this.platforms = this.physics.add.staticGroup();

        this.player = new Jugador(this, 100, 450);
    }

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
        this.scoreText.setText(`Estrellas: ${this.score}`);

        if (this.starsCollected === this.score) {
            const currentSceneIndex = niveles.indexOf(this.scene.key);
            if (currentSceneIndex === niveles.length - 1) {
                this.scene.start('Gana');
            } else {
                const nextScene = niveles[currentSceneIndex + 1];
                this.scene.start(nextScene);
            }
        }
    };

    hitBomb() {
        if (this.player) {
            this.player.destroy();
            this.currentLevel = 0;
            this.scene.start('Pierde');
        };
    };
};

export default BaseScene;
