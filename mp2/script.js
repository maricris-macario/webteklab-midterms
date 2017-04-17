function startRequest(){
    var classesRequest = new XMLHttpRequest();
    classesRequest.open('GET', 'http://192.168.1.15/class1.json');
    classesRequest.onload = function(){
        classesResponseText = classesRequest.responseText;
        showClasscodes(classesResponseText);
    };
    classesRequest.send();
}

var todaysReports = "";

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

    defaultClassHour = document.createElement("option");
    defaultClassHourText = document.createTextNode("--classhour--");
    defaultClassHour.appendChild(defaultClassHourText);
    defaultClassHour.selected = true;
    defaultClassHour.disabled = true;
    classHourList.appendChild(defaultClassHour);

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

function showStudents(){
    selectwhat = document.getElementById("selectwhat");
    selectwhat.innerHTML = "";

    seletionBox = document.getElementById("selectionbox");

    reportbtn = document.createElement("button");
    reportbtntxt = document.createTextNode("save");
    reportbtn.appendChild(reportbtntxt);
    reportbtn.setAttribute("id", "reportbtn");
    reportbtn.setAttribute("value", "reportbtn;"+selection.value+";"+classlist.value+";"+document.getElementById("classhourlist").value);
    reportbtn.addEventListener("click", showReport);
    existingreportbtn = document.getElementById("reportbtn");
    if(existingreportbtn){
        selectionBox.replaceChild(reportbtn, existingreportbtn);
    }else{
        selectionBox.appendChild(reportbtn);
    }

    classtable = document.getElementById("studentlist");
    if(classtable){
        selectionBox.removeChild(studentlist);
    }

	

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
            varClasscode = classes[x].classcode;
            for(y=0; y<classes[x].classdays.length; y++){
                if(selectedClassday == classes[x].classdays[y].classday){
                    varClassday = classes[x].classdays[y].classday;
                    for(z=0; z<classes[x].classdays[y].classhours.length; z++){
                        if(selectedClasshour == classes[x].classdays[y].classhours[z].classhour){
                            varClasshour = classes[x].classdays[y].classhours[z].classhour;
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
                                varTd.setAttribute("id", "tdselect"+idno);
                                selectDemerit = document.createElement("select");
                                selectDemerit.setAttribute("id", "selectdemerit"+idno);

                                optionDefault = document.createElement("option");
                                optionDefaultTxt =  document.createTextNode("---");
                                optionDefault.appendChild(optionDefaultTxt);
                                optionDefault.selected = true;

                                optionDemerit = document.createElement("option");
                                optionDemeritTxt =  document.createTextNode("late");
                                optionDemerit.setAttribute("value", "late;"+idno+";"+varClasscode+";"+varClassday+";"+varClasshour);
                                optionDemerit.appendChild(optionDemeritTxt);

                                optionOthers = document.createElement("option");
                                optionOthersTxt =  document.createTextNode("others");
                                optionOthers.setAttribute("value", "others;"+idno+";"+varClasscode+";"+varClassday+";"+varClasshour);
                                //disabled for now
                                optionOthers.disabled = true;
                                optionOthers.appendChild(optionOthersTxt); 

                                selectDemerit.appendChild(optionDefault);
                                selectDemerit.appendChild(optionDemerit);
                                selectDemerit.appendChild(optionOthers);

                                selectDemerit.addEventListener("change", setDemerit);

                                varTd.appendChild(selectDemerit);


                                varTd.appendChild(varTdText);
                                varRow.appendChild(varTd);

                                varTd = document.createElement("td");
                                varTdText = document.createTextNode(absent);
                                varTd.setAttribute("id", "tdchkbox"+idno);
                                absentBox = document.createElement("button");
                                absentBox.setAttribute("id", "absentchkbox"+idno);
                                absentBox.setAttribute("value", "absent;"+idno+";"+varClasscode+";"+varClassday+";"+varClasshour);
                                absentBox.addEventListener("click", setAbsent);
                                absentTextNode = document.createTextNode(" - ");
                                absentBox.appendChild(absentTextNode);
                                varTd.appendChild(absentBox);
                                varRow.appendChild(varTd);

                                varReportTd = document.createElement("td");
                                varReportTd.setAttribute("id", "report"+idno);
                                varReportTdText = document.createTextNode(report);
                                varReportTd.appendChild(varReportTdText);
                                varRow.appendChild(varReportTd);

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

function setDemerit(){
    demeritWho = this.value.split(";");
    if(demeritWho[0] == "late"){
        for(x=0; x<classes.length; x++){
        if(demeritWho[2] == classes[x].classcode){
            for(y=0; y<classes[x].classdays.length; y++){
                if(demeritWho[3] == classes[x].classdays[y].classday){
                    for(z=0; z<classes[x].classdays[y].classhours.length; z++){
                        if(demeritWho[4] == classes[x].classdays[y].classhours[z].classhour){
                            for(a=0; a<classes[x].classdays[y].classhours[z].students.length; a++){
                                if(demeritWho[1] == classes[x].classdays[y].classhours[z].students[a].idno){
                                console.log(classes[x].classdays[y].classhours[z].students[a].name + " is late?");
                                latepopup = document.getElementById("latepopup");
                                document.getElementById("latelabel").innerHTML = classes[x].classdays[y].classhours[z].students[a].idno + "<br><br>" + classes[x].classdays[y].classhours[z].students[a].name + "<br><br>" + " is late . . . ";

                                latemins = document.createElement("select");
                                latemins.setAttribute("id", "latemins");
                                optionNone = document.createElement("option");
                                noText = document.createTextNode("--mins--");
                                optionNone.appendChild(noText);
                                optionNone.selected = true;
                                optionNone.disabled = true;
                                latemins.appendChild(optionNone);

                                option1 = document.createElement("option");
                                optionText = document.createTextNode("5-9 mins");
                                option1.appendChild(optionText);
                                option1.setAttribute("value","5-9;"+demeritWho[1]+";"+demeritWho[2]+";"+demeritWho[3]+";"+demeritWho[4]+";"+"5");
                                latemins.appendChild(option1);

                                option2 = document.createElement("option");
                                optionText = document.createTextNode("10-14 mins");
                                option2.appendChild(optionText);
                                option2.setAttribute("value","10-14;"+demeritWho[1]+";"+demeritWho[2]+";"+demeritWho[3]+";"+demeritWho[4]+";"+"10");
                                latemins.appendChild(option2);
                                latemins.addEventListener("change", setLate);

                                existingLateList = document.getElementById("latemins");
                                if(existingLateList){
                                    latepopup.replaceChild(latemins, existingLateList);
                                }else{
                                    latepopup.appendChild(latemins);
                                }

                                latepopup.style.visibility = "visible";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    }else if(demeritWho[0] == "others"){
        console.log("demerit " + demeritWho[1] + " " + demeritWho[2] + " specify details: ");     
    }
}
today = getDateToday();
function setLate(){
    confirmParameters = this.value;
    lateConfirmation = document.getElementById("confirm");
    lateConfirmationBtn = document.createElement("button");
    lateConfirmationBtnTxt = document.createTextNode("confirm");
    lateConfirmationBtn.appendChild(lateConfirmationBtnTxt);
    lateConfirmationBtn.setAttribute("id","lateconfirmbtn");
    lateConfirmationBtn.setAttribute("value", confirmParameters);
    lateConfirmationBtn.addEventListener("click", function(){
        lateDetails = this.value.split(";");
        latepopup = document.getElementById("latepopup");

        //DOMs
        latepopup.style.visibility = "hidden";
        lateDroplist = document.getElementById("selectdemerit"+lateDetails[1]);
        lateText = document.createTextNode("-" + lateDetails[5] + " points");
        document.getElementById("tdselect"+lateDetails[1]).replaceChild(lateText, lateDroplist);
        document.getElementById("absentchkbox"+lateDetails[1]).disabled = true;
        
        reported = lateDetails[0]+" mins late";
        document.getElementById("report"+lateDetails[1]).innerHTML = reported;
        reportedDetails = reported+" : "+today+"\n";
        //MATH goes here
        for(x=0; x<classes.length; x++){
            if(lateDetails[2] == classes[x].classcode){
                for(y=0; y<classes[x].classdays.length; y++){
                    if(lateDetails[3] == classes[x].classdays[y].classday){
                        for(z=0; z<classes[x].classdays[y].classhours.length; z++){
                            if(lateDetails[4] == classes[x].classdays[y].classhours[z].classhour){
                                for(a=0; a<classes[x].classdays[y].classhours[z].students.length; a++){
                                    if(lateDetails[1] == classes[x].classdays[y].classhours[z].students[a].idno){
                                        classes[x].classdays[y].classhours[z].students[a].demerit += lateDetails[5];
                                        classes[x].classdays[y].classhours[z].students[a].report += "-" + lateDetails[5] + " points: "+reportedDetails;
                                        console.log(classes[x].classdays[y].classhours[z].students[a].name +" demerit:"+classes[x].classdays[y].classhours[z].students[a].demerit + "\n" +classes[x].classdays[y].classhours[z].students[a].report);
                                        todaysReports += classes[x].classdays[y].classhours[z].students[a].name + ": " + classes[x].classdays[y].classhours[z].students[a].report;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    lateconfirmbtn = document.getElementById("lateconfirmbtn");
    if(lateconfirmbtn){
        lateConfirmation.replaceChild(lateConfirmationBtn, lateconfirmbtn);
    }else{
        lateConfirmation.appendChild(lateConfirmationBtn);
    }
    


}

function hideLatePopup(){
    document.getElementById("latepopup").style.visibility = "hidden";
    console.log("cancelled set as late");
}

function getDateToday(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 

        today = mm+'/'+dd+'/'+yyyy;
        return today;
}

function setAbsent(){
    absentParameters = this.value.split(";");
    absentboxtd = document.getElementById("tdchkbox"+absentParameters[1]);
    console.log(absentParameters);
    if(absentParameters[0] == "absent"){
        newText = document.createTextNode("A");
        newBtn = document.createElement("button");
        newBtn.setAttribute("id","absentchkbox"+absentParameters[1]);
        
        newBtn.appendChild(newText);
        existingBtn = document.getElementById("absentchkbox"+absentParameters[1]);
        newBtn.setAttribute("value","present;"+absentParameters[1]+";"+absentParameters[2]+";"+absentParameters[3]+";"+absentParameters[4]);
        newBtn.addEventListener("click", setAbsent);
        absentboxtd.replaceChild(newBtn, existingBtn);
        document.getElementById("selectdemerit"+absentParameters[1]).disabled = true;

        reported = "+3 hrs";
        document.getElementById("report"+absentParameters[1]).innerHTML = reported;
        //some Math
        for(x=0; x<classes.length; x++){
            if(absentParameters[2] == classes[x].classcode){
                for(y=0; y<classes[x].classdays.length; y++){
                    if(absentParameters[3] == classes[x].classdays[y].classday){
                        for(z=0; z<classes[x].classdays[y].classhours.length; z++){
                            if(absentParameters[4] == classes[x].classdays[y].classhours[z].classhour){
                                for(a=0; a<classes[x].classdays[y].classhours[z].students.length; a++){
                                    if(absentParameters[1] == classes[x].classdays[y].classhours[z].students[a].idno){
                                        classes[x].classdays[y].classhours[z].students[a].absent = absentParameters[0]+"\n";
                                        classes[x].classdays[y].classhours[z].students[a].report += "absent : "+today;
                                        console.log(classes[x].classdays[y].classhours[z].students[a].name +" "+classes[x].classdays[y].classhours[z].students[a].absent +classes[x].classdays[y].classhours[z].students[a].report);
                                        todaysReports += classes[x].classdays[y].classhours[z].students[a].name + ": " + classes[x].classdays[y].classhours[z].students[a].report + "\n";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }else{
        newText = document.createTextNode("-");
        newBtn = document.createElement("button");
        newBtn.setAttribute("id","absentchkbox"+absentParameters[1]);
        
        newBtn.appendChild(newText);
        existingBtn = document.getElementById("absentchkbox"+absentParameters[1]);
        newBtn.setAttribute("value","absent;"+absentParameters[1]+";"+absentParameters[2]+";"+absentParameters[3]+";"+absentParameters[4]);
        newBtn.addEventListener("click", setAbsent);
        absentboxtd.replaceChild(newBtn, existingBtn);
        document.getElementById("selectdemerit"+absentParameters[1]).disabled = false;

        for(x=0; x<classes.length; x++){
            if(absentParameters[2] == classes[x].classcode){
                for(y=0; y<classes[x].classdays.length; y++){
                    if(absentParameters[3] == classes[x].classdays[y].classday){
                        for(z=0; z<classes[x].classdays[y].classhours.length; z++){
                            if(absentParameters[4] == classes[x].classdays[y].classhours[z].classhour){
                                for(a=0; a<classes[x].classdays[y].classhours[z].students.length; a++){
                                    if(absentParameters[1] == classes[x].classdays[y].classhours[z].students[a].idno){
                                        classes[x].classdays[y].classhours[z].students[a].absent =" ";
                                        classes[x].classdays[y].classhours[z].students[a].report = " ";
                                        console.log("cancelled set as absent");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


function showReport(){
    console.clear();
    console.log("written . . . "+today);
    varnotif = document.createElement("span");
    varnotiftxt = document.createTextNode("saved . . .");
    varnotif.appendChild(varnotiftxt);
    varnotif.setAttribute("id","notifspan");
    reportbtn = document.getElementById("reportbtn");
    document.getElementById("selectionbox").removeChild(reportbtn);
    classReport = this.value.split(";");
    reports = "sample_report";
    console.log(todaysReports);
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

            console.log(JSON.stringify(varClass, null, 2));
            
        }
        classesReader.readAsText(this.files[0]);
    };
}