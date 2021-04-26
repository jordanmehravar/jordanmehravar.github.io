class Mario {
    constructor() {
        this.jumpAudio = new Audio('sounds/jump.wav')
        this.image = new Image();
        this.image.src = "images/mario.png";
        this.w = 116;
        this.h = 124;
        this.x = CENTER_X - 4*this.w;
        this.y = CENTER_Y - this.h;
        this.gravity = 7;
        this.wind = 3;
        this.jumping = false;
        this.jumpHeight = 11;
        this.speed = 10;
        this.dead = false;
    }

    move() {
        let moveLeft = this.speed - this.wind;
        let moveRight = this.speed + this.wind;
        let moveDown = this.speed + this.gravity;

        if (gameTransition) {
            if (this.y + this.h < CANVAS_H) this.y += this.gravity;
            if (leftHeld && this.x > 0) this.x -= moveLeft;
            if (rightHeld && this.x + this.w < CANVAS_W) this.x += moveRight;
            if (downHeld && this.y + this.h < CANVAS_H) this.y += moveDown;
        } else {
            this.y += this.gravity;
            if (leftHeld) this.x -= moveLeft;
            if (rightHeld) this.x += moveRight;
            if (downHeld) this.y += moveDown;

            if (this.y + this.h/2 >= CANVAS_H ||
                this.x + this.w/2 < 0 ||
                this.x + this.w/2 > CANVAS_W) {
                if (!gameDemo) {
                    this.dead = true;
                    die();
                }
            }
        }
    }

    draw() {
        if (this.dead) {
            this.sprite = 3;
        } else if (spacePressed) {
            this.sprite = 1;
        } else if (leftHeld || rightHeld) {
            this.sprite = 0;
        } else if (downHeld) {
            this.sprite = 2;
        } else {
            this.sprite = 0;
        }

        sprite(this);
    }

    jump() {
        this.jumpAudio.currentTime = 0;
        this.jumpAudio.play();
        this.jumping = true;
        let jumpCount = 0;
        let jumpInterval = setInterval(() => {
            if (this.y > 0 && jumpCount < 15) {
                this.y -= this.jumpHeight;
            }

            if (jumpCount > 15) {
                clearInterval(jumpInterval);
                this.jumping = false;
                jumpCount = 0;
            }
            
            jumpCount++;
        }, 10);

    }
}

const LEFT = 37;
const RIGHT = 39;
const DOWN = 40;
const SPACE = 32;
const ENTER = 13;

function controls(e) {
    let input = e.keyCode;
    switch(e.type) {
        case "keyup":
            if (input === LEFT) leftHeld = false;
            if (input === RIGHT) rightHeld = false;
            if (input === DOWN) downHeld = false;
            if (input === SPACE) {
                spacePressed = false;
                player.jumping = false;
            }
            break;
        case "keydown":    
            if (input === LEFT) leftHeld = true;
            if (input === RIGHT) rightHeld = true;
            if (input === DOWN) downHeld = true;
            if (input === SPACE && !player.jumping) {
                spacePressed = true;
                player.jump();
            } 
            break;
    }

    // e.preventDefault();
}