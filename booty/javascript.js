$(document).ready(function () {

	//prepares the sidebar collapse buttons
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('#rightSidebarCollapse').on('click', function () {
        $('#right-sidebar').toggleClass('active');
        $('#right-main').toggleClass('active');
    });

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
}

function continueEdit() {
	if ($('#editSubmenu').attr('aria-expanded') == "false") {
		$('.room').draggable("enable");
		$('.room').resizable("enable");
	}
}