// * --------------------------------------------------------------------------------------
// * -------------------------------- Files Paths variables -------------------------------
// * --------------------------------------------------------------------------------------

// ! IMPORTANT: the path starts from the renderer-process directory.
const thisfeaturesPath = featuresPath;
const componentsPath = thisfeaturesPath + 'define-wild-encounters/components/entities/'

const entities12Path = componentsPath + 'entities-12.html';
const entitiesWaterRockPath = componentsPath + 'entities-water-rock.html';
const entitiesOldRodPath = componentsPath + 'entities-old-rod.html';
const entitiesGoodRodPath = componentsPath + 'entities-good-rod.html';
const entitiesSuperRodPath = componentsPath + 'entities-super-rod.html';
const entitiesHeadbuttPath = componentsPath + 'entities-headbutt.html';


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
            initLandCaveBugPart();
            initWaterRockPart();
            initRodPart();
            initHeadbutt();
        }
    )

    console.log('DEFINE-WILD-ENCOUNTERS: form initialization completed!');
}


function initLandCaveBugPart() {
    let elements = [
        document.getElementById('wildEncountersLand'),
        document.getElementById('wildEncountersLandMorning'),
        document.getElementById('wildEncountersLandDay'),
        document.getElementById('wildEncountersLandNight'),
        document.getElementById('wildEncountersCave'),
        document.getElementById('wildEncountersBugContest'),
    ];

    for (let element of elements) {
        $(element).load(
            entities12Path,
            undefined,
            undefined
        );
    }
}


function initWaterRockPart() {
    let elements = [
        document.getElementById('wildEncountersWater'),
        document.getElementById('wildEncountersRockSmash'),
    ];

    for (let element of elements) {
        $(element).load(
            entitiesWaterRockPath,
            undefined,
            undefined
        );
    }
}


function initRodPart() {
    $('#wildEncountersOldRod').load(
        entitiesOldRodPath,
        undefined,
        undefined
    );

    $('#wildEncountersGoodRod').load(
        entitiesGoodRodPath,
        undefined,
        undefined
    );

    $('#wildEncountersSuperRod').load(
        entitiesSuperRodPath,
        undefined,
        undefined
    );
}


function initHeadbutt() {
    $('#wildEncountersHeadbuttLow').load(
        entitiesHeadbuttPath,
        undefined,
        undefined
    );

    $('#wildEncountersHeadbuttHigh').load(
        entitiesHeadbuttPath,
        undefined,
        undefined
    );
}
