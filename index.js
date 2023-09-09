const PLAYER01 = document.getElementById('player1');
const PLAYER02 = document.getElementById('player2');

const PLAYER01_SPRITE = document.getElementById('player1-canvas')
const PLAYER02_SPRITE = document.getElementById('player2-canvas')

const PLAYER01_HP_BAR = document.getElementById('player1-hp-bar')
const PLAYER02_HP_BAR = document.getElementById('player2-hp-bar')

const CONTAINER = document.getElementById('game-screen');

let timer_display = document.getElementById('timer');

const pauseMenu = document.querySelector('.pause-menu')

const pauseButton = document.getElementById('pause')



// ---------- SCREENS ----------
const SCREEN01 = document.querySelector('.SCREEN01');
const SCREEN02 = document.querySelector('.SCREEN02');
const SCREEN03 = document.querySelector('.SCREEN03');
const SCREEN04 = document.querySelector('.SCREEN04');


// ---------- BUTTONS ----------
const SCREEN01_BUTTON = document.getElementById('screen01-button-start')
const SCREEN02_BUTTON = document.getElementById('screen02-button-continue')
const SCREEN03_BUTTON = document.getElementById('screen03-button-continue')


// ---------- TEXT POPUP ----------
const POPUP_FIGHT_START = document.querySelector('.fight-start-popup')
const POPUP_GAME_OVER = document.querySelector('.game-over-popup')
const POPUP_PLAYER_WINS = document.querySelector('.player-wins-popup')


// ---------- ATTRIBUTES ----------

// Player 1 Attributes
let isMovingLeft = false;
let isMovingRight = false;
let isJumping = false;
let isHitTaken = false;
let isAttacking = false;
let player01_name;

// Player 2 Attributes
let isMovingLeft2 = false;
let isMovingRight2 = false;
let isJumping2 = false;
let isHitTaken2 = false;
let isAttacking2 = false;
let player02_name;

// ---------- PLAYERS HEALTH POINTS ----------

let PLAYER01_HP = 100;
let PLAYER02_HP = 100;


// ---------- COUNTERS ----------

// Player 1 Counters
let attackCounter = 1;
let attackLength;
let runCounter = 1;
let runLength;
let idleCounter = 1;
let idleLength;
let takeHitCounter = 1;
let takeHitLength;

// Player 2 Counters
let attackCounter2 = 1;
let attackLength2;
let runCounter2 = 1;
let runLength2;
let idleCounter2 = 1;
let idleLength2;
let takeHitCounter2 = 1;
let takeHitLength2;



// ---------- TIMER ATTRIBUTES ----------
let timer;
let minutes;
let seconds;
let TIMER_LENGTH = 120;


let isPaused = false;
let isPlaying = false;
let isGameOver = false;
let timeUp = false;

let widthDeduction = 400;
let heightDeduction = 333;


// ---------- GAME BOOLEANS ----------
let player01HasSelected = false;
let player02HasSelected = false;
let sceneHasSelected = false;
let backgroundPath;



// ---------- SOUND EFFECTS ----------
let HIT_SFX = new Audio("assets/sfx/hit.mp3");
let GAME_OVER_SFX = new Audio("assets/sfx/game-over.mp3");
let FIGHT_START_SFX = new Audio("assets/sfx/fight-start.mp3");
let BGM;

HIT_SFX.volume = .2;
GAME_OVER_SFX.volume = .2;
FIGHT_START_SFX.volume = .2;


// ---------- FUNCTIONS ----------

function render() {
    // update player position based on movement keys
    if(!isGameOver && isPlaying){
        runAnimation();

        // animate attack if active
        attackAnimation();
        hitTakenAnimation();
        idleAnimation();
        jumpAnimation();
    }
    
    
    setTimeout(() => {
        requestAnimationFrame(render);
    }, 50);
}

function idleAnimation() {
    if (isPlaying) {
        if (!isAttacking && !isMovingLeft && !isMovingRight && !isHitTaken) {
            if (idleCounter > idleLength) {
                idleCounter = 1;
            }
            PLAYER01_SPRITE.src = "assets/characters/" + player01_name + "/idle/idle-" + idleCounter + ".png";
            idleCounter++;

        }

        if (!isAttacking2 && !isMovingLeft2 && !isMovingRight2 && !isHitTaken2) {
            PLAYER02_SPRITE.src = "assets/characters/" + player02_name + "/idle/idle-" + idleCounter2 + ".png";
            idleCounter2++;

            if (idleCounter2 > idleLength2) {
                idleCounter2 = 1;
            }
        }
    }
}

function jumpAnimation() {
    if (isPlaying) {
        if (isJumping && !PLAYER01.classList.contains('jump')) {
            PLAYER01.classList.add('jump');
            setTimeout(() => {
                PLAYER01.classList.remove('jump');
            }, 600)

        }

        if (isJumping2 && !PLAYER02.classList.contains('jump')) {
            PLAYER02.classList.add('jump');

            setTimeout(() => {
                PLAYER02.classList.remove('jump');
            }, 600)

        }
    }
}

function runAnimation() {
    let x_position = PLAYER01.offsetLeft;
    let x_position2 = PLAYER02.offsetLeft;


    if (isPlaying && !isGameOver) {
        if (!PLAYER01.classList.contains('isHitTaken')) {
            if (isMovingLeft) {
                PLAYER01.style.transform = "scaleX(-1)";
                x_position -= 60;
                if (x_position + widthDeduction - 100 <= 0) {
                    x_position = -widthDeduction + 100;
                }


            }

            if (isMovingRight) {
                PLAYER01.style.transform = "scaleX(1)";
                x_position += 60;

                if (x_position + (PLAYER01.offsetWidth - widthDeduction + 100) >= CONTAINER.offsetWidth) {
                    x_position = CONTAINER.offsetWidth - (PLAYER01.offsetWidth - widthDeduction + 100);
                }
            }
        }


        if (!PLAYER02.classList.contains('isHitTaken')) {
            if (isMovingLeft2) {
                PLAYER02.style.transform = "scaleX(-1)";
                x_position2 -= 60;
                if (x_position2 + widthDeduction - 100 <= 0) {
                    x_position2 = -widthDeduction + 100;
                }
            }

            if (isMovingRight2) {
                PLAYER02.style.transform = "scaleX(1)";
                x_position2 += 60;

                if (x_position2 + (PLAYER02.offsetWidth - widthDeduction + 100) >= CONTAINER.offsetWidth) {
                    x_position2 = CONTAINER.offsetWidth - (PLAYER02.offsetWidth - widthDeduction + 100);
                }
            }
        }



        PLAYER01_SPRITE.src = "assets/characters/" + player01_name + "/run/run-" + runCounter + ".png";
        PLAYER02_SPRITE.src = "assets/characters/" + player02_name + "/run/run-" + runCounter + ".png";

        runCounter++;
        runCounter2++;

        if (runCounter > runLength) {
            runCounter = 1;
        }

        if (runCounter2 > runLength2) {
            runCounter2 = 1;
        }
    }


    PLAYER01.style.left = x_position + 'px';
    PLAYER02.style.left = x_position2 + 'px';
}

function attackAnimation() {
    if (isAttacking && !isHitTaken) {
        if (attackCounter > attackLength) {
            attackCounter = 1;
            isAttacking = false;
        }
        PLAYER01_SPRITE.src = "assets/characters/" + player01_name + "/attack/attack-" + attackCounter + ".png";
        attackCounter++;

        

        if (isHit(PLAYER01, PLAYER02) && !PLAYER02.classList.contains('isHitTaken') && !PLAYER01.classList.contains('isHitTaken')) {
            PLAYER02.classList.add('isHitTaken');

            HIT_SFX.currentTime = 0.1;
            HIT_SFX.play();

            isAttacking2 = false;

            PLAYER02_HP -= 10;
            PLAYER02_HP_BAR.style.width = PLAYER02_HP + "%";

            if (PLAYER02_HP > 0) {
                setTimeout(() => {
                    PLAYER02.classList.remove('isHitTaken');
                }, 400)
                isHitTaken2 = true;
            } else if(PLAYER02_HP <= 0 && PLAYER01_HP <= 0){
                playersDraw();
                PLAYER01.classList.add('die');
                PLAYER02.classList.add('die');
            }else {
                player01Wins();
            }

        }
    }

    if (isAttacking2 && !isHitTaken2) {
        if (attackCounter2 > attackLength2) {
            attackCounter2 = 1;
            isAttacking2 = false;
        }
        PLAYER02_SPRITE.src = "assets/characters/" + player02_name + "/attack/attack-" + attackCounter2 + ".png";
        attackCounter2++;


        if (isHit(PLAYER02, PLAYER01) && !PLAYER01.classList.contains('isHitTaken') && !PLAYER02.classList.contains('isHitTaken')) {
            PLAYER01.classList.add('isHitTaken');
            
            HIT_SFX.currentTime = 0.1;
            HIT_SFX.play();

            isAttacking = false;

            PLAYER01_HP -= 10;
            PLAYER01_HP_BAR.style.width = PLAYER01_HP + "%";

            if (PLAYER01_HP > 0) {
                setTimeout(() => {
                    PLAYER01.classList.remove('isHitTaken');
                }, 400)
                isHitTaken = true;
            } else if(PLAYER02_HP <= 0 && PLAYER01_HP <= 0){
                PLAYER01.classList.add('die');
                PLAYER02.classList.add('die');
                playersDraw();
            }else {
                player02Wins();
            }
        }
    }

}

function player01Wins(){
    GAME_OVER_SFX.currentTime = 1;
    GAME_OVER_SFX.play();
    POPUP_GAME_OVER.classList.add('popup');
    setTimeout(()=>{
        POPUP_GAME_OVER.classList.remove('popup');
        POPUP_PLAYER_WINS.classList.add('popup');
        POPUP_PLAYER_WINS.textContent = "Player 1 Wins";
    }, 1000)
    setTimeout(()=>{
        POPUP_PLAYER_WINS.classList.remove('popup');
    }, )
    clearInterval(timer)
    PLAYER02.classList.add('die');
    setTimeout(()=>{
        isGameOver = true;
        isPlaying = false;
    }, 100)
    PLAYER01_SPRITE.src = "assets/characters/kenji/attack/attack-3.png";
}

function player02Wins(){
    GAME_OVER_SFX.currentTime = 1;
    GAME_OVER_SFX.play();
    POPUP_GAME_OVER.classList.add('popup');
    setTimeout(()=>{
        POPUP_GAME_OVER.classList.remove('popup');
        POPUP_PLAYER_WINS.classList.add('popup');
        POPUP_PLAYER_WINS.textContent = "Player 2 Wins";
    }, 1000)
    setTimeout(()=>{
        POPUP_PLAYER_WINS.classList.remove('popup');
    }, )

    clearInterval(timer)
    PLAYER01.classList.add('die');
    setTimeout(()=>{
        isGameOver = true;
        isPlaying = false;
    }, 100)
    PLAYER02_SPRITE.src = "assets/characters/kenji/attack/attack-3.png";
}

function playersDraw(){
    GAME_OVER_SFX.currentTime = 1;
    GAME_OVER_SFX.play();
    clearInterval(timer)

    POPUP_GAME_OVER.classList.add('popup');
    setTimeout(()=>{
        POPUP_GAME_OVER.classList.remove('popup');
        POPUP_PLAYER_WINS.classList.add('popup');
        POPUP_PLAYER_WINS.textContent = "DRAW";
    }, 1000)
    setTimeout(()=>{
        POPUP_PLAYER_WINS.classList.remove('popup');
    }, )

    setTimeout(()=>{
        isGameOver = true;
        isPlaying = false;
    }, 100)
}



function hitTakenAnimation() {
    if (isPlaying) {
        if (isHitTaken) {
            if (takeHitCounter > takeHitLength) {
                isHitTaken = false;
                takeHitCounter = 1;
                return
            }
            PLAYER01_SPRITE.src = "assets/characters/" + player01_name + "/take-hit/take-hit-" + takeHitCounter + ".png";

            takeHitCounter++;
        }

        if (isHitTaken2) {

            if (takeHitCounter2 > takeHitLength2) {
                isHitTaken2 = false;
                takeHitCounter2 = 1;
                return
            }
            PLAYER02_SPRITE.src = "assets/characters/" + player02_name + "/take-hit/take-hit-" + takeHitCounter2 + ".png";

            takeHitCounter2++;
        }

    }
}

function isHit(player, enemy) {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    let playerScaleX = player.style.transform;

    if (playerScaleX == "scaleX(1)") {
        if (playerRect.left > enemyRect.left) {
            return;
        }
    } else {
        if (playerRect.left < enemyRect.left) {
            return;
        }
    }

    if (playerRect.left + playerRect.width < enemyRect.left + widthDeduction) {
        return;
    }

    if (playerRect.left > enemyRect.left + widthDeduction + 50) {
        return;
    }

    // Check if player is above or below enemy
    if (playerRect.bottom - heightDeduction - 50 < enemyRect.top || playerRect.top > enemyRect.bottom - heightDeduction) {
        return;
    }

    return true;
}

function startTimer() {

    timer = setInterval(() => {
        minutes = Math.floor(TIMER_LENGTH / 60);
        seconds = TIMER_LENGTH % 60;

        timer_display.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

        if (TIMER_LENGTH <= 0) {
            clearInterval(timer);
            isPlaying = false;
            timeUp = true;

            if (PLAYER01_HP > PLAYER02_HP) {
                player01Wins()
            } else if (PLAYER02_HP > PLAYER01_HP) {
                player02Wins()
            } else if (PLAYER02_HP > 0 && PLAYER02_HP == PLAYER01_HP) {
                playersDraw();
            }

            isPlaying = false;
            isGameOver = true;

        }
        TIMER_LENGTH--;
    }, 1000)
    
}

function pauseTimer(){   
    clearInterval(timer);

    pauseMenu.classList.add('show');
}

function resumeTimer(){
    if(!isGameOver){
        startTimer();
    }
}


function restartGame(){
    clearInterval(timer);
    isPlaying = true;
    TIMER_LENGTH = 120;

    isPaused = false;
    isGameOver = false;

    
    // Player 1 Attributes
    isMovingLeft = false;
    isMovingRight = false;
    isJumping = false;
    isHitTaken = false;
    isAttacking = false;
    isHitTaken = false;

    // Player 2 Attributes
    isMovingLeft2 = false;
    isMovingRight2 = false;
    isJumping2 = false;
    isHitTaken2 = false;
    isAttacking2 = false;
    isHitTaken2 = false;

    
    PLAYER01.classList.remove('die');
    PLAYER02.classList.remove('die');

    PLAYER01.classList.remove('isHitTaken');
    PLAYER02.classList.remove('isHitTaken');

    PLAYER01.style.transform = "scaleX(1)";
    PLAYER02.style.transform = "scaleX(-1)";

    PLAYER01.style.transition = "none";
    PLAYER02.style.transition = "none";

    setTimeout(()=>{
        PLAYER01.style.transition = ".1s linear";
        PLAYER02.style.transition = ".1s linear";
    }, 500)

    PLAYER01.style.left = -200 + 'px';
    PLAYER02.style.left = CONTAINER.offsetWidth - 600 + 'px';


    // ---------- PLAYERS HEALTH POINTS ----------

    PLAYER01_HP = 100;
    PLAYER02_HP = 100;

    PLAYER01_HP_BAR.style.width = PLAYER01_HP + "%";
    PLAYER02_HP_BAR.style.width = PLAYER02_HP + "%";


    POPUP_FIGHT_START.classList.add('popup');

    setTimeout(()=>{
        POPUP_FIGHT_START.classList.remove('popup');
    }, 1000)

    SCREEN04.style.backgroundImage = "url(" + backgroundPath +")";
}

function resetSelection(){
    player01HasSelected = false;
    player02HasSelected = false;

    player01_name = "";
    player02_name = "";

    if(BGM.currentTime > 1){
        BGM.pause();
    }
    BGM.currentTime = 1;

    sceneHasSelected = false;

    let player01CharacterRadios = document.querySelectorAll('[name=player01]');

    player01CharacterRadios.forEach(radio => {
        radio.checked = false;
    })

    let player02CharacterRadios = document.querySelectorAll('[name=player02]');

    player02CharacterRadios.forEach(radio => {
        radio.checked = false;
    })

    let sceneRadios = document.querySelectorAll('[name=scene]');

    sceneRadios.forEach(radio => {
        radio.checked = false;
    })

    restartGame();
}

function setAnimationLength(player){
    if(player == "Player01"){
        switch(player01_name){
            case 'Kenji':
                attackLength = 4;
                idleLength = 4;
                runLength = 8;
                takeHitLength = 3;
                break;
            case 'Kenshin':
                attackLength = 6;
                idleLength = 8;
                runLength = 8;
                takeHitLength = 4;
                break;
            case 'Lapu-Lapu':
                attackLength = 6;
                idleLength = 10;
                runLength = 8;
                takeHitLength = 3;
                break;
            case 'Brain':
                attackLength = 4;
                idleLength = 10;
                runLength = 6;
                takeHitLength = 3;
                break;
            default:
                attackLength = 0;
        }
    }
    if(player == "Player02"){
        switch(player02_name){
            case 'Kenji':
                attackLength2 = 4;
                idleLength2 = 4;
                runLength2 = 8;
                takeHitLength2 = 3;
                break;
            case 'Kenshin':
                attackLength2 = 6;
                idleLength2 = 8;
                runLength2 = 8;
                takeHitLength2 = 4;
                break;
            case 'Lapu-Lapu':
                attackLength2 = 6;
                idleLength2 = 10;
                runLength2 = 8;
                takeHitLength2 = 3;
                break;
            case 'Brain':
                attackLength2 = 4;
                idleLength2 = 10;
                runLength2 = 6;
                takeHitLength2 = 3;
                break;
            default:
                attackLength2 = 0;
        }
    }
   
}

pauseButton.addEventListener('click', (e)=>{
    pauseMenu.classList.add('show');
    clearInterval(timer)
    isPlaying = false;
})

pauseMenu.addEventListener('click', (e)=> {
    if(e.target.classList.contains('button-1')){
        pauseMenu.classList.toggle('show');
        if(isGameOver){
            return;
        }
        startTimer();
        isPlaying = true;
    }
    if(e.target.classList.contains('button-2')){
        pauseMenu.classList.toggle('show');
        restartGame();
        startTimer();
        FIGHT_START_SFX.play();
    }
    if(e.target.classList.contains('button-3')){
        pauseMenu.classList.toggle('show');
        SCREEN04.classList.toggle('hide');
        SCREEN02.classList.toggle('hide');
        resetSelection();
        isPlaying = false;
    }
    if(e.target.classList.contains('button-4')){
        pauseMenu.classList.toggle('show');

        SCREEN01.classList.toggle('hide')
        SCREEN04.classList.toggle('hide')

        resetSelection();
        isPlaying = false;
    }
})


window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (isPlaying) {
        if (e.key == "a" || e.key == "A") {
            isMovingLeft = true;
            isMovingRight = false;
        }
        if (e.key == "d" || e.key == "D") {
            isMovingRight = true;
            isMovingLeft = false;
        }
        if (e.key == "w" || e.key == "W") {
            isJumping = true;
        }
        if (e.key == " ") {
            isAttacking = true;
        }

        if (e.key == "ArrowLeft") {
            isMovingLeft2 = true;
            isMovingRight2 = false;
        }
        if (e.key == "ArrowRight") {
            isMovingRight2 = true;
            isMovingLeft2 = false;
        }
        if (e.key == "ArrowUp") {
            isJumping2 = true;
        }
        if (e.key == "ArrowDown") {
            isAttacking2 = true;
        }
    }

})

window.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (isPlaying) {
        if (e.key == "a" || e.key == "A") {
            isMovingLeft = false;
        }
        if (e.key == "d" || e.key == "D") {
            isMovingRight = false;
        }
        if (e.key == "w" || e.key == "W") {
            isJumping = false;
        }
        if (e.key == "ArrowLeft") {
            isMovingLeft2 = false;
        }
        if (e.key == "ArrowRight") {
            isMovingRight2 = false;
        }
        if (e.key == "ArrowUp") {
            isJumping2 = false;
        }
    }

})





// ------------------------- SCREEN BUTTONS EVENT LISTENERS -------------------------
SCREEN01_BUTTON.addEventListener('click', (e)=>{
    SCREEN01.classList.toggle('hide');
    SCREEN02.classList.toggle('hide');
})

SCREEN02_BUTTON.addEventListener('click', (e)=>{
    if(player01HasSelected && player02HasSelected){
        SCREEN02.classList.toggle('hide');
        SCREEN03.classList.toggle('hide');

        SCREEN02_BUTTON.classList.toggle('hide');
    }
})

SCREEN03_BUTTON.addEventListener('click', (e)=>{
    if(sceneHasSelected){
        SCREEN03.classList.toggle('hide');
        SCREEN04.classList.toggle('hide');

        SCREEN03_BUTTON.classList.toggle('hide');

        restartGame();
        startTimer();
        
        FIGHT_START_SFX.play();

        BGM.play();
    }

})






// ------------------------- SCREENS CLICK EVENT LISTENERS -------------------------
SCREEN02.addEventListener('click', (e)=>{
    if(!e.target.classList.contains('character-icon')){
        return
    };
    let mainParent = e.target.parentElement.parentElement.parentElement.parentElement;
    if(mainParent.classList.contains('player01-selection-wrapper')){
        player01_name = e.target.value;
        player01HasSelected = true;
        setAnimationLength('Player01');
    }
    if(mainParent.classList.contains('player02-selection-wrapper')){
        player02_name = e.target.value;
        player02HasSelected = true;
        setAnimationLength('Player02');
    }
    if(player01HasSelected && player02HasSelected){
        SCREEN02_BUTTON.classList.remove('hide');
    }
})


SCREEN03.addEventListener('click', (e)=>{
    if(!e.target.classList.contains('img-scene-icon')){
        return
    }else{
        if(e.target.classList.contains('scene-1')){
            BGM = new Audio('assets/sfx/bgm-1.mp3')
        }else if(e.target.classList.contains('scene-2')){
            BGM = new Audio('assets/sfx/bgm-2.mp3')
        }else if(e.target.classList.contains('scene-3')){
            BGM = new Audio('assets/sfx/bgm-3.mp3')
        }else if(e.target.classList.contains('scene-4')){
            BGM = new Audio('assets/sfx/bgm-4.mp3')
        }else if(e.target.classList.contains('scene-5')){
            BGM = new Audio('assets/sfx/bgm-5.mp3')
        }else if(e.target.classList.contains('scene-6')){
            BGM = new Audio('assets/sfx/bgm-7.mp3')
        }

        sceneHasSelected = true;
        backgroundPath = e.target.src;

        BGM.volume = .5;

        SCREEN03_BUTTON.classList.remove('hide');

    }
    
    //
})

requestAnimationFrame(render)