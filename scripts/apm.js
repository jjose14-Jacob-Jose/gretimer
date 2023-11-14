const APM_URL = "https://applicationmonitor.azurewebsites.net/apiCall/save";
// const APM_URL = "http://localhost:8080/save";
const APM_CALLER_NAME = "https://jjose14-jacob-jose.github.io/gretimer/";
const APM_EMPTY_MESSAGE = APM_CALLER_NAME;


/**
 * Make a log in the Application Performance Monitor.
 * @param message String to be logged as caller-message.
 * @returns {Promise<any|null>}
 */
async function saveToApm (message) {
    try {

        if (message == null || message === "")
            message = APM_EMPTY_MESSAGE;

        let jsonInRequest = {
            callerMessage: message,
            callerName: APM_CALLER_NAME
        }

        const response = await fetch(APM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonInRequest)
        });

        if (response.ok) {
            // const responseData = await response.json();
            console.log('Successfully connected to APM. Connection status: ', response);
            // return responseData;
        } else {
            console.error('Error in response from APM. Connection status: ', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error while connecting to APM. Error: ', error.message);
        return null;
    }
}


