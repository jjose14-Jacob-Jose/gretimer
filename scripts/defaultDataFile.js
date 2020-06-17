function loadDefaultValues()
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
//	startTimers();

}