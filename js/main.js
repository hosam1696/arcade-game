import {Engine} from "./engine";
import {Resources} from "./resources";


document.addEventListener('DOMContentLoaded', () => {

    // App Selectors


    // App Global Variables
    const arcadeEngine = new Engine();

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png'
    ]);


    let playerSpirit = localStorage.getItem('player:spirit');
    if (!playerSpirit) { // check if any stored player selection
        [...document.querySelectorAll('.player-select')].forEach(label => {
            label.addEventListener('click', () => {
                setTimeout(() => {
                    let choosenSpirit = document.querySelector('input[type="radio"]:checked').value;

                    localStorage.setItem('player:spirit', choosenSpirit);
                    Resources.load([
                        'images/stone-block.png',
                        'images/water-block.png',
                        'images/grass-block.png',
                        'images/enemy-bug.png',
                        'images/char-boy.png',
                        'images/char-cat-girl.png',
                        'images/char-horn-girl.png',
                        'images/char-pink-girl.png'
                    ]);
                    Resources.onReady(arcadeEngine.init.call(arcadeEngine, choosenSpirit));
                    arcadeEngine.showCanvas();
                }, 0)
            })
        });
    } else {
        arcadeEngine.init();
        arcadeEngine.showCanvas();
    }



    // App Event Listeners

    document.addEventListener('keydown', function (e) {
        const allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        arcadeEngine.player.handleInput(allowedKeys[e.keyCode], arcadeEngine);
    });


});