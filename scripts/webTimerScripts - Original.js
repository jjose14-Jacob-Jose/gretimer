/*
Constants values
*/
var LBL_FOR_TIMER_DURATION = "Timer Duration";
var LBL_FOR_TIME_TYPE = "Timer Type";

var TEXT_FOR_TIMER_DURATION_TYPE = "number";

var CSS_CLASS_FOR_TIMER_DURATION_ELEMENTS = "div_timer_duration";

var ID_FOR_RADIO_BUTTON_TYPE="radioButton_timerType";

function clearAllTimers()
{
	var clearingValue = "";
	document.getElementById("txt_timer_1_minutes").value = clearingValue;
	document.getElementById("txt_timer_2_minutes").value = clearingValue;
	document.getElementById("txt_timer_3_minutes").value = clearingValue;
	document.getElementById("txt_timer_4_minutes").value = clearingValue;
	document.getElementById("txt_timer_5_minutes").value = clearingValue;
	document.getElementById("txt_timer_6_minutes").value = clearingValue;
	document.getElementById("txt_timer_7_minutes").value = clearingValue;
	document.getElementById("txt_timer_8_minutes").value = clearingValue;
	document.getElementById("txt_timer_9_minutes").value = clearingValue;
	document.getElementById("txt_timer_10_minutes").value = clearingValue;

}
		
function loadDefaultValues()
{
	document.getElementById("txt_timer_1_minutes").value = getRadioButtonValueFromArray(document.getElementsByName('timer_1_type'));
	document.getElementById("txt_timer_2_minutes").value = getRadioButtonValueFromArray(document.getElementsByName('timer_2_type'));
	document.getElementById("txt_timer_3_minutes").value = getRadioButtonValueFromArray(document.getElementsByName('timer_3_type'));
	document.getElementById("txt_timer_4_minutes").value = getRadioButtonValueFromArray(document.getElementsByName('timer_4_type'));
	document.getElementById("txt_timer_5_minutes").value = getRadioButtonValueFromArray(document.getElementsByName('timer_5_type'));
	document.getElementById("txt_timer_6_minutes").value = getRadioButtonValueFromArray(document.getElementsByName('timer_6_type'));
	document.getElementById("txt_timer_7_minutes").value = getRadioButtonValueFromArray(document.getElementsByName('timer_7_type'));
	document.getElementById("txt_timer_8_minutes").value = getRadioButtonValueFromArray(document.getElementsByName('timer_8_type'));
	document.getElementById("txt_timer_9_minutes").value = getRadioButtonValueFromArray(document.getElementsByName('timer_9_type'));
	document.getElementById("txt_timer_10_minutes").value = getRadioButtonValueFromArray(document.getElementsByName('timer_10_type'));

}

function getTimerValues()
{
	var timerValues = [];
	
	timerValues[0] = document.getElementById("txt_timer_1_minutes").value;
	timerValues[1] = document.getElementById("txt_timer_2_minutes").value;
	timerValues[2] = document.getElementById("txt_timer_3_minutes").value;
	timerValues[3] = document.getElementById("txt_timer_4_minutes").value;
	timerValues[4] = document.getElementById("txt_timer_5_minutes").value;
	timerValues[5] = document.getElementById("txt_timer_6_minutes").value;
	timerValues[6] = document.getElementById("txt_timer_7_minutes").value;
	timerValues[7] = document.getElementById("txt_timer_8_minutes").value;
	timerValues[8] = document.getElementById("txt_timer_9_minutes").value;
	timerValues[9] = document.getElementById("txt_timer_10_minutes").value;
	
	return timerValues;
}	

function displayRemainingTimerMinutes(timerValues)
{
	 document.getElementById("lbl_timer_1_minutes_left").innerHTML = timerValues[0];
}	
function startTimers()
{
	var timerValues = getTimerValues();
	
	displayRemainingTimerMinutes(timerValues);
	
}


function addTotalNumberOfTimers()
{
	
	var totalNumberOfTimers = document.getElementById("txt_totalNumberOfTimers").value;
	var timerConfigurationDiv = document.getElementById("div_timersConfiguration");
	
	
	//Removing all existing timers
	timerConfigurationDiv.innerHTML = "";

	for(i = 0; i<totalNumberOfTimers; i++)
	{
		timerConfigurationDiv.innerHTML+= createTimerConfigurationEntry(i);
	}
	/*
	 function addFields(){
            // Number of inputs to create
            var number = document.getElementById("member").value;
            // Container <div> where dynamic content will be placed
            var container = document.getElementById("container");
            // Clear previous contents of the container
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            for (i=0;i<number;i++){
                // Append a node with a random text
                container.appendChild(document.createTextNode("Member " + (i+1)));
                // Create an <input> element, set its type and name attributes
                var input = document.createElement("input");
                input.type = "text";
                input.name = "member" + i;
                container.appendChild(input);
                // Append a line break 
                container.appendChild(document.createElement("br"));
            }
        }
	*/
	
	
}

function createLabelTagWithIndex(index, cssClass, text)
{
	var labelTag = "<label id=\"lbl_timerIndex_" + index + "_\" for=\"txt_timer_" + index + "_duration\" class=\"" + cssClass + "\" >" + text + "<\/label>"; 
	return (labelTag );
}

function createInputTagWithIndex(index, cssClass, type)
{
	var inputTag = "<input type=\""+ type + "\" id=\"txt_timer_" + index + "_duration\" class=\"" + cssClass + "\" >";
	return (inputTag);
}

function createTimerConfigurationEntry(index)
{
	var labelTag = "<label id=\"lbl_timerIndex_" + index + "_\" for=\"txt_timer_" + index + "_duration\" class=\"" + CSS_CLASS_FOR_TIMER_DURATION_ELEMENTS + "\" >" + LBL_FOR_TIMER_DURATION + "<\/label>"; 
	var inputTag = "<input type=\""+ TEXT_FOR_TIMER_DURATION_TYPE + "\" id=\"txt_timer_" + index + "_duration\" class=\"" + CSS_CLASS_FOR_TIMER_DURATION_ELEMENTS + "\" >";
	var lineBreakTag = "<br >";
	return (labelTag + inputTag + lineBreakTag);
}

function createRadioButtonTagWithLabel(index, cssClass, labelText, rbValue)
{


	var radioButtonTag = "<input type=\"radio\" ";
	radioButtonTag = radioButtonTag.concat("id=\"radioButton_" + labelText + "_" + index + "\" ");
	radioButtonTag = radioButtonTag.concat("class=\"" + cssClass + "\" ");
	radioButtonTag = radioButtonTag.concat("value=\"" + rbValue + "\" ");
	radioButtonTag = radioButtonTag.concat(" >");
	
	var labelTag = createInputTagWithIndex("label_radioButton_" + index, cssClass, LBL_FOR_TIME_TYPE)
		
	return (labelTag + radioButtonTag);
	
		
}

function log(message)
{
	 console.log(message); 
}

function addTotalNumberOfTimerTypes()
{
	var totalNumberOfTimerTypes = document.getElementById("txt_totalNumberOfTimerTypes").value;
	var timerTypeConfigurationDiv = document.getElementById("div_timerTypeConfiguration");
	
	for (i=0; i<totalNumberOfTimerTypes; i++)
	{
		
	}
}
























