import Escena1 from "./escenas/Escena1.js";
import Escena2 from "./escenas/Escena2.js";
import Escena3 from "./escenas/Escena3.js";
import Pierde from "./escenas/Pierde.js";
import Gana from "./escenas/Gana.js";
import Menu from "./escenas/Menu.js";

const createScene = (Scene) => new Scene();
const Escenas = [Menu, Escena1, Escena2, Escena3, Pierde, Gana];
const iniciarEscena = () => Escenas.map(createScene);

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    input: {
        keyboard: true
    },
    scene: iniciarEscena()
};

let game = new Phaser.Game(config);