class Gana extends Phaser.Scene {
    constructor() {
        super("Gana");
        this.text;
    };

    preload() {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('sky', 'src/games/firstgame/assets/sky.png');
        this.load.image('ground', 'src/games/firstgame/assets/platform.png');
        this.load.image('star', 'src/games/firstgame/assets/star.png');
    };

    create() {
        this.add.image(400, 300, 'sky');
        this.text = this.add.text(400, 300, '¡Ganaste!', { fontSize: '64px', fill: '#000' });
        this.text.setOrigin(0.5, 1.5);
        this.text = this.add.text(400, 300, 'PRESIONA R PARA REINICIAR', { fontSize: '40px', fill: '#000' });
        this.text.setOrigin(0.5, 0);
        this.add.image(400, 360, 'ground').setOrigin(0.5, 0).setTint(0xF00000);
        this.add.image(100, 370, 'star').setScale(2, 2).setOrigin(0.5, 0);
        this.add.image(70, 250, 'star').setScale(2, 2).setOrigin(0.5, 0);
        this.add.image(100, 250, 'star').setScale(2, 2).setOrigin(0.5, 1);
        this.add.image(70, 370, 'star').setScale(2, 2).setOrigin(0.5, 1);

        this.add.image(700, 370, 'star').setScale(2, 2).setOrigin(0.5, 0);
        this.add.image(730, 250, 'star').setScale(2, 2).setOrigin(0.5, 0);
        this.add.image(700, 250, 'star').setScale(2, 2).setOrigin(0.5, 1);
        this.add.image(730, 370, 'star').setScale(2, 2).setOrigin(0.5, 1);

        this.input.keyboard.on('keydown-R', () => {
            this.physics.resume();
            this.scene.start('Scene1');
        });
    };
};

export default Gana;