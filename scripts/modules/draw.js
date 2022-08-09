export function drawImg(context, url, x, y) {
    var img = new Image();
    img.addEventListener('load', function() {
        context.drawImage(img, x, y);
    }, false);
    img.src = url;
}
export function drawGrid(context, grid, pokeUrl) {
    const xUnit = 76;
    const yUnit = 80;
    const padding = 4;
    const nrRows= grid.length;
    const nrColumns = grid[0].length;
    for (let r = 0; r < nrRows; r++) {
        for (let c = 0; c < nrColumns; c++) {
            let gridElement = grid[r][c];
            switch (gridElement) {
                case 0:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    break;
                case 1:
                    drawImg(context, "../images/wall.svg", c * xUnit, r * yUnit);
                    break;
                case 2:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    drawImg(context, pokeUrl, c * xUnit + padding, r * yUnit + padding);
                    break;
                case 3:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    drawImg(context, "../images/nav-arrow-forward.svg", c * xUnit + padding, r * yUnit + padding);
                    break;
                case 4:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    drawImg(context, "../images/nav-arrow-right.svg", c * xUnit + padding, r * yUnit + padding);
                    break;
                case 5:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    drawImg(context, "../images/nav-arrow-backward.svg", c * xUnit + padding, r * yUnit + padding);
                    break;
                case 6:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    drawImg(context, "../images/nav-arrow-left.svg", c * xUnit + padding, r * yUnit + padding);
                    break;
                case 7:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    drawImg(context, pokeUrl, c * xUnit + padding, r * yUnit + padding);
                    drawImg(context, "../images/nav-arrow-forward.svg", c * xUnit + padding, r * yUnit + padding);
                    break;
                case 8:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    drawImg(context, pokeUrl, c * xUnit + padding, r * yUnit + padding);
                    drawImg(context, "../images/nav-arrow-right.svg", c * xUnit + padding, r * yUnit + padding);
                    break;
                case 9:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    drawImg(context, pokeUrl, c * xUnit + padding, r * yUnit + padding);
                    drawImg(context, "../images/nav-arrow-backward.svg", c * xUnit + padding, r * yUnit + padding);
                    break;
                case 10:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    drawImg(context, pokeUrl, c * xUnit + padding, r * yUnit + padding);
                    drawImg(context, "../images/nav-arrow-left.svg", c * xUnit + padding, r * yUnit + padding);
                    break;
                case 11:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
                    drawImg(context, "../images/big-pokeball.svg", c * xUnit + padding+4, r * yUnit + padding+4);
                    break;
                default:
                    drawImg(context, "../images/tile.svg", c * xUnit, r * yUnit);
            }
        }
    }
}