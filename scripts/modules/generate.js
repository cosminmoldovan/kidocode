function generateNumberList(parentId,numberOfLines) {
    let parent = document.getElementById(parentId);
    let numberList = document.createElement('ul');
    numberList.id='number-list';
    numberList.classList.add('list-number');
    for (let i = 1; i <= numberOfLines; ++i) {
        let listItem = document.createElement('li');
        listItem.innerHTML = i;
        numberList.appendChild(listItem);
    }
    parent.appendChild(numberList);
}
function emptyContainer(parentId){
    let container = document.getElementById(parentId);
    while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
}
export function codeLines(parentId,functuionId,numberOfLines) {
    emptyContainer(parentId);
    let parent = document.getElementById(parentId);
    let functionContainer = document.createElement('div');
    functionContainer.id=functuionId;
    functionContainer.classList.add('code-zone');
    for (let i = 1; i <= numberOfLines; ++i) {
        let codeLine = document.createElement('div');
        codeLine.classList.add('code-line');
        // codeLine.draggable = 'true';

        let lineContent = document.createElement('div');
        lineContent.classList.add('line-content');
        lineContent.classList.add('droppable');

        let deleteLine = document.createElement('div');
        deleteLine.classList.add('delete-line');
        deleteLine.innerHTML = 'x';
        deleteLine.addEventListener("click", function () {
            let previousSibling = this.previousElementSibling;
            previousSibling.removeChild(previousSibling.childNodes[0]);
            previousSibling.classList.add('droppable');
        });

        codeLine.appendChild(lineContent);
        codeLine.appendChild(deleteLine);
        functionContainer.appendChild(codeLine);
       
    }
    generateNumberList(parentId,numberOfLines);
    parent.appendChild(functionContainer);
}