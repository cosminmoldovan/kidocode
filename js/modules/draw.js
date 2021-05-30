export function drawImage(context, url, x, y) {
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
                    drawImage(context, "../img/tile.svg", c * xUnit, r * yUnit);
                    break;
                case 1:
                    drawImage(context, "../img/wall.svg", c * xUnit, r * yUnit);
                    break;
                case 2:
                    drawImage(context, "../img/tile.svg", c * xUnit, r * yUnit);
                    drawImage(context, pokeUrl, c * xUnit + padding, r * yUnit + padding);
                    break;
                case 3:
                    drawImage(context, "../img/tile.svg", c * xUnit, r * yUnit);
                    drawImage(context, "../img/nav-arrow.svg", c * xUnit + padding, r * yUnit + padding);
                    break;
                case 4:
                    drawImage(context, "../img/tile.svg", c * xUnit, r * yUnit);
                    drawImage(context, pokeUrl, c * xUnit + padding, r * yUnit + padding);
                    drawImage(context, "../img/nav-arrow.svg", c * xUnit + padding, r * yUnit + padding);
                    break;
                default:
                    drawImage(context, "../img/tile.svg", c * xUnit, r * yUnit);
            }
        }
    }
}