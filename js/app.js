import {Resources} from './resources';

export  const CANVAS_WIDTH = 505;
export  const CANVAS_HEIGHT = 650;
export  const PLAYER_IMG_WIDTH = 66;
export  const PLAYER_IMG_HEIGHT = 89;
export const BUG_HEIGHT = 77;
export const BUG_WIDTH = 96;

export const DEFAULT_POSITIONS = {
    playerX: CANVAS_WIDTH / 2 - PLAYER_IMG_WIDTH/2,
    playerY: CANVAS_HEIGHT - PLAYER_IMG_HEIGHT,
    bugY: BUG_HEIGHT*1.07,
    bugX: -BUG_WIDTH

};


export class Enemy {
    constructor(index,
                x = DEFAULT_POSITIONS.bugX - Math.random()*BUG_WIDTH,
                y = DEFAULT_POSITIONS.bugY*index + 50,
                width = BUG_WIDTH,
                height = BUG_HEIGHT - 10) {
        Object.assign(this, {x, y, width, height});
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.floor(Math.random()*3)+1;
        this.ctx = document.getElementById('my-canvas').getContext('2d');
    }

    update() {
        this.x += 2;
    }

    render() {
        this.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}

export class Player extends Enemy{
    constructor(sprite= 'images/char-boy.png',
                x = DEFAULT_POSITIONS.playerX,
                y = DEFAULT_POSITIONS.playerY,
                width = PLAYER_IMG_WIDTH,
                height= PLAYER_IMG_HEIGHT - 13) {
        super(0, x, y, width, height);
        this.sprite= sprite;
    }
    update(){

    }
    handleInput(input) {

        switch (input) {
            case 'up':
                if (this.y>=0){
                    this.y -= PLAYER_IMG_HEIGHT / 2;
                }
                break;
            case 'down':
                if (this.y < DEFAULT_POSITIONS.playerY) {
                    this.y += PLAYER_IMG_HEIGHT / 2;
                }
                break;
            case 'right':
                if (this.x<CANVAS_WIDTH-PLAYER_IMG_WIDTH) {
                    this.x += PLAYER_IMG_WIDTH ;
                }
                break;
            case 'left':
                if (this.x > 0) {
                    this.x -= PLAYER_IMG_WIDTH ;
                }
                break;
            default:
                console.log('move move!')


        }
        // console.log('input player', this.x, this.y);
    }
}



