var personArray = ["Cow Lady", "Dog Man", "Shaggy Mutt"];
var personObjectArray = [];
var projectArray = ["Barclays", "Regal", "WillowTree"]; 
var projectColors = ["#000080", "#FF0000", "#1BD9C4"];

 //localStorage.removeItem("personObjectArray")
 //localStorage.removeItem("personArray")
     
var buildings = ["HQ", "Treehouse", "Watchtower"];
var listIds = ["HQ1", "HQ2", "TH1","TH2", "TH3","TH4","WT1" ];
var floorplans = ["HQFloor1", "HQFloor2", "THFloor1", "THFloor2", "THFloor3", "THFloor4", "WTFloor1"];


//localStorage.setItem("personObjectArray",JSON.stringify(personObjectArray))
localStorage.setItem("buildings",JSON.stringify(buildings))
localStorage.setItem("listIds",JSON.stringify(listIds))
localStorage.setItem("floorplans",JSON.stringify(floorplans))

//setting up personArray from local storage
if(localStorage.getItem("personArray")==null){ //if there is no local storage, initialize storage
    localStorage.setItem("personArray",JSON.stringify(personArray))
}else{ //if there is already something stored in local, grab from it and then initialize in javascript
    personArray = JSON.parse(localStorage.getItem("personArray"))
}
//alert(localStorage.getItem("personArray"))

function DeskClass(name, project, floor, image, height, width, left, top, rotate, deskId, outerDiv, innerDiv, color)
{   this.name = name; 
    this.project = project;
    this.floor = floor; 
    this.image = image;
    this.height = height; 
    this.width = width;    
    this.left = left; 
    this.top = top;
    this.rotate = rotate;
    this.deskId = deskId;
    this.outerDiv = outerDiv;
    this.innerDiv = innerDiv;
    this.color = color
} 
function PersonClass(name, project, floorplan){
    this.name = name;
    this.project = project;
    this.floorplan = floorplan;
}
function ProjectClass(name){
    this.name = name;
}

var person1 = new PersonClass();
person1.name = "Cow Lady";
person1.project = "Regal";
person1.floorplan = "HQFloor1";
personObjectArray.push(person1);
//localStorage.setItem("personObjectArray",JSON.stringify(personObjectArray))

var person2 = new PersonClass();
person2.name = "Dog Man";
person2.project = "Regal";
person2.floorplan = "HQFloor1";
personObjectArray.push(person2);
//localStorage.setItem("personObjectArray",JSON.stringify(personObjectArray))

var person3 = new PersonClass();
person3.name = "Shaggy Mutt";
person3.project = "Regal";
person3.floorplan = "HQFloor1";
personObjectArray.push(person3);
//localStorage.setItem("personObjectArray",JSON.stringify(personObjectArray))
//setting up personObjectArray from local storage
if(localStorage.getItem("personObjectArray")==null){
    localStorage.setItem("personObjectArray",JSON.stringify(personObjectArray))
}else{
    personObjectArray = JSON.parse(localStorage.getItem("personObjectArray"))
}

var floorPlan = "HQFloor1";

function HQFloor1() {
    floorPlan = "HQFloor1";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();

    //THIS IS HOW TO DETECT WHEN YOU CLICK OUTSIDE OF A DESK
    // NEEDS TO BE DYNAMICALLY REFACTORED
    // ALONG WITH FLOOR GENERATION
    $("#HQFloor1").on("click", (function(event) { 
        if(!$(event.target).closest('.desk').length) {
            stopActiveDesk();
        }        
        })
    );
 document.getElementById("labelFloorPlan").innerHTML = floorPlan;
}

function HQFloor2(){
    floorPlan = "HQFloor2";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    $("#HQFloor2").on("click", (function(event) { 
        if(!$(event.target).closest('.desk').length) {
            stopActiveDesk();
        }        
        })
    );
document.getElementById("labelFloorPlan").innerHTML = floorPlan;
}

function THFloor1(){
    floorPlan = "THFloor1";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    $("#THFloor1").on("click", (function(event) { 
        if(!$(event.target).closest('.desk').length) {
            stopActiveDesk();
        }        
        })
    );
document.getElementById("labelFloorPlan").innerHTML = floorPlan;
    
}
function THFloor2(){
    floorPlan = "THFloor2";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
   
    $("#THFloor2").on("click", (function(event) { 
        if(!$(event.target).closest('.desk').length) {
            stopActiveDesk();
        }        
        })
    );
document.getElementById("labelFloorPlan").innerHTML = floorPlan;
}
function THFloor3(){
    floorPlan = "THFloor3";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    $("#THFloor3").on("click", (function(event) { 
        if(!$(event.target).closest('.desk').length) {
            stopActiveDesk();
        }        
        })
    );
document.getElementById("labelFloorPlan").innerHTML = floorPlan;
}
function THFloor4(){
    floorPlan = "THFloor4";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    $("#THFloor4").on("click", (function(event) { 
        if(!$(event.target).closest('.desk').length) {
            stopActiveDesk();
        }        
        })
    );
document.getElementById("labelFloorPlan").innerHTML = floorPlan;
}

function WTFloor() {
    floorPlan = "WTFloor1";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    $("#WTFloor").on("click", (function(event) { 
        if(!$(event.target).closest('.desk').length) {
            stopActiveDesk();
        }        
        })
    );
document.getElementById("labelFloorPlan").innerHTML = floorPlan;
}

var imageSource = "desk - filled.svg";

//For Choosing which type of desk in Menu 
function singleDesk() {
   imageSource = "desk - filled.svg";
   $('#singleDesk').addClass('selectedDeskType');
   $('#LargeConf').removeClass('selectedDeskType');
   $('#SmallConf').removeClass('selectedDeskType');
}
function largeConferenceDesk(){
    imageSource = "large table - filled.svg";
    $('#singleDesk').removeClass('selectedDeskType');
    $('#LargeConf').addClass('selectedDeskType');
    $('#SmallConf').removeClass('selectedDeskType');
}
function smallConferenceDesk(){
    imageSource = "small table - filled.svg";
    $('#singleDesk').removeClass('selectedDeskType');
    $('#LargeConf').removeClass('selectedDeskType');
    $('#SmallConf').addClass('selectedDeskType');
}
// ============================================================================================
// =============================== people =====================================================
// ============================================================================================

//dynamic search for people
function searchPeople() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('peopleInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("peopleSubMenu");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    //start search at 1 because 0th element will always be button and search bar
    for (i = 1; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function addPerson() {
    var input, filter;
    input = document.getElementById('peopleInput');
    filter = toTitleCase(input.value.toUpperCase());

    //check for duplicates or empty
    if (isEmpty(filter)) {
        alert("Please enter a name.");
        return;
    } else if (personArray.includes(filter)){
        alert(filter + " already exists in the database.")
        return;
    }

    personArray.push(filter);
    localStorage.setItem("personArray",JSON.stringify(personArray))

    //person object array
    var person = new PersonClass();
    person.name = filter;
    person.project = "Regal";
    person.floorplan = floorPlan;
    personObjectArray.push(person);
    localStorage.setItem("personObjectArray",JSON.stringify(personObjectArray)) //updating local storage

    addToPersonList(personArray);
    addToActiveDeskPersonSelection(personArray);
    
    alert(filter + " was added to the people directory."); 
    input.value = "";

    //alert(JSON.parse(localStorage.getItem('personArray')))
}

function addPersonFromDeskMenu(){
    var input, filter;
    input = document.getElementById('name');
    filter = toTitleCase(input.value.toUpperCase());

    //check for duplicates
    if (isEmpty(filter)) {
        alert("Please enter a name.");
        return;
    } else if (personArray.includes(filter)){
        alert(filter + " already exists in the database.")
        return;
    }

    personArray.push(filter);
    localStorage.setItem("personArray",JSON.stringify(personArray)) //updating local storage

    //adding to object array 
    var person = new PersonClass();
    person.name = filter;
    person.project = "Regal";
    person.floorplan = floorPlan;
    personObjectArray.push(person);
    localStorage.setItem("personObjectArray",JSON.stringify(personObjectArray)) //updating local storage
    
    addToPersonList(personArray);
    addToActiveDeskPersonSelection(personArray);
    alert(filter + " was added to the people directory."); 
    input.value = "";
}

function addPersonFromJSON(name){
    var filter = toTitleCase(name);
    if (personArray.includes(filter)){
        // alert(filter + " already exists in the database.")
        return;
    }
    personArray.push(filter);
    localStorage.setItem("personArray",JSON.stringify(personArray)) //updating local storage
    addToPersonList(personArray);
    addToActiveDeskPersonSelection(personArray);
}

//creates list of people to display
function addToPersonList(array) {
    // Create the list element:
    var list = document.getElementById('peopleSubMenu');

    //clears list before populating it again
    $("li").remove(".listedPerson");

    for(var i = 0; i < array.length; i++) {
        var innerButton = document.createElement("button");
        innerButton.className = "personDeleteButton"; 
        innerButton.innerHTML = 'REMOVE';
        var item = document.createElement('li');
        var inneritem = document.createElement('a');
       
        item.className = "listedPerson";
        var nxt = array[i];
        item.setAttribute("id", nxt);
        innerButton.setAttribute("id", nxt);
        inneritem.appendChild(innerButton);
        inneritem.appendChild(document.createTextNode(array[i]));
        
        item.appendChild(inneritem);
        
        list.appendChild(item);
       
        item.onclick = function() { 
            var label = this.id;
            //alert(label);
                     for (var j = 0; j < personObjectArray.length; j++){
                        if (label === personObjectArray[j].name) {
                        floorPlan = personObjectArray[j].floorplan;
                            for (var k = 0; k < floorplans.length; k++){
                                var elem = document.getElementById(floorplans[k]);
                                $(elem).hide();
                                 }
                                var showFloorplan = document.getElementById(floorPlan);
                                $(showFloorplan).show();
                    }
             }
        };
        
        innerButton.onclick = function(){
            //alert(personObjectArray.length);
            var label = this.id;
           // alert(this.id);
            //finding element in arrays and deleting them 
                for (var j = 0; j < personObjectArray.length; j++){
                    if (label === personObjectArray[j].name) {
                        personObjectArray.splice(j, 1);
                        //alert(personObjectArray.length);
                        localStorage.setItem("personObjectArray",JSON.stringify(personObjectArray)) //updating local storage
                    }         
                }
              //  alert("out");
                for (var k = 0; k < personArray.length; k++){
                    if (label === personArray[k]) {
                        personArray.splice(k, 1);
                        //alert(personArray.length);
                        localStorage.setItem("personArray",JSON.stringify(personArray)) //updating local storage
                    }         
                }
            addToPersonList(personArray);
            addToActiveDeskPersonSelection(personArray);
            event.stopPropagation();
            
        };
    }
    // return list;
}



function addToActiveDeskPersonSelection(array) {

    var activeName = document.getElementById('activeDeskName');
    $("#activeDeskName").find('option').remove();

    for(var i=0; i < personArray.length; i++){
        var option = document.createElement('option');
        option.value = personArray[i];
        option.text = personArray[i];
        option.addClass = "active-name-select-item";
    
        //create the list
        activeName.appendChild(option);
    }
    $('#activeDeskName').selectpicker('refresh');
}

// ============================================================================================
// =============================== PROJECTS ===================================================
// ============================================================================================

function searchProjects() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('projectInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("projectSubMenu");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    //start search at 1 because 0th element will always be button and search bar
    for (i = 1; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function addProject() {
    var input, filter;
    input = document.getElementById('projectInput');
    filter = (input.value);
    //check for duplicates
    if (isEmpty(filter)) {
        alert("Please enter a project name.");
        return;
    }  else if (projectArray.includes(filter)){
        alert(filter + " already exists in the database.")
        return;
    }

    projectArray.push(filter);
    projectColors.push(""); //has to grow every time project array grows

    addToProjectList(projectArray);
    addToDeskProjectDropDown(projectArray);
    input.value = "";
    searchProjects();
    alert("New Project added");
}

function addProjectFromJSON(proj) {
    var filter;
    filter = proj; // we don't want to TitleCase it 

    //check for duplicates
    if (projectArray.includes(filter)){
        // alert(filter + " already exists in the database.")
        return;
    }

    projectArray.push(filter);
    projectColors.push(""); //has to grow every time project array grows

    addToProjectList(projectArray);
    addToDeskProjectDropDown(projectArray);
}

//SHOWS PROJECTS AND COLORS NEXT TO IT
function initializeProjectList(array) {
    // Create the list element:
    var list = document.getElementById('projectSubMenu');


    $("li").remove(".listedProject");
    $("li").remove(".colorPickerAdded");
    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        var inneritem = document.createElement('a');
        var innerButton = document.createElement("button");
        innerButton.className = "projectDeleteButton";
        innerButton.innerHTML = "REMOVE";
        item.className = "colorPickerAdded";
        inneritem.className = array[i];
        innerButton.setAttribute("id", array[i]);
        // inneritem.appendChild(document.createTextNode(array[i])); //add after color 

        var sq = document.createElement('input');
        sq.setAttribute("type", "text");
        sq.className = "color-square";
        // sq.style.backgroundColor = projectColors[i];

        inneritem.appendChild(innerButton);
        inneritem.appendChild(sq); 
        inneritem.appendChild(document.createTextNode(array[i]));

        //create the list
        item.appendChild(inneritem)
        list.appendChild(item);
        
        innerButton.onclick = function() {
        //alert(projectArray.length);
        var label = this.id;
        
        for (var k = 0; k < projectArray.length; k++){
                    if (label === projectArray[k]) {
                        projectArray.splice(k, 1);
                        projectColors.splice(k,1);
                       // alert(projectArray.length);
                    }         
                }
                
       initializeProjectList(projectArray);
       initDeskProjectDropdown(projectArray);
	
	addColorPicker();
	loadColorsIntoColorPickers();
    };
        // addColorPicker();
    }
    // return list;
}

//MODIFIED TO ADD A SINGLE ITEM
function addToProjectList(array) {
    var list = document.getElementById('projectSubMenu');
    var innerButton = document.createElement("button");
    innerButton.className = "projectDeleteButton";
    innerButton.innerHTML = "REMOVE";
    var item = document.createElement('li');
    var inneritem = document.createElement('a');
    inneritem.className = array[array.length-1];
    item.className = "listedProject";

    disableColorPicker(); //disable previous colorpickers before addding

    //create color picker to add next to element
    var sq = document.createElement('input');
    sq.setAttribute("type", "text");
    sq.className = "color-square";

    //save color using colorpicker itself

    inneritem.appendChild(innerButton);
    inneritem.appendChild(sq); 
    inneritem.appendChild(document.createTextNode(array[array.length-1]));
    innerButton.setAttribute("id", array[array.length-1]);

    //create the list
    item.appendChild(inneritem);
    
    list.appendChild(item);
 
    addColorPicker();
    
    innerButton.onclick = function() {
       // alert(projectArray.length);
        var label = this.id;
        
        for (var k = 0; k < projectArray.length; k++){
                    if (label === projectArray[k]) {
                        projectArray.splice(k, 1);
                        projectColors.splice(k,1);
                        //alert(projectArray.length);
                    }         
                }
                
       initializeProjectList(projectArray);
       initDeskProjectDropdown(projectArray);
	
	addColorPicker();
	loadColorsIntoColorPickers();
    };
}

//SHOWS PROJECTS AND COLORS INSIDE ADD DESK SUBMENU
function initDeskProjectDropdown(array) {

    //Populate select menu
    var drop = document.getElementById('projectDropdown');
    var activeDrop = document.getElementById('activeDeskProject');
    
    $("#projectDropdown").find("option").remove();
    $("#activeDeskProject").find("option").remove();
    
    for(var i = 0; i < array.length; i++) {
        var option = document.createElement('option');
        option.className = "desk-proj-color" + " " + array[i];
        option.value = projectColors[i];
        option.text = array[i];
        option.style.backgroundColor = projectColors[i];

        //create the list
        drop.appendChild(option);
    }

    //also add to activeDeskProject Dropdown
    for(var i = 0; i < array.length; i++) {
        var option = document.createElement('option');
        option.className = "desk-proj-color" + " " + array[i];
        option.value = projectColors[i];
        option.text = array[i];
        option.style.backgroundColor = projectColors[i];

        //create the list
        activeDrop.appendChild(option);
    }

  $('#projectDropdown').selectpicker('refresh');
  $('#activeDeskProject').selectpicker('refresh');

}

function addToDeskProjectDropDown(array) {

    var drop = document.getElementById('projectDropdown');
    var activeDrop = document.getElementById('activeDeskProject');

    var option = document.createElement('option');
    option.className = "desk-proj-color" + " " + array[array.length-1];
    option.value = projectColors[projectColors.length-1];
    option.text = array[array.length-1];
    option.style.backgroundColor = projectColors[projectColors.length-1];

    //also add identical to activeDeskProject Dropdown
    var option2 = document.createElement('option');
    option2.className = "desk-proj-color" + " " + array[array.length-1];
    option2.value = projectColors[projectColors.length-1];
    option2.text = array[array.length-1];
    option2.style.backgroundColor = projectColors[projectColors.length-1];

    //create the list
    drop.appendChild(option);
    activeDrop.appendChild(option2);

    $('#projectDropdown').selectpicker('refresh');
    $('#activeDeskProject').selectpicker('refresh');

}

// ============================================================================================
// =============================== COLOR ======================================================
// ============================================================================================

function addColorPicker() {
    $(".color-square").spectrum({
        showPalette: true,
        showSelectionPalette: true,
        showInput: true,
        showAlpha: true,
        showInitial: true,
        allowEmpty: true,
        preferredFormat: "hex",
        palette: [ ],
        localStorageKey: "home", // Any Spectrum with the same string will share selection
        change: function(color, domElement) {
            setColor(color.toHexString(), this);
        }
    });

    $(".disabled-color").spectrum({
        allowEmpty: true,
        disable: true,
        showPalette: true,
        showSelectionPalette: true,
        showInput: true,
        showAlpha: true,
        showInitial: true,
        preferredFormat: "hex",
        palette: [ ],
        localStorageKey: "home", // Any Spectrum with the same string will share selection
    })
}

function disableColorPicker() {
    if($(".color-square").hasClass("disabled-color")){
        $(".disabled-color").removeClass("color-square");
    } else if (!($(".color-square").hasClass("disabled-color"))){
        $(".color-square").toggleClass("disabled-color");
        $(".disabled-color").toggleClass("color-square");
    }

    $(".disabled-color").spectrum({ disable: true });
}

//fixes color to given project and stores it in color array
function setColor(color, domElement){
    //get color from colorpicker

    if (String(color).length != 7){
        alert("Please make sure to select a color.");
        return;
    }

    var correspondingProjectName = $(domElement).parent().prop('className'); // gets corresponding project name
    // alert("Project name: %" + correspondingProjectName + "%");

    //setting project color
    var idx = projectArray.indexOf(correspondingProjectName);
    projectColors[idx] = String(color);

    $('#projectDropdown').find('.' + correspondingProjectName + '').each(
        function() {
            $(this).css("background-color", projectColors[idx]);
            $(this).val(projectColors[idx]);
            $('#projectDropdown').selectpicker('refresh');
        }
    );

    $('#activeDeskProject').find('.' + correspondingProjectName + '').each(
        function() {
            $(this).css("background-color", projectColors[idx]);
            $(this).val(projectColors[idx]);
            $('#activeDeskProject').selectpicker('refresh');
        }
    );

}

//loads initial colors into color pickers
function loadColorsIntoColorPickers() {
    var x = 0;
    $('#projectSubMenu').find('.color-square').each(
        function () {
            $(this).spectrum("set", projectColors[x]);
            x = x + 1;
        }
    );
}

// ============================================================================================
// =============================== Active Desk ================================================
// ============================================================================================

function activateDeskName(name) {
    $('#activeDeskName').selectpicker('val', name);
}

//CURRENTLY DOESN'T WORK??
function activateDeskProject(proj) {
    $('#activeDeskProject').selectpicker('val', proj);
}


// ============================================================================================
// =============================== MISC =======================================================
// ============================================================================================

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function isEmpty(str){
    return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
}


// ============================================================================================
// ===============================SAVING=======================================================
// ============================================================================================

// function saveButton(){
//     //going through all desks
//     for(var i=0; i<deskArray.length; i++){
//         var desk = deskArray[i]; //current desk being iterated through
        
//         //retrieving style info for each desk from outerdiv
//         //position: absolute; left: 770px; top: 284px; z-index: 102; //example of element retrieved for reference
//         var element = document.getElementById(desk.outerDiv).getAttribute("style");
//         //console.log(element)
//         element = element.split(" ")
//         //console.log(element)
//         //assigning to desk attributes
//         desk.left = element[3].replace('px;','') //cleaning up
//         desk.top = element[5].replace('px;','')

//         //retrieving style info for each desk from innerdiv
//         //width: 50px; height: 50px; //example of element retrieved for reference
//         //width: 50px; height: 50px; transform: rotate(-0.2369rad); //if rotated
//         var element = document.getElementById(desk.innerDiv).getAttribute("style");
//        // console.log(element)
//         element = element.split(" ")
//        // console.log(element)
//         //assigning 
//         desk.width = element[1].replace('px;','') //cleaning up
//         desk.height = element[3].replace('px;','')
//         if(element.length<6){
//             desk.rotate = null; //no rotation
//         }else{
//             var rotateRad = element[5].replace('rotate(','') //cleaning up
//             rotateRad = rotateRad.replace('rad);','')
//             desk.rotate = rotateRad
//         }
//     }

//     localStorage.setItem("deskArray",JSON.stringify(deskArray)) //updating local storage
// }


// ============================================================================================
// ===============================DEPRECIATED SAVING FUNCTIONS FOR TESTING=======================================================
// ============================================================================================

//refreshes local Storage to default values
function deleteLocalStorage(){

}
// function save(){
//     saveIndex()
//     (function () {
//         var textFile = null,
//         makeTextFile = function (text) {
//             var data = new Blob([text], {type: 'text/plain'});

//             // If we are replacing a previously generated file we need to
//             // manually revoke the object URL to avoid memory leaks.
//             if (textFile !== null) {
//               window.URL.revokeObjectURL(textFile);
//             }

//             textFile = window.URL.createObjectURL(data);

//             return textFile;
//       };


//       var create = document.getElementById('saveButton')

//       create.addEventListener('click', function () {
//         var link = document.createElement('a');
//         link.setAttribute('download', 'floorplans.json');
//         floors = floorDivsToString()
//         link.href = makeTextFile(floors);
//         document.body.appendChild(link);

//         // wait for the link to be added to the document
//         window.requestAnimationFrame(function () {
//           var event = new MouseEvent('click');
//           link.dispatchEvent(event);
//           document.body.removeChild(link);
//             });
        
//       }, false);
//     })();
// }

// function floorDivsToString(){
//      var floorSaves = "[" //JSON string containing floor divs

//     for(var i=0; i<floorplans.length; i++){
//         //alert("floor plan " + i)
//         var floorplanName = floorplans[i] //current floorplan string name
//         //  This gives you an HTMLElement object
//         var element = document.getElementById(floorplans[i]);
//         //  This gives you a string representing that element and its content
//         var html = element.outerHTML;       
//         //  This gives you a JSON object that you can send with jQuery.ajax's `data`
//         // option, you can rename the property to whatever you want.
//         var data = {}
//         data[floorplanName] = html
//         //var data = { floorplanName: html }; 

//         //  This gives you a string in JSON syntax of the object above that you can 
//         // send with XMLHttpRequest.
//         var json = JSON.stringify(data);

//          if(i==(floorplans.length-1)){ //if it's the last floorplan (so no comma after this one in the JSON string)
//             floorSaves += json; //adding current floorplan to the full floorSaves JSON string
//         }else{
//             floorSaves += json + ",";
//         }
//     }

//     floorSaves = floorSaves + "]" //putting in correct format

//     alert(floorSaves)

//     return floorSaves
// }



// function saveIndex(){
//     // Save the page's HTML to a file that is automatically downloaded.

//         // We make a Blob that contains the data to download.
//         var file = new window.Blob([document.documentElement.innerHTML], { type: "text/html" });
//         var URL = window.webkitURL || window.URL;

//         // This is the URL that will download the data.
//         var downloadUrl = URL.createObjectURL(file);

//         var a = document.createElement("a");
//         // This sets the file name.
//         a.download = "index.html";
//         a.href = downloadUrl;

//         // Actually perform the download.
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
// }