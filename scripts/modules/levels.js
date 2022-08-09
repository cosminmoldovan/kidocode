import * as generates from './generate.js';
import * as draw from './draw.js';
export function level1() {
    switch(lv){
        case 1:
            grid = [
                [0, 1, 0, 1, 0, 0],
                [1, 1, 0, 0, 1, 0],
                [0, 0, 5, 0, 0, 0],
                [0, 1, 0, 0, 0, 0],
                [0, 0, 2, 0, 0, 1],
                [0, 0, 1, 0, 1, 1]
            ];
            getGrid(lv);
            pokeUrl = "../images/pokemons/pikachu.svg";
            mainLines = 4;
            procLines = 2
    }

    draw.drawScene(context, grid, pokeUrl);
    generates.codeLines('main-panel', 'main-code-container',numberOfLines);
    generates.codeLines('procedure-panel', 'procedure-code-container',2);
}
