function showClasscodes() {
    selectionBox = document.getElementById("selectionbox");
    selection = document.createElement("select");
    selection.setAttribute("name", "classcode");
    selection.setAttribute("id", "classcodelist");
    optionVar = document.createElement("option");
    optionText = document.createTextNode("--classcode--");
    optionVar.appendChild(optionText);
    optionVar.setAttribute("value", "selectedClasscode");
    optionVar.disabled = true;
    optionVar.selected = true;
    selection.appendChild(optionVar);
    for(x=0; x<classes.length; x++){
        optionVar = document.createElement("option");
        var classcodeString = classes[x].classcode;
        optionText = document.createTextNode(classcodeString);
        optionVar.appendChild(optionText);
        optionVar.setAttribute("value", classcodeString);
        selection.appendChild(optionVar);
    }
    selectionBox.appendChild(selection);
    selection.addEventListener("change", showClassDays);
} 