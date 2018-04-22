$(document).ready(function () {

	//prepares the sidebar collapse buttons
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('#rightSidebarCollapse').on('click', function () {
        $('#right-sidebar').toggleClass('active');
        $('#right-main').toggleClass('active');
    });

    $("#name").typeahead().data('typeahead').source = personArray;

	addToPersonList(personArray);
	initializeProjectList(projectArray);

	initDeskProjectDropdown(projectArray);
	
	addColorPicker();
	loadColorsIntoColorPickers();

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


//function insertDesk() {
//	var newdesk = document.createElement('div');
//	newdesk.className = "desk";
//	//styling handled in css 
//	// newdesk.style.background-color = "red";
//	// newdesk.style.width = "50px";
//	// newdesk.style.height = "50px";
//
//	$('#main').append(newdesk);
//	$('.desk').draggable({ containment: 'parent' });
//
//	// ===================== BELOW =========== other version
//    //     var deskTest = new DeskClass();
//    //     var personAdded = new PersonClass();
//    //     personAdded.name = document.getElementById("name").value;
//    //     deskTest.name = personAdded.name;
//    //     personArray.push(personAdded);
//    //     var w = document.getElementById("deskWidth").value;
//    //     var h = document.getElementById("deskHeight").value;
//        
//    //     var x = document.createElement("IMG");
//    //     x.setAttribute("src", imageSource);
//    //     if (isNaN(w)) {
//    //         x.setAttribute("width", "100");
//    //     } else {
//    //         x.setAttribute("width", w);
//    //     }
//        
//    // if (isNaN(h)) {
//    //         x.setAttribute("height", "100");
//    //     } else {
//    //         x.setAttribute("height", h);
//    //     }    
//
//    //     document.body.appendChild(x);
//    //     $(x).resizable().parent().draggable();
//}

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
     for (var i = 0; i < personObjectArray.length; i++){
         if (name === personObjectArray[i].name) {
             personObjectArray[i].project = proj;
             personObjectArray[i].floorplan = floorPlan;
         }
     }
    
    //y.style.background = color;
   
    Desk.project = proj;
    
        if (isNaN(w)) {
            //y.setAttribute("width", "100");
            alert("Add Proper Width");
            exit();
            } else {
                 y.setAttribute("width", w);
                 }

        if (isNaN(h)) {
           // y.setAttribute("height", "100");
            alert("Add Proper Height");
            exit();
            } else {
            y.setAttribute("height", h);
            }
    
    y.setAttribute("alt", "desk");

    var para = document.createElement("p");
    var node = document.createTextNode(name);
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
    
    // $(testDiv).rotatable().draggable();

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
                //making deletable once selected
                $('.cancel').css('visibility', 'visible');
            } 
        }
    });

    $(testDiv).click(function() {
        if (!$(this).hasClass("ui-selected")) {
            $(this).addClass("ui-selected").siblings().removeClass("ui-selected");
            $(this).siblings().children(".ui-rotatable-handle").hide();
            $(this).rotatable();
            $(this).children(".ui-rotatable-handle").show();
        } else if ($(this).hasClass("ui-selected")){
            $(this).removeClass("ui-selected");
            $(this).children(".ui-rotatable-handle").hide();
        }
    });

    testDiv.appendChild(y);
    
    testDiv.appendChild(para);
    //set Label over Desk
     para.style.color = "black";
    // para.style.position = "absolute";
 	//para.style.top = '10px';
    testDiv.appendChild(btn);

    //positioning to a more central position
    testDiv.style.position = "absolute";
    var left = mainDiv.offsetLeft;	
    var top = mainDiv.offsetTop;
    left = left + ($(mainDiv).width() / 4);
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
    //alert(testDiv.style.width);
}

// $(".desk").selectable();
    
// $(".desk.selectable").draggable({
//     start: function(ev, ui) 
//     {        
//         if( !$(this).hasClass("ui-selected")) 
//         {
//             $(this).addClass("ui-selected").siblings().removeClass("ui-selected");
//         }
//     }
// });

// $(".desk.selectable").click(function() {
//     if (!$(this).hasClass("ui-selected")) {
//         $(this).addClass("ui-selected").siblings().removeClass("ui-selected");
//     }
// })

////////////////////////////////
/////FUNCTION FOR CREATING NEW FLOOR PLAN 
////////////////////////////
var buildings = ["HQ", "Treehouse", "Watchtower"]
var match = false;

var storeImage = " ";
var floorIndex = 0;
function newFloor() {
    var building = document.getElementById("building").value;
    var floorName = document.getElementById("floorName").value;
    var floorId = "newFloor"+floorIndex;
    var divNew = document.getElementById("mainClass");
   // alert(storeImage);
    floorplans.push(floorId);
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
            var idUL = building + "subFloor";
            var ul = document.getElementById(idUL);
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(floorName));
            ul.appendChild(li);
            //match = false;
        }
        
    }
    
    
//    if (building=="HQ") {
//         var ul = document.getElementById("HQsubFloor");
//          var li = document.createElement("li");
//           li.appendChild(document.createTextNode(floorId));
//           ul.appendChild(li);
//    }
//    else if (building=="Treehouse") {
//         var ul = document.getElementById("TreehousesubFloor");
//          var li = document.createElement("li");
//           li.appendChild(document.createTextNode(floorId));
//           ul.appendChild(li);
//    }
//    else if (building=="Watchtower") {
//         var ul = document.getElementById("WatchtowersubFloor");
//          var li = document.createElement("li");
//           li.appendChild(document.createTextNode(floorId));
//           ul.appendChild(li);
//    }
    if (match === false) {
    buildings.push(building);
    var ul = document.getElementById("floorplanSubMenu");
    var ul2 = document.createElement("ul");
    var idUL = building + "subFloor";
    ul2.setAttribute("id", idUL);
    ul2.appendChild(document.createTextNode(building));
   // ul2.style.background = "#375172";
    ul2.style.padding = "10px";
    var li = document.createElement("li");
    li.style.background = "#223547";
    li.appendChild(document.createTextNode(floorName));
    
    ul.appendChild(ul2);
    ul2.appendChild(li);
    
}
    li.onclick = function() {
        floorPlan = floorId;
        for (var i = 0; i < floorplans.length; i++){
            var elem = document.getElementById(floorplans[i]);
             $(elem).hide();
        }
       var showFloorplan = document.getElementById(floorPlan);
        $(showFloorplan).show();
        // alert(floorPlan);
     };
//    ul2.appendChild(li);
//    ul.appendChild(ul2);
     
  //  ul.appendChild(li);
    
    floorIndex++;
    match = false; 
    alert("New FloorPlan Added");
}

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
       // alert(personObjectArray.length);
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