import { makeDroppable } from './modules/drag-and-drop.js';
import { makeMoveable } from './modules/moveable.js';
import { drawGrid } from './modules/draw.js';
import * as generates from './modules/generate.js';
import * as instructions from './modules/instructions.js';
import * as grids from './modules/grids.js';
import * as url from './modules/url.js';
window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded() {
    setTimeout(function(){
        document.getElementById('loader').style.display = 'none';
        document.getElementById('big-container').style.display='block';
        canvasApp();
    },1000);

    
}
function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}
function canvasApp() {
    if (!canvasSupport()) { return; }

    //#region GLOBAL VARIABLES

    // set canvas dimensions
    const canvasWidth = 456;
    const canvasHeight = 480;

    let pokeUrl;
    let grid;
    let currentLevel;
    let xpElement = document.getElementById('xp');
    if(localStorage.xp!=undefined){
         xpElement.innerHTML = localStorage.xp;
    }
    
    let nrpokeElement = document.getElementById('nrpoke');
    if(localStorage.xp!=undefined){
        nrpokeElement.innerHTML = localStorage.nrpoke;
   }
    

    let userNameElement = document.getElementById('user-name');
    localStorage.userName = 'cosmin-moldovan';
    userNameElement.innerHTML = localStorage.userName;
    //#endregion

    //#region SET CANVAS

    let canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let context = canvas.getContext("2d");

    //#endregion

    //#region DRAW FUNCTIONS
    function drawScene() {
        console.log('draw Scene');
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGrid(context, grid, pokeUrl);
    }

    //#endregion
    //#region MENU BUTTONS
    const helpBtn = document.getElementById('help-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const accountBtn = document.getElementById('account-btn');
    helpBtn.addEventListener('click',function(){
        universalDialog('tutorial despre modul de utilizare a jocului');
    });
    settingsBtn.addEventListener('click',function(){
        universalDialog('setari pentru aplicatie (resetare joc, schimbare info user, alte setari)');
    });
    accountBtn.addEventListener('click',function(){
        universalDialog('stare utilizator(puncte obtinute, niveluri castigate)');
    });
    function universalDialog(msg){
        const universalDialog = document.getElementById('universal-dialog');
        universalDialog.style.display = 'flex';
        const universalMsg = document.getElementById('universal-content');
        universalMsg.innerHTML = msg;
        const exitDialogBtn = document.getElementById('exit-dialog-btn');
        exitDialogBtn.addEventListener('click', function () {
            universalDialog.style.display = 'none';
        });
    }
    //#endregion
    //#region ACTION BUTTONS
    const runBtn = document.getElementById('run');
    runBtn.addEventListener('click', function () {
        runBtn.disabled = true;
        runBtn.classList.add('disabled');
        // runBtn.children[1].innerHTML = 'running';
        // runBtn.children[0].src = 'images/pause.svg';
        runMainFunction();
    });

    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', reset);


    //#endregion

    //#region INSTRUCTIONS

    function executeForward() {
        instructions.forward(grid);
        drawGrid(context, grid, pokeUrl);
    }

    function executeLeft() {
        instructions.turnLeft(grid);
        drawGrid(context, grid, pokeUrl);

    }
    function executeRight() {
        instructions.turnRight(grid);
        drawGrid(context, grid, pokeUrl);

    }
    function executeCatch() {
        let ok = instructions.collect(grid);
        drawGrid(context, grid, pokeUrl);
        if (ok == true) {
            if(localStorage.level===undefined){
                localStorage.level=0;
                localStorage.nrpoke=0;
                localStorage.xp=0;
            }
            if (localStorage.nrpoke <= currentLevel) {
                localStorage.nrpoke = Number(localStorage.nrpoke) + 1;
                nrpokeElement.innerHTML = localStorage.nrpoke;
                nextLevel(currentLevel+1);    
            }
            else{
                instructions.printMsg('info', 'You already have this pokemon.');
            }
            nrpokeElement.innerHTML = localStorage.nrpoke;
            // instructions.printMsg('success', 'You captured the pokemon!');
            if (localStorage.level <= currentLevel) {
                localStorage.level = Number(localStorage.level) + 1;
                localStorage.xp = Number(localStorage.xp) + (Number(localStorage.level)*20+20);
                xpElement.innerHTML = localStorage.xp;
                progress(localStorage.level);
            }
            
        }
        else {
            instructions.printMsg('warning', 'Try again!');
        }

    }
    //#endregion

    //#region EVENT HANDLING
    function activateRunBtn(){
        runBtn.disabled = false;
        runBtn.classList.remove('disabled');
    }
    function reset() {
        grid = grids.getGrid(currentLevel);
        drawScene();
        activateRunBtn();
        // runBtn.children[1].innerHTML = 'run';
        // runBtn.children[0].src = 'images/play.svg';
    }
    function createProgressIndicator(){
        let nrlevels =10;
        let levelIndicator = document.getElementById('level-progress-indicator')
        for(let i=1;i<=nrlevels;i++){
            let pbar = document.createElement('div');
            pbar.classList.add('level');
            let nrlev = document.createElement('span');
            nrlev.innerHTML = i;
            pbar.appendChild(nrlev);
            levelIndicator.appendChild(pbar);
        }
        let tail = document.createElement('div');
        tail.classList.add('tail');
        levelIndicator.lastChild.appendChild(tail);
    }
    createProgressIndicator();
    function progress(completedLevels){
        let levelIndicator = document.getElementById('level-progress-indicator');
        for(let i=0;i<=completedLevels;i++){
                levelIndicator.children[i].classList.add('level-active');
                levelIndicator.children[i].firstChild.addEventListener('click', function(){
                    goLevel(i);
                });
        }
    }
    function executeInstruction(instruction) {
        switch (instruction) {
            case 'forward':
                executeForward();
                break;
            case 'left':
                executeLeft();
                break;
            case 'right':
                executeRight();
                break;
            case 'catch':
                executeCatch();
                break;
            case 'procedure':
                executeProcedure();
                break;
        }
    }

    let jdex = 0;
    function executeProcedure() {
        const procedureContainer = document.getElementById('procedure-code-container');
        const numberOfLines = procedureContainer.childElementCount;
        let instruction;
        let codeBlock = procedureContainer.children[jdex].firstChild.firstChild;
        if (codeBlock) {
            instruction = codeBlock.dataset.instruction;
        }
        executeInstruction(instruction);
        jdex++;
        if (jdex < numberOfLines) {
            setTimeout(executeProcedure, 1000);
        }
        else {
            jdex = 0;
        }
    }
    let idex = 0;
    function runMainFunction() {
        const mainCodeContainer = document.getElementById('main-code-container');
        const numberOfLines = mainCodeContainer.childElementCount;
        let instruction;
        let codeBlock = mainCodeContainer.children[idex].firstChild.firstChild;
        if (codeBlock) {
            instruction = codeBlock.dataset.instruction;
        }
        executeInstruction(instruction);
        idex++;
        if (idex < numberOfLines) {
            setTimeout(runMainFunction, 1000);
        }
        else {
            idex = 0;
        }
    }


    //#endregion
    function goLevel(lv) {
        switch (lv) {
            case 0:
                level0();
                break;
            case 1:
                level1();
                break;
            case 2:
                level2();
                break;
            case 3:
                level3();
                break;
            case 4:
                level4();
                break;
            case 5:
                level5();
                break;
            case 6:
                level6();
                break;
            case 7:
                level7();
                break;
            case 8:
                level8();
                break;
            case 9:
                level9();
                break;
        }
    }
    function nextLevelDialog(levelNumber, pokeName, pokeUrl) {
        const pokeimg = document.getElementById('poke-img');
        pokeimg.src = pokeUrl;
        const pokename = document.getElementById('poke-name');
        pokename.innerHTML = pokeName;
        const pokepower = document.getElementById('poke-power');
        pokepower.innerHTML = (levelNumber+1)*20+20 + 'xp';
    }
    function nextLevel(lv) {
        const levelDialog = document.getElementById('next-level-dialog');
        levelDialog.style.display = 'flex';
        const okNextBtn = document.getElementById('continue-level');
        okNextBtn.addEventListener('click', function () {
            levelDialog.style.display = 'none';
            setTimeout(function () {
                goLevel(lv);
            }, 2000);
        });
        const cancelNextBtn = document.getElementById('resume-level');
        cancelNextBtn.addEventListener('click', function () {
            levelDialog.style.display = 'none';
            reset();
        });
    }
    function level(levelNumber, pokeName, mainLines, procLines) {
        grid = grids.getGrid(levelNumber);
        pokeUrl = url.getPokeUrl(pokeName);
        drawScene();
        currentLevel = levelNumber;
        progress(localStorage.level);
        activateRunBtn();
        generates.codeLines(mainLines, procLines);
        nextLevelDialog(levelNumber, pokeName, pokeUrl);
        makeDroppable();
    }
    function level0() {
        level(0, 'pikachu', 3, 0);
    }
    function level1() {
        level(1, 'rattata', 4, 0);
    }
    function level2() {
        level(2, 'snorlax', 1, 5);

    }
    function level3() {

    }
    function level4() {

    }
    function level5() {

    }
    function level6() {

    }
    function level7() {

    }
    function level8() {

    }
    function level9() {

    }
    level0();
    drawScene();
}
