class Jugador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'dude');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        scene.anims.create({
            key: 'left_walk',
            frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'turn_idle',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
            repeat: -1
        });

        scene.anims.create({
            key: 'right_walk',
            frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = scene.input.keyboard.createCursorKeys();
    };

    update() {
        if (this.body) {
            if (this.cursors.left.isDown) {
                this.setVelocityX(-160);
                this.anims.play('left_walk', true);
            } else if (this.cursors.right.isDown) {
                this.setVelocityX(160);
                this.anims.play('right_walk', true);
            } else {
                this.setVelocityX(0);
                this.anims.play('turn_idle');
            };

            if (this.cursors.up.isDown && this.body.touching.down) {
                this.setVelocityY(-330);
            };
        };
    };
};

export default Jugador;
