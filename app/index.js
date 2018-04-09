var personArray = ["Cow Lady", "Dog Man", "Shaggy Mutt"];

var projectArray = ["Barclays", "Regal", "WillowTree"]; 
var projectColors = ["#000080", "#FF0000", "#1BD9C4"];     

var floorplans = ["HQFloor1", "HQFloor2", "THFloor1", "THFloor2", "THFloor3", "THFloor4", "WTFloor1"]
      
function DeskClass(name, project, image)
{   this.name = name; 
    this.project = project; 
    this.image = image; } 
function PersonClass(name, project){
    this.name = name;
    this.project = project;
}
function ProjectClass(name){
    this.name = name;
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
    //alert(floorPlan);

}

function HQFloor2(){
    floorPlan = "HQFloor2";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
   // alert(floorPlan);
//     var divNew = document.getElementById("new");
//$(newFloor).hide();
}

function THFloor1(){
    floorPlan = "THFloor1";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    //alert(floorPlan);
//     var divNew = document.getElementById("new");
//$(newFloor).hide();
    
}
function THFloor2(){
    floorPlan = "THFloor2";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    //alert(floorPlan);
//     var divNew = document.getElementById("new");
//$(newFloor).hide();
}
function THFloor3(){
    floorPlan = "THFloor3";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    alert(floorPlan);
//     var divNew = document.getElementById("new");
//$(newFloor).hide();
//    
}
function THFloor4(){
    floorPlan = "THFloor4";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    alert(floorPlan);
//     var divNew = document.getElementById("new");
//$(newFloor).hide();
}

function WTFloor() {
    floorPlan = "WTFloor1";
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    //alert(floorPlan);
//     var divNew = document.getElementById("new");
//$(newFloor).hide();
}




var imageSource = "";

//For Choosing which type of desk in Menu 
function singleDesk() {
   imageSource = "desk - filled.svg";
}
function largeConferenceDesk(){
    imageSource = "large table - filled.svg";
}
function smallConferenceDesk(){
    imageSource = "small table - filled.svg";
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
    //check for duplicates
    if (personArray.includes(filter)){
        alert(filter + " already exists in the database.")
        return;
    }
    personArray.push(filter);
    addToPersonList(personArray);
}

function addPersonFromDeskMenu(){
    var input, filter;
    input = document.getElementById('name');
    filter = toTitleCase(input.value.toUpperCase());
    //check for duplicates
    if (personArray.includes(filter)){
        alert(filter + " already exists in the database.")
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
        var item = document.createElement('li');
        var inneritem = document.createElement('a');
        item.className = "listedPerson";
        inneritem.appendChild(document.createTextNode(array[i]));
        item.appendChild(inneritem);
        list.appendChild(item);
    }
    // return list;
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
    filter = toTitleCase(input.value.toUpperCase());
    //check for duplicates
    if (projectArray.includes(filter)){
        alert(filter + " already exists in the database.")
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

    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        var inneritem = document.createElement('a');
        item.className = "colorPickerAdded";
        inneritem.className = array[i];
        // inneritem.appendChild(document.createTextNode(array[i])); //add after color 

        var sq = document.createElement('input');
        sq.setAttribute("type", "text");
        sq.className = "color-square";
        // sq.style.backgroundColor = projectColors[i];

        //create button to save color for project
        var but = document.createElement('button');
        but.className = "set-color-button";
        but.innerHTML = "SET";
        but.onclick = setColor; //onclick function

        inneritem.appendChild(sq); 
        inneritem.appendChild(document.createTextNode(array[i]));
        inneritem.appendChild(but);

        //create the list
        item.appendChild(inneritem)
        list.appendChild(item);

        // addColorPicker();
    }
    // return list;
}

//MODIFIED TO ADD A SINGLE ITEM
function addToProjectList(array) {
    var list = document.getElementById('projectSubMenu');

    var item = document.createElement('li');
    var inneritem = document.createElement('a');
    inneritem.className = array[array.length-1];
    item.className = "listedProject";

    disableColorPicker(); //disable previous colorpickers before addding

    //create color picker to add next to element
    var sq = document.createElement('input');
    sq.setAttribute("type", "text");
    sq.className = "color-square";

    //create button to save color for project
    var but = document.createElement('button');
    but.className = "set-color-button";
    but.innerHTML = "SET";
    but.onclick = setColor; //onclick function
    // but.setAttribute('onclick', 'setColor()');

    inneritem.appendChild(sq); 
    inneritem.appendChild(document.createTextNode(array[array.length-1]));
    inneritem.appendChild(but);

    //create the list
    item.appendChild(inneritem)
    list.appendChild(item);

    addColorPicker();
}

//SHOWS PROJECTS AND COLORS INSIDE ADD DESK SUBMENU
function initDeskProjectDropdown(array) {

    //Populate select menu
    var drop = document.getElementById('projectDropdown');

    for(var i = 0; i < array.length; i++) {
        var option = document.createElement('option');
        option.className = "desk-proj-color" + " " + array[i];
        option.value = projectColors[i];
        option.text = array[i];
        option.style.backgroundColor = projectColors[i];

        //create the list
        drop.appendChild(option);
    }

}

function addToDeskProjectDropDown(array) {

    var drop = document.getElementById('projectDropdown');
    var option = document.createElement('option');
    option.className = "desk-proj-color" + " " + array[array.length-1];
    option.value = projectColors[projectColors.length-1];
    option.text = array[array.length-1];
    option.style.backgroundColor = projectColors[projectColors.length-1];

    //create the list
    drop.appendChild(option);

    $('#projectDropdown').selectpicker('refresh');

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
function setColor(){
    //get color from colorpicker
    var color;
    var color1 = $(this).siblings(".color-square").spectrum("get");
    var color2 = $(this).siblings(".disabled-color").spectrum("get");

    // alert("colorsquare val: " + color1 + " type: " + typeof(color1) + "Strings: " + String(color1) + "len: " + String(color1).length + "\n" + "disabled-color val: " + color2 + " type: " + typeof(color2) + "Stringed: " + String(color2));

    if (String(color1).length == 7){
        color = color1;
    } else if (String(color2).length == 7){
        color = color2;
    } else {
        alert("Please make sure to select a color.");
        return;
    }

    var correspondingProjectName = $(this).parent().prop('className'); // gets corresponding project name
    alert("Project name: %" + correspondingProjectName + "%");

    //setting project color
    var idx = projectArray.indexOf(correspondingProjectName);
    projectColors[idx] = String(color);
    
    // alert(JSON.stringify(projectArray));
    // alert(JSON.stringify(projectColors));

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
// =============================== MISC =======================================================
// ============================================================================================

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}



// ============================================================================================
// =============================== DEPRECATED FUNCTIONS =======================================
// ============================================================================================

// //SHOWS PROJECTS AND COLORS INSIDE ADD DESK SUBMENU
// function initDeskProjectDropdown(array) {

//     // == DEPRECATED WITH SELECT MENU
//     // var list = document.getElementById('deskProjectDropdown');

//     //  for(var i = 0; i < array.length; i++) {
//     //     var inneritem = document.createElement('a');
//     //     inneritem.className = "dropdown-item";
//     //     inneritem.className += " " + array[i];

//     //     var sq = document.createElement('div');
//     //     sq.className = "desk-proj-color";
//     //     sq.style.backgroundColor = projectColors[i];

//     //     inneritem.appendChild(document.createTextNode(array[i]));
//     //     inneritem.appendChild(sq);

//     //     //create the list
//     //     list.appendChild(inneritem);
//     // }

// }

// function addToDeskProjectDropDown(array) {
//     //DEPRECATED WITH SELECT MENU
//     // var list = document.getElementById('deskProjectDropdown');

//     // var inneritem = document.createElement('a');
//     // inneritem.className = "dropdown-item";
//     // inneritem.className += " " + array[array.length-1];

//     // var sq = document.createElement('div');
//     // sq.className = "desk-proj-color";
//     // sq.style.backgroundColor = projectColors[projectColors.length-1];

//     // inneritem.appendChild(document.createTextNode(array[array.length-1]));
//     // inneritem.appendChild(sq);

//     // //create the list
//     // list.appendChild(inneritem);

// }

//DEPRECATED BY DESK SELECT ...
// $('#deskProjectDropdown').find('.' + correspondingProjectName + '').each(
//     function() {
//         $(this).find('.desk-proj-color').css("background-color", projectColors[idx]);
//     });