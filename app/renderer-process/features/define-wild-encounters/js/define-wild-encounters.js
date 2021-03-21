// * --------------------------------------------------------------------------------------
// * -------------------------------- Files Paths variables -------------------------------
// * --------------------------------------------------------------------------------------

// ! IMPORTANT: the path starts from the renderer-process directory.
const thisfeaturesPath = featuresPath;
const componentsPath = thisfeaturesPath + 'define-wild-encounters/components/'

const entities12Path = componentsPath + 'entities-12.html';


// * ------------------------------------------------------------------------------------
// * -------------------------------- Form initialization -------------------------------
// * ------------------------------------------------------------------------------------

initDefineWildEncountersForm();


// * ---------------------------------------------------------------------------------------------
// * -------------------------------- Functions for initialization -------------------------------
// * ---------------------------------------------------------------------------------------------

/**
 * Initializes the form for DEFINE-INDIVIDUAL-TRAINER.
 */
function initDefineWildEncountersForm() {
    console.log('DEFINE-WILD-ENCOUNTERS: form initialization started!');

    var divIndividualTrainer = document.getElementById('pills-wild-encounters');

    $(divIndividualTrainer).load(
        './features/define-wild-encounters/components/define-wild-encounters-form.html',
        undefined,
        () => {
            initLandPart();
        }
    )

    console.log('DEFINE-WILD-ENCOUNTERS: form initialization completed!');
}


function initLandPart() {
    $('#wildEncountersLand').load(
        entities12Path,
        undefined,
        undefined
    )
}