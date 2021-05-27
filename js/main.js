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

   //#region PROGRESS INDICATOR
    const progress = document.getElementById("progress");
    const circles = document.querySelectorAll(".circle");

    let currentValue = 1;

    function update() {
        circles.forEach((circle, index) => {
            if (index < currentValue) {
                circle.classList.add("active");
            }
            else {
                circle.classList.remove("active");
            }
        });

        const actives = document.querySelectorAll(".active");
        progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';

        if (currentValue === circles.length) {
            next.disabled = true;
        }
        else if (currentValue <= 1) {
            prev.disabled = true;
        }
        else {
            next.disabled = false;
            prev.disabled = false;
        }
    }
    //#endregion

    //#region DRAW FUNCTIONS

    function drawRect(x, y) {

        var rectX = x;
        var rectY = y;
        var rectWidth = 70;
        var rectHeight = 70;
        var lineWidth = 1;

        context.strokeStyle = "#C1C1C1";
        context.fillStyle = "#FFFFFF";
        context.rect(rectX, rectY, rectWidth, rectHeight);
        context.fill();
        context.lineWidth = lineWidth;
        context.stroke();

    }
    function createMatrix(numRows, numColumns) {
        let array = new Array(numRows);
        for (let i = 0; i < numColumns; i++) {
            array[i] = new Array(numColumns);
        }

        return array;
    }
    function drawGrid() {
        console.table(grid);
        // loop the outer array
        // r for row, c for column
        for (let r = 0; r < grid.length; r++) {
            // get the size of the inner array
            var innerArrayLength = grid[r].length;
            // loop the inner array
            for (let c = 0; c < innerArrayLength; c++) {
                let item = grid[r][c];
                switch (item) {
                    case 1:
                        drawImage("../img/wall.svg", c * xUnit, r * yUnit);
                        break;
                    case 2:
                        drawImage("../img/tile.svg", c * xUnit, r * yUnit);
                        drawImage(pokeUrl, c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 3:
                        drawImage("../img/tile.svg", c * xUnit, r * yUnit);
                        drawImage("../img/up-arrow.svg", c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 4:
                        drawImage("../img/tile.svg", c * xUnit, r * yUnit);
                        drawImage(pokeUrl, c * xUnit + padding, r * yUnit + padding);
                        drawImage("../img/up-arrow.svg", c * xUnit + padding, r * yUnit + padding);
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
    runBtn.addEventListener('click', executeInstructions);

    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', reset);

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

    var jdex = 0;
    function procedure() {
        const parentId = document.getElementById('parent2');
        const childCount = parentId.childElementCount;
        const children = parentId.children;
        switchInstruction(children[jdex].id);
        jdex++;
        if (jdex < childCount) {
            setTimeout(procedure, 1000);
        }
        else {
            jdex = 0;
        }
    }

    //#endregion

    //#region EVENT HANDLING

    function reset() {
        console.log('reset');
    }

    function switchInstruction(instruction) {
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
    function executeInstructions() {
        console.log('execution number = ' + idex);
        const parentId = document.getElementById('main-area');
        const childCount = parentId.childElementCount;
        let command = parentId.children[idex].children[0].children[0].dataset.command;
        console.log(command);
        switchInstruction(command);

        idex++;
        if (idex < childCount) {
            setTimeout(executeInstructions, 1000);
        }
        else {
            idex = 0;
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
        drawScene();

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
        drawScene();

    }
    level1();
}
