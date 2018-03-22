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
 	//create the div to be draggable
 	var room = document.createElement('div');
 	room.className = 'room';
 	room.style.display = "block";

 	//cancel button to quit adding all the rooms
 	var cancel = document.createElement('div');
 	cancel.className = 'cancel';
 	cancel.innerHTML = '&#10005';
 	cancel.onclick = function (e) { room.parentNode.removeChild(room) };
 	room.appendChild(cancel);

 	$('#main').append(room);
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
	$('.room').droppable();
	
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


function insertDesk() {
	var newdesk = document.createElement('div');
	newdesk.className = "desk";
	//styling handled in css 
	// newdesk.style.background-color = "red";
	// newdesk.style.width = "50px";
	// newdesk.style.height = "50px";

	$('#main').append(newdesk);
	$('.desk').draggable({ containment: 'parent' });

	// ===================== BELOW =========== other version
    //     var deskTest = new DeskClass();
    //     var personAdded = new PersonClass();
    //     personAdded.name = document.getElementById("name").value;
    //     deskTest.name = personAdded.name;
    //     personArray.push(personAdded);
    //     var w = document.getElementById("deskWidth").value;
    //     var h = document.getElementById("deskHeight").value;
        
    //     var x = document.createElement("IMG");
    //     x.setAttribute("src", imageSource);
    //     if (isNaN(w)) {
    //         x.setAttribute("width", "100");
    //     } else {
    //         x.setAttribute("width", w);
    //     }
        
    // if (isNaN(h)) {
    //         x.setAttribute("height", "100");
    //     } else {
    //         x.setAttribute("height", h);
    //     }    

    //     document.body.appendChild(x);
    //     $(x).resizable().parent().draggable();
}

var deskIndex = 0;
function insertDivDesk() {
    var Desk = new DeskClass();
    var y = document.createElement("IMG");
    y.setAttribute("src", imageSource);
    Desk.image = imageSource;
   // y.setAttribute("id","desk");
   // y.style.background = "blue";
   
    var deskId = "desk"+deskIndex;
    y.setAttribute("id", deskId);
    var w = document.getElementById("deskWidth").value;
    var h = document.getElementById("deskHeight").value;
    var name = document.getElementById("name").value;
    Desk.name = name;

    /*Getting project and color*/
    var proj = $('#projectDropdown option:selected').text();
    var color = $('#projectDropdown option:selected').val();
    alert("Project name is: " + proj + "- Project colour is: " + color); //comment out when done
    
    y.style.background = color;
    Desk.project = proj;
    
        if (isNaN(w)) {
            y.setAttribute("width", "100");
            } else {
                 y.setAttribute("width", w);
                 }

        if (isNaN(h)) {
            y.setAttribute("height", "100");
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


    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("X");
    btn.onclick = function() {alert('Clicked!'+divId);
        document.getElementById(divId).remove();
     };
    btn.appendChild(t);
    
   
   
    testDiv.style.width = w;
    testDiv.style.height = h;
    
	$(testDiv).rotatable().draggable();

    
    testDiv.appendChild(y);
    testDiv.appendChild(para);
    testDiv.appendChild(btn);
    document.body.appendChild(testDiv);
    
    
    
    alert(divId);
    deskIndex++;
    alert(testDiv.style.width);
}
