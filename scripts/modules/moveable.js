export function makeMoveable(){
    
  var dragElement = null;
  
  function handleDragStart(e) {
    dragElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move'; 
    return false;
  }

  function handleDragEnter(e) {
  }

  function handleDragLeave(e) {
  }

  function handleDrop(e) {
    if (dragElement != this) {
      dragElement.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    
    return false;
  }
  function handleDragEnd(e) {
  }
  
  
  let items = document.querySelectorAll('.code-zone .code-line');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
}