import {Engine} from "./engine";
import {Resources} from "./resources";


document.addEventListener('DOMContentLoaded', () => {

    // App Selectors
    const firstPage = document.querySelector('.page0');
    const secondPage = document.querySelector('.page1');
    const thirdPage = document.querySelector('.page2');
    const allAvailPlayers = [...document.querySelectorAll('.player-select')];
    const allAvailLevels = [...document.querySelectorAll('.level-select')];


    // App Global Variables
    const arcadeEngine = new Engine();
    const screenTime = 2500;
    let chosenSpirit = null;
    let chosenLevel = 1;
    let playerSpirit = localStorage.getItem('player:spirit');

    // Load the resources in background at first place
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

    setTimeout( ()=>{ // remove the splash screen after specific period
        firstPage.classList.add('to-bottom');

        if (!playerSpirit) { // check if any stored player selection

            allAvailPlayers.forEach(label => {
                // listen on selecting player
                label.addEventListener('click', () => {
                    setTimeout(() => {
                        chosenSpirit = document.querySelector('input[name="player-on"]:checked').value; // get the selected player images
                        localStorage.setItem('player:spirit', chosenSpirit); // save image url to localStorage
                    }, 0);

                    // remove the second into page and proceed to third page
                    secondPage.classList.add('to-bottom');

                    allAvailLevels.forEach(level=>{ // same logic as selecting player
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
        Resources.onReady(arcadeEngine.init.call(arcadeEngine, chosenSpirit, chosenLevel));
        arcadeEngine.showCanvas();
    }


    // App Event Listeners

    document.addEventListener('keydown', function (e) {
        /*
            make only left and right event listener available
            when user key down that allow continuous character moving  while pressing
            that mechanism is what i want to apply
         */
        const allowedKeys = {
            37: 'left',
            39: 'right',
        };
        arcadeEngine.player.handleInput(allowedKeys[e.keyCode], arcadeEngine);
    });
    document.addEventListener('keyup', function (e) {
        // key up event to make the character move one positions if he had put his finger for a bit of time
        const allowedKeys = {
            38: 'up',
            40: 'down'
        };
        arcadeEngine.player.handleInput(allowedKeys[e.keyCode], arcadeEngine);
    });


});