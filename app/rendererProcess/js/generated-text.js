// Listens for the generate-text event.
window.bridgeToMain.onReceive('generate-text', (data) => {
	console.log(`Received ${data.idInput} from main process`);

	let s = `ID inserted: ${data.idInput}\n` + 
					`Internal Name Input: ${data.internalNameInput}\n` 

	$("textarea#exampleFormControlTextarea3").val(s);
});