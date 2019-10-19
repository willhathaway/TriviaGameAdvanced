
// setting time to count down from 30:

let time = 30;

let clockRunning = false;

let intervalId;

// defining variable for the questions array to be accessed universally:

let questions;


// on click function, runs when the 'startGame' button is clicked

$(document).on('click', '#startGame', function () {

    // hides the start game button so it cannot be clicked twice:

        $('#startGame').hide();

        // checks that the on click event is successful:

        console.log('click');

        // timer starts:

        if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        }

        // questions div and submit button display in the html:

        $('#questions').show();
        $('#submit').show();

        // Questions array, containing question objects:

        questions = [
            question1 = {
                question: 'What is it?',
                answers: [' A mysterious stranger with no face',
                    ' A creature whose claws drip with some ominous substance',
                    ' A god, older and more powerful than time itself',
                    " It's a... Well, it's odd... I can't seem to describe it..."
                ],
                trueAnswer: " It's a... Well, it's odd... I can't seem to describe it..."
            },
            question2 = {
                question: 'Whence has it come?',
                answers: [' From inside a shining cosmic sailboat',
                    ' From a far off land',
                    ' From deep beneath the waves',
                    ' From the future'
                ],
                trueAnswer: ' From deep beneath the waves'
            },
            question3 = {
                question: 'What does it want?',
                answers: [' A place to call home',
                    ' An ancient artifact',
                    " To find another of it's near-extinct kind",
                    ' Human blood'
                ],
                trueAnswer: " To find another of it's near-extinct kind"
            }

        ]

        // adding the questions and answers to HTML file:

        for (let i = 0; i < questions.length; i++) {

            console.log(questions[i].question); // returns the question

            trueAnswer = (questions[i].trueAnswer);

            console.log('true answer: ' + trueAnswer); // logs the correct answer

            let questionHTML = $("<h3>");

            $(questionHTML).text(questions[i].question);
            $('#questions').append(questionHTML);
            let newForm = $('<form class= "questionForm" id = ' + questions[i] + '>');

            for (let a = 0; a < (questions[i].answers).length; a++) {

                console.log(questions[i].answers[a]); // logs the answers

                // if statement checks whether to asign 'true' or 'false' to the html element:

                value = ''

                if (questions[i].answers[a] === trueAnswer) {
                    value = 'true';
                } else if (questions[i].answers[a] !== trueAnswer) {
                    value = 'false';
                } else {
                    console.log('error');
                }

                let answersHTML = $('<input type="radio" name="answer" class= "answer" value=' + value + '><p class= "answer">');
                $(answersHTML).html(questions[i].answers[a]);
                $(newForm).append(answersHTML);
                $('#questions').append(newForm);

            }
        }

    }

);

// timer counts down from 30, converting to mm:ss and alerting the user when they run out of time:

function count() {

    time--;

    let currentTime = timeConverter(time);

    $('#timer').text(currentTime);

    if (time === 0) {
        alert("Time's up!");
        location.reload();
    }

}


// taken from stopwatch activity:

function timeConverter(t) {

    //  takes the current time in seconds and convert it to minutes and seconds (mm:ss):

    let minutes = Math.floor(t / 60);
    let seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (minutes === 0) {
        minutes = '00';
    } else if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return minutes + ':' + seconds;
}


// function called when the submit button is clicked. this function checks whether all the questions have been guessed at,
// and how many of the guesses were correct:

$(document).on('click', '#submit', function () {

    // a variable for storing the number of correct guesses:

    correct = 0;

    // a variable for storing the number of checked answers:

    checked = 0

    // an object containing the properties of all elements with class name 'answer' (all the input elements):

    answersObject = document.getElementsByClassName('answer');

    console.log(answersObject);

    // checks how many answers have been checked:

    for (let c in answersObject) {
        if (answersObject[c].checked === true) {
            checked++;
        }
    }

    // checks whether all the questions have an answer:

    if (checked === questions.length) {
        clearInterval(intervalId);
        for (let c in answersObject) {
            if ((answersObject[c].checked === true) && (answersObject[c].value === 'true')) {
                correct++;
            }
        }

        $('#result').html('correct guesses: ' + correct + ' out of ' + questions.length);

    } else if (checked < questions.length) {
        alert('Please answer all questions before submitting')
    }

});