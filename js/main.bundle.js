/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
 class Resource {
    constructor() {
        this.resourceCache = {};
        this.loading = [];
        this.readyCallbacks = [];
    }

    load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach((url) => {
                this._load(url);
            });

        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            this._load(urlOrArr);
        }
    }

    _load(url) {
        if(this.resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            return this.resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            let img = new Image();
            img.onload = () => {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                this.resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if(this.isReady()) {
                    this.readyCallbacks.forEach(func => func());
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             */
            this.resourceCache[url] = img;
            img.src = url;
        }
    }

    get(url) {
        return this.resourceCache[url];
    }

    isReady() {
        let ready = true;
        for(let k in this.resourceCache) {
            if(this.resourceCache.hasOwnProperty(k) &&
                !this.resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     */
    onReady(func) {
        this.readyCallbacks.push(func);
    }

}

module.exports = {
    Resources: new Resource()
};




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__resources__);


const canvasWidth = 505;
/* unused harmony export canvasWidth */

const canvasHeight = 600;
/* unused harmony export canvasHeight */

const imgWidth = 101;
/* harmony export (immutable) */ __webpack_exports__["c"] = imgWidth;

const imgHeight = 171;
/* unused harmony export imgHeight */


class Enemy {
    constructor(y) {
        this.x = -imgWidth;
        this.y = y ;
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.floor(Math.random()*3)+1;
        this.ctx = document.getElementById('my-canvas').getContext('2d');
    }

    update() {
        this.x += this.speed;
    }

    render() {
        this.ctx.drawImage(__WEBPACK_IMPORTED_MODULE_0__resources__["Resources"].get(this.sprite), this.x, this.y);

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy;


class Player {
    constructor(sprite= 'images/char-boy.png') {
        this.sprite= sprite;
        this.x = canvasWidth / 2 - imgWidth/2;
        this.y =canvasHeight - imgHeight +20;
        this.ctx = document.getElementById('my-canvas').getContext('2d')
    }
    render() {
        this.ctx.drawImage(__WEBPACK_IMPORTED_MODULE_0__resources__["Resources"].get(this.sprite), this.x, this.y);
    }
    update() {

    }
    handleInput(input, arcade) {

        switch (input) {
            case 'up':
                if (this.y>=-60){

                    this.y -= imgHeight / 3;
                    this.render();
                } else {
                    console.log('you won !');
                    (function gameEnd(res) {
                        let dialog = document.getElementById('status-dialog');
                        dialog.show();
                        dialog.classList.add('dialog-scale');
                        dialog.children[0].textContent = res ? 'You won' : 'You lose';
                        dialog.children[1].addEventListener('click', (ev)=> {

                            dialog.classList.remove('dialog-scale');
                            arcade.init();
                        })
                        })(true)
                }
                break;
            case 'right':
                if (this.x<416) {
                    this.x += imgWidth / 3.3;
                    this.render();
                }
                break;
            case 'down':
                if (this.y<460) {
                    this.y += imgHeight / 3;
                    this.render();
                }
                break;
            case 'left':
                if (this.x > 0) {
                    this.x -= imgWidth / 3.3;
                    this.render();
                }
                break;
            default:
                console.log('move move!')


        }
        // console.log('input player', this.x, this.y);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Player;






/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__resources__);




document.addEventListener('DOMContentLoaded', () => {

    // App Selectors
    const firstPage = document.querySelector('.page0');
    const secondPage = document.querySelector('.page1');
    const thirdPage = document.querySelector('.page2');
    const allAvailPlayers = [...document.querySelectorAll('.player-select')];
    const allAvailLevels = [...document.querySelectorAll('.level-select')];


    // App Global Variables
    const arcadeEngine = new __WEBPACK_IMPORTED_MODULE_0__engine__["a" /* Engine */]();
    const screenTime = 2500;
    let chosenSpirit = null;
    let chosenLevel = 1;
    let playerSpirit = localStorage.getItem('player:spirit');

    // Load the resources in background at first place
    __WEBPACK_IMPORTED_MODULE_1__resources__["Resources"].load([
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
        __WEBPACK_IMPORTED_MODULE_1__resources__["Resources"].onReady(arcadeEngine.init.call(arcadeEngine, chosenSpirit, chosenLevel));
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__resources__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__levell__ = __webpack_require__(5);
/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */






const doc = global.document,
    win = global.window,
    canvas = document.getElementById('my-canvas'),
    dialog = document.getElementsByTagName('dialog');
/* unused harmony export doc */

/* unused harmony export win */

/* unused harmony export canvas */

/* unused harmony export dialog */

const canvasWidth = 505;
/* unused harmony export canvasWidth */

const imgWidth = 101;
/* harmony export (immutable) */ __webpack_exports__["c"] = imgWidth;

const imgHeight = 171;
/* harmony export (immutable) */ __webpack_exports__["b"] = imgHeight;


class Engine {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    constructor() {
        this.player = new __WEBPACK_IMPORTED_MODULE_1__app__["b" /* Player */]();
        this.allEnemies = [];
        this.lastTime = 0;
        this.canvas = document.getElementById('my-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gamelavel = localStorage.getItem('player:level');
        /* Go ahead and load all of the images we know we're going to need to
          * draw our game level. Then set init as the callback method, so that when
          * all of these images are properly loaded our game will start.
        */

    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
     init(playerSpirit = localStorage.getItem('player:spirit'), level = 1) {
        // player = new Player();
        // console.log(playerSpirit);
         this.reset();
         this.player = new __WEBPACK_IMPORTED_MODULE_1__app__["b" /* Player */](playerSpirit);
         this.allEnemies = Array.from({length: 4}, (iter, i)=>new __WEBPACK_IMPORTED_MODULE_1__app__["a" /* Enemy */](__WEBPACK_IMPORTED_MODULE_1__app__["c" /* imgWidth */]*(i*1.6+1)/2));
         this.lastTime = Date.now();
         this.main.call(this)


    }

    main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        /*let now = Date.now(),
            dt = (now - this.lastTime) / 1000.0;
        */
        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        this.update();
        this.render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        // this.lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        window.requestAnimationFrame(()=>{
            this.main()
        });
    }


    showCanvas() {
        let gameinit = document.getElementById('init-game');
        gameinit.children[0].classList.add('to-bottom');
        document.getElementById('arcade-game').style.display = 'flex';
        setTimeout(() => {
            gameinit.children[0].classList.remove('to-bottom');
            gameinit.style.display = 'none';
        }, 250);
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
     update() {
        this.updateEntities();
        // checkCollisions();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
     updateEntities() {
        this.allEnemies.forEach( (enemy, i)=> {
            enemy.update();
            if (enemy.x >= canvasWidth + imgWidth) {
                this.allEnemies.splice(i, 1);
                this.allEnemies.push(new __WEBPACK_IMPORTED_MODULE_1__app__["a" /* Enemy */](__WEBPACK_IMPORTED_MODULE_1__app__["c" /* imgWidth */]*(i*1.6+1)/2))
            } else if (enemy.x + imgWidth >= this.player.x && enemy.x + imgWidth <= this.player.x + imgWidth && enemy.y + imgHeight - 30 >= this.player.y + 60 && enemy.y + imgHeight - 30 < this.player.y + imgHeight - 30) {
                this.gameEnd(false);
                console.warn('you lose')
            }
        });
        this.player.update();
    }

     gameEnd(res) {
        let dialog = document.getElementById('status-dialog');
        dialog.show();
        dialog.classList.add('dialog-scale');
        dialog.children[0].innerHTML = res ? '<p>Congratulations</p><span>You passed the Road Safely</span> ' : '<p>Opps</p><span>a BUG! crached you!</span> ';
        dialog.children[1].addEventListener('click', () => {
            this.init();
            dialog.classList.remove('dialog-scale');
            dialog.close('Hey there');
            console.log(dialog.returnValue)

        });

    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
     render(gameLevel = 1) {

        const level = new __WEBPACK_IMPORTED_MODULE_2__levell__["a" /* Level */](gameLevel);

        // Before drawing, clear existing canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // render the right images of the level
        level.createLevel(this.ctx, __WEBPACK_IMPORTED_MODULE_0__resources__["Resources"]);

        this.renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
     renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        this.allEnemies.forEach(function (enemy) {
            enemy.render();
        });

        this.player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
     reset() {
        // noop
    }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Engine;


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine__ = __webpack_require__(3);


class Level {
    constructor(id = 1) {
        this.id = id;
        this._rowImages = this.getReqImages();
    }

    createLevel(canavsCtx, resources) {

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                canavsCtx.drawImage(resources.get(this._rowImages[row]), col * __WEBPACK_IMPORTED_MODULE_0__engine__["c" /* imgWidth */], (row - 1) * __WEBPACK_IMPORTED_MODULE_0__engine__["b" /* imgHeight */] / 2.8);
            }
        }
    }

    getReqImages() {
        switch (this.id) {
            case 1 :
                return [
                    'images/grass-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/grass-block.png'
                ];
            case 2:
                return [
                    'images/grass-block.png',
                    'images/water-block.png'
                ];

        }
    }

    get numRows() {
        return this._rowImages.length;
    }

    get numCols() {
        return 5 // for now
    }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Level;


/***/ })
/******/ ]);