function doBayes() {
    symptoms = ["fever", "fatigue", "cough", "sneezing", "achesPains", "runnyNose", "soreThroat", "diarrhea", "headache", "shortnessBreath"]
    diseases = ["covid", "flu", "cold"]
    covidOccurence = 1000/60000000
    PA = [0.0000005,0.05,0.002]
    PB = [0.023,0.016,0.046,0.0023,0.0029,0.028,0.031,0.01,0.025,0.011]
    let i = 0;
    for (i=0; i < PB.length; i++) {
        PB[i] = PB[i]/52
    }
    PBFlu = [0.3,0.3,0.3,0,0.3,0.1,0.1,0.1,0.3,0]
    PBCold = [0.03,0.1,0.3,0.3,0.3,0.3,0,0.03,0]
    PBCovid = [0.879,0.381,0.677,0.001,0.148,0.048,0.139,0.037,0.136,0.186]

    let symptom = 0;
    let Psymptomset = 1;
    let Psymptomset_cold = 1;
    let Psymptomset_flu = 1;
    let Psymptomset_covid = 1;
    for (symptom = 0; symptom < symptoms.length; symptom++) {
        if (document.getElementById(symptoms[symptom]+"Symptom").checked) {
            Psymptomset = Psymptomset*PB[symptom]
            Psymptomset_cold = Psymptomset_cold*PBCold[symptom]
            Psymptomset_flu = Psymptomset_flu*PBFlu[symptom]
            Psymptomset_covid = Psymptomset_covid*PBCovid[symptom]
        } else {
            Psymptomset = Psymptomset*(1 - PB[symptom])
            Psymptomset_cold = Psymptomset_cold*(1-PBCold[symptom])
            Psymptomset_flu = Psymptomset_flu*(1-PBFlu[symptom])
            Psymptomset_covid = Psymptomset_covid*(1-PBCovid[symptom])
        }
    }

    Pcovid = PA[0] / Psymptomset * Psymptomset_covid

    Pcovid = Pcovid/(1 + Pcovid)

    document.getElementById("diseaseChances").innerHTML = "<p>Coronavirus chance: " + Pcovid*100 + "%" + "</p>"
}
