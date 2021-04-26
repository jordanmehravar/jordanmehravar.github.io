const LEVEL_0 = {
    background: "url(images/overworld.jpg",
    soundtrack: new Audio("haunted.mp3"),
    volume: 0,
    spawner: [],
    duration: 1000
}

const LEVEL_1 = {
    background: "url(images/overworld.jpg)",
    soundtrack: new Audio('sounds/overworld.mp3'),
    volume: 0.4,
    spawner: [
        "Super Koopa Yellow", 
        "Super Koopa Red",
        "Parakoopa Red",
        "Flying Goomba"
    ],
    
    duration: 35
}

const LEVEL_2 = {
    background: "url(images/athletic.jpg)",
    soundtrack: new Audio('sounds/athletic.mp3'),
    volume: 0.45,
    spawner: [
        "Parakoopa Yellow",
        "Parakoopa Blue",
        "Parakoopa Green",
        "Flying Brother",
        "Chainsaw",
    ],

    duration: 45
}

const LEVEL_3 = {
    background: "url(images/haunted.jpg)",
    soundtrack: new Audio("sounds/ghost house.mp3"),
    volume: 0.35,
    spawner: [
        "Boo Buddy",
        "Eerie",
        "Big Boo",
        "Big Bubble"
    ],

    duration: 55
}

const LEVEL_4 = {
    background: "url(images/castle.jpg)",
    soundtrack: new Audio("sounds/castle theme.mp3"),
    volume: 0.8,
    spawner: [
        "Banzai Bill",
        "Banzai Bill",
        "Bullet Bill Linear",
        "Bullet Bill Diagonal",
        "Grinder"
    ],

    duration: 65
}

const LEVEL_5 = {
    background: "url(images/finish.jpg)",
    soundtrack: new Audio("sounds/ending theme.mp3"),
    volume: 0.5,
    spawner: [],
    duration: 250
}

const LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5];