
let firstNumber = null;
let secondNumber = null;
let operator = null;
let container = $("#container");
function generateGame() {
    firstNumber = generateRandomNumbers();
    secondNumber = generateRandomNumbers();
    operator = operators[generateRandomNumbers(operators.length)];
    // operator = '<='
    $("#question").text(`${firstNumber} ${operator} ${secondNumber}?`);
}
$(() => {
    generateGame();
    $("#hits").text(isNaN(parseInt(localStorage.getItem('hits'))) ? 0 : parseInt(localStorage.getItem('hits')));
    $("#mistakes").text(isNaN(parseInt(localStorage.getItem('mistakes'))) ? 0 : parseInt(localStorage.getItem('mistakes')));
    $('input[type=radio][name=option]').change(function () {
        let selectedValue = $(this).val();
        let result = false;
        if (operator == '>')
            result = (selectedValue == 'true' && firstNumber > secondNumber) || (selectedValue == 'false' && !(firstNumber > secondNumber));
        else if (operator == '<')
            result = (selectedValue == 'true' && firstNumber < secondNumber) || (selectedValue == 'false' && !(firstNumber < secondNumber));
        else if (operator == '>=')
            result = (selectedValue == 'true' && firstNumber >= secondNumber) || (selectedValue == 'false' && !(firstNumber >= secondNumber));
        else if (operator == '<=')
            result = (selectedValue == 'true' && firstNumber <= secondNumber) || (selectedValue == 'false' && !(firstNumber <= secondNumber));
        else
            result = (selectedValue == 'true' && firstNumber == secondNumber) || (selectedValue == 'false' && !(firstNumber == secondNumber));
        let hits = parseInt(localStorage.getItem('hits'));
        let mistakes = parseInt(localStorage.getItem('mistakes'));
        if (isNaN(hits))
            hits = 0;
        if (isNaN(mistakes))
            mistakes = 0;
        hits = result == true ? ++hits : hits;
        mistakes = result == false ? ++mistakes : mistakes;
        localStorage.setItem("hits", hits);
        localStorage.setItem("mistakes", mistakes);
        $("#hits").text(hits);
        $("#mistakes").text(mistakes);
        container.removeClass();
        if (result == true) {
            container.addClass("animate-success");
            setTimeout(() => {
                container.addClass("animate-jump");
                container.removeClass();
            }, 1000);
            $.toast({
                heading: 'Parabéns',
                text: 'Parabéns, você acertou, a resposta é: ' + (selectedValue == 'true' ? "Verdadeiro" : "Falso"),
                showHideTransition: 'fade',
                icon: 'success'
            })
        } else {
            container.addClass("animate-error");
            setTimeout(() => {
                container.removeClass();
            }, 1000);
            $.toast({
                heading: 'Errou',
                text: 'Você não acertou, a resposta era: ' + (selectedValue == 'true' ? 'Falso' : 'Verdadeiro'),
                showHideTransition: 'fade',
                icon: 'error'
            })
        }
        generateGame();
        setTimeout(() => {
            $('input[name="option"]').prop('checked', false);
        }, 500)


    });
});