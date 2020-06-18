var CONST_ID_FOR_TIMERS_TABLE="tbl_timersRunning";
var CONST_TABLE_COLUMN_FOR_TABLE_INDEX = 0;
var CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME= 1;
var CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME= 2;

/*
        Load your time sequence here:

*/

var CONST_DEFAULT_TIME_SEQUENCE_TO_BE_LOADED = [1, 30, 1, 30, 1, 45, 10, 30, 1, 60, 1, 45, 1, 30 ];

function loadDefaultValues()
{
    loadDefaultTimerTypes();
    loadDefaultTimerValues();
}

function loadDefaultTimerValues()
{
	var totalNumberOfTimers = CONST_DEFAULT_TIME_SEQUENCE_TO_BE_LOADED.length;
	var timers = CONST_DEFAULT_TIME_SEQUENCE_TO_BE_LOADED;
	var timersTable = document.getElementById(CONST_ID_FOR_TIMERS_TABLE);


	//Making timer table visible
	if(totalNumberOfTimers>0)
		document.getElementById(CONST_ID_FOR_TIMERS_TABLE).visibility = "visible";
	else
		document.getElementById(CONST_ID_FOR_TIMERS_TABLE).visibility = "hidden";



	for(i=0; i<totalNumberOfTimers; i++)
	{

        var tableRow = timersTable.insertRow(i+1);
        var tableRowCell0 = tableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_INDEX);
        var tableRowCell1 = tableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_ORIGINAL_TIME)	;
        var tableRowCell2 = tableRow.insertCell(CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME);

        tableRowCell0.innerHTML = (i+1);
        tableRowCell1.innerHTML = convertMinutesIntoHHMMMSSFormat(parseFloat(timers[i]));
        if(i>0)
        {
//            alert("if");
            var previousTableRow = timersTable.rows[i];
            var previousCellRemainingTime = previousTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML;
            previousCellRemainingTime = convertHHmmSSTimeToMinutes(previousCellRemainingTime);
//            alert("i:"+ i + "\nOriginal Value :"+ tableRowCell1.innerHTML + "\n" + " Previous Value :" + previousTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML);
//            alert("timersTable.rows[" + parseInt(i-1) + "]" + timersTable.rows[i-1]);
//            alert("previousTableRow.cells[" + CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME +"].innerHTML" + previousTableRow.cells[CONST_TABLE_COLUMN_FOR_TABLE_REMAINING_TIME].innerHTML);
//            alert(previousCellRemainingTime + "+" + timers[i]);
            tableRowCell2.innerHTML = convertMinutesIntoHHMMMSSFormat(parseFloat(timers[i]) + parseFloat(previousCellRemainingTime));

        }
        else
        {
            tableRowCell2.innerHTML = convertMinutesIntoHHMMMSSFormat(parseFloat(timers[i]));
        }

	}


}

function loadDefaultTimerTypes()
{
	document.getElementById("txt_totalNumberOfTimers").value = 14;
	document.getElementById("txt_totalNumberOfTimerTypes").value = 7 ;

	addTotalNumberOfTimerTypes();


	document.getElementById("txt_timerType_Description_0").value = "Settling Down";
	document.getElementById("txt_timerType_Description_1").value = "AWA";
	document.getElementById("txt_timerType_Description_2").value = "Break Short";
	document.getElementById("txt_timerType_Description_3").value = "Break Long";
	document.getElementById("txt_timerType_Description_4").value = "Verbal";
	document.getElementById("txt_timerType_Description_5").value = "Quantitative";
	document.getElementById("txt_timerType_Description_6").value = "Analytical";


	document.getElementById("txt_timerType_Duration_0").value = 1;
	document.getElementById("txt_timerType_Duration_1").value = 30;
	document.getElementById("txt_timerType_Duration_2").value = 1;
	document.getElementById("txt_timerType_Duration_3").value = 10;
	document.getElementById("txt_timerType_Duration_4").value = 30;
	document.getElementById("txt_timerType_Duration_5").value = 45;
	document.getElementById("txt_timerType_Duration_6").value = 60;

	addTotalNumberOfTimers();

}


//function convertHHmmSSTimeToMinutes(hhMMssTime)
//{
//    var hhMMss = hhMMssTime.split(CONST_SYMBOL_FOR_TIME_SEPARATOR);
//    var hours = parseInt(hhMMss[0])*60;
//    var minutes = parseInt(hhMMss[1]);
//    var seconds = parseFloat(hhMMss[2])/6;
//
//    return (hours + minutes + seconds);
//}

