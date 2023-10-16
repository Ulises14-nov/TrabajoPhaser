class Pierde extends Phaser.Scene {
    constructor() {
        super("Pierde");
        this.text;
    };

    preload() {
        this.load.audio('startSound', 'sounds/startSound.mp3');

        this.load.image('pierde', 'img/Pierde.png');
    };

    create() {
        this.startSound = this.sound.add('startSound');

        this.add.image(500, 300, 'pierde');

        this.text = this.add.text(500, 150, 'Perdiste :(', {
            fontFamily: 'VT323, monospace', fontSize: '84px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, 1.5);

        this.text = this.add.text(500, 500, 'PRESIONA R PARA REINICIAR', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F9F9F9'
        });
        this.text.setOrigin(0.5, 0);

        this.text = this.add.text(500, 550, 'PRESIONA ENTER PARA VOLVER AL MENU', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F9F9F9'
        });
        this.text.setOrigin(0.5, 0);

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

export default Pierde;