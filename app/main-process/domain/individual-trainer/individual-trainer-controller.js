/**
 * Gets a IndividualTrainer and create a string for the PBS file.
 * @param {*} individualTrainer - The object to transform into a string.
 * @return {string} - The string to insert into the PBS file.
 */
function generateIndividualTrainerString(individualTrainer) {
  const item = individualTrainer;

  const commentString = '#-------------------------------\n';
  const trainerStringList = [];

  trainerStringList[0] = `[${item.trainerType},${item.trainerName}`;
  if (item.trainerVersion !== '') trainerStringList[0] += `,${item.trainerVersion}`;
  trainerStringList[0] += ']';

  if (item.trainerItems.length > 0) trainerStringList[1] = `Items = ${item.trainerItems}`;
  if (item.trainerLoseText !== '') trainerStringList[2] = `LoseText = "${item.trainerLoseText}"`;

  for (const pokemon of item.trainerPokemonList) {
    let pRowList = [];

    pRowList[0] = `Pokemon = ${pokemon.internalName},${pokemon.level}`;
    pRowList[1] = (pokemon.item !== '') ? `   Item = ${pokemon.item}` : undefined;
    pRowList[2] = (pokemon.moves !== '') ? `    Moves = ${pokemon.moves}` : undefined;
    pRowList[3] = (pokemon.ability !== '') ? `    Ability = ${pokemon.ability}` : undefined;
    pRowList[4] = `    Gender = ${pokemon.gender}`;
    pRowList[5] = (pokemon.form !== '') ? `   Form = ${pokemon.form}` : undefined;
    pRowList[6] = `    Shiny = ${pokemon.shiny}`;
    pRowList[7] = (pokemon.nature !== '') ? `    Nature = ${pokemon.nature}` : undefined;

    pRowList[8] = (pokemon.iv !== ',,,,,') ? `    IV = ${pokemon.iv}` : undefined;
    pRowList[9] = (pokemon.ev !== ',,,,,') ? `    EV = ${pokemon.ev}` : undefined;

    pRowList[10] = (pokemon.happiness !== '') ? `    Happiness = ${pokemon.happiness}` : undefined;
    pRowList[11] = (pokemon.name !== '') ? `    Name = ${pokemon.name}` : undefined;
    pRowList[12] = `    Shadow = ${pokemon.shadow}`;
    pRowList[13] = (pokemon.ball !== '') ? `    Ball = ${pokemon.ball}` : undefined;

    pRowList = pRowList.filter( (el) => {
      return el != undefined;
    });

    trainerStringList.push(pRowList.join('\n'));
  }

  console.log(trainerStringList.join('\n'));
  return commentString + trainerStringList.join('\n');
}


// Exports the function.
module.exports.generateIndividualTrainerString = generateIndividualTrainerString;
