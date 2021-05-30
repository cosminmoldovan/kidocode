import { square, createMatrix } from './modules/functions.js';
import { makeDroppable } from './modules/drag-and-drop.js';
import * as generates from './modules/generate.js';
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

    // GLOBAL COLORS
    const gray50 = "#ffffff";
    const gray75 = "#fafafa";


    // CANVAS DIMENSIONS
    var canvasWidth = 456;
    var canvasHeight = 480;

    const xUnit = 76;
    const yUnit = 80;
    const padding = 4;
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
    function drawGrid() {
        // console.table(grid);
        // loop the outer array
        // r for row, c for column
        for (let r = 0; r < grid.length; r++) {
            // get the size of the inner array
            var innerArrayLength = grid[r].length;
            // loop the inner array
            for (let c = 0; c < innerArrayLength; c++) {
                let gridElement = grid[r][c];
                switch (gridElement) {
                    case 0:
                        drawImage("../img/tile.svg", c * xUnit, r * yUnit);
                        break;
                    case 1:
                        drawImage("../img/wall.svg", c * xUnit, r * yUnit);
                        break;
                    case 2:
                        drawImage("../img/tile.svg", c * xUnit, r * yUnit);
                        drawImage(pokeUrl, c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 3:
                        drawImage("../img/tile.svg", c * xUnit, r * yUnit);
                        drawImage("../img/nav-arrow.svg", c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 4:
                        drawImage("../img/tile.svg", c * xUnit, r * yUnit);
                        drawImage(pokeUrl, c * xUnit + padding, r * yUnit + padding);
                        drawImage("../img/nav-arrow.svg", c * xUnit + padding, r * yUnit + padding);
                        break;
                    default:
                        drawImage("../img/tile.svg", c * xUnit, r * yUnit);
                }
            }
        }
    }
    function drawImage(url, x, y) {
        // Create an image object. This is not attached to the DOM and is not part of the page.
        var image = new Image();
        // When the image has loaded, draw it to the canvas
        image.onload = function () {
            // draw image...
            context.drawImage(image, x, y);
        }

        // Now set the source of the image that we want to load
        image.src = url;
    }
    function drawScene() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGrid();
    }

    //#endregion

    //#region ACTION BUTTONS

    const runBtn = document.getElementById('run');
    runBtn.addEventListener('click', runMainFunction);

    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', level2);

    //#endregion

    //#region INSTRUCTIONS

    function forward() {
        console.log('execute forward');
        // let arrowX;
        // let arrowY;
        for (let r = 0; r < grid.length; r++) {
            var innerArrayLength = grid[r].length;
            for (let c = 0; c < innerArrayLength; c++) {
                if (grid[r][c] == 3) {
                    if (grid[r - 1][c] == 0) {
                        grid[r][c] = 0;
                        grid[r - 1][c] = 3;
                    }
                    else if (grid[r - 1][c] == 2) {
                        grid[r][c] = 0;
                        grid[r - 1][c] = 4;
                        console.log('esti pe poke');
                    }
                    else {
                        window.alert('zid');
                    }

                }
                else if (grid[r][c] == 4) {
                    if (grid[r - 1][c] == 0) {
                        grid[r][c] = 2;
                        grid[r - 1][c] = 3;
                        console.log('deasupra de poke');
                    }
                    else {
                        console.log('zidescu');
                    }
                }
            }
        }
        drawGrid();

    }

    function left() {
        console.log('execute left');
        for (let r = 0; r < grid.length; r++) {
            var innerArrayLength = grid[r].length;
            for (let c = 0; c < innerArrayLength; c++) {
                if (grid[r][c] == 3) {
                    if (grid[r][c - 1] == 0) {
                        grid[r][c] = 0;
                        grid[r][c - 1] = 3;
                    }
                    else if (grid[r][c - 1] == 2) {
                        grid[r][c] = 0;
                        grid[r][c - 1] = 4;
                        console.log('esti pe poke');
                    }
                    else {
                        window.alert('zid');
                    }

                }
                else if (grid[r][c] == 4) {
                    if (grid[r][c - 1] == 0) {
                        grid[r][c] = 2;
                        grid[r][c - 1] = 3;
                        console.log('deasupra de poke');
                    }
                    else {
                        console.log('zidescu');
                    }
                }
            }
        }
        drawGrid();

    }

    function collect() {
        let ok = 0;
        for (let r = 0; r < grid.length; r++) {
            var innerArrayLength = grid[r].length;
            for (let c = 0; c < innerArrayLength; c++) {
                if (grid[r][c] == 4) {
                    grid[r][c] = 3;
                    ok = 1;
                }
            }
        }
        if (ok == 1) {
            console.log('pokemon colectat');
        }
        else {
            console.log('mai incearca');
        }

        drawGrid();

    }
    //#endregion

    //#region EVENT HANDLING

    function reset() {
        console.log('reset');
    }

    function executeInstruction(instruction) {
        switch (instruction) {
            case 'forward':
                forward();
                break;
            // case 'down':
            //     down();
            //     break;
            case 'left':
                left();
                break;
            // case 'proc':
            //     right();
            //     break;
            case 'catch':
                collect();
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
        pokeUrl = "../img/pikachu.svg";
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
        pokeUrl = "../img/rattata.svg";
        const numberOfLines = 7;
        drawScene();
        generates.codeLines('parent1', 'main-code-container',numberOfLines);
        generates.codeLines('parent2', 'main-code-container',4);
        makeDroppable();

    }
    level1();
    makeDroppable();
}
