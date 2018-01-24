import {Engine} from "./engine";
import {Resources} from "./resources";


document.addEventListener('DOMContentLoaded', () => {

    // App Selectors
    const firstPage = document.querySelector('.page0');
    const secondPage = document.querySelector('.page1');
    const thirdPage = document.querySelector('.page2');
    const playerSelect = [...document.querySelectorAll('.player-select')];
    const levelSelect = [...document.querySelectorAll('.level-select')];


    // App Global Variables
    const arcadeEngine = new Engine();
    const screenTime = 2500;
    let chosenSpirit = null;
    let chosenLevel = 1;
    let playerSpirit = localStorage.getItem('player:spirit');


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

    setTimeout( ()=>{ // remove the splash screen after 2.5seconds
        firstPage.classList.add('to-bottom');

        if (!playerSpirit) { // check if any stored player selection
            playerSelect.forEach(label => {
                label.addEventListener('click', () => {
                    setTimeout(() => {
                        chosenSpirit = document.querySelector('input[name="player-on"]:checked').value;
                        localStorage.setItem('player:spirit', chosenSpirit);

                    }, 0);

                    secondPage.classList.add('to-bottom');

                    levelSelect.forEach(level=>{
                        level.addEventListener('click',()=>{
                            setTimeout(() => {
                                chosenLevel = document.querySelector('input[name="level-on"]:checked').value;
                                console.log('level', chosenLevel);
                                localStorage.setItem('player:level', String(chosenLevel));
                            });
                            thirdPage.classList.add('to-bottom');
                            handleGame(chosenSpirit, chosenLevel)
                        })
                    })

                })
            });
        } else {
            arcadeEngine.init();
            arcadeEngine.showCanvas();
        }
    }, screenTime);


    function handleGame (chosenSpirit) {
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
        Resources.onReady(arcadeEngine.init.call(arcadeEngine, chosenSpirit, chosenLevel));
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