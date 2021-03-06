var addItemInputBtn = document.getElementById('individualTrainerAddItem');
var subtractItemInputBtn = document.getElementById('individualTrainerSubtractItem');

addItemInputBtn.addEventListener('click', () => {
	// append input control at end of form
  $("<div class='col mb-3'><input type='text' class='form-control'></div>")
     .appendTo('#individualTrainerItemsList');
});

subtractItemInputBtn.addEventListener('click', () => {
	$('#individualTrainerItemsList div').last().remove();
});
