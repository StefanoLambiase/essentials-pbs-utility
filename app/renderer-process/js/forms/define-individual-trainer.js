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
		window.singlePokemonFormPath,		// Defined in 'js/utils/globals.js'.
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


// *################ Form Submission Part ################

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
			nature: attributesInputs.namedItem('individualTrainerPokemonNature').value,
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
		trainerVersion: $('#individualTrainerId').val(),
		trainerItems: itemList,
		trainerLoseText: $('#individualTrainerLoseText').val(),
		trainerPokemonList: pokemonList
	};

	console.log('DEFINE INDIVIDUAL TRAINER: Trainer Submitted.')
	console.table(individualTrainer);

	window.bridgeToMain.send('individual-trainer-submission', individualTrainer);
}


// Adds the function to the individual trainer form submission.
defineIndividualTrainerForm.addEventListener('submit', sendIndividualTrainerForm)

