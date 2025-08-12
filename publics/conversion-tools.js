document.addEventListener('DOMContentLoaded', () => {

    // --- ANGLE CONVERTER ---
    const angleTable = document.getElementById('angleConverterTable');
    if (angleTable) {
        const inputs = {
            degrees: angleTable.querySelector('#inputDegrees'),
            radians: angleTable.querySelector('#inputRadians'),
            gradians: angleTable.querySelector('#inputGradians')
        };

        const factors = {
            degrees: Math.PI / 180, // to radians
            radians: 1, // base unit
            gradians: Math.PI / 200 // to radians
        };

        const updateAngleValues = (sourceInput, sourceUnit) => {
            const val = parseFloat(sourceInput.value);
            if (isNaN(val)) {
                Object.values(inputs).forEach(input => { if (input !== sourceInput) input.value = ''; });
                return;
            }

            const valueInRadians = val * factors[sourceUnit];

            for (const unit in inputs) {
                if (unit !== sourceUnit) {
                    const convertedValue = valueInRadians / factors[unit];
                    // Use a reasonable precision to avoid long decimals
                    inputs[unit].value = parseFloat(convertedValue.toPrecision(12));
                }
            }
        };

        Object.keys(inputs).forEach(unit => {
            if (inputs[unit]) {
                inputs[unit].addEventListener('input', () => updateAngleValues(inputs[unit], unit));
            }
        });
    }

    // --- AREA CONVERTER ---
    const areaTable = document.getElementById('areaConverterTable');
    if (areaTable) {
        const inputs = {
            squaremetres: areaTable.querySelector('#inputSquaremetres'),
            squarefeet: areaTable.querySelector('#inputSquareFeet'),
            acres: areaTable.querySelector('#inputAcres'),
            hectares: areaTable.querySelector('#inputHectares'),
            squarekilometres: areaTable.querySelector('#inputSquarekilometres'),
            squareinches: areaTable.querySelector('#inputSquareinches'),
            squareyards: areaTable.querySelector('#inputSquareYards'),
            squaremiles: areaTable.querySelector('#inputSquareMiles'),
            squarecentimetre: areaTable.querySelector('#inputSquarecentimetre'),
            squaremillimetre: areaTable.querySelector('#inputSquaremillimetre')
        };
        
        // Conversion factors to 1 square meter
        const factorsToM2 = {
            squaremetres: 1,
            squarefeet: 0.092903,
            acres: 4046.86,
            hectares: 10000,
            squarekilometres: 1e6,
            squareinches: 0.00064516,
            squareyards: 0.836127,
            squaremiles: 2.59e6,
            squarecentimetre: 1e-4,
            squaremillimetre: 1e-6
        };

        const updateAreaValues = (sourceInput, sourceUnit) => {
            const val = parseFloat(sourceInput.value);
            if (isNaN(val)) {
                Object.values(inputs).forEach(input => {
                    if (input && input !== sourceInput) input.value = '';
                });
                return;
            }

            const valueInM2 = val * factorsToM2[sourceUnit];

            for (const unit in inputs) {
                if (unit !== sourceUnit && inputs[unit]) {
                    const convertedValue = valueInM2 / factorsToM2[unit];
                    inputs[unit].value = parseFloat(convertedValue.toPrecision(12));
                }
            }
        };

        Object.keys(inputs).forEach(unit => {
            if (inputs[unit]) {
                // Normalize ID for JS key access
                const cleanUnit = unit.toLowerCase().replace(/&/g, '').replace(/ /g, '');
                inputs[unit].addEventListener('input', () => updateAreaValues(inputs[unit], cleanUnit));
            }
        });
    }

});