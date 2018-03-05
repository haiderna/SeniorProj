var imageSource = "";

//Create Desk Image and Have it be dragged around floorplan
function deskImage() {
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
//    var w = document.getElementById("deskWidth").value;
//    var h = document.getElementById("deskHeight").value;
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
    
    //svg that's draggable 
    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttributeNS('http://www.w3.org/2000/svg','xlink','http://www.w3.org/1999/xlink');
    svg.setAttributeNS('http://www.w3.org/2000/svg','height','500');
    svg.setAttributeNS('http://www.w3.org/2000/svg','width','500');
    svg.setAttributeNS('http://www.w3.org/2000/svg','id','test2');

    $(svg).draggable().parent().resizable();

    var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
    svgimg.setAttributeNS('http://www.w3.org/2000/svg','height','500');
    svgimg.setAttributeNS('http://www.w3.org/2000/svg','width','500');
    svgimg.setAttributeNS('http://www.w3.org/2000/svg','id','testimg2');
    svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href','https://78.media.tumblr.com/4371d6289b514982cefd904908c5af4e/tumblr_p0efc7WWKA1wstv1oo1_75sq.png');
    svgimg.setAttributeNS('http://www.w3.org/2000/svg','x','0');
    svgimg.setAttributeNS('http://www.w3.org/2000/svg','y','0');



svg.appendChild(svgimg);
     //tried adding to document
    document.body.appendChild(svg);
    
    //tried adding to floorplan SVG
    // var svgMain = document.getElementById("mainSVG");
    // svgMain.appendChild(svg);
    
    //
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

//dynamic search
    function myFunction() {
        // Declare variables
        var input, filter, ul, li, a, i;
        input = document.getElementById('myInput');
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }