var personArray = ["Cow Lady", "Dog Man", "Shaggy Mutt"];

var projectArray = [];      
      
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

//Create Desk Image and Have it be dragged around floorplan
function deskImage() {

    //var desk = new DeskClass(); // 
    //desk.name = document.getElementById("personAtDesk").value; 
    //Div container to include rotate and remove buttons 
//    var divImage = document.createElement("Div");
//    
// 
//    divImage.id = "divID";
//    divImage.class = "container";
//    var paragraph = document.createElement("P");
//    var text = document.createTextNode("Clyde Miller");
//    
//    var x = document.createElement("IMG");
   var w = document.getElementById("deskWidth").value;
   var h = document.getElementById("deskHeight").value;
//    
//   // var img = document.getElementById("singleDesk").src;
//    x.setAttribute("src", imageSource);
//    
//    if (isNaN(w)) {
//            x.setAttribute("width", "100");
//        } else {
//            x.setAttribute("width", w);
//        }
//        
//    if (isNaN(h)) {
//            x.setAttribute("height", "100");
//        } else {
//            x.setAttribute("height", h);
//        }    
//   
//    x.setAttribute("alt", "single");
//    //document.body.appendChild(x);
//   // divImage.appendChild(x);
//    //divImage.appendChild(text);
//    document.body.appendChild(x);
//    
//    $(x).resizable().parent().draggable(); // creates a wrapper div and makes the parent div draggable and the object inside resizable
    ////                            ////////
    //                              /////////
    //TRYING IMAGE DESK WITH SVGS  /////////////////
    ////                            /////
   ////                             /////
    
}

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

//dynamic search for people
function searchPeople() {
    // Declare variables
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
    addToList(personArray);
}

//creates list of people to display
function addToList(array) {
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

//automatically renders once on page load
document.getElementById("peopleSubMenu").appendChild(addToList(personArray));


function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

