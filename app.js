/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

- Challenge 1: A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
- Challenge 2: Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
- Challenge 3: Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 


*/

var scores, roundScore, activePlayer, gamePlaying, scoreLimit;
var previousDice = 0;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (checkWinningScore()) {
        if (gamePlaying) {
            // 1. Random number
            var dice1 = Math.ceil(Math.random() * 6);
            var dice2 = Math.ceil(Math.random() * 6);

            // 2. Display the result
            // dice 1
            var diceDOM1 = document.querySelector('.dice-1');
            diceDOM1.style.display = 'block';
            diceDOM1.src = 'dice-' + dice1 + '.png';

            // dice 2
            var diceDOM2 = document.querySelector('.dice-2');
            diceDOM2.style.display = 'block';
            diceDOM2.src = 'dice-' + dice2 + '.png';

            // 3.Update the round score IF the rolled number was NOT a 1
            if (previousDice === 6 && dice1 === 6) {

                scores[activePlayer] = 0;
                roundScore = 0;
                document.getElementById('score-' + activePlayer).textContent = '0';
                document.getElementById('current-' + activePlayer).textContent = '0';

                nextPlayer();
            } else if (dice1 !== 1 && dice2 !== 1) {

                previousDice = dice1;

                // add score
                roundScore += (dice1 + dice2);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                // next player
                nextPlayer();
            }
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (checkWinningScore()) {

        if (gamePlaying) {

            // add the current score to the global score
            scores[activePlayer] += roundScore;

            // update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            // check if player won the game
            if (scores[activePlayer] >= scoreLimit) {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice-1').style.display = 'none';
                document.querySelector('.dice-2').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
            } else {
                nextPlayer();
            }
        }
    }
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousDice = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    scoreLimit = document.getElementById('score-limit').value.trim();

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function checkWinningScore() {
    scoreLimit = document.getElementById('score-limit').value.trim();
    if (scoreLimit == "") {
        alert('Please enter winning score before start game!');
        return false;
    }
    return true;
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}