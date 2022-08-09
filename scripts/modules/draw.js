var imgs = [];
var imgUrls = [
"./images/tile.svg",
"./images/wall.svg",
"./images/nav-arrow-forward.svg",
"./images/nav-arrow-right.svg",
"./images/nav-arrow-backward.svg",
"./images/nav-arrow-left.svg",
"./images/big-pokeball.svg",
];
for (let i=0;i<imgUrls.length;i++) {
    imgs.push(new Image());
    imgs[i].src = imgUrls[i]
}
const pokeImg = new Image();
export function drawGrid(context, grid, pokeUrl) {
    pokeImg.src = pokeUrl;
    pokeImg.addEventListener("load", function(){
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
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        break;
                    case 1:
                        context.drawImage(imgs[1], c * xUnit, r * yUnit);
                        break;
                    case 2:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        context.drawImage(pokeImg, c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 3:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        context.drawImage(imgs[2], c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 4:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        context.drawImage(imgs[3], c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 5:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        context.drawImage(imgs[4], c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 6:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        context.drawImage(imgs[5], c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 7:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        context.drawImage(pokeImg, c * xUnit + padding, r * yUnit + padding);
                        context.drawImage(imgs[2], c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 8:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        context.drawImage(pokeImg, c * xUnit + padding, r * yUnit + padding);
                        context.drawImage(imgs[3], c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 9:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        context.drawImage(pokeImg, c * xUnit + padding, r * yUnit + padding);
                        context.drawImage(imgs[4], c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 10:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        context.drawImage(pokeImg, c * xUnit + padding, r * yUnit + padding);
                        context.drawImage(imgs[5], c * xUnit + padding, r * yUnit + padding);
                        break;
                    case 11:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                        context.drawImage(imgs[6], c * xUnit + padding+4, r * yUnit + padding+4);
                        break;
                    default:
                        context.drawImage(imgs[0], c * xUnit, r * yUnit);
                }
            }
        }
    });
   
}