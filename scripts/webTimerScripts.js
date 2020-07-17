/*
Constants values
*/
var CONST_LBL_FOR_TIMER_DURATION = "Timer Duration";
var CONST_LBL_FOR_TIMER_TYPE_DESCRIPTION = "Timer Description";
var CONST_LBL_FOR_TIMER_TYPE_VALUE = "Duration ";
var CONST_LBL_FOR_TIMER_CONFIGURATION = "Timer ";
var CONST_LBL_FOR_TIMER_CONFIGURATION_SUFFIX = "  :";

var CONST_TXT_FOR_PAUSE_BUTTON_WHEN_PAUSE_DISABLED = "Pause";
var CONST_TXT_FOR_PAUSE_BUTTON_WHEN_PAUSE_ENABLED = "Resume";

var CONST_MESSAGE_FOR_USER_CONFIRMATION_PREFIX = "Do you want to ";
var CONST_INPUT_FOR_USER_CONFIRMATION_ALLOW = "123";
var CONST_MESSAGE_FOR_USER_CONFIRMATION_SUFFIX = "?\n Please enter " + CONST_INPUT_FOR_USER_CONFIRMATION_ALLOW + " to confirm.";
var CONST_DEFAULT_INPUT_FOR_PROMPT = "000";

var CONST_TYPE_FOR_TIMER_TYPE_DURATION = "number";
var CONST_TYPE_FOR_TIMER_TYPE_DESCRIPTION = "text";

var CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS = "div_timer_duration";
var CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_LABELS = "div_timer_configuration_label_";

var CONST_TEXT_FIELD_PREFIX= "txt_";

var CONST_ID_FOR_RADIO_BUTTON_TYPE="radioButton_timerType";
var CONST_ID_FOR_TIMERS_TABLE="tbl_timersRunning";
var CONST_ID_FOR_EXHAUSTED_TIMERS_TABLE="tbl_exhaustedTimersInfo";
var CONST_ID_FOR_BTN_START_TIMER="btn_StartTimers";
var CONST_ID_FOR_LABEL_BIGGER_TIMER_DISPLAY="heading_BigTimerDisplay";
var CONST_ID_FOR_CB_ENABLE_DARK_MODE="cb_enableDarkMode";

var CONST_TAG_LINE_BREAK = "<br >";

var CONST_FUNCTION_RADIOBUTTON_CHANGE = "radioButtonChangeFunction";
var CONST_FUNCTION_TEXTFIELD_CHANGE = "loadSpecifiedTimerToTable";

var CONST_CSS_CLASS_DARK_MODE = "darkMode";
var CONST_CSS_CLASS_LIGHT_MODE = "lightMode";

var CONST_EMPTY_STRING = "";
var CONST_SYMBOL_FOR_TIME_SEPARATOR = ":";

var CONST_TABLE_COLUMN_FOR_TABLE_INDEX = 0;
var CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME= 1;
var CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME= 2;
var CONST_TABLE_COLUMN_FOR_TABLE_TIME_STAMP= 3;
var CONST_TABLE_COLUMN_FOR_TABLE_TIME_STAMP_DIFFERENCE= 4;

var CONST_TIMER_UPDATE_FREQUENCY_MILLISECONDS = 1000;

var CONST_TIMER_COMPLETED_MESSAGE ="-";
var CONST_CURRENT_TIMER_TABLE_ROW = 1;

var CONST_FILE_PATH_SOUND_1 = "../resources/audio-Single-Bell.mp3";
var CONST_FILE_PATH_SOUND_2 = "../resources/audio-Double-Bell.mp3";
var CONST_FILE_PATH_SOUND_3 = "../resources/audio-Many-Bell.mp3";

var Current_Timer_Table_Row = 1;

var Current_Running_Timer = [];
var Current_Status_Of_Pause_Is_Paused_Enabled = false;
var Current_Status_Of_Timer_Is_Timer_Running = false;
var Current_Status_Of_Timer_Was_It_Started = false;

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

function createLabelTagWithIndex(index, cssClass, text, forRadioButtonID)
{
	var labelTag = "<label id=\"lbl_" + index + "\" class=\"" + cssClass + "\" for=\"" + forRadioButtonID + "\" >" + text + "</label>";
	return (labelTag );
}

function createTextFieldTagWithIndex(index, cssClass, type, onChangeFunctionName, onChangeFunctionNameParamater1, onChangeFunctionNameParamater2)
{
	var inputTextFieldTag = "<input type=\""+ type + "\" id=\"" + CONST_TEXT_FIELD_PREFIX + index + "\" class=\"" + cssClass + "\"";
	inputTextFieldTag = inputTextFieldTag.concat(" onChange=\"");
	inputTextFieldTag = inputTextFieldTag.concat(createFunctionStringWithParameters(onChangeFunctionName, onChangeFunctionNameParamater1, onChangeFunctionNameParamater2));
	inputTextFieldTag = inputTextFieldTag.concat("\"");
	inputTextFieldTag = inputTextFieldTag.concat(" onClick=\"this.select();\" >");
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
	var labelTag = createLabelTagWithIndex("timerDurationIndex_" + index, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_LBL_FOR_TIMER_CONFIGURATION + " " + (index+1) + CONST_LBL_FOR_TIMER_CONFIGURATION_SUFFIX, "radioButton_" + CONST_LBL_FOR_TIMER_CONFIGURATION + "_" + index );
	
	var radiobuttonsTag = createRadioButtonTagsForEachTimerTypes("timerType_" + (index));
	
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
			radioButtonsTags+= createRadioButtonTagWithLabel(radioButtonName, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_LABELS + i, document.getElementById("txt_timerType_Description_" + i).value, document.getElementById("txt_timerType_Duration_" + i).value, radioButtonName, CONST_FUNCTION_RADIOBUTTON_CHANGE);
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
	var labelTag = createLabelTagWithIndex("radioButton_" + index, cssClass, labelText, "radioButton_" + labelText + "_" + index );
	
	return (radioButtonTag + labelTag);
	
		
}


function addTotalNumberOfTimerTypes()
{
	var totalNumberOfTimerTypes = document.getElementById("txt_totalNumberOfTimerTypes").value;
	var timerTypeConfigurationDiv = document.getElementById("div_timerTypeConfiguration");
	
	timerTypeConfigurationDiv.innerHTML = "";
	
	for (i=0; i<totalNumberOfTimerTypes; i++)
	{
		var labelDescription = createLabelTagWithIndex("timerType_Description_" + i, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_LBL_FOR_TIMER_TYPE_DESCRIPTION, CONST_TEXT_FIELD_PREFIX + "timerType_Description_" + i);
		var textFieldDescription = createTextFieldTagWithIndex ("timerType_Description_" + i, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_TYPE_FOR_TIMER_TYPE_DESCRIPTION, CONST_FUNCTION_TEXTFIELD_CHANGE, CONST_EMPTY_STRING, CONST_EMPTY_STRING);
		
		var labelDuration = createLabelTagWithIndex("timerType_Duration_" + i, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_LBL_FOR_TIMER_DURATION, CONST_TEXT_FIELD_PREFIX + "timerType_Duration_" + i);
		var textFieldDuration = createTextFieldTagWithIndex ("timerType_Duration_" + i, CONST_CSS_CLASS_FOR_TIMER_CONFIGURATION_ELEMENTS, CONST_TYPE_FOR_TIMER_TYPE_DURATION);
		
		timerTypeConfigurationDiv.innerHTML+= labelDescription + textFieldDescription;
		timerTypeConfigurationDiv.innerHTML+= labelDuration + textFieldDuration;
		timerTypeConfigurationDiv.innerHTML+= "<br/>";
			
	}
}

function radioButtonChangeFunction(radioButtonName, radioButtonValue)
{
	var radioButtonId = radioButtonName.split("_");
	radioButtonId = radioButtonId[1];
	var radioButtonsTextFieldId = "txt_timerDurationIndex_" + radioButtonId;
	document.getElementById(radioButtonsTextFieldId).value = radioButtonValue;
	loadSpecifiedTimerToTable();

}

function loadSpecifiedTimerToTable()
{
    Current_Status_Of_Timer_Is_Timer_Running = false;
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

        //Assigning timer as 0, if the field is empty.
        if(!timers[i])
            timers[i]=0;

            //Adding rows to timers table.
            var tableRow = timersTable.insertRow(i+1);
            var tableRowCell0 = tableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_INDEX);
            var tableRowCell1 = tableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME)	;
            var tableRowCell2 = tableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME);

            tableRowCell0.innerHTML = (i+1);
            tableRowCell1.innerHTML = convertMinutesIntoHHMMMSSFormat(parseFloat(timers[i]));
            if(i>1)
            {
                var previousRow = timersTable.rows[i-1];
                var previousRowCell = tableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML;
                console.log("previousRowCell : "+previousRowCell);
                previousRowCell = convertHHmmSSTimeToMinutes(previousRowCell);
                console.log("i:" + i +"/nCurrent :"+ parseFloat(timers[i])+ ", previousRowCell : "+previousRowCell);
                tableRowCell2.innerHTML = convertMinutesIntoHHMMMSSFormat(parseFloat(timers[i]) + parseFloat(previousRowCell));
            }
            else
             {
             tableRowCell2.innerHTML = convertMinutesIntoHHMMMSSFormat(parseFloat(timers[i]));
             console.log("convertMinutesIntoHHMMMSSFormat(parseFloat(" + timers[i] + " )) -->" + convertMinutesIntoHHMMMSSFormat(parseFloat(timers[i])));
             }

	}
	resetTimers();
	return timers;
}

function convertMinutesIntoHHMMMSSFormat(minutes)
{

	var hours = Math.floor(minutes/60);
	minutes = minutes - (hours * 60);
	var seconds = minutes % 1;
	minutes = minutes - seconds;
	seconds = seconds * 60;

    hours = Math.floor(hours);
    minutes = Math.floor(minutes);
    seconds = Math.floor(seconds);

	if(hours<10)
	    hours = "0" + hours;

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

function stopCurrentRunningTimer(intervalID)
{
    if(Current_Running_Timer)
    {
        clearInterval(Current_Running_Timer[intervalID]);
    }
}
function startTimers()
{
//    if(isButtonDisabled(CONST_ID_FOR_BTN_START_TIMER))
//    {
//        Current_Running_Timer = 1;
//    }

//alert("isButtonDisabled(CONST_ID_FOR_BTN_START_TIMER) :" +isButtonDisabled(CONST_ID_FOR_BTN_START_TIMER));
//alert("isButtonDisabled(CONST_ID_FOR_BTN_START_TIMER) " + isButtonDisabled(CONST_ID_FOR_BTN_START_TIMER)  + "\nCurrent_Status_Of_Timer_Was_It_Started"  + Current_Status_Of_Timer_Was_It_Started);
    if(!(isButtonDisabled(CONST_ID_FOR_BTN_START_TIMER)))
    {
        if(!(Current_Status_Of_Timer_Was_It_Started))
        {   disableEnableInputButton(CONST_ID_FOR_BTN_START_TIMER);
            Current_Status_Of_Timer_Was_It_Started = true;
        }
    }
    if(Current_Status_Of_Pause_Is_Paused_Enabled)
    {
        togglePause();
    }
    else{
    Current_Status_Of_Timer_Is_Timer_Running = true;
	var timersTable = document.getElementById(CONST_ID_FOR_TIMERS_TABLE);
//    CONST_CURRENT_TIMER_TABLE_ROW = 1;
    var i=0;
	for(i = 1; i<timersTable.rows.length && isTableHavingValidTimerRemaining(); i++)
	{
		var tableRow = timersTable.rows[i];
		var originalTime = tableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME].innerHTML;
		var remainingTime = tableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML;

		runTimer(remainingTime,i,originalTime);
//		Current_Running_Timer = setInterval(runTimer(remainingTime,i),CONST_TIMER_UPDATE_FREQUENCY_MILLISECONDS);

	}
	}
//	}

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

function runTimer(remainingTime, tableRowIndex, originalTime)
{
    var hhMMss = remainingTime.split(CONST_SYMBOL_FOR_TIME_SEPARATOR);
    var hours = hhMMss[0];
    var minutes = hhMMss[1];
    var seconds = hhMMss[2];
    Current_Running_Timer[tableRowIndex] = setInterval(function()
    {
//        Current_Status_Of_Timer_Is_Timer_Running = prompt("Current_Status_Of_Timer_Is_Timer_Running :" + Current_Status_Of_Timer_Is_Timer_Running, Current_Status_Of_Timer_Is_Timer_Running);
        if(!Current_Status_Of_Timer_Is_Timer_Running)
        {
             stopCurrentRunningTimer(tableRowIndex);

        }
        else{
        if(seconds>0)
        {
            seconds--;
        }
        else if(minutes>0)
        {
            minutes--;
            seconds=59;
        }
        else if(hours>0)
        {
            hours--;
            minutes=59;
            seconds=59;
        }
        else if (seconds<=0 && minutes<=0 && hours<=0)
        {

            playTimerEndedSound(Current_Timer_Table_Row);

            if(tableRowIndex >= Current_Timer_Table_Row)
            {
                updatedExhaustedTimersInfo(originalTime, remainingTime, Current_Timer_Table_Row)
                Current_Timer_Table_Row++;
            }

            stopCurrentRunningTimer(tableRowIndex);
        }

        var newTime = getTimeIn2DigitFormat(hours) + CONST_SYMBOL_FOR_TIME_SEPARATOR;
        newTime = newTime.concat(getTimeIn2DigitFormat(minutes) + CONST_SYMBOL_FOR_TIME_SEPARATOR);
        newTime = newTime.concat(getTimeIn2DigitFormat(seconds));

        displayTimeInTable(newTime,tableRowIndex);
        }
        displayInTitle();
    }, CONST_TIMER_UPDATE_FREQUENCY_MILLISECONDS);
//    CONST_CURRENT_TIMER_TABLE_ROW++;
//    }

}

function getTimeIn2DigitFormat(time)
{
    var timeAsString = String(time);
    if(time<10 && timeAsString.length<2)
        time = "0" + time;

    return time;
}

function displayInTitle()
{
	var timersTableForDisplaying = document.getElementById(CONST_ID_FOR_TIMERS_TABLE);
	var tableRowForDisplaying = timersTableForDisplaying.rows[Current_Timer_Table_Row];
    document.title = tableRowForDisplaying.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML;
    document.getElementById(CONST_ID_FOR_LABEL_BIGGER_TIMER_DISPLAY).innerHTML = tableRowForDisplaying.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML;

}

function playTimerEndedSound(timerTableRowIndex)
{
    var soundElement = document.createElement("audio");

    if(timerTableRowIndex % 2 != 0)
        soundElement.src = CONST_FILE_PATH_SOUND_1;
    else
        soundElement.src = CONST_FILE_PATH_SOUND_2;

    if(!isTableHavingValidTimerRemaining())
        soundElement.src = CONST_FILE_PATH_SOUND_3;

    document.body.appendChild(soundElement);
    soundElement.play();
}

function togglePause()
{
//    if(Current_Status_Of_Timer_Is_Timer_Running)
//    {
   if(Current_Status_Of_Pause_Is_Paused_Enabled)
     {
        Current_Status_Of_Pause_Is_Paused_Enabled = false;
         document.getElementById("btn_PauseTimers").value = CONST_TXT_FOR_PAUSE_BUTTON_WHEN_PAUSE_DISABLED;
//         disableEnableInputButton(CONST_ID_FOR_BTN_START_TIMER);
         startTimers();


     }
        
   else if (Current_Status_Of_Timer_Is_Timer_Running)
    {
    Current_Status_Of_Pause_Is_Paused_Enabled = true;
         document.getElementById("btn_PauseTimers").value = CONST_TXT_FOR_PAUSE_BUTTON_WHEN_PAUSE_ENABLED;
        Current_Status_Of_Timer_Is_Timer_Running = false;
    }
//    }
}


function resetTimers()
{
    var userConfirmationForSkip = getUserConfirmation("Reset");

    if(!userConfirmationForSkip)
        return false;
    var timersTableReset = document.getElementById(CONST_ID_FOR_TIMERS_TABLE);
    for(i=1; i<timersTableReset.rows.length; i++)
    {
        stopCurrentRunningTimer(i)
        var tableRowReset = timersTableReset.rows[i];

        tableRowReset.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML = tableRowReset.cells[CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME].innerHTML;

        if(i>1)
        {
             var previousRow = timersTableReset.rows[i-1];
             var previousRowRemainingTime = convertHHmmSSTimeToMinutes(previousRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML);

             var currentRowOriginalTime =  convertHHmmSSTimeToMinutes(tableRowReset.cells[CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME].innerHTML);
             var currentRowRemainingTime = currentRowOriginalTime + previousRowRemainingTime;
             tableRowReset.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML = convertMinutesIntoHHMMMSSFormat(currentRowRemainingTime);
        }
        else
        {
        tableRowReset.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML = tableRowReset.cells[CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME].innerHTML;
        }


    }
    while(disableEnableInputButton(CONST_ID_FOR_BTN_START_TIMER));

    Current_Timer_Table_Row = 1;
    Current_Status_Of_Timer_Was_It_Started = false;
    //Resetting 'Pause' function.
    Current_Status_Of_Pause_Is_Paused_Enabled = false;
    document.getElementById("btn_PauseTimers").value = CONST_TXT_FOR_PAUSE_BUTTON_WHEN_PAUSE_DISABLED;
    clearTableContents(CONST_ID_FOR_EXHAUSTED_TIMERS_TABLE);

}

function convertHHmmSSTimeToMinutes(hhMMssTime)
{
    if(hhMMssTime !="" && hhMMssTime.indexOf(CONST_SYMBOL_FOR_TIME_SEPARATOR)>-1)
    {
        var hhMMss = hhMMssTime.split(CONST_SYMBOL_FOR_TIME_SEPARATOR);
        var hours = parseFloat(hhMMss[0])*60;
        var minutes = parseFloat(hhMMss[1]);
        var seconds = parseFloat(hhMMss[2])/60;

        return (hours + minutes + seconds);
    }
    return 0;
}

function isTableHavingValidTimerRemaining()
{

    var timerTable = document.getElementById(CONST_ID_FOR_TIMERS_TABLE);

    for(i=1; i<timerTable.rows.length; i++)
    {
        var timerTableRow = timerTable.rows[i];
        var currentRowRemainingTime =  convertHHmmSSTimeToMinutes(timerTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML);

        if(currentRowRemainingTime>0)
            return true;
    }

    return false;
}

//function testFunction()
//{
//	document.getElementById("txt_totalNumberOfTimers").value = 2;
//	document.getElementById("txt_totalNumberOfTimerTypes").value = 3;
//
//	addTotalNumberOfTimerTypes();
//
//
//	document.getElementById("txt_timerType_Description_0").value = "Verbal";
//	document.getElementById("txt_timerType_Description_1").value = "Quant";
//	document.getElementById("txt_timerType_Description_2").value = "Writing";
//
//
//	document.getElementById("txt_timerType_Duration_0").value = 30;
//	document.getElementById("txt_timerType_Duration_1").value = 45;
//	document.getElementById("txt_timerType_Duration_2").value = 60;
//
//	addTotalNumberOfTimers();
//	startTimers();
//
//}

function skipCurrentTimer()
{
    var userConfirmationForSkip = getUserConfirmation("Skip");

    if(!userConfirmationForSkip)
        return false;

    var timerTable = document.getElementById(CONST_ID_FOR_TIMERS_TABLE);
    var i=0;
    //Stopping all timers.
    for(i=1; i<timerTable.rows.length; i++)
        stopCurrentRunningTimer(i);

    //Making current running timer's time =0.
    for(i=1; i<timerTable.rows.length; i++)
    {
        var timerTableRow = timerTable.rows[i];
        var currentRowOriginalTimeInHHmmSS = timerTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME].innerHTML;
        var currentRowOriginalTime =  convertHHmmSSTimeToMinutes(currentRowOriginalTimeInHHmmSS);
        var currentRowRemainingTime =  convertHHmmSSTimeToMinutes(timerTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML);
        var currentRowElapsedTime =   parseFloat(currentRowOriginalTime) - parseFloat(currentRowRemainingTime);
        currentRowElapsedTime = convertMinutesIntoHHMMMSSFormat(currentRowElapsedTime);

        if(currentRowRemainingTime>0)
         {

            updatedExhaustedTimersInfo(currentRowOriginalTimeInHHmmSS, currentRowElapsedTime, Current_Timer_Table_Row);
            currentRowRemainingTime = 0;
            timerTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML = convertMinutesIntoHHMMMSSFormat(currentRowRemainingTime);
            Current_Timer_Table_Row++;
            break;
         }
    }

    //Updating remaining time of subsequent timers.
    for(i++; i<timerTable.rows.length; i++)
    {
        var timerTableCurrentRow = timerTable.rows[i];
        var timerTablePreviousRow = timerTable.rows[i-1];
        var currentRowOriginalTime =  convertHHmmSSTimeToMinutes(timerTableCurrentRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME].innerHTML);
        var previousRowRemainingTime =  convertHHmmSSTimeToMinutes(timerTablePreviousRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML);

//        alert("previousRowRemainingTime :" + previousRowRemainingTime + "\n" + "currentRowOriginalTime :" + currentRowOriginalTime);
        var currentRowRemainingTime = parseFloat(currentRowOriginalTime + previousRowRemainingTime);
        currentRowRemainingTime = convertMinutesIntoHHMMMSSFormat(currentRowRemainingTime);
        timerTableCurrentRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML = currentRowRemainingTime;
    }
//    Current_Timer_Table_Row++;
//    updateRemainingTimesOfFollowingTimers(Current_Timer_Table_Row);
    if(!(Current_Status_Of_Pause_Is_Paused_Enabled) && Current_Status_Of_Timer_Is_Timer_Running)
        startTimers();

}

function disableEnableInputButton(buttonID)
{
     var buttonPresentStatus = document.getElementById(buttonID).disabled;
     if(buttonPresentStatus)
        buttonPresentStatus = false;
     else
        buttonPresentStatus = true;

     document.getElementById(buttonID).disabled = buttonPresentStatus;
     return buttonPresentStatus;

}

function isButtonDisabled(buttonID)
{
     return document.getElementById(buttonID).disabled;
}

function updateRemainingTimesOfFollowingTimers(currentRunningTimerRowNo)
{
    var timerTable = document.getElementById(CONST_ID_FOR_TIMERS_TABLE);
    for(i=currentRunningTimerRowNo; i<timerTable.rows.length; i++)
    {
        var timerTableCurrentRow = timerTable.rows[i];
        var timerTablePreviousRow = timerTable.rows[i-1];
        var currentRowOriginalTime =  convertHHmmSSTimeToMinutes(timerTableCurrentRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME].innerHTML);
        var previousRowRemainingTime =  convertHHmmSSTimeToMinutes(timerTablePreviousRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML);

        var currentRowRemainingTime = parseFloat(currentRowOriginalTime + previousRowRemainingTime);
        currentRowRemainingTime = convertMinutesIntoHHMMMSSFormat(currentRowRemainingTime);
        timerTableCurrentRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML = currentRowRemainingTime;
    }
}

function updatedExhaustedTimersInfo(originalTimerValueInHHmmSS, leftTimerValueInHHmmSS, timerRowNumber)
{
    var exhaustedTimerTable = document.getElementById(CONST_ID_FOR_EXHAUSTED_TIMERS_TABLE);
    var exhaustedTimerTableRow = exhaustedTimerTable.insertRow(timerRowNumber);
    var exhaustedTimerTableIndexCell = exhaustedTimerTableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_INDEX);
    var exhaustedTimerTableIndexOriginalTimerValue = exhaustedTimerTableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME);
    var exhaustedTimerTableIndexExhaustedTimerValue = exhaustedTimerTableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME);
    var exhaustedTimerTableIndexTimeStampValue = exhaustedTimerTableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_TIME_STAMP);

    exhaustedTimerTableIndexCell.innerHTML = timerRowNumber;
    exhaustedTimerTableIndexOriginalTimerValue.innerHTML = originalTimerValueInHHmmSS;
    exhaustedTimerTableIndexExhaustedTimerValue.innerHTML = leftTimerValueInHHmmSS;
    var currentTimeStamp = new Date();
    exhaustedTimerTableIndexTimeStampValue.innerHTML = currentTimeStamp;

    if(timerRowNumber>1)
    {
        var exhaustedTimerTablePreviousRow = exhaustedTimerTable.rows[timerRowNumber-1];
        var previousRowTimeStamp = exhaustedTimerTablePreviousRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_TIME_STAMP].innerHTML;
        previousRowTimeStamp = new Date(previousRowTimeStamp).getTime();
        var timeStampDifference = currentTimeStamp.getTime() - previousRowTimeStamp;
//        var userTimezoneOffset = currentTimeStamp.getTimezoneOffset() * 60 * 1000;
//        timeStampDifference = new Date(timeStampDifference - userTimezoneOffset);
//        timeStampDifference = new Date(timeStampDifference);
//        alert("previousRowTimeStamp " + previousRowTimeStamp + "\n timeStampDifference" + timeStampDifference);
//        var timeStampDifferenceHours = timeStampDifference / (1000 * 60 * 60);
//        var timeStampDifferenceMinutes = timeStampDifference / (1000 * 60) - timeStampDifferenceHours;
//        var timeStampDifferenceSeconds = timeStampDifference / (1000) - timeStampDifferenceMinutes;

//        timeStampDifferenceHours = Math.round(timeStampDifferenceHours);
//        timeStampDifferenceMinutes = Math.round(timeStampDifferenceMinutes);
//        timeStampDifferenceSeconds = Math.round(timeStampDifferenceSeconds);

            var timeStampDifferenceMinutes = timeStampDifference / (1000 * 60);
            timeStampDifferenceMinutes = convertMinutesIntoHHMMMSSFormat(timeStampDifferenceMinutes);

        var exhaustedTimerTableTimeStampDifference = exhaustedTimerTableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_TIME_STAMP_DIFFERENCE);
//        exhaustedTimerTableTimeStampDifference.innerHTML = timeStampDifferenceHours + CONST_SYMBOL_FOR_TIME_SEPARATOR + timeStampDifferenceMinutes + CONST_SYMBOL_FOR_TIME_SEPARATOR + timeStampDifferenceSeconds;
        exhaustedTimerTableTimeStampDifference.innerHTML = timeStampDifferenceMinutes;
    }

//   alert("exhaustedTimerTableIndexExhaustedTimerValue : " + timerValueInHHmmSS);

//    alert("timerTable.rows[timerRowNumber];" + timerTable.rows[timerRowNumber] );
////    alert(" timerTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_INDEX].innerHTML = timerRowNumber; " +  timerTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_INDEX].innerHTML + "\ntimerRowNumber " + timerRowNumber);
//    timerTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_INDEX].innerHTML = timerRowNumber;
//
//    timerTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME].innerHTML = convertMinutesIntoHHMMMSSFormat(timerValue);
}

function clearTableContents(tableId)
{
    var table = document.getElementById(tableId);
    for(i=table.rows.length-1; i>0; i--)
    {
//        alert("i:"+i +"\ntable.rows.length:" + table.rows.length);
        table.deleteRow(i);
    }
}

function enableDarkMode()
{

    if(document.getElementById(CONST_ID_FOR_CB_ENABLE_DARK_MODE).checked)
     {
          document.getElementsByTagName("BODY")[0].setAttribute("class", "darkMode")
          document.getElementsByTagName("BODY")[0].setAttribute("style", "")
      }
    else
      {
          document.getElementsByTagName("BODY")[0].setAttribute("class", "lightMode")
          document.getElementsByTagName("BODY")[0].setAttribute("style", "")
      }
}

function toggleDarkModeByShortcutKey()
{
    if(document.getElementById(CONST_ID_FOR_CB_ENABLE_DARK_MODE).checked)
    {
        document.getElementById(CONST_ID_FOR_CB_ENABLE_DARK_MODE).checked = false;
        enableDarkMode();

    }
    else
    {

        document.getElementById(CONST_ID_FOR_CB_ENABLE_DARK_MODE).checked = true;
         enableDarkMode();
    }
}

function getUserConfirmation(userActionLabel)
{
    var promptMessage = CONST_MESSAGE_FOR_USER_CONFIRMATION_PREFIX + userActionLabel + CONST_MESSAGE_FOR_USER_CONFIRMATION_SUFFIX

    var userResponse = prompt(promptMessage,CONST_DEFAULT_INPUT_FOR_PROMPT);
    if(userResponse == CONST_INPUT_FOR_USER_CONFIRMATION_ALLOW)
        return true;
    else
        return false;
}