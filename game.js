function load() {
    cursor.cursor = "none";
    loadScreen.display = "none";
    startScreen.display = "block";
    loadGame.removeEventListener("click", load);
    titleTheme = new Audio("sounds/title theme.mp3");
    titleTheme.play();
    titleTheme.volume = 0.4;
    gamePause = true;
}

function start() {
    titleTheme.pause();
    titleTheme.currentTime = 0;
    gameTime = 0;
    gameLevel = 0;
    gamePause = false;
    player = new Mario();
    enemies = new Array();
    changeLevel();
    updateInterval = setInterval(update, 1000/FPS);
    drawInterval = setInterval(draw, 1000/FPS);
    spawnInterval = setInterval(spawn, 1000);  
    startScreen.display = "none";
    deadScreen.display = "none";
    addControls();
}

function update() {
    moveBackground();
    player.move();
    enemies.forEach(enemy => {enemy.update(); enemy.move();});
}

function draw() {
    ctx.clearRect(0,0, CANVAS_W,CANVAS_H);
    player.draw();
    enemies.forEach(enemy => {enemy.draw();});
}

function spawn() {
    if (gameTime === LEVELS[0].duration) {
        if (LEVELS.length === 1) {
            location.reload();
        } else {
            enemies.push(new Star());
        }
    }

    if (spawner.length !== 0) spawnEnemy();
    gameTime++;    
}

function die() {
    clearInterval(updateInterval);
    clearInterval(spawnInterval);
    removeControls();
    playAudio(new Audio('sounds/dead.mp3'));
    gamePause = false;
   
    setTimeout(() => {
        let peak = player.y - 200;
        let rise = true;
        let fall = false;
        let animate = setInterval(() => {
            if (player.y > peak && rise) {
                player.y -= 10;
            } else if (player.y <= peak && rise) {
                rise = false;
                fall = true;
            } else if (fall) {
                player.y += 12.5;
            }

            if (player.y > CANVAS_H) {
                clearInterval(animate)
                setTimeout(() => {
                    deadScreen.display = "block",
                    gamePause = true;
                }, 1500);
            }
        }, 10);
    }, 500);
}

function transition() {
    gameTransition = true;
    completeScreen.display = "block";
    background.animation = "fadeOut 2.5s";
    background.animationFillMode = "forwards";
    enemies = [];
    spawner = [];
    
    if (LEVELS.length === 2) {
        levelComplete.innerText = "Fortress Complete";
        playAudio(new Audio('sounds/fortress clear.mp3'));
    } else {
        playAudio(new Audio('sounds/course clear.mp3'));
    }

    setTimeout(() => {
        gameTransition = false;
        LEVELS.shift();
        gameTime = 0;
        completeScreen.display = "none";
        background.animation = "fadeIn 0.1s";
        background.animationFillMode = "forwards";

        changeLevel();
        addControls();
        setTimeout(() => {
            if (LEVELS.length === 1) {
                cursor.cursor = "auto";
                endScreen.display = 'block';
                gameTransition = true;
            }
        }, 250);
    }, 8200)        
}

document.addEventListener('keydown', ()=> {if (event.keyCode === 13 && gamePause) start();});
loadGame.addEventListener("click", load);

function changeLevel() {
    background.backgroundImage = LEVELS[0].background;
    LEVELS[0].soundtrack.play();
    LEVELS[0].soundtrack.volume = LEVELS[0].volume;
    spawnArray = new Array(SPAWN_ROWS).fill(0); 
    spawner = LEVELS[0].spawner;
}