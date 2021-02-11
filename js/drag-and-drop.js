const draggableElements = document.querySelectorAll('.draggable');
draggableElements.forEach(function (item) {
    item.addEventListener('dragstart', dragstart_handler, false);
    //   item.addEventListener('drag', drag_handler, false);
    item.addEventListener('dragend', dragend_handler, false);
});
const droppableElements = document.querySelectorAll('.droppable');
droppableElements.forEach(function (item) {
    item.addEventListener('dragenter', dragenter_handler, false);
    item.addEventListener('dragover', dragover_handler, false);
    item.addEventListener('dragleave', dragleave_handler, false);
    item.addEventListener('drop', drop_handler, false);
});

function dragstart_handler(ev) {
    console.log("dragStart");
    // Change the source element's background color to signify drag has started
    //  ev.currentTarget.style.border = "dashed";
    // Add the id of the drag source element to the drag data payload so
    // it is available when the drop event is fired
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("ai luat elementul cu id-ul: "+ev.target.id);
    // Tell the browser both copy and move are possible
    ev.effectAllowed = "copyMove";
}

function dragover_handler(ev) {
    console.log("dragOver");
    // Change the target element's border to signify a drag over event
    // has occurred
    //ev.currentTarget.style.border = "1px dashed black";
    ev.preventDefault();
}
function dragenter_handler(ev) {
    console.log("dragEnter");
    // Change the target element's border to signify a drag over event
    // has occurred
    ev.currentTarget.style.border = "2px dashed #E1DFDD";
    ev.preventDefault();
}
function dragleave_handler(ev) {
    console.log("dragLeave");
    // Change the target element's border to signify a drag over event
    // has occurred
    ev.currentTarget.style.border = "";
    ev.preventDefault();
}
function drop_handler(ev) {
    console.log("Drop");
    ev.preventDefault();
    const dropZone = ev.target;
    dropZone.style.border = "";
    // Get the id of drag source element (that was added to the drag data
    // payload by the dragstart event handler)
    var id = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(id);
    // var chosen;
    // const draggableElements = document.querySelectorAll('.draggable');
    // for (element of draggableElements) {
    //     if(element.dataset.command==id){
    //         chosen=element;
    //     }
    //   }
    if (draggedElement.classList.contains('draggable') && dropZone.classList.contains('droppable')) {
        if (dropZone.childElementCount < 1) {
            var nodeCopy = draggedElement.cloneNode(true);
            nodeCopy.id = "newId" + Date.now();
            nodeCopy.classList.remove("draggable");
            nodeCopy.setAttribute('draggable', false);
            dropZone.appendChild(nodeCopy);
            ev.target.classList.remove("droppable");
        }
        else
            console.error('codes already exist on this line');

    }
}
function dragend_handler(ev) {
    console.log("dragEnd");
    // Restore source's border
    // Remove all of the drag data
    ev.dataTransfer.clearData();
}