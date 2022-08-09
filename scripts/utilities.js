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
function switchCodePanel(e, panelId) {
    let panels, tablinks;
    // Get all elements with class="code-panel" and hide them
    panels = document.getElementsByClassName("code-panel");
    for (let i = 0; i < panels.length; i++) {
        panels[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "link-active"
    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" link-active", "");
    }
    // Show the current panel, and add an "link-active" class to the button that opened the tab
    document.getElementById(panelId).style.display = "flex";
    e.currentTarget.className += " link-active";
}