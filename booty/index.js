var personArray = ["Cow Lady", "Dog Man", "Shaggy Mutt"];
var personObjectArray = [];
var projectArray = ["Barclays", "Regal", "WillowTree"]; 
var projectColors = ["#000080", "#FF0000", "#1BD9C4"];
     
var buildings = ["HQ", "Treehouse", "Watchtower"];
var listIds = ["HQ1", "HQ2", "TH1","TH2", "TH3","TH4","WT1" ];
var floorplans = ["HQFloor1", "HQFloor2", "THFloor1", "THFloor2", "THFloor3", "THFloor4", "WTFloor1"];
      
function DeskClass(name, project, image)
{   this.name = name; 
    this.project = project; 
    this.image = image; 
    this.left = left; 
    this.top = top;
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

var person2 = new PersonClass();
person2.name = "Dog Man";
person2.project = "Regal";
person2.floorplan = "HQFloor1";
personObjectArray.push(person2);

var person3 = new PersonClass();
person3.name = "Shaggy Mutt";
person3.project = "Regal";
person3.floorplan = "HQFloor1";
personObjectArray.push(person3);

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

    //person object array
    var person = new PersonClass();
    person.name = filter;
    person.project = "Regal";
    person.floorplan = floorPlan;
    personObjectArray.push(person);

    addToPersonList(personArray);
    addToActiveDeskPersonSelection(personArray);
    
    alert(filter + " was added to the people directory."); 
    input.value = "";
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

    //adding to object array 
    var person = new PersonClass();
    person.name = filter;
    person.project = "Regal";
    person.floorplan = floorPlan;
    personObjectArray.push(person);
    
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
    addToPersonList(personArray);
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
                    }         
                }
              //  alert("out");
                for (var k = 0; k < personArray.length; k++){
                    if (label === personArray[k]) {
                        personArray.splice(k, 1);
                        //alert(personArray.length);
                    }         
                }
            addToPersonList(personArray);
            event.stopPropagation();
            
        };
    }
    // return list;
}

function initializeActiveDeskMenu(){

    var activeName = document.getElementById('activeDeskName');

    for(var i=0; i < personArray.length; i++){
        var option = document.createElement('option');
        option.value = personArray[i];
        option.text = personArray[i];
        option.addClass = "active-name-select-item";
        option.style
    
        //create the list
        activeName.appendChild(option);
    }
    $('#activeDeskName').selectpicker('refresh');
}

function addToActiveDeskPersonSelection(array) {

    var activeName = document.getElementById('activeDeskName');
    var option = document.createElement('option');
    option.value = array[array.length-1];
    option.text = array[array.length-1];

    //create the list
    activeName.appendChild(option);
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
    alert("Project name: %" + correspondingProjectName + "%");

    //setting project color
    var idx = projectArray.indexOf(correspondingProjectName);
    projectColors[idx] = String(color);

    $('#projectDropdown').find('.' + correspondingProjectName + '').each(
        function() {
            $(this).css("background-color", projectColors[idx]);
            $(this).val(projectColors[idx]);
            $('#projectDropdown').selectpicker('refresh');
        });

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
// =============================== SAVING =======================================================
// ============================================================================================

function saveAll(){
    alert("savinggg")
    saveDeskLocation()
}

// <div id="testDiv0" class="desk ui-draggable ui-draggable-handle ui-selected" style="width: 50px; height: 50px; position: absolute; left: 831px; top: 273px; z-index: 102; transform: rotate(-0.296706rad);">
// <img src="desk - filled.svg" id="desk0" class="deskImg" width="50" height="50" alt="desk" style="filter: invert(10%) sepia(20%) saturate(9500%) hue-rotate(235deg);">
// <p style="z-index: 98; color: black; position: absolute; top: 10px;">Dog Man</p><div class="deleteDeskButton">✕</div><div class="ui-rotatable-handle ui-draggable">
// </div></div>
function saveDeskLocation(){
    // desks = document.getElementsByClassName("demo");  //array of Desk class elements
    
    // //going through each desk object and getting values to store in JSON
    // for(var i = 0; i < desks.length; i++){
    //     var name = desk[i].name;
    //     var project = desk[i].project;
    //     var image = desk[i].image;
    //     var left = desk[i].left;
    //     var top = desk[i].top;

    //     alert(name + project + left + top)
    // }

    // getElementById(testD)
}
