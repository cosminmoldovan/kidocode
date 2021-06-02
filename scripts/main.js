import { square, createMatrix } from './modules/functions.js';
import { makeDroppable } from './modules/drag-and-drop.js';
import { drawGrid } from './modules/draw.js';
import * as generates from './modules/generate.js';
import * as instructions from './modules/instructions.js';
window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded() {
    canvasApp();
}
function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}
function canvasApp() {
    if (!canvasSupport()) { return; }

    //#region GLOBAL VARIABLES

    // CANVAS DIMENSIONS
    const canvasWidth = 456;
    const canvasHeight = 480;

    let pokeUrl;
    let grid = createMatrix(6, 6);

    //#endregion

    //#region SET CANVAS

    let canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let context = canvas.getContext("2d");

    //#endregion

    //#region GENERATE HTML COMPONENTS

    //#endregion

    //#region PROGRESS INDICATOR
    
    //#endregion

    //#region DRAW FUNCTIONS
    function drawScene() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGrid(context,grid, pokeUrl);
    }

    //#endregion

    //#region ACTION BUTTONS
        const runBtn = document.getElementById('run');
        runBtn.addEventListener('click', runMainFunction);
    
        const resetBtn = document.getElementById('reset');
        resetBtn.addEventListener('click', reset);


    //#endregion

    //#region INSTRUCTIONS

    function executeForward() {
        instructions.forward(grid);
        drawGrid(context,grid, pokeUrl);

    }

    function executeLeft() {
        instructions.turnLeft(grid);
        drawGrid(context,grid, pokeUrl);

    }
    function executeRight() {
        instructions.turnRight(grid);
        drawGrid(context,grid, pokeUrl);

    }
    function executeCatch() {
        instructions.collect(grid);
        drawGrid(context,grid, pokeUrl);

    }
    //#endregion

    //#region EVENT HANDLING

    function reset() {
    }

    function executeInstruction(instruction) {
        switch (instruction) {
            case 'forward':
                executeForward();
                break;
            // case 'backward':
            //     executeBackward();
            //     break;
            case 'left':
                executeLeft();
                break;
            case 'right':
                executeRight();
                break;
            // case 'proc':
            //     right();
            //     break;
            case 'catch':
                executeCatch();
                break;
            // case 'procedure':
            //     procedure();
            //     break;
        }
    }
    let idex = 0;

    function runMainFunction() {
        const mainCodeContainer = document.getElementById('main-code-container');
        const numberOfLines = mainCodeContainer.childElementCount;
        let instruction;
        let codeBlock = mainCodeContainer.children[idex].children[0].children[0];
        if (codeBlock) {
            instruction = codeBlock.dataset.instruction;
        }
        executeInstruction(instruction);
        idex++;
        if (idex < numberOfLines) {
            setTimeout(runMainFunction, 1000);
        }
    }

    //#endregion

    function level1() {
        grid = [
            [0, 1, 0, 1, 0, 0],
            [1, 1, 0, 0, 1, 0],
            [0, 0, 0, 2, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 3, 0],
            [0, 0, 0, 0, 0, 1]
        ];
        pokeUrl = "../images/pokemons/pikachu.svg";
        const numberOfLines = 4;
        drawScene();
        generates.codeLines('parent1', 'main-code-container',numberOfLines);
        generates.codeLines('parent2', 'main-code-container',2);

    }
    function level2() {
        grid = [
            [0, 1, 0, 1, 0, 0],
            [1, 2, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 1, 0, 3, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1]
        ];
        pokeUrl = "../images/pokemons/rattata.svg";
        const numberOfLines = 7;
        drawScene();
        generates.codeLines('parent1', 'main-code-container',numberOfLines);
        generates.codeLines('parent2', 'main-code-container',4);
        makeDroppable();

    }
    level1();
    makeDroppable();
}
