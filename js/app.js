import {Resources} from './resources';

export  const canvasWidth = 505;
export  const canvasHeight = 600;
export  const imgWidth = 101;
export  const imgHeight = 171;

// The Enemy who will be avoided
export class Enemy {
    constructor(y) {
        this.x = -imgWidth;
        this.y = y ;
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.floor(Math.random()*3)+1;
        this.ctx = document.getElementById('my-canvas').getContext('2d');
    }

    update() {
        this.x += this.speed;
        this.render();

    }

    render() {
        this.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}

export class Player {
    constructor(sprite= 'images/char-boy.png') {
        this.sprite= sprite;
        this.x = canvasWidth / 2 - imgWidth/2;
        this.y =canvasHeight - imgHeight +20;
        this.ctx = document.getElementById('my-canvas').getContext('2d')
    }
    render() {
        this.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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



