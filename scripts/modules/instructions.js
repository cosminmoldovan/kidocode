export function forward(grid){
    console.log('execute forward');
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
}
export function turnLeft(grid){
    console.log('execute left');
    for (let r = 0; r < grid.length; r++) {
        var innerArrayLength = grid[r].length;
        for (let c = 0; c < innerArrayLength; c++) {
            let position = grid[r][c];
            switch(position) {
                case 3:
                    grid[r][c] = 6;
                    break;
                case 6:
                     grid[r][c] = 5;
                    break;
                case 5:
                    grid[r][c] = 4;
                    break;
                case 4:
                    grid[r][c] = 3;
                    break;

            }
        }
    }
}
export function turnRight(grid){
    console.log('execute right');
    for (let r = 0; r < grid.length; r++) {
        var innerArrayLength = grid[r].length;
        for (let c = 0; c < innerArrayLength; c++) {
            let position = grid[r][c];
            switch(position) {
                case 3:
                    grid[r][c] = 4;
                    break;
                case 4:
                     grid[r][c] = 5;
                    break;
                case 5:
                    grid[r][c] = 6;
                    break;
                case 6:
                    grid[r][c] = 3;
                    break;

            }
        }
    }
}
export function collect(grid){
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
}