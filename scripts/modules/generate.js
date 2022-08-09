function generateNumberList(panelId,numberOfLines) {
    let panel = document.getElementById(panelId);
    let numberList = document.createElement('ul');
    numberList.classList.add('number-list');
    for (let i = 1; i <= numberOfLines; ++i) {
        let listItem = document.createElement('li');
        listItem.innerHTML = i;
        numberList.appendChild(listItem);
    }
    panel.appendChild(numberList);
}
function emptyContainer(containerId){
    let container = document.getElementById(containerId);
    while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
}
function lines(panelId,functuionId,numberOfLines) {
    emptyContainer(panelId);
    let panel = document.getElementById(panelId);
    let functionContainer = document.createElement('div');
    functionContainer.id=functuionId;
    functionContainer.classList.add('code-zone');
    for (let i = 1; i <= numberOfLines; ++i) {
        let codeLine = document.createElement('div');
        codeLine.classList.add('code-line');
        let lineContent = document.createElement('div');
        lineContent.classList.add('line-content');
        lineContent.classList.add('droppable');

        let deleteLine = document.createElement('div');
        deleteLine.classList.add('delete-line');
        deleteLine.innerHTML = 'x';
        deleteLine.addEventListener("click", function () {
            // let previousSibling = this.previousElementSibling;
            // previousSibling.removeChild(previousSibling.childNodes[0]);
            let previousSibling = this.previousElementSibling;
            previousSibling.classList.add('droppable');
            previousSibling.innerHTML='';
        });

        codeLine.appendChild(lineContent);
        codeLine.appendChild(deleteLine);
        functionContainer.appendChild(codeLine);
       
    }
    generateNumberList(panelId,numberOfLines);
    panel.appendChild(functionContainer);
}
export function codeLines(mainLines, procLines){
    lines('main-panel','main-code-container',mainLines);
    lines('procedure-panel','procedure-code-container',procLines);
}