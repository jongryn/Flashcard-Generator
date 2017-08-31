var input1 = process.argv[2].toLowerCase();

var fs = require('fs');

if (input1 === "basic") {
    var basic = require("./BasicCard");
    basic();
} else if (input1 === "cloze") {
    var cloze = require("./ClozeCard");
    cloze();
} else {
    console.log("This is not a function of this app!");
}