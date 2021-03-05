const createTrainerTypeForm = document.querySelector('#createTrainerTypeForm');

function sendForm(event) {
    console.log('CREATE TRAINER TYPE: submitting form.')
    event.preventDefault(); // stop the form from submitting

    const trainerType = {
        idInput: $("#trainerTypeId").val(),
        internalNameInput: $("#trainerTypeInternalName").val()
    }

    window.bridgeToMain.send("form-submission", trainerType);
}


window.bridgeToMain.onReceive("from-form-submission", (data) => {
    console.log(`Received ${data} from main process`);
});

createTrainerTypeForm.addEventListener('submit', sendForm)
