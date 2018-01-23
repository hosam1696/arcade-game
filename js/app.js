
// The Enemy who will be avoided
const canvasWidth = 505;
const canvasHeight = 600;
class Enemy {
    constructor(y) {
        this.x = -imgWidth;
        this.y = y ;
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.floor(Math.random()*3)+1;
    }

    update() {
        this.x += this.speed;
        this.render();

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}

class Player {
    constructor(sprite= 'images/char-boy.png') {
        this.sprite= sprite;
        this.x = canvasWidth / 2 - imgWidth/2 ;
        this.y = canvasHeight - imgHeight +20;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update() {

    }
    handleInput(input) {

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
                            init();
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

const allEnemies = Array.from({length: 4}, (iter, i)=>new Enemy(imgWidth*(i*1.6+1)/2));


console.log(allEnemies)

document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});