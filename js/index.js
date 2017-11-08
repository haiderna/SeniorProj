DevExpress.viz.currentTheme('generic.light');
window.onload = function() {
    document.body.style.backgroundImage = "url('ihttps://i.pinimg.com/originals/c9/b7/60/c9b7600c6075039fddb6e1e1993daede.gif')";
    var viewModel = {
		//vectorMapOptions is the name of the dxVectorMap element we created
        vectorMapOptions: {
            
            maxZoomFactor: 4,
            projection: DevExpress.viz.map.projection({
                to: function (coordinates) {
                    return [coordinates[0] / 100, coordinates[1] / 100];
                },
    
                from: function (coordinates) {
                    return [coordinates[0] * 100, coordinates[1] * 100];
                }
            }),
            layers: [{
                hoverEnabled: false, 
                dataSource: buildingData, //making the building outlines
                name: "building"
            }, {
                color: "transparent",
                borderWidth: 1,
                label: {
                    enabled: true,
                    dataField: "name"
                },
                dataSource: roomsData, //making each of the rooms 
                name: "rooms"
            }],
			//hovering tooltip to display square footage over rooms 
			//can further customize to show who is sitting where
            tooltip: {
                enabled: true,
                customizeTooltip: function (arg) {
                    if(arg.layer.name === "rooms")
                        return { text: "Square: " + arg.attribute("square") + " ft&#178" };
                }
            }
        }
    };
    
    ko.applyBindings(viewModel, $("#vector-map-demo").get(0));
    
};