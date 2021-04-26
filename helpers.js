function moveBackground() {
    background.backgroundPositionX = parseInt(background.backgroundPositionX) - BG_SPEED + 'px';
}

function animate(enemy) {
    if (Math.round(enemy.time) % enemy.spriteRate == 0) {
        if (enemy.sprite == enemy.spriteTotal - 1) {
            enemy.sprite = 0;
        } else {
            enemy.sprite++;
        }
    }
}

function sprite(em) {
    // if (em.customHitbox) {        
    //     ctx.fillRect(em.xHitbox,em.yHitbox,em.wHitbox,em.hHitbox);
    //     ctx.fillStyle = "White";
    // }

    ctx.drawImage(em.image, em.sprite * em.w, 0,
    em.w, em.h, em.x, em.y, em.w, em.h);
}

function hitMario(enemy) {
    let mx = player.x;
    let my = player.y;
    let mxw = mx + player.w;
    let myh = my + player.h;

    let x,y,xw,yh;
    if (enemy.customHitbox) {
        x = enemy.xHitbox;
        y = enemy.yHitbox;
        xw = x + enemy.wHitbox;
        yh = y + enemy.hHitbox;
    } else {
        x = enemy.x;
        y = enemy.y;
        xw = x + enemy.w;
        yh = y + enemy.h;
    }

    if ((((mx < x && x < mxw) || (mx < xw && xw < mxw)) &&
        ((my < y && y < myh) || (my < yh && yh < yh)))  ||
        (((x < mx && mx < xw) || (x < mxw && mxw < xw)) &&
        ((y < my && my < yh) || (y < myh && myh < yh)))) {
            return true;
    }
    
    return false;
}

function spawnEnemy() {
    let index = Math.floor(Math.random() * spawner.length);
    let name = spawner[index];
    let notBulletDiagonal = true;
    
    switch(name) {
        case "Super Koopa Yellow":
            var enemy = new SuperKoopaYellow();
            break;
        case "Super Koopa Red":
            var enemy = new SuperKoopaRed();
            break;
        case "Parakoopa Red":
            var enemy = new ParakoopaRed();
            break;
        case "Parakoopa Green":
            var enemy = new ParakoopaGreen();
            break;
        case "Parakoopa Blue":
            var enemy = new ParakoopaBlue();
            break;
        case "Parakoopa Yellow":
            var enemy = new ParakoopaYellow();
            break;
        case "Bullet Bill Linear":
            var enemy = new BulletBillLinear();
            break;
        case "Bullet Bill Diagonal":
            var enemy = new BulletBillDiagonal();
            notBulletDiagonal = false;
            break;
        case "Boo Buddy":
            var enemy = new BooBuddy();
            break;            
        case "Eerie":
            var enemy = new Eerie();
            break;
        case "Banzai Bill":
            var enemy = new BanzaiBill();
            break;
        case "Big Boo":
            var enemy = new BigBoo();
            break;
        case "Flying Goomba":
            var enemy = new FlyingGoomba();
            break;
        case "Flying Brother":
            var enemy = new FlyingBrother();
            break;
        case "Grinder":
            var enemy = new Grinder();
            break;
        case "Chainsaw":
            var enemy = new Chainsaw();
            break;
        case "Big Bubble":
            var enemy = new BigBubble();
            break;
    }

    enemy.spawnSpace = Math.floor(enemy.h / SPAWN_SIZE)
    let spawn = canEnemySpawn(enemy.spawnSpace);
    if (spawn !== false) {
        if (notBulletDiagonal) {
            enemy.y = spawn;
            enemy.y0 = spawn;
        }
        
        enemy.index = spawn / SPAWN_SIZE;
        enemies.push(enemy);
    } else {
        enemy = null;
    }
}

function canEnemySpawn(spawnSpace) {
    let maxIndex = SPAWN_ROWS - spawnSpace;
    let index = Math.floor(Math.random() * (maxIndex+1));
    
    for (let i = index; i < maxIndex; i++) {
        let slice = spawnArray.slice(i, i+spawnSpace);
        let sum = slice.reduce((a, b) => a + b, 0);
        
        if (sum === 0 ) {
            for (let j = 0; j < spawnSpace; j++) {spawnArray[index+j] = 1;}
            return i*SPAWN_SIZE;
        }
    }

    return false;
}

function playAudio(nextTrack) {
    LEVELS[gameLevel].soundtrack.pause();
    LEVELS[gameLevel].soundtrack.currentTime = 0;
    nextTrack.play();
}

function addControls() {
    leftHeld = false;
    rightHeld = false;
    downHeld = false;
    spacePressed = false;
    document.addEventListener('keydown', controls);
    document.addEventListener('keyup', controls);  
}

function removeControls() {
    leftHeld = false;
    rightHeld = false;
    downHeld = false;
    spacePressed = false;
    document.removeEventListener('keyup', controls);
    document.removeEventListener('keydown', controls);
}