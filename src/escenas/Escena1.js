import EscenaBase from "./EscenaBase.js";

class Escena1 extends EscenaBase {
    constructor() {
        super("Escena1");
        this.scoreToCatch = 12;
    };

    init(data) {
        this.starsCollected = data.starsCollected;
    };

    create() {
        this.score = this.scoreToCatch;
        this.starsCollected = 0;

        super.create();

        this.platforms.create(500, 400, 'platform').setScale(0.5, 1).refreshBody();
        this.platforms.create(-100, 250, 'platform').setScale(0.5, 1).refreshBody();
        this.platforms.create(950, 220, 'platform').setScale(0.5, 1).refreshBody();

        this.platforms.create(500, 568, 'platform');

        this.createSandwich(this.scoreToCatch, 60, 80);

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.sandwich, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.physics.add.overlap(this.player, this.sandwich, this.collectStar, null, this);
    };

    update() {
        super.update();

        if (this.score == 0) {
            this.player.anims.play('new_scene', true);

            setTimeout(() => {
                this.scene.start('Escena2', { starsCollected: this.starsCollected });
            }, 1000);
        };
    };
};

export default Escena1;