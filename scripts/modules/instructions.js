
const NORTH = 3;
const EAST = 4;
const SOUTH = 5
const WEST = 6;

const NPOKE = 7;
const EPOKE = 8;
const SPOKE = 9;
const WPOKE = 10;

export function printMsg(tip, msg) {
    let msgBox = document.createElement('div');
    msgBox.classList.add('msg-box');
    let msgRemover = document.createElement('div');
    msgRemover.classList.add('msg-remover');
    msgRemover.innerHTML = '&times;';
    switch (tip) {
        case 'error':
            msg = 'Whoops. ' + msg;
            msgBox.style.backgroundColor = '#FF6A75';
            msgRemover.style.backgroundColor = '#FF4F5E';
            break;
        case 'warning':
            msg = 'Sorry. ' + msg;
            msgBox.style.backgroundColor = '#FFEA80';
            msgRemover.style.backgroundColor = '#FFD567';
            break;
        case 'success':
            msg = 'Great! ' + msg;
            msgBox.style.backgroundColor = '#3FE1B0';
            msgRemover.style.backgroundColor = '#2AC3A2';
            break;
        case 'info':
            msg = 'Info. ' + msg;
            msgBox.style.backgroundColor = '#0060DF';
            msgBox.style.color = '#FFF';
            msgRemover.style.backgroundColor = '#0B4CAA';
            break;
    }
    msgBox.innerHTML = msg;
    msgBox.appendChild(msgRemover);
    document.body.appendChild(msgBox);
    msgRemover.addEventListener('click', function () {
        msgBox.classList.add('msg-box-close');
    });
    setInterval(function () {
        msgBox.classList.add('msg-box-close');
    }, 5000);
    setInterval(function () {
        msgBox.remove();
    }, 6000);

}
export function forward(grid) {
    console.log('execute forward');
    const nrRows = grid.length;
    const nrColumns = grid[0].length;
    let x, y;
    let direction;
    for (let r = 0; r < nrRows; r++) {
        for (let c = 0; c < nrColumns; c++) {
            let d = grid[r][c];
            if (d == 3 || d == 5 || d == 4 || d == 6 || d == 7 || d == 8 || d == 9 || d == 10) {
                y = r;
                x = c;
                direction = d;
            }
        }
    }

    switch (direction) {
        case NORTH:
            moveArrow(grid, y, x, y-1, x, NORTH, NPOKE);
            break;
        case NPOKE:
            crossPoke(grid, y, x, y-1, x, NORTH);
            break;
        case SOUTH:
            moveArrow(grid, y, x, y+1, x, SOUTH, SPOKE);
            break;
        case SPOKE:
            crossPoke(grid, y, x, y+1, x, SOUTH);
            break;
        case EAST:
            moveArrow(grid, y, x, y, x+1, EAST, EPOKE);
            break;
        case EPOKE:
            crossPoke(grid, y, x, y, x+1, EAST);
            break;
        case WEST:
            moveArrow(grid, y, x, y, x-1, WEST, WPOKE);
            break;
        case WPOKE:
            crossPoke(grid, y, x, y, x-1, WEST);
            break;

    }

}
function checkBarrier(grid,x,y){
    const nrRows = grid.length;
    const nrColumns = grid[0].length;
     if (x < 0) {
                printMsg('error', 'You have no cell in the left.');
    }
    else if (x >= nrColumns) {
        printMsg('error', 'You have no cell in the right.');
    }
    else if (y >= nrRows) {
        printMsg('error', 'You have no cell underneath.');
    }
    else if (y < 0) {
        printMsg('error', 'You have no cell above.');
    }
    else if (grid[y][x] == 1) {
        printMsg('error', 'You have a wall in front.');
    }
}
function crossPoke(grid,r,c, y,x, dir){
    checkBarrier(grid,x,y);
    if (grid[y][x] == 0) {
        grid[r][c] = 2;
        grid[y][x] = dir;
        printMsg('warning', 'You just missed Pokémon.');
    }
}
function moveArrow(grid,r,c, y,x, dir,pokedir){
    checkBarrier(grid,x,y);
    if (grid[y][x] == 0) {
        grid[r][c] = 0;
        grid[y][x] = dir;
    }
    else if (grid[y][x] == 2) {
        grid[r][c] = 0;
        grid[y][x] = pokedir;
    }
}
export function turnLeft(grid) {
    console.log('execute left');
    for (let r = 0; r < grid.length; r++) {
        var innerArrayLength = grid[r].length;
        for (let c = 0; c < innerArrayLength; c++) {
            let position = grid[r][c];
            function turn(poz){
                grid[r][c] = poz;
            }
            switch (position) {
                case NORTH:
                    turn(WEST);
                    break;
                case NPOKE:
                    turn(WPOKE);
                    break;
                case SOUTH:
                    turn(WEST)
                    break;
                case SPOKE:
                    turn(WPOKE);
                    break;
                case EAST:
                    turn(NORTH);
                    break;
                case EPOKE:
                    turn(NPOKE);
                    break;
                case WEST:
                    turn(SOUTH);
                    break;
                case WPOKE:
                    turn(SPOKE);
                    break;
        
            }
        }
    }
}
export function turnRight(grid) {
    console.log('execute right');
    for (let r = 0; r < grid.length; r++) {
        var innerArrayLength = grid[r].length;
        for (let c = 0; c < innerArrayLength; c++) {
            let position = grid[r][c];
            function turn(poz){
                grid[r][c] = poz;
            }
            switch (position) {
                case NORTH:
                    turn(EAST);
                    break;
                case NPOKE:
                    turn(EPOKE);
                    break;
                case SOUTH:
                    turn(EAST)
                    break;
                case SPOKE:
                    turn(EPOKE);
                    break;
                case EAST:
                    turn(NORTH);
                    break;
                case EPOKE:
                    turn(NPOKE);
                    break;
                case WEST:
                    turn(NORTH);
                    break;
                case WPOKE:
                    turn(NPOKE);
                    break;
        
            }
        }
    }
}
export function collect(grid) {
    let ok = 0;
    for (let r = 0; r < grid.length; r++) {
        var innerArrayLength = grid[r].length;
        for (let c = 0; c < innerArrayLength; c++) {
            if (grid[r][c] == 7 || grid[r][c] == 8 || grid[r][c] == 9 || grid[r][c] == 10) {
                grid[r][c] = 11;
                ok = 1;
            }
        }
    }
    if (ok == 1) {
        return true;

    }
    else {
        return false;
    }
}
