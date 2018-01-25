import {Resources} from './resources';

export  const canvasWidth = 505;
export  const canvasHeight = 650;
export  const playerImgWidth = 66;
export  const playerImgHeight = 89;
export const bugHeight = 77;
export const bugWidth = 96;

export const defaultPos = {
    playerX: canvasWidth / 2 - playerImgWidth/2,
    playerY: canvasHeight - playerImgHeight,
    bugY: bugHeight,
    bugX: -bugWidth
};


export class Enemy {
    constructor(index) {
        this.x = defaultPos.bugX - Math.random()*bugWidth;
        this.y = defaultPos.bugY*index*1.07 + 50;
        this.width = bugWidth;
        this.height = bugHeight - 10;
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.floor(Math.random()*3)+1;
        this.ctx = document.getElementById('my-canvas').getContext('2d');
    }

    update() {
        this.x += this.speed;
    }

    render() {
        this.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}

export class Player {
    constructor(sprite= 'images/char-boy.png') {
        this.sprite= sprite;
        this.x = defaultPos.playerX;
        this.y = defaultPos.playerY;
        this.width = playerImgWidth;
        this.height = playerImgHeight - 13;
        this.ctx = document.getElementById('my-canvas').getContext('2d')
    }
    render() {
        this.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update() {

    }
    handleInput(input) {

        switch (input) {
            case 'up':
                if (this.y>=0){
                    this.y -= playerImgHeight / 2;
                }
                break;
            case 'down':
                if (this.y < defaultPos.playerY) {
                    this.y += playerImgHeight / 2;
                }
                break;
            case 'right':
                if (this.x<canvasWidth-playerImgWidth) {
                    this.x += playerImgWidth / 3.3;
                }
                break;
            case 'left':
                if (this.x > 0) {
                    this.x -= playerImgWidth / 3.3;
                }
                break;
            default:
                console.log('move move!')


        }
        // console.log('input player', this.x, this.y);
    }
}



