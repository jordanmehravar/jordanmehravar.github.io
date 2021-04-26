class Enemy {
    constructor() {
        this.image = new Image();
        this.x = CANVAS_W;
        this.y0 = 0;
        this.y = 0;
        this.time = 0;
        this.sprite = 0;
        this.canRespawn = false;
        this.direction = this.y0 < CENTER_Y ? 1 : -1
        this.customHitbox = false;
    }

    update() {
        this.time += 1000 / FPS;

        if (this.x + this.w < 0) enemies.splice(enemies.indexOf(this), 1);

        if (this.x < this.respawnLine && this.canRespawn) {
            for (let j = 0; j < this.spawnSpace; j++) {spawnArray[this.index+j] = 0;}
        } else if (this.x <= this.respawnLine)  {
            this.canRespawn = true;
        } else {
            for (let j = 0; j < this.spawnSpace; j++) {spawnArray[this.index+j] = 1;}
        }
        
        if (hitMario(this) && !gameDemo) {
            player.dead = true;
            die();
        } 
    }

    draw() {
        try {
            if (!this.image.complete) {
                setTimeout(this.draw, 50);
                return;
            }

            sprite(this);
        } catch (error) {
            return;
        }
    }
}

class SuperKoopaYellow extends Enemy {
    constructor() {
        super();
        
        this.image.src = "images/super-koopa-yellow.png";
        this.respawnLine = CANVAS_W - 150;
        this.w = 92;
        this.h = 52;
        this.speed = 15;
    }

    move() {
        this.x -= this.speed;
        let direction = this.y0 < CENTER_Y ? 1 : -1
        this.y = this.y0 + Math.sqrt(20 * this.time) * this.direction;
    }
}

class SuperKoopaRed extends Enemy {
    constructor() {
        super();
        
        this.image.src = "images/super-koopa-red.png";
        this.respawnLine = CANVAS_W - 150;
        this.w = 95;
        this.h = 52;
        this.speed = 17.5;
    }

    move() {
        this.x -= this.speed;
    }
}

class ParakoopaRed extends Enemy {
    constructor() {
        super();

        this.image.src = "images/parakoopa-red.png";
        this.spriteTotal = 2;
        this.spriteRate = 200;
        this.respawnLine = CANVAS_W - 150;
        this.w = 88;
        this.h = 116;
        this.speed = 14;
    }

    move() {
        animate(this);
        this.x -= this.speed;
        this.y = this.y0 + 50*Math.cos(this.time/100);
    }
}

class ParakoopaYellow extends Enemy {
    constructor() {
        super();

        this.image.src = "images/parakoopa-yellow.png";
        this.spriteTotal = 2;
        this.spriteRate = 200;
        this.respawnLine = CANVAS_W - 150;
        this.w = 88;
        this.h = 116;
        this.speed = 14;
    }

    move() {
        animate(this);
        this.x -= this.speed;
        this.y = this.y0 + 50*Math.sin(this.time/100);
    }
}

class FlyingGoomba extends Enemy {
    constructor() {
        super();

        this.image.src = "images/flying-goomba.png";
        this.spriteTotal = 4;
        this.spriteRate = 200;
        this.respawnLine = CANVAS_W - 264;
        this.w = 132;
        this.h = 100;
        this.speed = 5;
        this.customHitbox = true;
        this.xHitbox = this.x + 15;
        this.yHitbox = this.y + 25;
        this.wHitbox = this.w - 35;
        this.hHitbox = this.h - 20;
    }

    move() {
        animate(this);
        this.x -= this.speed;
        this.xHitbox = 15 + this.x;
        this.y = this.y0 + 50*Math.sin(this.time/100);
        this.yHitbox = 25 + this.y
        
    }
}

class ParakoopaBlue extends Enemy {
    constructor() {
        super();

        this.image.src = "images/parakoopa-blue.png";
        this.spriteTotal = 2;
        this.spriteRate = 200;
        this.respawnLine = CANVAS_W - 150;
        this.w = 88;
        this.h = 116;
        this.speed = 14;
    }

    move() {
        animate(this);
        this.x -= this.speed;
        this.y = this.y0 + 150*Math.sin(this.time/200);
    }
}

class ParakoopaGreen extends Enemy {
    constructor() {
        super();

        this.image.src = "images/parakoopa-green.png";
        this.spriteTotal = 2;
        this.spriteRate = 200;
        this.respawnLine = CANVAS_W - 150;
        this.w = 88;
        this.h = 116;
        this.speed = 14;
    }

    move() {
        animate(this);
        this.x -= this.speed;
        this.y = this.y0 + 150*Math.cos(this.time/200);
    }
}

class FlyingBrother extends Enemy {
    constructor() {
        super();
        
        this.image.src = "images/flying-brother.png";
        this.spriteTotal = 2;
        this.spriteRate = 200;
        this.respawnLine = CENTER_X;
        this.w = 216;
        this.h = 152;
        this.speed = 15;
    }

    move() {
        animate(this);
        let direction = this.y0 < CENTER_Y ? 1 : -1
        this.x -= this.speed;
        this.y = this.y0 + 4*Math.sqrt(Math.abs(8*this.time))*direction;
    }
}

class Chainsaw extends Enemy {
    constructor() {
        super();
        
        this.image.src = "images/chainsaw.png";
        this.spriteTotal = 4;
        this.spriteRate = 50;
        this.respawnLine = CENTER_X - 200;
        this.w = 64;
        this.h = 176;
        this.speed = BG_SPEED;
    }

    move() {
        animate(this);
        this.x -= this.speed;
    }
}

class BigBoo extends Enemy {
    constructor() {
        super();
        
        this.image.src = "images/big-boo.png";
        this.respawnLine = CENTER_X - 200;
        this.w = 268;
        this.h = 256;
        this.speed = 14;
        this.customHitbox = true;
        this.xHitbox = this.x + 20
        this.yHitbox = this.y + 15
        this.wHitbox = this.w - 40
        this.hHitbox = this.h - 30
    }

    move() {
        this.y = this.y0 + 100*Math.sin(this.time/1000)*this.direction;
        this.x -= this.speed
        this.xHitbox = 20 + this.x;
        this.yHitbox = 15 + this.y;
    }
}

class BigBubble extends Enemy {
    constructor() {
        super();
        
        this.image.src = "images/big-bubble.png";
        this.respawnLine = CENTER_X - 200;
        this.spriteTotal = 2;
        this.spriteRate = 250;
        this.w = 224;
        this.h = 240;
        this.xSpeed = 8;
        this.ySpeed = 8;
        this.customHitbox = true;
        this.xHitbox = this.x + 20
        this.yHitbox = this.y + 20
        this.wHitbox = this.w - 40
        this.hHitbox = this.h - 40
    }

    move() {
        animate(this);
        if (this.y + this.h > CANVAS_H || this.y < 0) this.ySpeed = -this.ySpeed;
        this.x -= this.xSpeed;
        this.y += this.ySpeed;
        this.xHitbox = this.x + 20;
        this.yHitbox = this.y + 20;
    }
}

class BooBuddy extends Enemy {
    constructor() {
        super();
        
        this.boo = ["red","black","tongue"][Math.floor(Math.random()*3)],
        this.image.src = "images/boo-buddy-" + this.boo + ".png";
        this.spriteTotal = 2
        this.spriteRate = 150;
        this.respawnLine = CANVAS_W - 150;
        this.w = 64;
        this.h = 64;
        this.speed = 20;
    }

    move() {
        animate(this);
        this.x -= this.speed;
    }
}

class Eerie extends Enemy {
    constructor() {
        super();
        
        this.image.src = "images/eerie.png";
        this.spriteTotal = 2;
        this.spriteRate = 100;
        this.respawnLine = CANVAS_W - 150;
        this.w = 64;
        this.h = 64;
        this.speed = 12;
        this.coin = Math.round(Math.random())
    }

    move() {
        animate(this);
        this.x -= this.speed;
        if (this.coin) {
            this.y = this.y0 + 40*(this.time/800)*Math.sin(15*this.time/800)
        } else {
            this.y = this.y0 + 40*(this.time/800)*Math.cos(15*this.time/800)
        }
        
    }
}

class BanzaiBill extends Enemy {
    constructor() {
        super();
        
        this.image.src = "images/banzai-bill.png";
        this.respawnLine = CENTER_X + 256;
        this.w = 256;
        this.h = 256;
        this.speed = 18;
        this.customHitbox = true;
        this.xHitbox = this.x + 20;
        this.yHitbox = this.y + 25;
        this.wHitbox = this.w - 20;
        this.hHitbox = this.h - 30;
    }

    move() {
        this.x -= this.speed;
        this.xHitbox = 20 + this.x;
        this.yHitbox = 25 + this.y;
    }
}

class BulletBillLinear extends Enemy {
    constructor() {
        super();
        
        this.image = new Image();
        this.image.src = "images/bullet-bill-linear.png";
        this.respawnLine = CANVAS_W;
        this.w = 64;
        this.h = 56;
        this.speed = 35;
        
    }

    move() {
        this.x -= this.speed;
    }
}

class BulletBillDiagonal extends Enemy {
    constructor() {
        super();
        this.upSrc = "images/bullet-bill-diagonal-up.png";
        this.downSrc = "images/bullet-bill-diagonal-down.png"
        this.corner = Math.round(Math.random()) * CANVAS_H;
        this.y = this.corner;
        this.y0 = this.corner;
        
        if (this.corner) {
            this.image.src = this.upSrc;
            this.ySpeed = -22;
        } else {
            this.image.src = this.downSrc;
            this.ySpeed = 22;
        }

        
        this.respawnLine = CANVAS_W;
        this.w = 64;
        this.h = 64;
        this.x = CANVAS_W - this.w;
        this.speed = 22;
    }

    move() {
        this.x -= this.speed;
        this.y += this.ySpeed
    }
}

class Grinder extends Enemy {
    constructor() {
        super();
        
        this.image.src = "images/grinder.png";
        this.spriteTotal = 2;
        this.spriteRate = 25;
        this.respawnLine = CENTER_X + 100;
        this.w = 128;
        this.h = 128;
        this.speed = BG_SPEED;
        this.customHitbox = true;
        this.xHitbox = this.x + 12;
        this.yHitbox = this.y + 12;
        this.wHitbox = this.w - 24;
        this.hHitbox = this.h - 24;
    }

    move() {
        animate(this);
        this.x -= this.speed;
        this.xHitbox = 12 + this.x;
        this.yHitbox = 12 + this.y;

    }
}

//STAR
class Star {
    constructor() {
        this.image = new Image();
        this.image.src = "images/star.png";
        this.sprite = 0;
        this.x = CANVAS_W;
        this.y = CENTER_Y;
        this.w = 60;
        this.h = 64;
        this.speed = 10;
    }

    update() {
        if (hitMario(this)) transition();
    }

    move() {
        if (this.x > CENTER_X) this.x -= this.speed;
    }

    draw() {
        if (!this.image.complete) {
            setTimeout(this.draw, 50);
            return;
        }

        sprite(this);
    }
}