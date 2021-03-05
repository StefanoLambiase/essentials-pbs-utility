const createTrainerTypeForm = document.querySelector('#createTrainerTypeForm');

function sendForm(event) {
    console.log('Sono nel form 1')
    event.preventDefault(); // stop the form from submitting

    const trainerType = {
        idInput: $("#trainerTypeId").val(),
        internalNameInput: $("#trainerTypeInternalName").val()
    }

    console.log('Sono nel form 2')
    window.api.send("form-submission", trainerType);
    console.log('Sono nel form 3')
}


window.api.receive("from-form-submission", (data) => {
    console.log(`Received ${data} from main process`);
});

createTrainerTypeForm.addEventListener('submit', sendForm)
