// *#############################################################
// *################ Components paths vars ######################
// *#############################################################

const singlePokemonFormPath = '../components/single-pokemon-form.html';


// *#############################################################
// *########################## Items ############################
// *#############################################################

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


// *#############################################################
// *######################## Pokémons ###########################
// *#############################################################

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


// *#############################################################
// *####################### Init form ###########################
// *#############################################################

// Ads the first pokémon form element on startup.
createPokemonForm(0);
