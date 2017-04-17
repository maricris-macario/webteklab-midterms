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
function showClassDays() {
    selectwhat = document.getElementById("selectwhat");
    selectwhat.innerHTML = "Select a class day . . .";
    classhourlist = document.getElementById("classhourlist");
    classadviser = document.getElementById("advisername");
    classtable = document.getElementById("studentlist");
    classDaysDroplist = document.getElementById("classlist");
    if(classhourlist){
        selectionBox.removeChild(classadviser);
        selectionBox.removeChild(classhourlist);
    }
    if(classtable){
        selectionBox.removeChild(classtable);
    }
    selectionBox = document.getElementById("selectionbox");
    selectedClasscode = this.value;
    classDaysList = document.createElement("select");
    classDaysList.setAttribute("id", "classlist");
    for(x=0; x<classes.length; x++){
        if(selectedClasscode == classes[x].classcode){
            optionVar = document.createElement("option");
            optionText = document.createTextNode("--classday--");
            optionVar.setAttribute("value", "classday");
            optionVar.disabled = true;
            optionVar.selected = true;
            optionVar.appendChild(optionText);
            classDaysList.appendChild(optionVar);
            for(y=0; y<classes[x].classdays.length; y++){
                optionVar = document.createElement("option");
                var classdayString = classes[x].classdays[y].classday;
                optionText = document.createTextNode(classdayString);
                optionVar.appendChild(optionText);
                optionVar.setAttribute("value", classdayString);
                classDaysList.appendChild(optionVar);
            }
        }
    }
	var existing = document.getElementById("classlist");
	if(existing){
		selectionBox.replaceChild(classDaysList, existing);
	}else{
		selectionBox.appendChild(classDaysList);
	}
    
    classDaysList.addEventListener("change", showClassHours);
} 
function showClassHours() {
    selectwhat = document.getElementById("selectwhat");
    selectwhat.innerHTML = "Select a class hour . . .";

    classadviser = document.getElementById("advisername");
    classhourlist = document.getElementById("classhourlist");
    classtable = document.getElementById("studentlist");
    if(classhourlist || classadviser){
        selectionBox.removeChild(classadviser);
        selectionBox.removeChild(classhourlist);
    }
    if(classtable){
        selectionBox.removeChild(classtable);
    }

	selectionBox = document.getElementById("selectionbox");
	selection = document.getElementById("classcodelist");
	selectedClasscode = selection.value;
	selectedClassday = this.value;

	classHourList = document.createElement("select");
	classHourList.setAttribute("id", "classhourlist");
	for(x=0; x<classes.length; x++){
		if(selectedClasscode == classes[x].classcode){
			adviser = document.createElement("p");
            adviser.setAttribute("id", "advisername");
			adviserText = 'Adviser: ' + classes[x].adviser;
			textNodeForAdviser = document.createTextNode(adviserText);
			adviser.appendChild(textNodeForAdviser);
            var existingAdviserName = document.getElementById("advisername");
	        if(existingAdviserName){
	            selectionBox.replaceChild(adviser, existingAdviserName);
            }else{
		       selectionBox.appendChild(adviser);
	        }
			for(y=0; y<classes[x].classdays.length; y++){
				if(selectedClassday == classes[x].classdays[y].classday){
					for(z=0; z<classes[x].classdays[y].classhours.length; z++){
						hourVar = classes[x].classdays[y].classhours[z].classhour;
						varLi = document.createElement("option");
						textNodeLi = document.createTextNode(hourVar);
                        varLi.appendChild(textNodeLi);
						classHourList.appendChild(varLi);
					}
				}
			}
		}
	}
    var existingHourList = document.getElementById("classhourlist");
    classHourList.addEventListener('change', showStudents);
	if(existingHourList){
	    selectionBox.replaceChild(classHourList, existingHourList);
    }else{
		selectionBox.appendChild(classHourList);
	}
} 