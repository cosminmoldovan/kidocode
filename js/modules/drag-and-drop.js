const draggableElements = document.querySelectorAll('.draggable');
draggableElements.forEach(function (item) {
    item.addEventListener('dragstart', dragstart_handler, false);
    // item.addEventListener('drag', drag_handler, false);
    item.addEventListener('dragend', dragend_handler, false);
});


function dragstart_handler(ev) {
    console.log("dragStart");
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.effectAllowed = 'copyMove';
}


function dragend_handler(ev) {
    console.log("dragEnd");
    ev.dataTransfer.clearData();
    document.getElementsByClassName
}
export function makeDroppable(){
    const droppableElements = document.querySelectorAll('.droppable');
    droppableElements.forEach(function (item) {
        item.addEventListener('dragenter', dragenter_handler, false);
        item.addEventListener('dragover', dragover_handler, false);
        item.addEventListener('dragleave', dragleave_handler, false);
        item.addEventListener('drop', drop_handler, false);
    });
    function dragover_handler(ev) {
        console.log("dragOver");
        ev.preventDefault();
    }
    function dragenter_handler(ev) {
        console.log("dragEnter");
        if (ev.currentTarget.classList.contains('droppable')) {
            ev.currentTarget.classList.add("dashed-border");
        }
        ev.preventDefault();
    }
    function dragleave_handler(ev) {
        console.log("dragLeave");
        ev.currentTarget.classList.remove("dashed-border");
        ev.preventDefault();
    }
    function drop_handler(ev) {
        console.log("drop");
        ev.preventDefault();
        const dropZone = ev.target;
        dropZone.classList.remove("dashed-border");
        var id = ev.dataTransfer.getData("text");
        var draggedElement = document.getElementById(id);
        if (draggedElement.classList.contains('draggable') && dropZone.classList.contains('droppable')) {
            var nodeCopy = draggedElement.cloneNode(true);
            nodeCopy.id = "newId" + Date.now();
            nodeCopy.classList.remove("draggable");
            nodeCopy.setAttribute('draggable', false);
            dropZone.appendChild(nodeCopy);
            dropZone.classList.remove("droppable");
        } else
            console.error('codes already exist on this line');
    }
}