// This file was generated by Dashcode from Apple Computer, Inc.
// You may edit this file to customize your Dashboard widget.

function load()
{
	setupParts();
	updateChartData();	
}

/*
 * updateChartData()
 * Generates a three item array of objects with the keys "label" and "value" 
 * which correspond to the Chart's individual bar labels and height.  
 * This array is then set on the Chart's published input with the keyname "Data".   
 */
function updateChartData() {
	var chart = document.getElementById("composition");
	var chartData = new Array(3);

if (chart) {
		var entry0 = new Object();
		entry0.label = "San Francisco";
		entry0.value = 0.5;
		chartData[0] = entry0;

		var entry1 = new Object;
		entry1.label = "Los Angeles";
		entry1.value = 0.2;
		chartData[1] = entry1;

		var entry2 = new Object;
		entry2.label = "New York";
		entry2.value = 0.7;
		chartData[2] = entry2;
		
		// Set the Chart's published input with the keyname "Data" to our newly created Data Array
		chart.setInputValue("Data", chartData);
	}
}

function remove()
{
	// your widget has just been removed from the layer
	// remove any preferences as needed
	// widget.setPreferenceForKey(null, "your-key");
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
		
	// Give the composition time to load and then update the Chart's Data	
	setTimeout('updateChartData()', 250);		
}

/*
 getLocalizedString() pulls a string out an array named localizedStrings.  Each language project directory in this widget contains a file named "localizedStrings.js", which, in turn, contains an array called localizedStrings.  This method queries the array of the file of whichever language has highest precedence, according to the International pane of System Preferences.
*/
function getLocalizedString(string)
{
	try { string = localizedStrings[string] || string; } catch (e) {}
	return string;
}

if (window.widget)
{
	widget.onremove = remove;
	widget.onhide = hide;
	widget.onshow = show;
}
