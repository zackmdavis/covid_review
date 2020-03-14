function doBayes() {
    let symptoms = ["fever", "fatigue", "cough", "sneezing", "achesPains", "runnyNose", "soreThroat", "diarrhea", "headache", "shortnessBreath"];
    let diseases = ["covid", "flu", "cold"];
    let PA = [0.0000005, 0.05, 0.002];
    let PB = [0.023, 0.016, 0.046, 0.0023, 0.0029, 0.028, 0.031, 0.01, 0.025, 0.011];
    for (let i = 0; i < PB.length; i++) {
        // XXX: why are we dividing by 52 here?! I can't figure it out —ZMD
        PB[i] /= 52;
    }
    let PBFlu = [0.3, 0.3, 0.3, 0, 0.3, 0.1, 0.1, 0.1, 0.3, 0];
    let PBCold = [0.03, 0.1, 0.1, 0.3, 0.3, 0.3, 0.3, 0, 0.03, 0];
    let PBCovid = [0.879, 0.381, 0.677, 0.001, 0.148, 0.048, 0.139, 0.037, 0.136, 0.186];

    let Psymptomset = 1;
    let Psymptomset_cold = 1;
    let Psymptomset_flu = 1;
    let Psymptomset_covid = 1;
    for (let symptom = 0; symptom < symptoms.length; symptom++) {
        if (document.getElementById(symptoms[symptom] + "Symptom").checked) {
            Psymptomset *= PB[symptom]
            Psymptomset_cold *= PBCold[symptom]
            Psymptomset_flu *= PBFlu[symptom]
            Psymptomset_covid *= PBCovid[symptom]
        } else {
            Psymptomset *= 1 - PB[symptom]
            Psymptomset_cold *= 1 - PBCold[symptom]
            Psymptomset_flu *= 1 - PBFlu[symptom]
            Psymptomset_covid *= 1 - PBCovid[symptom]
        }
    }

    let Pcovid = PA[0] / Psymptomset * Psymptomset_covid;
    // convert odds ratio to probability?
    Pcovid = Pcovid / (1 + Pcovid);

    let Pflu = PA[2] / Psymptomset * Psymptomset_flu;
    Pflu = Pflu/(1 + Pflu);

    let Pcold = PA[1] / Psymptomset * Psymptomset_cold;
    Pcold = Pcold/(1 + Pcold);

    document.getElementById("diseaseChances").innerHTML = "<p>Coronavirus chance: " + Pcovid*100 + "%" + "</p><p>Flu chance: " + Pflu*100 + "%" + "</p><p>Cold chance: " + Pcold*100 + "%" + "</p>";
}
