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
    const gray50="#ffffff";
    const gray75="#fafafa";

    // CANVAS DIMENSIONS
    var canvasWidth=456;
    var canvasHeight=480;

    // CHARACTER POSITION
    let charPosX = 81;
    let charPosY = 325;

    // COIN POSITION
    let coinPosX = 81;
    let coinPosY = 85;

    // INDEX FOR INSTRUCTIONS
    let index = 0;

    //#endregion

    //#region SET CANVAS

    let canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let ctx = canvas.getContext("2d");

    //#endregion

    //#region DRAW FUNCTIONS

    function drawRect(x,y){

        var rectX = x;
        var rectY = y;
        var rectWidth = 70;
        var rectHeight = 70;
        var lineWidth = 1;

        ctx.strokeStyle = "#C1C1C1";
        ctx.fillStyle = "#FFFFFF";
        ctx.rect(rectX, rectY, rectWidth, rectHeight);
        ctx.fill();
        ctx.lineWidth = lineWidth;
        ctx.stroke();

    }

    function drawGrid(){
        for(j=1; j<=480;j=j+80){
            for(i=1; i<=456;i=i+76){
                // drawRect(i,j);
                // ctx.drawImage('./img/tile.svg', i, j);
                const image = document.getElementById('tile');
                ctx.drawImage(image, i,j);
            }
        }
    }

    function drawBitcoin(){
        const image = document.getElementById('bitcoin');
        ctx.drawImage(image, coinPosX,coinPosY);
    }
    
    function drawRobot(){
        const image = document.getElementById('robot');
        ctx.drawImage(image, charPosX,charPosY);

        // ctx.font = "42px Arial";
        // var emoji="🐷";
        // ctx.fillText(emoji,charPosX, charPosY);
    }

    function drawScene(){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGrid(); 
        drawBitcoin();
        drawRobot();

        if((charPosX>=coinPosX-16 && charPosX<=coinPosX+48) && (charPosY>=coinPosY-16 && charPosY<=coinPosY+48)){
            console.log('SAME POSITION');
        }
    }

    //#endregion

    //#region ACTION BUTTONS

    const runBtn = document.getElementById('run');
    runBtn.addEventListener('click',executeInstructions);

    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click',reset);

    //#endregion

    //#region INSTRUCTIONS

    function up(){
        charPosY=charPosY-64;
        drawScene();
            
    }
    
    function down(){
        charPosY=charPosY+64;
        drawScene();

    }

    function left(){
        charPosX=charPosX-64;
        drawScene();

    }

    function right(){
        charPosX=charPosX+64;
        drawScene();

    }

    function collect(){

    }

    var jdex=0;
    function procedure(){
        const parentId = document.getElementById('parent2');
        const childCount = parentId.childElementCount;
        const children = parentId.children;
        switchInstruction(children[jdex].id);
        console.log('jdex: '+jdex+' id: '+children[jdex].id);

        jdex++;
        if(jdex<childCount){
            setTimeout(procedure, 1000);
        }
        else{
            jdex = 0;
        }
    }

    //#endregion

    //#region EVENT HANDLING

    function reset(){
        const parent1 = document.getElementById('parent1');
        while (parent1.firstChild) {
            parent1.removeChild(parent1.lastChild);
        }
        const parent2 = document.getElementById('parent2');
        while (parent2.firstChild) {
            parent2.removeChild(parent2.lastChild);
        }
        charPosX = 6;
        charPosY = 256;
        index=0;
        jdex=0;
        drawScene();
        
    }

    function switchInstruction(instruction){
        switch(instruction){
            case 'up':
                up();
                break;
            case 'down':
                down();
                break;
            case 'left':
                left();
                break;
            case 'right':
                right();
                break;
            case 'collect':
                collect();
                break;
            case 'procedure':
                procedure();
                break;
        }
    }

    function executeInstructions(){
        console.log('execution start');
        const parentId = document.getElementById('parent1');
        const childCount = parentId.childElementCount;
        // Get a collection of the 'parent' element's children:
        const children = parentId.children;
        switchInstruction(children[index].id);
        index++;
        if(index<childCount){
            // take a break after executing an instruction
            setTimeout(executeInstructions, 1000);
        }
    }

    //#endregion
    function level1(){
        
    // CHARACTER POSITION
    charPosX = 16+128;
    charPosY = 16+128;

    // COIN POSITION
    coinPosX = 16+64;
    coinPosY = 16+64;

    }
 
    drawScene();
}
