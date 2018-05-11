var deskArray = [];
var deskIndex = 0;

var roomObjectArray = [];
var roomIndex = 0;

var floorplanObjArray = [];
var floorIndex = 0;
var buildings = ["HQ", "Treehouse", "Watchtower"];
var listIds = ["HQ1", "HQ2", "TH1","TH2", "TH3","TH4","WT1" ];
var originalFloors = ["HQFloor1", "HQFloor2", "THFloor1", "THFloor2", "THFloor3", "THFloor4", "WTFloor1"];

var deletedFloors= [];


//loading floors and buildings
if(localStorage.getItem("floorplanObjArray")==null){
    //localStorage.setItem("buildings", JSON.stringify(buildings));
    localStorage.setItem("floorplanObjArray", JSON.stringify(floorplanObjArray));
    localStorage.setItem("floorIndex", 0)
}else if(localStorage.getItem("floorplanObjArray")=="[]"){
    //localStorage.setItem("buildings", JSON.stringify(buildings));
    localStorage.setItem("floorIndex",0)
}else{
    

    floorplanObjArray = JSON.parse(localStorage.getItem("floorplanObjArray"))
    floorIndex = localStorage.getItem("floorIndex")

    for (var i = 0; i<floorplanObjArray.length; i++) {
        loadFloor(floorplanObjArray[i])
    }
}

//for floors that are on index.html file
if(localStorage.getItem("deletedFloors") == null){
    localStorage.setItem("deletedFloors",deletedFloors)
}else if(localStorage.getItem("deletedFloors")=="[]"){

}else{
    deletedFloors = JSON.parse(localStorage.getItem("deletedFloors"))

    for(var i=0; i<deletedFloors.length; i++){
        var deletedFloor= deletedFloors[i] 
        var floorDiv = document.getElementById(deletedFloor)
        floorDiv.style.display = "none"
        var deletedFloor = deletedFloor.replace("Floor","")
        var submenuDiv = document.getElementById(deletedFloor)
        submenuDiv.style.display = "none"
    }
}

//loading rooms
if(localStorage.getItem("roomObjectArray")==null){
    localStorage.setItem("roomObjectArray",JSON.stringify(roomObjectArray))
    localStorage.setItem("roomIndex",0)
}else if(localStorage.getItem("roomObjectArray"=="[]")){
    localStorage.setItem("roomIndex",0)
}else{
    roomIndex = localStorage.getItem("roomIndex")
    roomObjectArray = JSON.parse(localStorage.getItem("roomObjectArray"))
    for (var z = 0; z<roomObjectArray.length; z++) {
       loadRoom(roomObjectArray[z]);
    }
}

//locking rooms
saveState()

//loading desks
if(localStorage.getItem("deskArray")==null){ //if there is no local storage, initialize storage
    localStorage.setItem("deskArray",JSON.stringify(deskArray))
    localStorage.setItem("deskIndex",0)
}else if(localStorage.getItem("deskArray"=="[]")){
    localStorage.setItem("deskIndex",0)
}
else{ //if there is already something stored in local, grab from it and then initialize in javascript
    deskArray = JSON.parse(localStorage.getItem("deskArray"))
    deskIndex = localStorage.getItem("deskIndex")
    for (var i = 0; i<deskArray.length; i++) {
        loadDivDesk(deskArray[i])
    }
}


$(document).ready(function () {
    document.body.style.backgroundImage = "url('https://78.media.tumblr.com/b96c494a053a6f20a7cb7af1ca9b6f98/tumblr_inline_nn85tpbQkq1rewzq7_1280.png')";
    document.getElementById("labelFloorPlan").innerHTML = floorPlan;
	//prepares the sidebar collapse buttons
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('#rightSidebarCollapse').on('click', function () {
        $('#right-sidebar').toggleClass('active');
        $('#right-main').toggleClass('active');
    });

    $("#name").typeahead().data('typeahead').source = personArray;

    //initializes lists of people to display
	addToPersonList(personArray);
	initializeProjectList(projectArray);

    //initializes project menu from desk dropdown
	initDeskProjectDropdown(projectArray);
    //adds color picking ability for projects
	addColorPicker();
    loadColorsIntoColorPickers();

    //loads in names for active desk directory
    addToActiveDeskPersonSelection(personArray);
    
    //selects 1st desk as default
    singleDesk();

    updateAddDeskButton();

    document.getElementById("jsonInput").value = "";
});

//readying rotatable
$(document).ready(function() {
        var params = {
            start: function(event, ui) {
                console.log("Rotating started")
            },
            rotate: function(event, ui) {
                if (Math.abs(ui.angle.current > 6)) {
                  console.log("Rotating " + ui.angle.current)
                }
            },
            stop: function(event, ui) {
                console.log("Rotating stopped")
            },
        };
       
});

function onloadDiv(){
    floorPlan = floorplans[0];
    for (var i = 0; i < floorplans.length; i++){
        var elem = document.getElementById(floorplans[i]);
        $(elem).hide()
    }
    //shows this one
    var showFloorplan = document.getElementById(floorPlan);
    $(showFloorplan).show();
    
    
}

 function insertRoom() {
    //initializing room object
    var roomObj = new RoomClass();
    var roomId = "room"+roomIndex;
    roomObj.roomId = roomId;

    //incrementing for next desk
    roomIndex++;

    var mainDiv = document.getElementById(floorPlan);
    roomObj.floor = floorPlan;

 	//create the div to be draggable
 	var room = document.createElement('div');
 	room.className = 'room';
    room.id = roomId;

 	//cancel button to quit adding all the rooms
 	var cancel = document.createElement('div');
 	cancel.className = 'cancel';
 	cancel.innerHTML = '&#10005';
 	cancel.onclick = function (e) { room.parentNode.removeChild(room) };
 	room.appendChild(cancel);

    //currently displays counts of desks inside the room
 	var span = document.createElement('span');
 	span.className = 'deskCount';
 	room.appendChild(span);

    //set room to be inserted visibly in the middle of the page
 	room.style.position = "absolute";
    var left = mainDiv.offsetLeft;	
    var top = mainDiv.offsetTop;
    left = left + ($(mainDiv).width() / 2);
    top = top + ($(mainDiv).height() / 4);
    room.style.left = left;
    room.style.top =  top;
    roomObj.left = left;
    roomObj.top = top;

 	mainDiv.append(room);
    
 	$( '.room' ).draggable({ containment: 'parent' }).resizable();

    //getting room positioning variables
    var style = document.getElementById(roomId).getAttribute('style')
    style = style.split(' ') //splitting up style attribute to get variables
    for(var i=0; i<style.length; i++){
        if(style[i]==='left:'){
            roomObj.left = style[i+1].replace('px;', '')//extracting left variable
        }
        if(style[i]==='top:'){
            roomObj.top = style[i+1].replace('px;', '')//extracting left variable
        }
    }

    roomObjectArray.push(roomObj)
}

//load rooms from local storage
function loadRoom(roomObj){
    var roomId = roomObj.roomId;

    var mainDiv = document.getElementById(roomObj.floor);
     
    //create the div to be draggable
    var room = document.createElement('div');
    room.className = 'room';
    room.id = roomId;

    //cancel button to quit adding all the rooms
    var cancel = document.createElement('div');
    cancel.className = 'cancel';
    cancel.innerHTML = '&#10005';
    cancel.onclick = function (e) { room.parentNode.removeChild(room) };
    room.appendChild(cancel);

    //currently displays counts of desks inside the room
    var span = document.createElement('span');
    span.className = 'deskCount';
    room.appendChild(span);

    //set room to be inserted visibly in the middle of the page
    room.style.position = "absolute";
    var left = roomObj.left;  
    var top = roomObj.top;
    room.style.left = left;
    room.style.top =  top;

    //set room dimensions
    if(roomObj.height != null){
        room.style.height = roomObj.height;
    }
    if(roomObj.width != null){
        room.style.width = roomObj.width;
    }

    mainDiv.append(room);
    

    $( '.room' ).draggable({ containment: 'parent' }).resizable();
}

function deleteRoom() {
    
	//get all rooms
	var rooms = document.getElementsByClassName('room');

	$('.cancel').css('visibility', 'visible');

	//show button to remove delete buttons
	var quit = document.getElementById('stopDeletingButton');
	var stopAnchor = document.getElementById('stopAnchor');
	quit.style.display = "block";
	stopAnchor.style.padding = "10px 10px 10px 20px";
	stopAnchor.style.margin = "0px";
	stopAnchor.style.visibility = "visible";
}

//hides all the delete buttons
function stopDeleting() {
	$('.cancel').css("visibility", "hidden");

	//hide button to remove delete buttons
	var quit = document.getElementById('stopDeletingButton');
	var stopAnchor = document.getElementById('stopAnchor');
	quit.style.display = "none";
	stopAnchor.style.padding = "0px";
	stopAnchor.style.margin = "-10px 0px";
	stopAnchor.style.visibility = "hidden";
}

//locks the rooms in place and makes them droppable
//and interactable with desks
function saveState() {
	stopDeleting();
	$('.room').draggable("disable");
	$('.room').resizable("disable");

	var itm = [];

	// set ondrop events on here
	// currently prevents one person from sitting in two places
	$( ".room" ).droppable({
	    drop: function(event, ui) {
		    var name = ui.draggable.text()
		    var xyz = itm.includes(name);
		    if (xyz === false) {
		    	//create a li tag and add to room
		       	$("<li></li>").text(ui.draggable.text())
		          .addClass('dropClass')
		          .appendTo(this);

		        //add to array
		        itm.push(name);
		        //add style
		        $('.room').find("li.ui-draggable:contains('" + name + "')").addClass('bred');
					var count = $(this ).children(".dropClass").length;
					$(this).children("span:first").text( "Items Dropped: " + count + ".");

		      } else {
		        alert('Desk already exists in this/other room.');
		      }
	    },
	    out: function(event, ui) {
		    var name = ui.draggable.text()
		    var xyz = itm.includes(name);
		    if (xyz === true) {
		    	//create a li tag and add to room
		       	$(this).children("li").remove(":contains('"+ name + "')");

		        //remove from array
		        itm = jQuery.grep(itm, function(value) {
				  return value != name;
				});

		        //add style
		        $('.room').find("li.ui-draggable:contains('" + name + "')").removeClass('bred');
					var count = $(this ).children(".dropClass").length;
					$(this).children("span:first").text( "Items Dropped: " + count + ".");

		      } else {
		        alert('Desk doesnt exit in this/other room? How did you get here');
		      }
	    }
	    //leaving the room
    });
	
	//making desks selectable over rooms
	$('.desk').css('z-index', '101'); 
}

//unlocks the rooms and allows them to be edited
function continueEdit() {
	if ($('#editSubmenu').attr('aria-expanded') == "false") {
		$('.room').droppable("destroy");
		$('.room').draggable("enable");
		$('.room').resizable("enable");

		//moving desks behind rooms
		$('.desk').css('z-index', '90'); 
	}
}

//a desk has been selected and thus can be edited
function continueActiveDesk(){
    $('#currentDesk').toggle(true);
    $('#inactiveDeskMessage').toggle(false);
}

//no desk is selected and thus nothing appears in the edit desk menu
function stopActiveDesk(){
    $('#currentDesk').toggle(false);
    $('#inactiveDeskMessage').toggle(true);

    $(".ui-selected").removeClass("ui-selected");
    $(".ui-rotatable-handle").hide();
}


//BIG DESK FUNCTION
function insertDivDesk() {

    var mainDiv = document.getElementById(floorPlan);
    mainDiv.style.position = "relative";
    var d_img = document.createElement("IMG");
    d_img.setAttribute("src", imageSource);

    var Desk = new DeskClass();
    Desk.image = imageSource;
    var deskId = "desk"+deskIndex;
    Desk.deskId = deskId;
    Desk.floor = floorPlan;
    //alert(deskId)

    d_img.setAttribute("id", deskId);
    d_img.className += "deskImg";
    d_img.style.zIndex = 97;
    var w = document.getElementById("deskWidth").value;
    var h = document.getElementById("deskHeight").value;
    var name = document.getElementById("name").value;
    
    //error messages 
    if (!name) {
        alert("Add Value for Name");
        exit();
    }
    if (!w) {
        alert("Add Value for Width");
        exit();
    }
    if (!h) {
        alert("Add Value for Height");
        exit();
    }
    
    Desk.width = w;
    Desk.height = h;
    Desk.name = name;

    /*Getting project and color*/
    var proj = $('#projectDropdown option:selected').text();
    var color = $('#projectDropdown option:selected').val();
    
    if (!color) {
        alert("Add Project");
            exit();
    }
       
    Desk.project = proj;
   // Desk.color = color;
    
        if (isNaN(w) || w > 200) {
            alert("Add proper width with a max size of 200");
            exit();
            } else {
                d_img.setAttribute("width", w);
                 }

        if (isNaN(h) || h > 200) {
            alert("Add proper height with a max size of 200");
            exit();
            } else {
                d_img.setAttribute("height", h);
            }
    
    d_img.setAttribute("alt", "desk");
    
    ////////Setting Floorplan to new Floorplan ////////
    for (var j = 0; j < personObjectArray.length;j++){
        if (name === personObjectArray[j].name){
            personObjectArray[j].project = proj;
            personObjectArray[j].floorplan = floorPlan;
        }
        
    }
    
    //creating desk name
    var para = document.createElement("p");
    para.innerHTML = name;
    para.className = "deskText";
    
    //innerdiv containing image for rotatable handle
    var innerDiv = document.createElement("div");
    var divId = "innerDiv"+deskIndex;
    innerDiv.setAttribute("id", divId);
    innerDiv.className += "innerDesk";
    Desk.innerDiv = divId;

    //outerdiv containing innerdiv + text for draggalbe handle
    var outerDiv = document.createElement("div");
    var divId = "outerDiv"+deskIndex;
    outerDiv.setAttribute("id", divId);
    outerDiv.className += "desk";
    Desk.outerDiv = divId;
    // outerDiv.style.flex = "auto";
    // outerDiv.style.flexDirection = "column";

    //cancel button to quit adding all the rooms
    var btn = document.createElement('div');
    btn.className = 'deleteDeskButton';
    btn.innerHTML = '&#10005';
    btn.onclick = function (e) { 
		for(var i=0; i<deskArray.length; i++){
			var desk = deskArray[i]; //current desk being iterated through
			if(desk.outerDiv == divId){
				deskArray.splice(i,1)
			}
		}
		document.getElementById(divId).remove(); 
	};
    
    innerDiv.style.width = w;
    innerDiv.style.height = h;

    newW = parseInt(w)+0;
    newH = parseInt(h)+0;

    outerDiv.style.width = newW;
    outerDiv.style.height = newH;
    
    //SETTING DESKS TO ACTIVE AND NON ACTIVE
    $( mainDiv ).selectable({
        filter : ".desk",
        //only one selectable at a time
        selecting: function(event, ui){
            if( $(".ui-selecting").length > 1){
                  $(".ui-selecting").removeClass("ui-selecting");
            }
        },
        //just make it so you can only select using clicks
        //makes the selectable a redundant application
        //with the implemented draggable and onclick functions
        disabled: true
     });

    $(outerDiv).draggable({
        start: function(ev, ui) 
        {        
            if (!$(this).hasClass("ui-selected")) {
                //making selectable
                $(this).addClass("ui-selected");
                $(this).siblings().removeClass("ui-selected");

                var stopRotMouse = {
                    wheelRotate: false
                    };
                    $(this).children('.innerDesk').first().rotatable(stopRotMouse);
                //making rotatable
                $(this).siblings().children().children(".ui-rotatable-handle").hide();
                $(this).children('.innerDesk').first().children(".ui-rotatable-handle").show();

                //setting desk menu options
                continueActiveDesk();
                activateDeskName(Desk.name);
                activateDeskProject(Desk.project);
            } 
           
        }
    });

    $(outerDiv).click(function() {
        var stopRotMouse = {
                    wheelRotate: false
                    };
        if (!$(this).hasClass("ui-selected")) {
            $(this).addClass("ui-selected");
            $(this).siblings().removeClass("ui-selected");

            $(this).siblings().children().children(".ui-rotatable-handle").hide();
            $(this).children('.innerDesk').first().rotatable(stopRotMouse);
            $(this).children('.innerDesk').first().children(".ui-rotatable-handle").show();
            
            //setting desk menu options
            continueActiveDesk();
            activateDeskName(Desk.name);
            activateDeskProject(Desk.project);
            var style = document.getElementById(divId).getAttribute("style");
            var stylearray = JSON.parse(style)
            var rotate = stylearray.transform
            alert("transform = " + rotate)

        } else if ($(this).hasClass("ui-selected")){
            $(this).removeClass("ui-selected");
            $(this).children(".ui-rotatable-handle").hide();
            stopActiveDesk();

            var style = document.getElementById(divId).getAttribute("style");
            var stylearray = JSON.parse(style)
            var rotate = stylearray.transform
            alert("transform = " + rotate)
            // Desk.top = mainDiv.offsetTop; 
            // Desk.left = mainDiv.offsetLeft; 
            // deskArray[deskIndex] = Desk;
            // localStorage.setItem("deskArray",JSON.stringify(deskArray)) //updating local storage
        }
    });



    innerDiv.appendChild(d_img);
    innerDiv.appendChild(btn);

    outerDiv.appendChild(innerDiv);
    outerDiv.appendChild(para);

    //positioning to a more central position
    outerDiv.style.position = "absolute";
    var left = mainDiv.offsetLeft;	
    var top = mainDiv.offsetTop;
    left = left + ($(mainDiv).width() / 2);
    top = top + ($(mainDiv).height() / 4);
    outerDiv.style.left = left;
    outerDiv.style.top =  top;
    Desk.left = left;
    Desk.top = top;

    mainDiv.appendChild(outerDiv);

    var convertedR = convertHex(color,50);
   // Desk.color = convertedR
   // alert(convertedR);
    getNewColor(convertedR, d_img);
    $(outerDiv).css('z-index', '102');
    //Desk.color = d_img.style

    deskArray.push(Desk)
   // localStorage.setItem("deskArray",JSON.stringify(deskArray)) //updating local storage

     // alert(divId);
    deskIndex++;

    //should only trigger if person is not already in the database
    var input, filter;
    input = document.getElementById('name');
    filter = toTitleCase(input.value.toUpperCase());
    if (!isEmpty(filter) && !personArray.includes(filter)){
        addPersonFromDeskMenu();
    }
    //alert(testDiv.style.width);
}

//on a selected desk, allows editing of 
//person name, project, and desk size
function confirmDeskEdit(){
    if(!confirm('Are you sure you want to edit this desk as shown?')){
        return;
    }
    var new_name = $("#activeDeskName").val();
    var new_proj = $("#activeDeskProject").val();
    var w = document.getElementById("deskWidthEdit").value;
    var h = document.getElementById("deskHeightEdit").value;
    
    if(!new_name || !new_proj){
        alert("Please ensure both input fields are selected.");
        return;
    }

   // alert(new_name + " " + new_proj);
    var desks = document.getElementsByClassName("desk ui-selected");
    if(desks.length > 1){
        alert("uh.. somehow you selected more than one desk. email us how please."); 
        return;
    } else if ( desks.length < 1) { 
        alert("uh.. somehow you managed to get here without selecting a desk. pls file a bug report.");
        return;
    }

    var desk = desks[0];

    desk.getElementsByTagName("p")[0].innerHTML = new_name;

    var img = desk.getElementsByTagName("IMG")[0];
    var convertedR = convertHex(new_proj,50);
    getNewColor(convertedR,img);

    img.setAttribute("width", w);
    img.setAttribute("height", h);

    w = parseInt(w)+0;
    h = parseInt(h)+0;
    desk.style.width = w;
    desk.style.height = h;

    var innerDeskDiv = desk.getElementsByClassName('innerDesk')[0];
    innerDeskDiv.style.width = w;
    innerDeskDiv.style.height = h;

    //getNewColor(new_proj, img);
}

//add desk button is called exportbutton for some reason
function updateAddDeskButton() {
    if (isDeskReady()) {
        $('#ExportButton').attr('disabled', false);
    } else {
        $('#ExportButton').attr('disabled', true);
    }
}

//checks to ensure the insert Desk menu has all values filled before enabling a desk to be added
function isDeskReady(){
    if ($('#name').val() != '' && $('#projectDropdown').val() != '' && 
        $('#deskWidth').val() != '' & $('#deskHeight').val() != '') {
        return true;
    } else {
        return false
    }
}

$('#name').change(updateAddDeskButton);
$('#projectDropdown').change(updateAddDeskButton);
$('#deskWidth').change(updateAddDeskButton);
$('#deskHeight').change(updateAddDeskButton);


////////////////////////////////
/////FUNCTION FOR CREATING NEW FLOOR PLAN 
////////////////////////////
var match = false;

var storeImage = " ";


function deleteFloor(ident, listIdentifier, idThing, ancId) {
   var UL = document.getElementById(idThing); 
 //  alert(UL.childNodes.length);
  if (confirm("You sure you want to delete?")) {
        var id = ident;
        var listItem = listIdentifier;


    //delete floor plan from array 
        for (var j= 0; j < floorplans.length;j++){
            if (ident === floorplans[j]){
                floorplans.splice(j,1);
                //alert(floorplans);
                document.getElementById(id).remove();
           
            }
        
        }
    //delete id from array
        for (var k=0;k<listIds.length;k++){
            if (listItem === listIds[k]){
                listIds.splice(k,1);
           //  alert(listIds);
                document.getElementById(listIdentifier).remove();
            }
        
        }
   
        //deleting floor from array
    for(var i=0; i<floorplanObjArray.length; i++){
       var floorplanObj = floorplanObjArray[i]
      
      if(floorplanObj.floorId == ident){
            floorplanObjArray.splice(i,1)
      }      
    }   
    //deleting rooms in array
    for(var i=0; i<roomObjectArray.length; i++){
       var roomobj = roomObjectArray[i]
      
      if(roomobj.floor === ident){
            roomObjectArray.splice(i,1)
      }      
    }
    //deleting desks in array
    for(var i=0; i<deskArray.length; i++){
       var deskobj = deskArray[i]
      
      if(deskobj.floor === ident){
            deskArray.splice(i,1)
      }      
    }
    
    //deleting original floorplan if applicable
    for(var i=0; i<originalFloors.length; i++){
      if(originalFloors[i] === ident){
            deletedFloors.push(ident)
      }      
    }
    
   ///DELETE BUILDING IF NO FLOORS ON IT 
  
   //alert(UL.childNodes.length);
            // if (UL.childNodes.length < 1){
            //     //alert("less than one");
            //     var buildToDel = document.getElementById(ancId).textContent;
            //   //  alert(ancId);
            //    document.getElementById(ancId).remove();
            //         for (var j= 0; j < buildings.length;j++){
            //             if (buildToDel === buildings[j]){
            //             buildings.splice(j,1);
            //                //alert(buildings);
            //                 }  
        
            //             }
                    
            // }
            
            
  
   
    //.alert(listItem);
   // document.getElementById(listItem).remove();
    event.stopPropagation();

  }else {
        event.stopPropagation();
    }
    
}

//adds a new floor based on image file upload
function newFloor() {

    if(!confirm('Are you sure you want to upload this floorplan?')){
        return;
    }
    var newFloorObj = new FloorplanClass();

    var building = document.getElementById("building").value;
    newFloorObj.building = building;
    var floorId = "newFloor"+floorIndex;
    newFloorObj.floorId = floorId;
    var listItemId = floorIndex;
    newFloorObj.listItemId = listItemId;
    var ancId = "anc"+floorIndex;
    newFloorObj.ancId = ancId;

    var divNew = document.getElementById("mainClass");

    floorLabel = document.getElementById("floorName").value;
    newFloorObj.name = floorLabel

    floorplans.push(floorId);
    listIds.push(listItemId);
    
    var newFloor = document.createElement("div");
    newFloor.setAttribute("id", floorId);

   // newFloorObj.floorDiv = newFloor;

    //declare max width so it doesn't overlap on sidebars
    var maxW = screen.width - 450;
    newFloor.setAttribute("style","width:" + maxW + "px");

    var newImg = document.createElement("IMG");
    newImg.setAttribute("src", storeImage);
    newImg.setAttribute("id", "newImgFloor");
    newImg.setAttribute("style","width:" + maxW + "px");

    newFloorObj.img = storeImage;
    
    
    newFloor.appendChild(newImg);

    //newFloorObj.floorDiv = newFloor

   floorplanObjArray.push(newFloorObj)
    

    //adds a function to the new floorplan to unselect active desks
    //when an area outside the desk is clicked
    $( newFloor ).on("click", (function(event) { 
        if(!$(event.target).closest('.desk').length) {
            stopActiveDesk();
        }        
        })
    );
   
    divNew.appendChild(newFloor);
    $(newFloor).hide();
    //ADD TO MENU LIST
    
    //checks to see if the floorplan being added is being added to a pre-existing building or not
    for (var i = 0; i < buildings.length; i++) {
        if (building === buildings[i]) {
            match = true;
            break;
        }
    }

    var elemToFoo; 

    //if the building does exist, we add to its submenu
    if (match === true) {
        var idUL = building + "subFloor";
        var ul = document.getElementById(idUL);
		console.log(ul)
        var li = document.createElement("li");
        li.setAttribute("id", listItemId);
        var butn = document.createElement("BUTTON");
        butn.innerHTML = "REMOVE";
        butn.setAttribute("id", listItemId);
        butn.className = "floorDeleteButton";

        butn.onclick = function() {
            //alert("is accessing");
            deleteFloor(floorId, listItemId, idUL, listItemId );
        }
        
        li.innerHTML = floorLabel;
        li.appendChild(butn);
		console.log(ul)
        ul.appendChild(li);
        //match = false;
        elemToFoo = li;

    } 
    //if the building doesn't exist, we must make a new 
    //submenu for the new building
    else if  (match === false) {

        buildings.push(building);
        var submenu = document.getElementById("floorplanSubMenu");
        var li = document.createElement("li");
        var idThing = building + "subFloor";
        
        //li.setAttribute("id", listItemId);
        var anc = document.createElement("a");
        anc.innerHTML = building;
        anc.setAttribute("id", ancId);

        var ul = document.createElement("ul");
        ul.setAttribute("id", idThing);

        var li2 = document.createElement("li");
        li2.setAttribute("href", "#");
        elemToFoo = li2;
        li2.setAttribute("id", listItemId);
        
        var butn = document.createElement("BUTTON");
        butn.innerHTML = "REMOVE";
        butn.className = "floorDeleteButton";
        /** BREAKS ADDING NEW FLOORS */
        // butn.onclick = deleteFloor();
       
        
       // butn.setAttribute("id", listItemId);
        var anc2 = document.createElement("a");
        anc2.innerHTML = floorLabel;
        //ac2.setAttribute("id", listItemId);
        anc2.appendChild(butn);

        /** BREAKS ADDING NEW FLOORS */
         butn.onclick = function() {
             // alert(listItemId);
            deleteFloor(floorId, listItemId, idThing, ancId);

        };

        li2.appendChild(anc2);
        
        ul.appendChild(li2);
        li.appendChild(anc);
        li.appendChild(ul);
        submenu.appendChild(li);
    }   
	var floorLabelTwo = floorLabel;
    elemToFoo.onclick = function() {
        floorPlan = floorId;
        for (var i = 0; i < floorplans.length; i++){
            var elem = document.getElementById(floorplans[i]);
             $(elem).hide();
        }
       var showFloorplan = document.getElementById(floorPlan);
        $(showFloorplan).show();
         // alert(floorPlan);
        document.getElementById("labelFloorPlan").innerHTML = building + floorLabelTwo;    
    };
    
    floorIndex++;
    match = false; 
   // alert(floorplans);
}

//unfocuses button after being pressed
$("#newFloorButton").click(function(event) {
    // Removes focus of the button.
    $(this).blur();
});

//shows preview of floorplan being uploaded
function previewFile(){
       var preview = document.getElementById('imgAnalyzer'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0];
       //sames as here
       
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
           storeImage = preview.src; 
           
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
            //alert(file.name);
           // storeImage = file; 
            //alert(storeImage); 
            
       } else {
           preview.src = "";
       }
     
  }

previewFile();

////////////////////////////////
/////FUNCTION FOR PRINTING 
////////////////////////////


function exportPDF() {
    var container = document.getElementById(floorPlan);
    container.style.position = "absolute";

    var cocontentToPrint = container.innerHTML;

	var newWin = window.open("", "", "width=1040,height=630");
    newWin.document.write('<html><head><title>Seating Chart</title>');
    newWin.document.write('<link rel="stylesheet" href="css/styles.css" type="text/css"/>');
    newWin.document.write('</head><body>');
	newWin.document.write(cocontentToPrint);
//        newWin.document.write('<br />');
//        newWin.document.write(secondFloor);
//        for (var i = 0; i < floorplans.length; i++){
//            var elem = document.getElementById(floorplans[i]).innerHTML;
//            newWin.document.write(elem);
//            newWin.document.write('<br />');
//            }
    newWin.document.write('</body></html>');
    
    newWin.document.close(); 

  newWin.onload=function(){ 
        newWin.focus(); 
        newWin.print();
        newWin.close();
    };

    container.style.position = "relative";

}

/////////////////////////////////////////////////
/////FUNCTION FOR LOADING PEOPLE IN FROM JSON FILE
////////////////////////////////////////////////
function readJSON(){
    
    var selectedFile = document.getElementById("jsonInput").files[0];
    var filecontent = "";

    if($('#jsonInput').val().length < 1){
    	alert("SELECT A FILE");
    	return;
    }

    if (!confirm("Are you sure you want to upload people and project data from this file?")){
    	return;
    }

    //TODO - narrow allowed file type down to JSON
	var reader = new FileReader();

	//will load after reader is called in reader.readAsText
	reader.onload = function(event) {
		filecontent = event.target.result;

		//create names once reader is loaded
		var data = JSON.parse(filecontent);
	    for (var i =0; i < data.length; i++){
	    	addPersonFromJSON(data[i].name);
                 var person = new PersonClass();
                 person.name = data[i].name;
                 person.project = "Regal";
                 person.floorplan = "HQFloor1";
                 personObjectArray.push(person);
                 localStorage.setItem("personObjectArray",JSON.stringify(personObjectArray)) //updating local storage
	    	addProjectFromJSON(data[i].project);
	    }
	}

	//will invoke onload
	reader.readAsText(selectedFile);
	
	//ADD CONFIRMATION

}

//////////////
/////////////
/////// FUNCTIONS FOR COLORING THE SOLID DESK IMAGES ///////////
///////////
/////////
///////
var tolerance = 1;
var invertRange = [0, 1];
var invertStep = 0.1;
var sepiaRange = [0, 1];
var sepiaStep = 0.1;
var saturateRange = [5, 100];
var saturateStep = 5;
var hueRotateRange = [0, 360];
var hueRotateStep = 5;
var possibleColors;
var color = document.getElementById('color');

function sepiaMatrix(s) {
	return [
		(0.393 + 0.607 * (1 - s)), (0.769 - 0.769 * (1 - s)), (0.189 - 0.189 * (1 - s)),
		(0.349 - 0.349 * (1 - s)), (0.686 + 0.314 * (1 - s)), (0.168 - 0.168 * (1 - s)),
		(0.272 - 0.272 * (1 - s)), (0.534 - 0.534 * (1 - s)), (0.131 + 0.869 * (1 - s)),
	]
}

function saturateMatrix(s) {
	return [
		0.213+0.787*s, 0.715-0.715*s, 0.072-0.072*s,
		0.213-0.213*s, 0.715+0.285*s, 0.072-0.072*s,
		0.213-0.213*s, 0.715-0.715*s, 0.072+0.928*s,
	]
}

function hueRotateMatrix(d) {
	var cos = Math.cos(d * Math.PI / 180);
	var sin = Math.sin(d * Math.PI / 180);
	var a00 = 0.213 + cos*0.787 - sin*0.213;
	var a01 = 0.715 - cos*0.715 - sin*0.715;
	var a02 = 0.072 - cos*0.072 + sin*0.928;

	var a10 = 0.213 - cos*0.213 + sin*0.143;
	var a11 = 0.715 + cos*0.285 + sin*0.140;
	var a12 = 0.072 - cos*0.072 - sin*0.283;

	var a20 = 0.213 - cos*0.213 - sin*0.787;
	var a21 = 0.715 - cos*0.715 + sin*0.715;
	var a22 = 0.072 + cos*0.928 + sin*0.072;

	return [
		a00, a01, a02,
		a10, a11, a12,
		a20, a21, a22,
	]
}

function clamp(value) {
	return value > 255 ? 255 : value < 0 ? 0 : value;
}

function filter(m, c) {
	return [
		clamp(m[0]*c[0] + m[1]*c[1] + m[2]*c[2]),
		clamp(m[3]*c[0] + m[4]*c[1] + m[5]*c[2]),
		clamp(m[6]*c[0] + m[7]*c[1] + m[8]*c[2]),
	]
}

function invertBlack(i) {
	return [
		i * 255,
		i * 255,
		i * 255,
	]
}

function generateColors() {
	let possibleColors = [];

	let invert = invertRange[0];
	for (invert; invert <= invertRange[1]; invert+=invertStep) {
		let sepia = sepiaRange[0];
		for (sepia; sepia <= sepiaRange[1]; sepia+=sepiaStep) {
			let saturate = saturateRange[0];
			for (saturate; saturate <= saturateRange[1]; saturate+=saturateStep) {
				let hueRotate = hueRotateRange[0];
				for (hueRotate; hueRotate <= hueRotateRange[1]; hueRotate+=hueRotateStep) {
					let invertColor = invertBlack(invert);
					let sepiaColor = filter(sepiaMatrix(sepia), invertColor);
					let saturateColor = filter(saturateMatrix(saturate), sepiaColor);
					let hueRotateColor = filter(hueRotateMatrix(hueRotate), saturateColor);

					let colorObject = {
						filters: { invert, sepia, saturate, hueRotate },
						color: hueRotateColor
					}

					possibleColors.push(colorObject);
				}
			}
		}
	}

	return possibleColors;
}

function getFilters(targetColor, localTolerance) {
	possibleColors = possibleColors || generateColors();

	for (var i = 0; i < possibleColors.length; i++) {
		var color = possibleColors[i].color;
		if (
			Math.abs(color[0] - targetColor[0]) < localTolerance &&
			Math.abs(color[1] - targetColor[1]) < localTolerance &&
			Math.abs(color[2] - targetColor[2]) < localTolerance
		) {
			return filters = possibleColors[i].filters;
			break;
		}
	}

	localTolerance += tolerance;
	return getFilters(targetColor, localTolerance)
}

function getNewColor(color, newImg) {

	var targetColor = color.split(',');
	targetColor = [
	    parseInt(targetColor[0]), // [R]
	    parseInt(targetColor[1]), // [G]
	    parseInt(targetColor[2]), // [B]
    ]
    var filters = getFilters(targetColor, tolerance);
    var filtersCSS = 'filter: ' +
	    'invert('+Math.floor(filters.invert*100)+'%) '+
	    'sepia('+Math.floor(filters.sepia*100)+'%) ' +
	    'saturate('+Math.floor(filters.saturate*100)+'%) ' +
	    'hue-rotate('+Math.floor(filters.hueRotate)+'deg);';
       // alert(filtersCSS);
        newImg.style = filtersCSS;
}
function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = ''+r+','+g+','+b+'';
    return result;
}

///////////////////////////////////////////////////////////////////
///////////// DATABASE LOADING FUNCTIONS  ///////////////////////////////////
///////////////////////////////////////////////////////////////////

function loadDivDesk(storedDesk) {
    floorplan = storedDesk.floor
    var mainDiv = document.getElementById(floorplan);
    mainDiv.style.position = "relative";
    var d_img = document.createElement("IMG");
    imageSource = storedDesk.image
    d_img.setAttribute("src", imageSource);

    var deskId = storedDesk.deskId
    var storedDeskIndex = deskId.replace("desk","")//extracting desk index

    d_img.setAttribute("id", deskId);
    d_img.className += "deskImg";
    d_img.style.zIndex = 97;
    
    var w = storedDesk.width
    var h = storedDesk.height
    var name = storedDesk.name
    
    //error messages 
    if (!name) {
        alert("Add Value for Name");
        exit();
    }
    if (!w) {
        alert("Add Value for Width");
        exit();
    }
    if (!h) {
        alert("Add Value for Height");
        exit();
    }
    
    
    /*Getting project and color*/
    var proj = storedDesk.project
    var color = storedDesk.color
   
    d_img.setAttribute("width", w);

    d_img.setAttribute("height", h);

    d_img.setAttribute("alt", "desk");
    
    ////////Setting Floorplan to new Floorplan ////////
    for (var j = 0; j < personObjectArray.length;j++){
        if (name === personObjectArray[j].name){
            personObjectArray[j].project = proj;
            personObjectArray[j].floorplan = floorPlan;
        }
        
    }
    
    //creating desk name
    var para = document.createElement("p");
    para.innerHTML = name;
    para.className = "deskText";
    
    //innerdiv containing image for rotatable handle
    var innerDiv = document.createElement("div");
    var divId = storedDesk.innerDiv
    innerDiv.setAttribute("id", divId);
    innerDiv.className += "innerDesk";

    //setting style
    if(storedDesk.rotate!=null){ //if there actually was rotation
        rotate = "rotate("+ storedDesk.rotate + "rad)"
        innerDiv.style.transform = rotate
    }

    //outerdiv containing innerdiv + text for draggalbe handle
    var outerDiv = document.createElement("div");
    var divId = storedDesk.outerDiv
    outerDiv.setAttribute("id", divId);
    outerDiv.className += "desk";
    // outerDiv.style.flex = "auto";
    // outerDiv.style.flexDirection = "column";

    //cancel button to quit adding all the rooms
    var btn = document.createElement('div');
    btn.className = 'deleteDeskButton';
    btn.innerHTML = '&#10005';
    btn.onclick = function (e) { 
		for(var i=0; i<deskArray.length; i++){
			var desk = deskArray[i]; //current desk being iterated through
			if(desk.outerDiv == divId){
				deskArray.splice(i,1)
			}
		}
		document.getElementById(divId).remove(); 
	};
    
    innerDiv.style.width = w;
    innerDiv.style.height = h;

    newW = parseInt(w)+0;
    newH = parseInt(h)+0;

    outerDiv.style.width = newW;
    outerDiv.style.height = newH;
    
    //SETTING DESKS TO ACTIVE AND NON ACTIVE
    $( mainDiv ).selectable({
        filter : ".desk",
        //only one selectable at a time
        selecting: function(event, ui){
            if( $(".ui-selecting").length > 1){
                  $(".ui-selecting").removeClass("ui-selecting");
            }
        },
        //just make it so you can only select using clicks
        //makes the selectable a redundant application
        //with the implemented draggable and onclick functions
        disabled: true
     });

    $(outerDiv).draggable({
        start: function(ev, ui) 
        {        
            if (!$(this).hasClass("ui-selected")) {
                //making selectable
                $(this).addClass("ui-selected");
                $(this).siblings().removeClass("ui-selected");

                var stopRotMouse = {
                    wheelRotate: false
                    };
                    $(this).children('.innerDesk').first().rotatable(stopRotMouse);
                //making rotatable
                $(this).siblings().children().children(".ui-rotatable-handle").hide();
                $(this).children('.innerDesk').first().children(".ui-rotatable-handle").show();

                //setting desk menu options
                continueActiveDesk();
                activateDeskName(storedDesk.name);
                activateDeskProject(storedDesk.project);
            } 
           
        }
    });

    $(outerDiv).click(function() {
        var stopRotMouse = {
                    wheelRotate: false
                    };
        if (!$(this).hasClass("ui-selected")) {
            $(this).addClass("ui-selected");
            $(this).siblings().removeClass("ui-selected");

            $(this).siblings().children().children(".ui-rotatable-handle").hide();
            $(this).children('.innerDesk').first().rotatable(stopRotMouse);
            $(this).children('.innerDesk').first().children(".ui-rotatable-handle").show();
            
            //setting desk menu options
            continueActiveDesk();
            activateDeskName(storedDesk.name);
            activateDeskProject(storedDesk.project);

        } else if ($(this).hasClass("ui-selected")){
            $(this).removeClass("ui-selected");
            $(this).children(".ui-rotatable-handle").hide();
            stopActiveDesk();
        }
    });


    innerDiv.appendChild(d_img);
    innerDiv.appendChild(btn);

    outerDiv.appendChild(innerDiv);
    outerDiv.appendChild(para);

    //loading position
    outerDiv.style.position = "absolute";

    var left = storedDesk.left;
    var top = storedDesk.top;
    outerDiv.style.left = left;
    outerDiv.style.top =  top;

    mainDiv.appendChild(outerDiv);

    $(outerDiv).css('z-index', '102');
    d_img.style = color
}

//loading floors
function loadFloor(savedFloor){
    var building = savedFloor.building;
    var floorId = savedFloor.floorId;
    var listItemId = savedFloor.listItemId
    var ancId = savedFloor.ancId;
    var divNew = document.getElementById("mainClass");

    floorLabel = savedFloor.name

    floorplans.push(floorId);
    listIds.push(listItemId);
    
    var newFloor = document.createElement("div");
    newFloor.setAttribute("id", floorId);

    // //declare max width so it doesn't overlap on sidebars
    var maxW = screen.width - 450;
    newFloor.setAttribute("style","width:" + maxW + "px");

    var newImg = document.createElement("IMG");
   // var savedImage = "data:image/png;base64," + savedFloor.img;
    newImg.setAttribute("src", savedFloor.img);
    newImg.setAttribute("id", "newImgFloor");
   newImg.setAttribute("style","width:" + maxW + "px");
    

    newFloor.appendChild(newImg);
    

    //adds a function to the new floorplan to unselect active desks
    //when an area outside the desk is clicked
    $( newFloor ).on("click", (function(event) { 
        if(!$(event.target).closest('.desk').length) {
            stopActiveDesk();
        }        
        })
    );
   
    divNew.appendChild(newFloor);
    $(newFloor).hide();
    //ADD TO MENU LIST
    
    // //checks to see if the floorplan being added is being added to a pre-existing building or not
    for (var i = 0; i < buildings.length; i++) {
        if (building === buildings[i]) {
            match = true;
            break;
        }else{
			match = false
		}
    }

    var elemToFoo; 

    //if the building does exist, we add to its submenu
    if (match === true) {
        var idUL = building + "subFloor";
        var ul = document.getElementById(idUL);
        var li = document.createElement("li");
        li.setAttribute("id", listItemId);
        var butn = document.createElement("BUTTON");
        butn.innerHTML = "REMOVE";
        butn.setAttribute("id", listItemId);
        butn.className = "floorDeleteButton";

        butn.onclick = function() {
            //alert("is accessing");
            deleteFloor(floorId, listItemId, idUL, listItemId );
        }
        
        li.innerHTML = floorLabel;
        li.appendChild(butn);
        ul.appendChild(li);
        //match = false;
        elemToFoo = li;

    } 
    //if the building doesn't exist, we must make a new 
    //submenu for the new building
    else if  (match === false) {

        buildings.push(building);
        var submenu = document.getElementById("floorplanSubMenu");
        var li = document.createElement("li");
        var idThing = building + "subFloor";
        
        //li.setAttribute("id", listItemId);
        var anc = document.createElement("a");
        anc.innerHTML = building;
        anc.setAttribute("id", ancId);

        var ul = document.createElement("ul");
        ul.setAttribute("id", idThing);

        var li2 = document.createElement("li");
        li2.setAttribute("href", "#");
        elemToFoo = li2;
        li2.setAttribute("id", listItemId);
        
        var butn = document.createElement("BUTTON");
        butn.innerHTML = "REMOVE";
        butn.className = "floorDeleteButton";
        /** BREAKS ADDING NEW FLOORS */
        // butn.onclick = deleteFloor();
       
        
       // butn.setAttribute("id", listItemId);
        var anc2 = document.createElement("a");
        anc2.innerHTML = floorLabel;
        //ac2.setAttribute("id", listItemId);
        anc2.appendChild(butn);

        /** BREAKS ADDING NEW FLOORS */
         butn.onclick = function() {
             // alert(listItemId);
            deleteFloor(floorId, listItemId, idThing, ancId);

        };

        li2.appendChild(anc2);
        
        ul.appendChild(li2);
        li.appendChild(anc);
        li.appendChild(ul);
        submenu.appendChild(li);
    }   
	var floorLabelTwo = floorLabel;
    elemToFoo.onclick = function() {
        floorPlan = floorId;
        for (var i = 0; i < floorplans.length; i++){
            var elem = document.getElementById(floorplans[i]);
             $(elem).hide();
        }
       var showFloorplan = document.getElementById(floorPlan);
        $(showFloorplan).show();
        document.getElementById("labelFloorPlan").innerHTML = building + floorLabelTwo;    
    };
    

    match = false; 
}

//saving stuff in local storage

function saveButton(){
    saveDesks();
    saveRooms();
    saveFloors();

    alert("Saved!")
}

//save desks in local storage
function saveDesks(){
        //going through all desks
    for(var i=0; i<deskArray.length; i++){
        var desk = deskArray[i]; //current desk being iterated through
        var outer = document.getElementById(desk.deskId);

        if(outer==null){//if desk is not present/has been deleted
            console.log("missing desk found " + i)
            deskArray.splice(i,1);
            localStorage.setItem("deskArray",JSON.stringify(deskArray)); //updating local storage
        }else{ //if desk is present
            //retrieving style info for each desk from outerdiv
            var element = document.getElementById(desk.outerDiv).getAttribute("style"); 
            console.log("style element = " + element)
            element = element.split(" ");    //taking apart style attribute of outerdiv to find left and top
            console.log("element split = " + element)
            //assigning to desk attributes
            for(var j=0; j<element.length; j++){ //going through style attribute array
                if(element[j] === "top:"){
                    desk.top = element[j+1].replace('px;',''); //looking at the next array element over for the top value
                    console.log("desk top = " + desk.top)
                }
                if(element[j] === "left:"){
                    desk.left = element[j+1].replace('px;',''); //looking at the next array element over for left value
                    console.log("desk left = " + desk.left)
                }
            }

            //finding width and height and assigning to desk attributes
            deskImg = document.getElementById(desk.deskId)
            desk.width = deskImg.getAttribute("width")
            desk.height = deskImg.getAttribute("height")

            //assigning rotate to desk object
            //retrieving style info for each desk from innerdiv
            element = document.getElementById(desk.innerDiv).getAttribute("style");
            element = element.split(" ") //taking apart style attribute to find rotate later on
           
            if(element.length<6){
                desk.rotate = null; //no rotation
            }else{
                var rotateRad = element[5]
                rotateRad = rotateRad.replace('rotate(','') //cleaning up
                rotateRad = rotateRad.replace('rad);','')
                desk.rotate = rotateRad
            }

            //retrieving style info for each desk from deskdiv
            element = document.getElementById(desk.deskId).getAttribute("style");
          // console.log(element)
            desk.color = element

            //looking for edits
            element = document.getElementById(desk.outerDiv).getElementsByClassName('deskText')[0] //desktext
            
            element = element.innerHTML
            
            desk.name = element
        }
    }

    localStorage.setItem("deskArray",JSON.stringify(deskArray)) //updating local storage
    localStorage.setItem("deskIndex",deskIndex)
}


function saveRooms(){
    //going through all rooms
    for(var i=0; i<roomObjectArray.length; i++){
        var room = roomObjectArray[i]; //current desk
        var roomElement = document.getElementById(room.roomId);

        if(roomElement==null){//if desk is not present/has been deleted
            roomObjectArray.splice(i,1);
            localStorage.setItem("roomObjectArray",JSON.stringify(roomObjectArray)); //updating local storage
        }else{ //if desk is present
            //retrieving style info
                    //position: absolute; left: 664px; top: 264px; //example of element retrieved for reference
            var element = document.getElementById(room.roomId).getAttribute("style"); 
            element = element.split(" ");    //taking apart style attribute of outerdiv to find left and top
            //assigning to desk attributes
            for(var j=0; j<element.length; j++){ //going through style attribute array
                if(element[j] === "top:"){
                    room.top = element[j+1].replace('px;',''); //looking at the next array element over for the top value
                }
                if(element[j] === "left:"){
                    room.left = element[j+1].replace('px;',''); //looking at the next array element over for left value
                }
                if(element[j]==="width:"){
                    room.width = element[j+1].replace('px;','');
                }
                if(element[j]==="height:"){
                    room.height = element[j+1].replace('px;','');
                }
            }
        }   
    }
    localStorage.setItem("roomObjectArray",JSON.stringify(roomObjectArray))
    localStorage.setItem("roomIndex",roomIndex)
}

//saving floors and buildings
function saveFloors(){
    for(var i=0; i<floorplanObjArray.length; i++){
       var floorplanObj = floorplanObjArray[i]
       var div = document.getElementById(floorplanObj.floorId).innerHTML
       floorplanObj.floorDiv = div;        
    }   

    localStorage.setItem("floorplanObjArray",JSON.stringify(floorplanObjArray))
	localStorage.setItem("floorplans",JSON.stringify(floorplans))
    localStorage.setItem("deletedFloors",JSON.stringify(deletedFloors))
    localStorage.setItem("floorIndex",floorIndex)
}