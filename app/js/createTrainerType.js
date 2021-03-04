const createTrainerTypeForm = document.querySelector('#createTrainerTypeForm');

function sendForm(event) {
    console.log('Sono nel form 1')
    event.preventDefault(); // stop the form from submitting
    const idLabel = document.getElementById('trainerTypeId');

    console.log('Sono nel form 2')
    const miaow = window.api.send("form-submission", idLabel.value);
    console.log(miaow);
    console.log('Sono nel form 3')
}


window.api.receive("from-form-submission", (data) => {
    console.log(`Received ${data} from main process`);
});

createTrainerTypeForm.addEventListener('submit', sendForm)
