/*
Constants values
*/
var CONST_LBL_FOR_TIMER_DURATION = "Timer Duration";
var CONST_LBL_FOR_TIMER_TYPE_DESCRIPTION = "Timer Description";
var CONST_LBL_FOR_TIMER_TYPE_VALUE = "Duration ";
var CONST_LBL_FOR_TIMER_CONFIGURATION = "Timer";

var CONST_TYPE_FOR_TIMER_TYPE_DURATION = "number";
var CONST_TYPE_FOR_TIMER_TYPE_DESCRIPTION = "text";

var CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS = "div_timer_duration";

var CONST_ID_FOR_RADIO_BUTTON_TYPE="radioButton_timerType";
var CONST_ID_FOR_TIMERS_TABLE="tbl_timersRunning";

var CONST_TAG_LINE_BREAK = "<br >";

var CONST_FUNCTION_RADIOBUTTON_CHANGE = "radioButtonChangeFunction";
var CONST_FUNCTION_TEXTFIELD_CHANGE = "loadSpecifiedTimerToTable";

var CONST_EMPTY_STRING = "";
var CONST_SYMBOL_FOR_TIME_SEPARATOR = ":";

var CONST_TABLE_COLUMN_FOR_TABLE_INDEX = 0;
var CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME= 1;
var CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME= 2;

var CONST_TIMER_UPDATE_FREQUENCY_MILLISECONDS = 1000;

var CONST_TIMER_COMPLETED_MESSAGE ="-";

var Current_Running_Timer;

function addTotalNumberOfTimers()
{
	
	var totalNumberOfTimers = document.getElementById("txt_totalNumberOfTimers").value;
	var timerConfigurationDiv = document.getElementById("div_timersConfiguration");
	
	
	//Removing all existing timers
	timerConfigurationDiv.innerHTML = "";

	for(i_totalTimers=0; i_totalTimers<totalNumberOfTimers; i_totalTimers++)
	{
		timerConfigurationDiv.innerHTML+= createTimerConfigurationEntry(i_totalTimers);
	}
		
}

function createLabelTagWithIndex(index, cssClass, text)
{
	var labelTag = "<label id=\"lbl_" + index + "_\" class=\"" + cssClass + "\" >" + text + "<\/label>"; 
	return (labelTag );
}

function createTextFieldTagWithIndex(index, cssClass, type, onChangeFunctionName, onChangeFunctionNameParamater1, onChangeFunctionNameParamater2)
{
	var inputTextFieldTag = "<input type=\""+ type + "\" id=\"txt_" + index + "\" class=\"" + cssClass + "\"";
	inputTextFieldTag = inputTextFieldTag.concat(" onChange=\"");
	inputTextFieldTag = inputTextFieldTag.concat(createFunctionStringWithParameters(onChangeFunctionName, onChangeFunctionNameParamater1, onChangeFunctionNameParamater2));
	inputTextFieldTag = inputTextFieldTag.concat("\"");
	inputTextFieldTag = inputTextFieldTag.concat(">");
	return (inputTextFieldTag);
}

function createFunctionStringWithParameters(functionName, functionParameter1, functionParameter2)
{
	var functionString = functionName + "(";
	functionString = functionString.concat("'" + functionParameter1 + "'");
	functionString = functionString.concat(",'" + functionParameter2 + "'");
	functionString = functionString.concat(")");
	return functionString;
	
}
function createTimerConfigurationEntry(index)
{
	
	var labelTag = createLabelTagWithIndex("timerDurationIndex_" + index, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_LBL_FOR_TIMER_CONFIGURATION + " " + (index+1));
	
	var radiobuttonsTag = createRadioButtonTagsForEachTimerTypes("timerType_" + (index+1));
	
	var inputTag = createTextFieldTagWithIndex( "timerDurationIndex_" + index, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_TYPE_FOR_TIMER_TYPE_DURATION, CONST_FUNCTION_TEXTFIELD_CHANGE, CONST_EMPTY_STRING, CONST_EMPTY_STRING );
	
	return (labelTag + radiobuttonsTag+ inputTag + CONST_TAG_LINE_BREAK);
}

function createRadioButtonTagsForEachTimerTypes (radioButtonName)
{
	var noOfCustomTimerTypes = document.getElementById("txt_totalNumberOfTimerTypes").value;
	if(noOfCustomTimerTypes == "")
		return false;
	else
	{
		var radioButtonsTags = "";
		
		for(i=0; (i<noOfCustomTimerTypes && document.getElementById("txt_timerType_Duration_" + i) != null); i++)
		{
			radioButtonsTags+= createRadioButtonTagWithLabel(i, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, document.getElementById("txt_timerType_Description_" + i).value, document.getElementById("txt_timerType_Duration_" + i).value, radioButtonName, CONST_FUNCTION_RADIOBUTTON_CHANGE);
		}
		return radioButtonsTags;
		
	}
		
}



function createRadioButtonTagWithLabel(index, cssClass, labelText, rbValue, name, onChangeFunction)
{

	var radioButtonTag = "<input type=\"radio\" ";
	radioButtonTag = radioButtonTag.concat("id=\"radioButton_" + labelText + "_" + index + "\" ");
	radioButtonTag = radioButtonTag.concat("name=\"" + name + "\" ");
	radioButtonTag = radioButtonTag.concat("class=\"" + cssClass + "\" ");
	radioButtonTag = radioButtonTag.concat("value=\"" + rbValue + "\" ");
	
	radioButtonTag = radioButtonTag.concat("onChange=\"" + onChangeFunction + "(");
	radioButtonTag = radioButtonTag.concat("'" + name + "\'");
	radioButtonTag = radioButtonTag.concat(",'" + rbValue + "'");
	radioButtonTag = radioButtonTag.concat(")\"");
	radioButtonTag = radioButtonTag.concat(">");
	var labelTag = createLabelTagWithIndex("radioButton_" + index, cssClass, labelText);
	
	return (labelTag + radioButtonTag);
	
		
}


function addTotalNumberOfTimerTypes()
{
	var totalNumberOfTimerTypes = document.getElementById("txt_totalNumberOfTimerTypes").value;
	var timerTypeConfigurationDiv = document.getElementById("div_timerTypeConfiguration");
	
	timerTypeConfigurationDiv.innerHTML = "";
	
	for (i=0; i<totalNumberOfTimerTypes; i++)
	{
		var labelDescription = createLabelTagWithIndex("timerType_Description_" + i, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_LBL_FOR_TIMER_TYPE_DESCRIPTION);
		var textFieldDescription = createTextFieldTagWithIndex ("timerType_Description_" + i, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_TYPE_FOR_TIMER_TYPE_DESCRIPTION, CONST_FUNCTION_TEXTFIELD_CHANGE, CONST_EMPTY_STRING, CONST_EMPTY_STRING);		
		
		var labelDuration = createLabelTagWithIndex("timerType_Duration_" + i, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_LBL_FOR_TIMER_DURATION);
		var textFieldDuration = createTextFieldTagWithIndex ("timerType_Duration_" + i, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_TYPE_FOR_TIMER_TYPE_DURATION);
		
		timerTypeConfigurationDiv.innerHTML+= labelDescription + textFieldDescription;
		timerTypeConfigurationDiv.innerHTML+= labelDuration + textFieldDuration;
		timerTypeConfigurationDiv.innerHTML+= "<br/>";
			
	}
}

function radioButtonChangeFunction(radioButtonName, radioButtonValue)
{
	var radioButtonId = radioButtonName.substring(radioButtonName.length-1, radioButtonName.length);
	
	var radioButtonsTextFieldId = "txt_timerDurationIndex_" + (radioButtonId - 1);
	document.getElementById(radioButtonsTextFieldId).value = radioButtonValue;

}

function loadSpecifiedTimerToTable()
{
	var totalNumberOfTimers = document.getElementById("txt_totalNumberOfTimers").value;
	var timers = [];
	
	var timersTable = document.getElementById(CONST_ID_FOR_TIMERS_TABLE);
	
	while(timersTable.rows.length>1)
	{
		timersTable.deleteRow(timersTable.rows.length-1);
	}
	
	//Making timer table visible
	if(totalNumberOfTimers>0)
		document.getElementById(CONST_ID_FOR_TIMERS_TABLE).visibility = "visible";
	else
		document.getElementById(CONST_ID_FOR_TIMERS_TABLE).visibility = "hidden";
		
	
	
	for(i=0; i<totalNumberOfTimers; i++)
	{
		var timerInputFieldId = "txt_" + "timerDurationIndex_" + i;
		timers[i] = document.getElementById(timerInputFieldId).value;

		//Adding rows to timers table.
		var tableRow = timersTable.insertRow(i+1);
		var tableRowCell0 = tableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_INDEX);
		var tableRowCell1 = tableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME)	;
		var tableRowCell2 = tableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME);
		
		tableRowCell0.innerHTML = i+1;
		tableRowCell1.innerHTML = convertMinutesIntoHHMMMSSFormat(timers[i]);
		tableRowCell2.innerHTML = convertMinutesIntoHHMMMSSFormat(timers[i]);


		test(["timers[i]", timers[i]]+"");
		
	}
	
	return timers;
}

function convertMinutesIntoHHMMMSSFormat(minutes)
{
	var hours = Math.floor(minutes/60);
	minutes = minutes - (hours * 60);
	var seconds = minutes % 1;
	minutes = minutes - seconds;
	seconds = seconds * 60;

    //test(["hours", hours, "minutes:", minutes, "seconds", seconds]);
	if(minutes<10)
	    minutes = "0" + minutes;

	if(seconds<10)
	    seconds = "0" + seconds;
	else if(seconds == 0)
	    seconds = "00";

	return (hours + CONST_SYMBOL_FOR_TIME_SEPARATOR +  minutes + CONST_SYMBOL_FOR_TIME_SEPARATOR + seconds);
}

function displayTimeInTable(timeInHHMMSSFormat, tableRowIndex)
{
	
	var timersTable = document.getElementById(CONST_ID_FOR_TIMERS_TABLE);
	var tableRow = timersTable.rows[tableRowIndex];
	var tableCell = tableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME];
	tableCell.innerHTML = timeInHHMMSSFormat;
	
}

function stopCurrentRunningTimer()
{
    if(Current_Running_Timer)
    {
        clearInterval(Current_Running_Timer);
    }
}

function startSingleTimer(remainingTime, timerTableIndex)
{

}

function startTimers()
{
	var timersTable = document.getElementById(CONST_ID_FOR_TIMERS_TABLE);

	for(i = 1; i<timersTable.rows.length && i<10; i++)
	{
		var tableRow = timersTable.rows[i];
		var remainingTime = tableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML;
		Current_Running_Timer = setTimeout(runTimer(remainingTime,i),CONST_TIMER_UPDATE_FREQUENCY_MILLISECONDS);

		
	}
	
	
	

/*
	var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
*/
}


function testFunction()
{
	document.getElementById("txt_totalNumberOfTimers").value = 2;
	document.getElementById("txt_totalNumberOfTimerTypes").value = 3;
	
	addTotalNumberOfTimerTypes();

	
	document.getElementById("txt_timerType_Description_0").value = "Verbal";
	document.getElementById("txt_timerType_Description_1").value = "Quant";
	document.getElementById("txt_timerType_Description_2").value = "Writing";
	
	
	document.getElementById("txt_timerType_Duration_0").value = 30;
	document.getElementById("txt_timerType_Duration_1").value = 45;
	document.getElementById("txt_timerType_Duration_2").value = 60;
	
	addTotalNumberOfTimers();
	
	startTimers();
	
	

}

function test(itemsToBePrinted)
{
	var stringToBePrinted = "";
	for(i=0; i<itemsToBePrinted.length; i++)
	{
		stringToBePrinted = stringToBePrinted.concat(itemsToBePrinted[i]);
		stringToBePrinted = stringToBePrinted.concat("<br>");
	}
	document.getElementById("p_test_1").innerHTML = stringToBePrinted;

}

function runTimer(remainingTime, tableRowIndex)
{
    var hhMMss = remainingTime.split(CONST_SYMBOL_FOR_TIME_SEPARATOR);
    var hours = hhMMss[0];
    var minutes = hhMMss[1];
    var seconds = hhMMss[2];

//    if(hours>=0 && minutes>=0 && seconds>=0)
//    {
        if(seconds>0)
        {
            seconds--;
        }
        else if(seconds<=0 && minutes>0)
        {
            minutes--;
            seconds=59;
        }
        else if(seconds<=0 && minutes<=0 && hours>0)
        {
            hours--;
            minutes = 59;
            seconds = 59;
        }
        else
        {
            stopCurrentRunningTimer();
            return ;
        }
        hours = getTimeIn2DigitFormat(hours);
        minutes = getTimeIn2DigitFormat(minutes);
        seconds = getTimeIn2DigitFormat(seconds);

        displayTimeInTable(hours + CONST_SYMBOL_FOR_TIME_SEPARATOR + minutes + CONST_SYMBOL_FOR_TIME_SEPARATOR + seconds, tableRowIndex);
        alert(new Date())
        alert(hours + CONST_SYMBOL_FOR_TIME_SEPARATOR + minutes + CONST_SYMBOL_FOR_TIME_SEPARATOR + seconds, tableRowIndex);
//    }

}

function getTimeIn2DigitFormat(time)
{
    if(time<10 && time.length<2)
        time = "0" + time;

    return time;
}
















