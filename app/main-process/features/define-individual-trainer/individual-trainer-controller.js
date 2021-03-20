/**
 * Gets a IndividualTrainer and create a string for the PBS file.
 * @param {*} individualTrainer - The object to transform into a string.
 * @return {string} - The string to insert into the PBS file.
 */
function generateIndividualTrainerString(individualTrainer) {
  const trainerStringList = []; // Creates an array that will contains all the strings.

  // Final String Line #1
  trainerStringList[0] = `[${individualTrainer.trainerType},${individualTrainer.trainerName}`;
  if (individualTrainer.trainerVersion !== '') trainerStringList[0] += `,${individualTrainer.trainerVersion}`;
  trainerStringList[0] += ']';

  // Final String Line #2 and #3
  if (individualTrainer.trainerItems.length > 0) {
    trainerStringList[1] = `Items = ${individualTrainer.trainerItems}`;
  }
  if (individualTrainer.trainerLoseText !== '') {
    trainerStringList[2] = `LoseText = "${individualTrainer.trainerLoseText}"`;
  }

  // Final String Pokémon section
  for (const pokemon of individualTrainer.trainerPokemonList) {
    let pRowList = [];

    pRowList[0] = `Pokemon = ${pokemon.internalName},${pokemon.level}`; // Name & Level
    pRowList[1] = (pokemon.item !== '') ? `    Item = ${pokemon.item}` : null; // Item
    pRowList[2] = (pokemon.moves !== ',,,') ? `    Moves = ${pokemon.moves}` : null; // Moves
    pRowList[3] = (pokemon.ability !== '') ? `    Ability = ${pokemon.ability}` : null; // Ability
    pRowList[4] = `    Gender = ${pokemon.gender}`; // Gender
    pRowList[5] = (pokemon.form !== '') ? `   Form = ${pokemon.form}` : null; // Form
    pRowList[6] = `    Shiny = ${pokemon.shiny}`; // Shiny
    pRowList[7] = (pokemon.nature !== '') ? `    Nature = ${pokemon.nature}` : null; // Nature
    pRowList[8] = (pokemon.iv !== ',,,,,') ? `    IV = ${pokemon.iv}` : null; // IV
    pRowList[9] = (pokemon.ev !== ',,,,,') ? `    EV = ${pokemon.ev}` : null; // EV
    pRowList[10] = (pokemon.happiness !== '') ? `    Happiness = ${pokemon.happiness}` : null; // Happiness
    pRowList[11] = (pokemon.name !== '') ? `    Name = ${pokemon.name}` : null; // Nickname
    pRowList[12] = `    Shadow = ${pokemon.shadow}`; // Shadow
    pRowList[13] = (pokemon.ball !== '') ? `    Ball = ${pokemon.ball}` : null; // Ball type

    // Deletes null elements from the array.
    pRowList = pRowList.filter( (el) => el != null );
    // Ads the pokémon String to the main trainer String.
    trainerStringList.push(pRowList.join('\n'));
  }

  console.log('\nINDIVIDUAL-TRAINER-CONTROLLER: composed string\n' + trainerStringList.join('\n'));
  return '#-------------------------------\n' + trainerStringList.join('\n');
}


// Exports the function.
module.exports.generateIndividualTrainerString = generateIndividualTrainerString;
