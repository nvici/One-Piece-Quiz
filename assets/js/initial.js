//we have the data pushed to the initial.html pagge with the score and initials of the user
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var highScoresList = document.querySelector('#high-score-list');

for (var i = 0; i < highScores.length; i++) {
    var li = document.createElement('li');
    
    li.innerText = `${highScores[i].initials}: ${highScores[i].score}`;

    highScoresList.appendChild(li);
}