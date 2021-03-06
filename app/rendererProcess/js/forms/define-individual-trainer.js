// #############################################################
// ########################## Items ############################
// #############################################################

var addItemInputBtn = document.getElementById('individualTrainerAddItem');
var removeItemInputBtn = document.getElementById('individualTrainerRemoveItem');

addItemInputBtn.addEventListener('click', () => {
	// append input control at end of form
  $("<div class='col mb-3'><input type='text' class='form-control'></div>")
     .appendTo('#individualTrainerItemsList');
});

removeItemInputBtn.addEventListener('click', () => {
	$('#individualTrainerItemsList div').last().remove();
});

// #############################################################
// ######################## Pokémons ###########################
// #############################################################

var addPokemonFormBtn = document.getElementById('individualTrainerAddPokemon');
var removePokemonFormBtn = document.getElementById('individualTrainerRemovePokemon')
