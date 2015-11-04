var URL = "http://homepage.mac.com/quartzcomposer/data/cities.xml";

/* requestData()
/* request the XML data using XMLHttpRequest
 */
function requestData() {
	// Create the XMLHttpRequest
	request = new XMLHttpRequest();
	// Specify the callback function
	request.onreadystatechange = processRequestChange;
	// Specify the mime type
	request.overrideMimeType("text/xml");	
	request.open("GET", URL, true);
	request.send(null);
}

/* processRequestChange()
 * Parse the response from the XMLHttpRequest if the data has been loaded
 */
function processRequestChange() {
    // If the data has been loaded.
    if (request.readyState == 4) {
		// And the data is ok.
		if (request.status == 200)
			// parse the response
			parseResponse(request.responseXML.documentElement);
    } 
}

/* parseResponse(element)
 * Parse the response and pass the data to the Quartz Composition
 */
function parseResponse(element) {
	// Create the array which we will populate with the data from the XMLHttpRequest
	var cities = new Array();
	
	// Get the list of "city" elements
	var cityNodeList = element.getElementsByTagName("city");
	// For each cityNode in the cityNodeList
	for (i=0; i<cityNodeList.length; ++i) {
		// Get the relevent DOM nodes
		var cityNode = cityNodeList[i];
		var nameNode = cityNode.getElementsByTagName("name")[0];
		var valueNode = cityNode.getElementsByTagName("value")[0];
		
		// Create the city object, populate it and add it to the cities array
		var city = new Object();
		city.name = nameNode.textContent;
		city.value = valueNode.textContent;
		cities[i] = city;
	}
	
	// Update the data
	
	
	// update the composition with the newly fetched data
	var graphComposition = document.getElementById("composition");
	if (graphComposition) {
		graphComposition.setInputValue("Data", cities);
	}
	// update the status text
	statusText.innerText = "Data loaded from... " + URL;
}

/* updateCompositionData()
 * Update the composition's data with the data fetched by the XMLHttpRequest
 

/* updateCompositionWatermark()
 * Update the composition's watermark with the value passed by the slider
 */
function updateCompositionWatermark(value) {
	composition.setInputValue("Watermark", value);
}

/* updateCompositionTransform()
 * Update the composition's transform with the value passed by the slider
 */
function updateCompositionTransform(value) { 
	composition.setInputValue("Transform", value);
}

function load()
{
	setupParts();
	statusText.innerText = "Loading data from... " + URL;
	// Load the composition data
	requestData();
}

function remove()
{
	// your widget has just been removed from the layer
	// remove any preferences as needed
	// widget.setPreferenceForKey(null, createInstancePreferenceKey("your-key"));
}

function hide()
{
	// your widget has just been hidden stop any timers to
	// prevent cpu usage
	
	// Get all composition elements and pause or stop them
	var compositions = document.getElementsByTagName("embed");
	for (var f=0; f < compositions.length; f++) {
		if (compositions[f].type == "application/x-quartzcomposer" && !compositions[f].paused()) {
			if (attributes.pauseResume == 0)
				compositions[f].pause();
			else	
				compositions[f].stop();
		}
	}
}

function show()
{
	// your widget has just been shown.  restart any timers
	// and adjust your interface as needed
	
	// Get all composition elements and play them
	var compositions = document.getElementsByTagName("embed");
	for (var f=0; f < compositions.length; f++) {
		if (compositions[f].type == "application/x-quartzcomposer" && 
			(!compositions[f].playing() || compositions[f].paused())) {
			compositions[f].play();
		}
	}
	
	// Refresh the composition data
	requestData();
}

function sync()
{
	// your widget has just been synchronized with .Mac
    // retrieve any preference values that you need to be synchronized here, use this for an instance key's value :
	// instancePreferenceValue = widget.preferenceForKey(null, createInstancePreferenceKey("your-key"));
    //
    // or this for global key's value :
	// globalPreferenceValue = widget.preferenceForKey(null, "your-key");    
}

function showBack(event)
{
	// your widget needs to show the back

	var front = document.getElementById("front");
	var back = document.getElementById("back");

	if (window.widget)
		widget.prepareForTransition("ToBack");

	front.style.display="none";
	back.style.display="block";
	
	if (window.widget)
		setTimeout('widget.performTransition();', 0);
}

function showFront(event)
{
	// your widget needs to show the front

	var front = document.getElementById("front");
	var back = document.getElementById("back");

	if (window.widget)
		widget.prepareForTransition("ToFront");

	front.style.display="block";
	back.style.display="none";
	
	if (window.widget)
		setTimeout('widget.performTransition();', 0);
		
	// Refresh the composition data
	requestData();
}

if (window.widget)
{
	widget.onremove = remove;
	widget.onhide = hide;
	widget.onshow = show;
    widget.onsync = sync;
}
