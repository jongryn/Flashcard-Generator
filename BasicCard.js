/*
// Created: Aug. 29, 2017 5:00 PM
// Author: Jonathan Gryn
// Revisions: Jon (8/29/17) - Added JS
//            Jon (9/6/17) - Trying to get js to work by cleaning up logic
*/

// Require the 'inquirer' package
var inquirer = require('inquirer');

// Import the flash cards constructor implementations
var flashCards = require('./flashCards.js');

// Import the full list of questions
var questions = require('./questions.js').questions;

// Variable that holds the cloze-deleted questions list
var closeQuestions = [];

// Populate the cloze-deleted questions list
for (var i = 0; i < questions.length; i++) {
    var q = new flashCards.ClozeCard(questions[i].full, questions[i].cloze);
    closeQuestions.push(q);
}

// What question the user is currently on
var currentQuestion = 0;

// How many questions the user has gotten right
var answerRight = 0;

// How many quetsions the user has gotten wrong
var answerWrong = 0;

// askQuestion prompts the user to asnwer a give cloze-deleted question
function askQuestion() {
    inquirer.prompt([
        {
            type: 'input',
            message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
            name: 'userGuess'
        }
    ]).then(function (answers) {
        console.log('\n');

        // Check if the user has guessed correctly
        if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
            console.log('Correct!');
            answerRight++
        } else {
            console.log('Incorrect!');
            answerWrong++;
        }

        // Show the correct answer
        console.log(closeQuestions[currentQuestion].full);
        console.log('----------------------------\n');

        // Advance to the next question
        if (currentQuestion < closeQuestions.length -1) {
            currentQuestion++;
            askQuestion();
        } else {
            console.log('Game Over!');
            console.log('Correct Answers: ' + answerRight);
            console.log('Incorrect Answers: ' + answerWrong);

            console.log('----------------------------\n');

            // Prompt the user to paly again
            inquirer.prompt([
                {
                    type: 'confirm',
                    message: 'Would you like to play again?',
                    name: 'playAgain'
                }
            ]).then(function (answers) {
                if (answers.playAgain) {
                
                // Reset the game
                currentQuestion = 0;
                answerRight = 0;
                answerWrong = 0;

                // Begin asking the questions!
                askQuestion();
            } else {

                // Exit the game
                console.log('Thanks for palying! Goodbye!');
            }

        })
            

    }
        
})

}

// Begin asking the questions!
askQuestion();
