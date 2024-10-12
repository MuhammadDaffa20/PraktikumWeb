function clearDisplay() {
    document.getElementById('result').value = '';
}

function appendCharacter(character) {
    document.getElementById('result').value += character;
}

function calculate() {
    let expression = document.getElementById('result').value;

    try {
        let result = eval(expression);
        document.getElementById('result').value = result;
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}
