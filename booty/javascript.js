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
    initializeActiveDeskMenu();
    
    //selects 1st desk as default
    singleDesk();

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


 function insertRoom() {
    var mainDiv = document.getElementById(floorPlan);
     
 	//create the div to be draggable
 	var room = document.createElement('div');
 	room.className = 'room';

 	//cancel button to quit adding all the rooms
 	var cancel = document.createElement('div');
 	cancel.className = 'cancel';
 	cancel.innerHTML = '&#10005';
 	cancel.onclick = function (e) { room.parentNode.removeChild(room) };
 	room.appendChild(cancel);

 	var span = document.createElement('span');
 	span.className = 'deskCount';
 	room.appendChild(span);

 	room.style.position = "absolute";
    var left = mainDiv.offsetLeft;	
    var top = mainDiv.offsetTop;
    left = left + ($(mainDiv).width() / 2);
    top = top + ($(mainDiv).height() / 4);
    room.style.left = left;
    room.style.top =  top;

 	mainDiv.append(room);
 	$( '.room' ).draggable({ containment: 'parent' }).resizable();
}

function deleteRoom() {
    
	//get all rooms
	var rooms = document.getElementsByClassName('room');

	// //add delete buttons to all rooms
	// for (var i = 0; i < rooms.length; i++) {
	//   var cancel = document.createElement("div");
	//   cancel.className = 'cancel';
	//   var curr = rooms[i];
	//   cancel.onclick = function (e) { curr.parentNode.removeChild(curr) };
	//   curr.appendChild(cancel);
	// }//end for

	$('.cancel').css('visibility', 'visible');

	//show button to remove delete buttons
	var quit = document.getElementById('stopDeletingButton');
	var stopAnchor = document.getElementById('stopAnchor');
	quit.style.display = "block";
	stopAnchor.style.padding = "10px 10px 10px 20px";
	stopAnchor.style.margin = "0px";
	stopAnchor.style.visibility = "visible";
}

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

function continueEdit() {
	if ($('#editSubmenu').attr('aria-expanded') == "false") {
		$('.room').droppable("destroy");
		$('.room').draggable("enable");
		$('.room').resizable("enable");

		//moving desks behind rooms
		$('.desk').css('z-index', '90'); 
	}
}

function continueActiveDesk(){
    $('#currentDesk').toggle(true);
    $('#inactiveDeskMessage').toggle(false);
}

function stopActiveDesk(){
    $('#currentDesk').toggle(false);
    $('#inactiveDeskMessage').toggle(true);
}

var deskIndex = 0;
function insertDivDesk() {
    var mainDiv = document.getElementById(floorPlan);
    mainDiv.style.position = "relative";
    var Desk = new DeskClass();
    var y = document.createElement("IMG");
    y.setAttribute("src", imageSource);
    Desk.image = imageSource;
   // y.setAttribute("id","desk");
   // y.style.background = "blue";
   
    var deskId = "desk"+deskIndex;
    y.setAttribute("id", deskId);
    y.className += "deskImg";
    y.style.zIndex = 97;
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
    
    // alert(w);
    Desk.name = name;

    /*Getting project and color*/
    var proj = $('#projectDropdown option:selected').text();
    var color = $('#projectDropdown option:selected').val();
   // alert("Project name is: " + proj + "- Project colour is: " + color); //comment out when done
    
    if (!color) {
        alert("Add Project");
            exit();
    }
    
    //y.style.background = color;
   
    Desk.project = proj;
    
        if (isNaN(w) || w > 200) {
            //y.setAttribute("width", "100");
            alert("Add proper width with a max size of 200");
            exit();
            } else {
                 y.setAttribute("width", w);
                 }

        if (isNaN(h) || h > 200) {
           // y.setAttribute("height", "100");
            alert("Add proper height with a max size of 200");
            exit();
            } else {
            y.setAttribute("height", h);
            }
    
    y.setAttribute("alt", "desk");
    
    //////
    //////
    //Setting Floorplan to new Floorplan 
    ////////
    ////////
    for (var j = 0; j < personObjectArray.length;j++){
        if (name === personObjectArray[j].name){
            personObjectArray[j].project = proj;
            personObjectArray[j].floorplan = floorPlan;
        }
        
    }
    
    

    var para = document.createElement("p");
    var node = document.createTextNode(name);
    para.style.zIndex = 98;
    para.appendChild(node);
    
    var testDiv = document.createElement("div");
    var divId = "testDiv"+deskIndex;
    testDiv.setAttribute("id", divId);
    testDiv.className += "desk";

    //cancel button to quit adding all the rooms
    var btn = document.createElement('div');
    btn.className = 'deleteDeskButton';
    btn.innerHTML = '&#10005';
    btn.onclick = function (e) { document.getElementById(divId).remove(); };
    
    testDiv.style.width = w;
    testDiv.style.height = h;
    
    //SETTING DESKS TO ACTIVE AND NON ACTIVE
    $( mainDiv ).selectable({
        filter : ".desk"
     });

    $(testDiv).draggable({
        start: function(ev, ui) 
        {        
            if (!$(this).hasClass("ui-selected")) {
                //making selectable
                $(this).addClass("ui-selected").siblings().removeClass("ui-selected");

                //making rotatable
                $(this).siblings().children(".ui-rotatable-handle").hide();
                $(this).rotatable();
                $(this).children(".ui-rotatable-handle").show();

                //setting desk menu options
                continueActiveDesk();
                activateDeskName(Desk.name);
                activateDeskProject(Desk.project);
            } 
        }
    });

    $(testDiv).click(function() {
        if (!$(this).hasClass("ui-selected")) {
            $(this).addClass("ui-selected").siblings().removeClass("ui-selected");
            $(this).siblings().children(".ui-rotatable-handle").hide();
            $(this).rotatable();
            $(this).children(".ui-rotatable-handle").show();
            
            //setting desk menu options
            continueActiveDesk();
            activateDeskName(Desk.name);
            activateDeskProject(Desk.project);

        } else if ($(this).hasClass("ui-selected")){
            $(this).removeClass("ui-selected");
            $(this).children(".ui-rotatable-handle").hide();
            stopActiveDesk();
        }
    });

    testDiv.appendChild(y);
    
    testDiv.appendChild(para);
    //set Label over Desk
     para.style.color = "black";
     para.style.position = "absolute";
 	para.style.top = '10px';
    testDiv.appendChild(btn);

    //positioning to a more central position
    testDiv.style.position = "absolute";
    var left = mainDiv.offsetLeft;	
    var top = mainDiv.offsetTop;
    left = left + ($(mainDiv).width() / 2);
    top = top + ($(mainDiv).height() / 4);
    testDiv.style.left = left;
    testDiv.style.top =  top;

    mainDiv.appendChild(testDiv);
    // testDiv.appendTo(mainDiv);

    var convertedR = convertHex(color,50);
   // alert(convertedR);
    getNewColor(convertedR, y);
    $(testDiv).css('z-index', '102');
   
     // alert(divId);
    deskIndex++;
    addPersonFromDeskMenu();
    //alert(testDiv.style.width);
}

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

    desk = desks[0];
    desk.getElementsByTagName("p")[0].innerHTML = new_name;
    var img = desk.getElementsByTagName("IMG")[0];
    //var divEd = desk.getElementsByTagName("div")[0];
    var convertedR = convertHex(new_proj,50);
    getNewColor(convertedR,img);
    img.setAttribute("width", w);
    img.setAttribute("height", h);
    
    w = parseInt(w)+0;
    h = parseInt(h)+0;
    alert(w);
    desk.style.width = w;
    desk.style.height = h;
    //getNewColor(new_proj, img);

}

// $(document).on("click", (function(event) { 
//     if(!$(event.target).closest('.desk').length) {
//         stopActiveDesk();
//     }        
//     })
// );

//add desk button is called exportbutton for some reason
function updateAddDeskButton() {
    if (isDeskReady()) {
        $('#ExportButton').attr('disabled', false);
    } else {
        $('#ExportButton').attr('disabled', true);
    }
}

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
var floorIndex = 0;

function deleteFloor(ident, listIdentifier) {
    //alert(floorplans);
  if (confirm("You sure you want to delete?")) {
        var id = ident;
        var listItem = listIdentifier;
    //delete floor plan from array 
        for (var j= 0; j < floorplans.length;j++){
            if (id === floorplans[j]){
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
    
    
    //.alert(listItem);
   // document.getElementById(listItem).remove();
    event.stopPropagation();
  }else {
        event.stopPropagation();
    }
    
}


function newFloor() {

    if(!confirm('Are you sure you want to upload this floorplan?')){
        return;
    }

    var building = document.getElementById("building").value;
    var floorId = "newFloor"+floorIndex;
    var listItemId = floorIndex;
    var divNew = document.getElementById("mainClass");

    floorLabel = document.getElementById("floorName").value;

    floorplans.push(floorId);
    listIds.push(listItemId);
    
    var newFloor = document.createElement("div");
    newFloor.setAttribute("id", floorId);

    var newImg = document.createElement("IMG");
    newImg.setAttribute("src", storeImage);
    newImg.setAttribute("id", "newImgFloor");

    newFloor.appendChild(newImg);
   
    divNew.appendChild(newFloor);
    $(newFloor).hide();
    //ADD TO MENU LIST
    
    for (var i = 0; i < buildings.length; i++) {
        if (building === buildings[i]) {
            match = true;
        }
        
    }

    var elemToFoo; 

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
            deleteFloor(floorId, listItemId);
        }
        li.innerHTML = floorLabel;
        li.appendChild(butn);
        ul.appendChild(li);
        //match = false;
        elemToFoo = li;

    } else if  (match === false) {

        buildings.push(building);
        var submenu = document.getElementById("floorplanSubMenu");
        var li = document.createElement("li");
        var idThing = building + "subFloor";
        
        //li.setAttribute("id", listItemId);
        var anc = document.createElement("a");
        anc.innerHTML = building;

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
            deleteFloor(floorId, listItemId);
          //  document.getElementById(listItemId).remove();
            //take it out of array 
            
        };

        li2.appendChild(anc2);
        
        ul.appendChild(li2);
        li.appendChild(anc);
        li.appendChild(ul);
        submenu.appendChild(li);
    }   

    elemToFoo.onclick = function() {
        floorPlan = floorId;
        for (var i = 0; i < floorplans.length; i++){
            var elem = document.getElementById(floorplans[i]);
             $(elem).hide();
        }
       var showFloorplan = document.getElementById(floorPlan);
        $(showFloorplan).show();
         // alert(floorPlan);
        document.getElementById("labelFloorPlan").innerHTML = building + floorLabel;  
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


function newFloorMenu2() {
     floorPlan = "newFloor0";
        for (var i = 0; i < floorplans.length; i++){
            var elem = document.getElementById(floorplans[i]);
             $(elem).hide();
        }
       var showFloorplan = document.getElementById(floorPlan);
        $(showFloorplan).show();
         alert(floorPlan);
      
}


//function newFloorMenu() {
//    if (storeImage === " ") {
//        alert("no new floor");
//        
//    } else {
//        floorPlan = "newFloor";
//        for (var i = 0; i < floorplans.length; i++){
//            var elem = document.getElementById(floorplans[i]);
//             $(elem).hide();
//        }
//        var newFl = document.getElementById("newFloor");
//        $(newFl).show();
//        
//    } 
//}


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
      var contentToPrint = document.getElementById(floorPlan).innerHTML;
	var newWin = window.open("", "", "width=1056,height=714");
    newWin.document.write('<html><head><title>Seating Chart</title>');
    newWin.document.write('<link rel="stylesheet" href="styles.css" type="text/css" />');
    newWin.document.write('</head><body>');
	newWin.document.write(contentToPrint);
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
	    	addProjectFromJSON(data[i].project);
	    }
	}

	//will invoke onload
	reader.readAsText(selectedFile);
	
	//ADD CONFIRMATION

}

//////////////
/////////////
/////// FUNCTIONS FOR COLORS ///////////
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