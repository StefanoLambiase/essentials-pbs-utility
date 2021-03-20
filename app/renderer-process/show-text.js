// Listens for the generate-text event.
window.bridgeToMain.onReceive('show-text', (data) => {
	console.log(`Received \n${data}\n from main process`);

	$("textarea#exampleFormControlTextarea3").val(data);
});