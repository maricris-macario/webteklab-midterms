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

	classHourList = document.createElement("ul");
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
						varLi = document.createElement("li");
						textNodeLi = document.createTextNode(hourVar);
                        btnLi = document.createElement("button");
                        btnLi.setAttribute("value", hourVar);
						btnLi.appendChild(textNodeLi);
                        varLi.appendChild(btnLi);
						classHourList.appendChild(varLi);
						btnLi.addEventListener('click', showStudents);
					}
				}
			}
		}
	}
    var existingHourList = document.getElementById("classhourlist");
	if(existingHourList){
	    selectionBox.replaceChild(classHourList, existingHourList);
    }else{
		selectionBox.appendChild(classHourList);
	}
} 

function showStudents(){
    selectwhat = document.getElementById("selectwhat");
    selectwhat.innerHTML = "";

    classtable = document.getElementById("studentlist");
    if(classtable){
        selectionBox.removeChild(studentlist);
    }

	seletionBox = document.getElementById("selectionbox");

    selection = document.getElementById("classcodelist");
    classlist = document.getElementById("classlist");
    selectedClasscode = selection.value;
	selectedClassday = classlist.value;
    selectedClasshour = this.value;

    studentList = document.createElement("table");
	studentList.setAttribute("id", "studentlist");

    varRow = document.createElement("tr");

    varHeading1 = document.createElement("th");
    varHeadingText1 = document.createTextNode("idno");
    varHeading1.appendChild(varHeadingText1);
    varRow.appendChild(varHeading1);

    varHeading2 = document.createElement("th");
    varHeadingText2 = document.createTextNode("name");
    varHeading2.appendChild(varHeadingText2);
    varRow.appendChild(varHeading2);

    varHeading3 = document.createElement("th");
    varHeadingText3 = document.createTextNode("demerit");
    varHeading3.appendChild(varHeadingText3);
    varRow.appendChild(varHeading3);

    varHeading4 = document.createElement("th");
    varHeadingText4 = document.createTextNode("absent");
    varHeading4.appendChild(varHeadingText4);
    varRow.appendChild(varHeading4);

    varHeading5 = document.createElement("th");
    varHeadingText5 = document.createTextNode("report");
    varHeading5.appendChild(varHeadingText5);
    varRow.appendChild(varHeading5);

    studentList.appendChild(varRow);

    for(x=0; x<classes.length; x++){
        if(selectedClasscode == classes[x].classcode){
            for(y=0; y<classes[x].classdays.length; y++){
                if(selectedClassday == classes[x].classdays[y].classday){
                    for(z=0; z<classes[x].classdays[y].classhours.length; z++){
                        if(selectedClasshour == classes[x].classdays[y].classhours[z].classhour){
                            for(a=0; a<classes[x].classdays[y].classhours[z].students.length; a++){
                                
                                idno = classes[x].classdays[y].classhours[z].students[a].idno;
                                name = classes[x].classdays[y].classhours[z].students[a].name;
                                demerit = classes[x].classdays[y].classhours[z].students[a].demerit;
                                absent = classes[x].classdays[y].classhours[z].students[a].absent;
                                report = classes[x].classdays[y].classhours[z].students[a].report;
                                
                                varRow = document.createElement("tr");
                                
                                varTd = document.createElement("td");
                                varTdText = document.createTextNode(idno);
                                varTd.appendChild(varTdText);
                                varRow.appendChild(varTd);

                                varTd = document.createElement("td");
                                varTdText = document.createTextNode(name);
                                varTd.appendChild(varTdText);
                                varRow.appendChild(varTd);

                                //demerit dropdown list
                                varTd = document.createElement("td");
                                varTdText = document.createTextNode(demerit);
                                selectDemerit = document.createElement("select");
                                selectDemerit.setAttribute("id", "selectdemerit");

                                optionDefault = document.createElement("option");
                                optionDefaultTxt =  document.createTextNode("---");
                                optionDefault.appendChild(optionDefaultTxt);
                                optionDefault.selected = true;

                                optionDemerit = document.createElement("option");
                                optionDemeritTxt =  document.createTextNode("late");
                                optionDemerit.setAttribute("value", "late");
                                optionDemerit.appendChild(optionDemeritTxt);

                                optionOthers = document.createElement("option");
                                optionOthersTxt =  document.createTextNode("others");
                                optionOthers.setAttribute("value", "others");
                                optionOthers.appendChild(optionOthersTxt); 

                                selectDemerit.appendChild(optionDefault);
                                selectDemerit.appendChild(optionDemerit);
                                selectDemerit.appendChild(optionOthers);
                                varTd.appendChild(selectDemerit);


                                varTd.appendChild(varTdText);
                                varRow.appendChild(varTd);

                                varTd = document.createElement("td");
                                varTdText = document.createTextNode(absent);
                                absentBox = document.createElement("input");
                                absentBox.setAttribute("type", "checkbox");
                                varTd.appendChild(absentBox);
                                varRow.appendChild(varTd);

                                varTd = document.createElement("td");
                                varTdText = document.createTextNode(report);
                                varTd.appendChild(varTdText);
                                varRow.appendChild(varTd);

                                studentList.appendChild(varRow);
                            }
                        }
                    }
                }
            }
        }
    }

    var existingStudentList = document.getElementById("studentlist");
	if(existingStudentList){
	    selectionBox.replaceChild(studentList, existingStudentList);
    }else{
		selectionBox.appendChild(studentList);
	}
}



// import textfile as object.. to console for now..
/**
txt format
classcode
adviser
>day
/hr
idno; name
 */
window.onload = function() {
    var reader = document.getElementById("readtextfile");
    reader.addEventListener('change', readClassesFile);
    function readClassesFile() {
        console.clear();
        var classesReader = new FileReader();
        classesReader.onload = function(){

            var splitByLine = this.result.split("\n");

            var splitByDays = this.result.split(">");

            var splitByHour = [];
            for(x=0; x<splitByDays.length; x++){
                splitByHour.push(splitByDays[x].split("/"));
            }


            var classDays = []; 
            for(x=1; x<splitByHour.length; x++){
                var classHours = [];
                var chrByLn = [];

                //1: get classhour lines
                for(y=1; y<splitByHour[x].length; y++){  
                    chrByLn.push(splitByHour[x][y].trim());
                }

                //2: get classhours from classhour lines
                
                for(z=0; z<chrByLn.length; z++){
                    studentByLn = [];
                    chrByLnHr = chrByLn[z].split("\n");
                    for(a=1; a<chrByLn.length; a++){
                        if(chrByLnHr[a] != "" && typeof chrByLnHr[a] !== "undefined"){    
                            //studentByLn.push(chrByLnHr[x].trim());
                            studentLn = chrByLnHr[a].split(";");
                            studentObj = {
                                idno: studentLn[0],
                                name: studentLn[1],
                                demerit: "",
                                absent: "",
                                report: "" 
                            }
                            studentByLn.push(studentObj);
                        }
                    }
                    
                    classHrObj = {
                        classhour: chrByLnHr[0],
                        students: studentByLn
                    }
                    classHours.push(classHrObj);
                }

                classDays.push({
                    classday: splitByHour[x][0].trim(),
                    classhours: classHours
                });
            }
            

            varClass = {
                classcode: splitByLine[0].trim(),
                adviser: splitByLine[1].trim(),
                classdays: classDays
            }

            console.log(varClass);
            
        }
        classesReader.readAsText(this.files[0]);
    };
}