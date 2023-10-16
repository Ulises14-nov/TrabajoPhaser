class Gana extends Phaser.Scene {
    constructor() {
        super("Gana");
        this.text;
    };

    preload() {
        this.load.audio('startSound', 'sounds/startSound.mp3');

        this.load.image('sky', 'img/sky.png');
        this.load.image('ground', 'img/platform.png');
        this.load.image('bomb', 'img/star.png');
    };

    create() {
        this.startSound = this.sound.add('startSound');

        this.add.image(500, 300, 'sky').setScale(2);

        this.text = this.add.text(500, 300, '¡Ganaste!', {
            fontFamily: 'VT323, monospace', fontSize: '84px', fill: '#000'
        });
        this.text.setOrigin(0.5, 1.5);

        this.text = this.add.text(500, 300, 'PRESIONA R PARA REINICIAR', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, 0);

        this.text = this.add.text(500, 350, 'PRESIONA ENTER PARA VOLVER AL MENU', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, 0);

        this.add.image(100, 370, 'star').setScale(2, 2).setOrigin(0.5, 0);
        this.add.image(70, 250, 'star').setScale(2, 2).setOrigin(0.5, 0);
        this.add.image(100, 250, 'star').setScale(2, 2).setOrigin(0.5, 1);
        this.add.image(70, 370, 'star').setScale(2, 2).setOrigin(0.5, 1);

        this.add.image(900, 370, 'star').setScale(2, 2).setOrigin(0.5, 0);
        this.add.image(930, 250, 'star').setScale(2, 2).setOrigin(0.5, 0);
        this.add.image(900, 250, 'star').setScale(2, 2).setOrigin(0.5, 1);
        this.add.image(930, 370, 'star').setScale(2, 2).setOrigin(0.5, 1);

        this.input.keyboard.on('keydown-R', () => {
            this.physics.resume();
            this.startSound.play();
            this.scene.start('Escena1');
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            this.startSound.play();
            this.scene.start('Menu');
        });
    };
};

export default Gana;