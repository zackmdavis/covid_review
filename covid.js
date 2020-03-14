function doBayes() {
    let diseases = ["base", "cold", "flu", "covid"];
    let diseaseDisplayNames = {
        cold: "Common cold",
        flu: "Influenza",
        covid: "COVID-19",
    };

    let symptoms = ["fever", "fatigue", "cough", "sneezing", "achesPains", "runnyNose", "soreThroat", "diarrhea", "headache", "shortnessBreath"];

    let prior = {
        cold: 0.05,
        flu: 0.002,
        covid: 0.0000005,
    };

    let symptomRates = {
        // XXX: why are we dividing by 52 here?! I can't figure it out —ZMD
        base: [0.023, 0.016, 0.046, 0.0023, 0.0029, 0.028, 0.031, 0.01, 0.025, 0.011].map(x => x/52),
        cold: [0.03, 0.1, 0.1, 0.3, 0.3, 0.3, 0.3, 0, 0.03, 0],
        flu: [0.3, 0.3, 0.3, 0, 0.3, 0.1, 0.1, 0.1, 0.3, 0],
        covid: [0.879, 0.381, 0.677, 0.001, 0.148, 0.048, 0.139, 0.037, 0.136, 0.186]
    };

    let likelihood = {
        base: 1,
        cold: 1,
        flu: 1,
        covid: 1,
    };

    for (let [symptomNo, symptom] of symptoms.entries()) {
        for (let disease of diseases) {
            if (document.getElementById(symptom + "Symptom").checked) {
                likelihood[disease] *= symptomRates[disease][symptomNo];
            } else {
                likelihood[disease] *= 1 - symptomRates[disease][symptomNo];
            }
        }
    }

    let el = document.getElementById("diseaseChances");
    // clear the div if it's been filled from a previous click
    el.innerHTML = "";
    for (let disease of diseases) {
        if (disease === "base") {
            continue;
        }
        let odds = prior[disease] * likelihood[disease] / likelihood["base"];
        let probability = odds / (1 + odds);

        let p = document.createElement("p");
        let t = document.createTextNode(`${diseaseDisplayNames[disease]} chance: ${(probability*100).toFixed(2)}%`);
        p.appendChild(t);
        el.appendChild(p);
    }

}
