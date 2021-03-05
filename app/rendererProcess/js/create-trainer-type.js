const createTrainerTypeForm = document.querySelector('#createTrainerTypeForm');

function sendForm(event) {
    console.log('CREATE TRAINER TYPE: submitting form.')
    event.preventDefault(); // stop the form from submitting

    const trainerType = {
        idInput: $('#trainerTypeId').val(),
        internalNameInput: $('#trainerTypeInternalName').val()
    }

    window.bridgeToMain.send('trainer-type-submission', trainerType);
}

createTrainerTypeForm.addEventListener('submit', sendForm)
