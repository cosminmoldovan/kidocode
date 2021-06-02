export function square(x) {
    return x * x;
}
export function createMatrix(numRows, numColumns) {
    let array = new Array(numRows);
    for (let i = 0; i < numColumns; i++) {
        array[i] = new Array(numColumns);
    }

    return array;
}