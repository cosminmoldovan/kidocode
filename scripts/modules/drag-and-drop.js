export function makeDroppable() {
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach(function (item) {
        item.addEventListener('dragstart', dragstart_handler, false);
        // item.addEventListener('drag', drag_handler, false);
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
        ev.dataTransfer.setData("text", ev.target.dataset.instruction);
        ev.dataTransfer.effectAllowed = 'copyMove';
    }
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
        var instruction = ev.dataTransfer.getData("text");
        var draggedElement = document.querySelector("[data-instruction = " + instruction);
        var nodeCopy = draggedElement.cloneNode(true);
        if (dropZone.classList.contains('droppable')) {
            nodeCopy.classList.remove("draggable");
            nodeCopy.setAttribute('draggable', false);
            dropZone.appendChild(nodeCopy);
            dropZone.classList.remove("droppable");
            dropZone.draggable = 'true';
        } else
            console.error('codes already exist on this line');
    }
    function dragend_handler(ev) {
        console.log("dragEnd");
        ev.dataTransfer.clearData();
        document.getElementsByClassName
    }
}