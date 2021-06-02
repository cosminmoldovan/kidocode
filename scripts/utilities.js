function increaseValue(item) {
    let value = Number(item.innerHTML);
    if (value < 5) {
        value++;
        item.innerHTML = value;

    }
    if (value >= 5) {
        value = 1;
        item.innerHTML = value;
    }
}
function displayMenu(elem) {
    let optmenu = elem.nextElementSibling;
    optmenu.style.display = 'flex';

}
function selectedOption(elem) {
    let optmenu = elem.parentNode;
    let sib = elem.parentNode.previousElementSibling;
    let arrow = sib.lastElementChild;
    let tvalue = sib.firstElementChild;
    tvalue.innerHTML = elem.innerHTML;
    optmenu.parentNode.dataset.instruction = elem.innerHTML;
    optmenu.style.display = 'none';
}
function switchParent(evt, idParent) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove('parent');
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(idParent).style.display = "flex";
    document.getElementById(idParent).className += " parent";
    evt.currentTarget.className += " active";
}