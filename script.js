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

function startRequest(){
    var classesRequest = new XMLHttpRequest();
    classesRequest.open('GET', 'http://192.168.1.15/classes.json');
    classesRequest.onload = function(){
        classesResponseText = classesRequest.responseText;
        showClasscodes(classesResponseText);
    };
    classesRequest.send();
}
function showClasscodes(classesResponseText) {
    localStorage.setItem("classes", classesResponseText);
    varClasses = localStorage.getItem("classes");
    classes = JSON.parse(varClasses);

    console.table(classes);

    selectionBox = document.getElementById("selectionbox");

    startbtn = document.getElementById("startbtn");
    if(startbtn){
        selectionBox.removeChild(startbtn);
    }
    

    box = document.getElementById("box");
    uploadbtn = document.getElementById("readtextfile");
    if(uploadbtn){
        box.removeChild(uploadbtn);
    }
    uploadwhat = document.getElementById("uploadwhat");
    if(uploadwhat){
        box.removeChild(uploadwhat);
    }

    selectwhat = document.getElementById("selectwhat");
    selectwhat.innerHTML = "Select a classcode . . .";

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
