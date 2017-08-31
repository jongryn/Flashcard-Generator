/*
// Created: Aug. 29, 2017 5:00 PM
// Author: Jonathan Gryn
// Revisions: Jon (8/22/17) - Added JS
*/

var fs = require("fs");
var inquirer = require("inquire");
var input2 = process.argv[3].toLowerCase();
var input3 = process.argv[4];
var input4 = process.argv[5];

function clozeFunction() {
    if (input2 === "first-add" && input4 === undefined) {

        var count = 0;
        var cardArr = [];

        function CreatedCard(cloze, partial) {
            this.cloze = close;
            this.partial = " ..." + partial;
            this.full = cloze + " " + partial;
        }

        var getInfo = function() {
            if (count < parseInt(input3)) {
                inquirer.prompt([{
                    name: "cloze",
                    message: "What is the cloze deletion of the flashcard?"
                }, {
                    name: "partial",
                    message: "What is the partial text of the flashcard?"
                }]).then(function(answers) {
                    var card = new CreateCard(answers.cloze, answers.partial, answers.full);
                    cardArr.push(card);
                    count++;

                    getInfo();
                });
            } else {
                fs.appendFile("cloze.Log.txt", JSON.stringify(cardArr), function(err) {
                    
                    // If an error was experience we say it.
                    if (err) {
                        console.log(err);
                    }
                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.

                });
            };
        };

        getInfo();
    } else if (input2 === "random" && input4 === undefined) {
        function CreatedCard(cloze, partial) {
            this.cloze = cloze;
            this.partial = " ..." + partial;
            this.full = cloze + " " + partial;
        }

        fs.readFile("clozeLog.txt", "utf8", function(err, data) {
            if (err) {
                console.log(err);

            } else {
                var cardArr = JSON.parse(data);

                // console.log(cardArr);
                var printCounter = 0;

                function printCount() {
                    if (printCounter <= cardArr.length) {
                        printFront();
                        printCounter++;
                        setTimeout(function() { printCount() }, 6000);
                    }
                };

                function printFront() {
                    var randomCard = Math.floor(Math.random() * (cardArr.length));

                    console.log(" ");
                    console.log("------------------");

                    console.log("Finish this sentence: " + cardArr[randomCard].partial);
                    setTimeout(function() { console.log("Answer: " + cardArr[randomCard].cloze), console.log("Full Answer: " + cardArr[randomCard].full) }, 5000);
                    setTimeout(function() { console.log("------------------"), console.log(" "), cardArr.splice(randomCard, 1); }, 5100); 
                };

                printCount();
            }
        });
    } else if (input2 === "add" && input4 === undefined) {
        var count = 0;
        var cardArr = [];
        var parse;

        function CreatedCard(cloze, partial) {
            this.cloze = cloze;
            this.partial = " ..." + partial;
            this.full = cloze + " " + partial;
        }
        var getInfo = function() {

            if (count < parseInt(input3)) {
                inquirer.prompt([{
                    name: "cloze",
                    message: "what is the cloze deletion of the flashcard?"
                }, {
                    name: "partial",
                    message: "What is the partial text of the flashcard?"
                }]).then(function(answers) {

                    var card = new CreateCard(answers.cloze, answers.partial, answer.full);

                    cardArr.push(card);
                    count++;
                    
                    getInfo();
                });
            } else {

                // console.log(parse);
                var wow = JSON.parse(parse);

                // console.log(wow);
                cardArr.push.apply(cardArr, wow);

                // console.log(cardArr);

                fs.writeFile("clozeLog.txt", JSON.stringify(cardArr), function(err) {

                    // If an error was experienced we say it.
                    if(err) {
                        console.log(err);
                    };

                    // If not error is experienced, we'll log the phrase "Content Added" to our node console.

                });
            };
        };

        getInfo();

        fs.readFile("clozeLog.txt", "utf8", function(err, data) {

            if (err) {
                console.log(err);
            } else {

                // console.log(data);
                parse = data;
            };
        });
    } else if (input2 === "read" && input3 === "cloze") {

        var index = parseInt(input4) - 1;

        var printFront = function() {

            fs.readFile("clozeLog.txt", "utf8", function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    var parsed = JSON.parse(data);
                    console.log(" ");
                    console.log("------------------");
                    console.log("Cloze text: " + parsed[index].cloze);
                    console.log("------------------");
                    console.log(" ");
                }
            });
        };

        printFront();

    } else if (input2 === "read" && input3 === "partial") {
        var index = parseInt(input4) - 1;
        var printBack = function() {
            fs.readFile("clozeLog.txt", "utf8", function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    var parsed = JSON.parse(data);
                    console.log(" ");
                    console.log("------------------");
                    console.log("Partial text: " + parsed[index].partial);
                    console.log("------------------");
                    console.log(" ");
                }
            });
        };

        printBack();
    } else if (input2 === "read" && input3 === "full") {
        var index = parseInt(input4) - 1;
        var printBack = function() {
            fs.readFile("clozeLog.txt", "utf8", function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    var parsed = JSON.parse(data);
                    console.log(" ");
                    console.log("------------------");
                    console.log("Full text: " + parsed[index].full);
                    console.log("------------------");
                    console.log(" ");
                }
            });
        };

        printBack();
    } else {
        console.log("This is not a valid command! Please try again.");
    };
};

module.exports = clozeFunction;