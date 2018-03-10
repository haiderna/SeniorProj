var personArray = ["Cow Lady", "Dog Man", "Shaggy Mutt"];

var projectArray = ["Barclays", "Regal", "WillowTree"];      
      
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


var imageSource = "";

//For Choosing which type of desk in Menu 
function singleDesk() {
   imageSource = "Single Desk.png";
}
function largeConferenceDesk(){
    imageSource = "Large Conf.png";
}
function smallConferenceDesk(){
    imageSource = "Small conf.png";
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
// =============================== people ===================================================
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
    addToProjectList(projectArray);
}

//creates list of people to display
function addToProjectList(array) {
    // Create the list element:
    var list = document.getElementById('projectSubMenu');

    //clears list before populating it again
    $("li").remove(".listedProject");

    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        var inneritem = document.createElement('a');
        item.className = "listedProject";
        inneritem.appendChild(document.createTextNode(array[i]));
        item.appendChild(inneritem);
        list.appendChild(item);
    }
    // return list;
}

//automatically renders once on page load
document.getElementById("projectSubMenu").appendChild(addToProjectList(projectArray));
document.getElementById("peopleSubMenu").appendChild(addToPersonList(personArray));

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

