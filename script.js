var quizData = [
    {
        question: 'Who is the Captain of the Strawhat Pirates?',
        a: 'Luffy',
        b: 'Zoro',
        c: 'Buggy',
        d: 'Ussop',
        correct: 'a',
    },
    {
        question: "Who is Luffy's brother?",
        a: 'Sanji',
        b: 'Ace',
        c: 'Dragon',
        d: 'Garp',
        correct: 'b',
    },
    {
        question: "What is Luffy's full name?",
        a: 'Monkey Luffy',
        b: 'Trafalgar D Luffy',
        c: 'Marshall D Luffy',
        d: 'Monkey D Luffy',
        correct: 'd',
    },
    {
        question: 'What is the One Piece?',
        a: 'Wealth, Fame, Power',
        b: 'Void Century',
        c: 'Freedom',
        d: 'None of the above, we do not know yet',
        correct: 'd',
    },
];

var countdown = document.getElementById('clock');
var time = 60;

function updateCountDown() {
    time--;
    if (time <= 0) {
        time = 0;
        countdown.innerHTML = `${time}`;
        endGame();

    }
    countdown.innerHTML = `${time}`;
}

var quiz = document.getElementById('quiz');
var answerEls = document.querySelectorAll('.answer');
var questionEl = document.getElementById('question');
var aAnswer = document.getElementById('a-answer');
var bAnswer = document.getElementById('b-answer');
var cAnswer = document.getElementById('c-answer');
var dAnswer = document.getElementById('d-answer');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start-btn');

var currentQuiz = 0;
var score = 0;

startBtn.addEventListener('click', function () {

    setInterval(updateCountDown, 1000);

    var startEl = document.getElementById('welcome');
    startEl.classList.add('hide');

    quiz.classList.remove('hide');

    loadQuiz();
})

function loadQuiz() {

    deselectAnswers();

    var currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    aAnswer.innerText = currentQuizData.a
    bAnswer.innerText = currentQuizData.b
    cAnswer.innerText = currentQuizData.c
    dAnswer.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    var answer
    answerEls.forEach(answerEls => {
        if (answerEls.checked) {
            answer = answerEls.id
        }
    })
    return answer
}

submitBtn.addEventListener('click', () => {
    var answer = getSelected()
    console.log(answer);
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }
        else {
            time -= 10;
        }
    } else {
        return
    }

    currentQuiz++

    if (currentQuiz === quizData.length) {
        endGame() 
    } else {
        loadQuiz()
    }
})

function endGame() {
    quiz.innerHTML = '';
    var h2 = document.querySelector('#score');

    h2.innerText = `You answered ${score}/${quizData.length} questions correctly`

    var form = document.querySelector('#score-form');

    form.classList.remove('hide');
}

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var initials_form = document.querySelector('#initials-form');


initials_form.addEventListener('submit', function() {
    var initials = document.querySelector('#initials');
    var scoreObj = {
    initials: initials.value,
    score: score,
    };
   
    highScores.push(scoreObj);  
    localStorage.setItem('highScores', JSON.stringify(highScores));
})


var reload = document.querySelector('#reload')
reload.addEventListener('click', function(){
    location.reload()
})

