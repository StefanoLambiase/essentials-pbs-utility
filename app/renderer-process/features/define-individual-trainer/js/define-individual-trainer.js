// * --------------------------------------------------------------------------------------
// * -------------------------------- Files Paths variables -------------------------------
// * --------------------------------------------------------------------------------------

// ! IMPORTANT: the path starts from the renderer-process directory.
const singlePokemonFormPath = './features/define-individual-trainer/components/single-pokemon-form.html';


// * ------------------------------------------------------------------------------------
// * -------------------------------- Form initialization -------------------------------
// * ------------------------------------------------------------------------------------

initDefineIndividualTrainerForm();


// * ---------------------------------------------------------------------------------------------
// * -------------------------------- Functions for initialization -------------------------------
// * ---------------------------------------------------------------------------------------------

/**
 * Initializes the form for DEFINE-INDIVIDUAL-TRAINER.
 */
function initDefineIndividualTrainerForm() {
  console.log('DEFINE-INDIVIDUAL-TRAINER: form initialization started!');

  var divIndividualTrainer = document.getElementById('pills-individual-trainer');

  $(divIndividualTrainer).load(
    './features/define-individual-trainer/components/define-individual-trainer-form.html',
    undefined,
    () => {
      initItemsPart();
      initPokemonPart();
      initFormSubmission();
    }
  )

  console.log('DEFINE-INDIVIDUAL-TRAINER: form initialization completed!');
}


/**
 * Initializes ITEMS part of the form.
 */
function initItemsPart() {
  // *################ Vars ################

  var addItemInputBtn = document.getElementById('individualTrainerAddItem');
  var removeItemInputBtn = document.getElementById('individualTrainerRemoveItem');

  // *################ Listeners ################

  addItemInputBtn.addEventListener('click', () => {
    // append input control at end of form
    $('<div class="col mb-3"><input type="text" class="form-control"></div>')
      .appendTo('#individualTrainerItemsList');
  });

  removeItemInputBtn.addEventListener('click', () => {
    $('#individualTrainerItemsList div').last().remove();
  });

}


/**
 * Initializes POKEMON part of the form.
 */
function initPokemonPart() {
  // *################ Vars ################

  // Gets the add and remove buttons.
  var addPokemonFormBtn = document.getElementById('individualTrainerAddPokemon');
  var removePokemonFormBtn = document.getElementById('individualTrainerRemovePokemon')

  // Gets the list of pokémon forms.
  var individualTrainerPokemonList = document.getElementById('individualTrainerPokemonList');

  // *################ Functions ################

  /**
   * Adds a Pokémon form to the DOM.
   * @param {Number} numPokemonForms - Number of actual pokémon forms in the DOM.
   */
  function createPokemonForm(numPokemonForms) {
    // Creates the new element.
    var newPokemonElement = document.createElement('div');
    newPokemonElement.className = 'row row-cols-4 border rounded p-2 mb-2';
    newPokemonElement.id = 'pokemon#' + (numPokemonForms + 1);

    // Ads the element to the list of forms.
    individualTrainerPokemonList.append(newPokemonElement);

    // Uses JQuery to insert the form inside the new element.
    // Takes the form in a HTML file in the components folder.
    // When the form has been loaded, It inserts a title at the beginning of it.
    $(newPokemonElement).load(
      singlePokemonFormPath,
      undefined,
      () => {
        $('<div class="col-12 p-2 mb-2"><h4>Pokémon #' + (numPokemonForms + 1) + '</h4></div>')
          .prependTo(newPokemonElement);
      }
    );
  }

  // *################ Listeners ################

  // Adds a pokémon form to the list of forms.
  addPokemonFormBtn.addEventListener('click', () => {
    // Gets information on the actual pokémon forms in the document.
    var numPokemonForms = individualTrainerPokemonList.childElementCount;

    if (numPokemonForms < 6) {
      createPokemonForm(numPokemonForms);
    }
  });

  // Remove the last pokémon form to the list of forms.
  removePokemonFormBtn.addEventListener('click', () => {
    // Gets information on the actual pokémon forms in the document.
    var numPokemonForms = individualTrainerPokemonList.childElementCount;

    if (numPokemonForms > 1) {
      individualTrainerPokemonList.removeChild(individualTrainerPokemonList.lastChild);
    }
  });

  // Ads the first pokémon form element on startup.
  createPokemonForm(0);
}


/**
 * Initializes SUBMISSION part of the form.
 */
function initFormSubmission() {
  // The form used to define an Individual Trainer.
  const defineIndividualTrainerForm = document.getElementById('defineIndividualTrainer');

  /**
   * Gets the informations about a trainer from the form in the view
   * and sends it to the main process (main.js).
   * @param {*} event 
   */
  function sendIndividualTrainerForm(event) {
    console.log('DEFINE INDIVIDUAL TRAINER: submitting form.')
    event.preventDefault(); // stop the form from submitting

    // Gets Items part
    const itemsDivElement = document.getElementById('individualTrainerItemsList');
    let itemList = [];
    if (itemsDivElement.children.length !== 0) {
      for (let divItem of itemsDivElement.children) {
        const inputItem = divItem.firstElementChild;
        itemList.push($(inputItem).val());
      }
    }

    // Gets Pokémons part
    let pokemonList = [];
    for (let pokemonItem of individualTrainerPokemonList.children) {
      // Gets the form's fields.
      const attributesInputs = pokemonItem.getElementsByTagName('input');
      const attributesSelects = pokemonItem.getElementsByTagName('select');

      // Creates the pokémon object.
      const pokemon = {
        internalName: attributesInputs.namedItem('individualTrainerPokemonInternalName').value,
        level: attributesInputs.namedItem('individualTrainerPokemonLevel').valueAsNumber,
        item: attributesInputs.namedItem('individualTrainerPokemonItem').value,
        moves: attributesInputs.namedItem('individualTrainerPokemonMoves1').value + ',' +
          attributesInputs.namedItem('individualTrainerPokemonMoves2').value + ',' +
          attributesInputs.namedItem('individualTrainerPokemonMoves3').value + ',' +
          attributesInputs.namedItem('individualTrainerPokemonMoves4').value,
        ability: attributesInputs.namedItem('individualTrainerPokemonAbility').value,
        gender: attributesSelects.namedItem('individualTrainerPokemonGender').value,
        form: attributesInputs.namedItem('individualTrainerPokemonForm').value,
        shiny: attributesSelects.namedItem('individualTrainerPokemonShiny').value,
        nature: attributesSelects.namedItem('individualTrainerPokemonNature').value,
        iv: attributesInputs.namedItem('iv1').value + ',' +
          attributesInputs.namedItem('iv2').value + ',' +
          attributesInputs.namedItem('iv3').value + ',' +
          attributesInputs.namedItem('iv4').value + ',' +
          attributesInputs.namedItem('iv5').value + ',' +
          attributesInputs.namedItem('iv6').value,
        ev: attributesInputs.namedItem('ev1').value + ',' +
          attributesInputs.namedItem('ev2').value + ',' +
          attributesInputs.namedItem('ev3').value + ',' +
          attributesInputs.namedItem('ev4').value + ',' +
          attributesInputs.namedItem('ev5').value + ',' +
          attributesInputs.namedItem('ev6').value,
        happiness: attributesInputs.namedItem('individualTrainerPokemonHappiness').value,
        name: attributesInputs.namedItem('individualTrainerPokemonNickname').value,
        shadow: attributesSelects.namedItem('individualTrainerPokemonShadow').value,
        ball: attributesInputs.namedItem('individualTrainerPokemonBall').value,
      };

      pokemonList.push(pokemon);
    }

    // Creates the Trainer object to send.
    let individualTrainer = {
      trainerType: $('#individualTrainerId').val(),
      trainerName: $('#individualTrainerName').val(),
      trainerVersion: $('#individualTrainerVersionNumber').val(),
      trainerItems: itemList,
      trainerLoseText: $('#individualTrainerLoseText').val(),
      trainerPokemonList: pokemonList
    };

    console.log('DEFINE INDIVIDUAL TRAINER: Trainer Submitted.')
    console.table(individualTrainer);

    // Creates the object to send to the main process.
    const formData = {
      type: 'individual-trainer',
      data: individualTrainer,
    }
    // Sends the object using the bridge.
    window.bridgeToMain.send('form-submission', formData);
  }


  // * Form Submission Listener

  // Adds the function as listener to the individual trainer form submission.
  defineIndividualTrainerForm.addEventListener(
    'submit', // Event type
    function (event) {
      // Checks if the form field are valid.
      if (!defineIndividualTrainerForm.checkValidity()) {
        console.log('Form fields are not correct!')
        // If the form is not valid, avoid form submission.
        event.preventDefault();
        event.stopPropagation();
        // Alert the user
        $(window.successAlert).hide();
        $(window.failAlert).show();
        setTimeout(function () {
          $(window.failAlert).slideUp(3000);
        }, 5000);
      } else {
        console.log('Form fields are correct!')
        // If the form is valid, submits it.
        sendIndividualTrainerForm(event);
        // Alert the user
        $(window.successAlert).show();
        $(window.failAlert).hide();
        setTimeout(function () {
          $(window.successAlert).slideUp(3000);
        }, 5000);
      }
      defineIndividualTrainerForm.classList.add('was-validated');
    },
    false
  );

}
