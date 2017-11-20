$(document).ready(function() {

    var lettersGuessed = [];
    var guessCounter = 10;
    var winCounter = 0;
    var lossCounter = 0;

    var wordList = ["witch", "ghost", "goblin", "zombie", "spider", "skeleton", "graveyard", "snake", "blood", "darkness"]
    var word = wordList[Math.floor(Math.random() * wordList.length)];

    // loop through to append '-' for every letter in wordAnswer
    function wordBlanks(wordAnswer) {
        var wordIndexed = wordAnswer.split("");
        for (var i = 0; i < wordIndexed.length; i++) {
            $("#word-container").append("-");
        }
    }

    //display a random word (from the array) and set counters
    $("#guess-counter").text(guessCounter);
    $("#win-counter").text(winCounter);
    $("#loss-counter").text(lossCounter);
    wordBlanks(word);

    console.log(word);

    //if 3 losses, end game. if 3 wins, play special surprise
    function gameover() {
        if (lossCounter === 3) {
            $("#word-container").hide();
            $("#game-over").show();
        }
        else if (winCounter === 3) {
            $(".main").hide();
            $("#surprise").show();
        }
        else {}
    }

    //reset counter and word, add to wins or losses
    function reset(win) {
        if (win) {
            winCounter++;
            $("#win-counter").text(winCounter);
            alert("You won!");
        } else {
            lossCounter++;
            $("#loss-counter").text(lossCounter);
            alert("You lost. Try again.");
            $("#noose").animate({ top: "+=80px" }, "normal");
        }
        lettersGuessed = [];
        $("#letters-guessed").text(lettersGuessed);
        guessCounter = 10;
        $("#guess-counter").text(guessCounter);
        $("#word-container").empty();
        word = wordList[Math.floor(Math.random() * wordList.length)];
        wordBlanks(word);
        console.log(word);
        gameover();
    }

    //automatically start new game after word complete or guesses remaining is 0
    function checkContainer() {
        var wordContainer = $("#word-container").html();
        if (guessCounter === 0) {
            reset(false);
        } 
        else if (wordContainer.includes("-")) {

        } else { reset(true) }
    }

    //use key events to listen for the letters that players type
    //create a loop the looks through an array of the word, compare the key pressed equals to the index. if it matches, display. if it doesn't, add it to letters guessed
    function setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substr(0, index) + chr + str.substr(index + 1);
    }

    $(document).on("keyup", function(e) {
        var letterPressed = e.key;
        var isAlphabet = (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122);
        var letterInWord = word.includes(letterPressed);
        var stringword = $("#word-container").html();

        //if matches word, then fill in/reveal letter 
        if (letterInWord) {
            var indices = [];
            for (i = 0; i < word.length; i++) {
                if (word[i] === letterPressed)
                    indices.push(i);
            }
            for (var j = 0; j < indices.length; j++) {
                var numToMatch = indices[j];
                stringword = setCharAt(stringword, numToMatch, letterPressed);
                $("#word-container").text(stringword);
            }

            //if the letter is not in the word, then decrease guesses remaining and add letter to letters guessed
        } else if (isAlphabet) {
            $("#letters-guessed").append(letterPressed + ", ");
            guessCounter--;
            $("#guess-counter").text(guessCounter);
        } else {};
	    checkContainer();
    })

});