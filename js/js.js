

var Game = {
    options: [
        {
            id: '#green',
            flashClass: 'highlightGreen'
        },
        {
            id: '#red',
            flashClass: 'highlightRed'
        },
        {
            id: '#yellow',
            flashClass: 'highlightYellow'
        },
        {
            id: '#blue',
            flashClass: 'highlightBlue'
        }
    ],
    currentGame: [],
    playerGame: [],
    gameCounter: 0,
    playerGuess: false,
    randomNumber: function () {
        return Math.floor(Math.random() * 4);
    },
    nextLevel: function () {
        this.currentGame.push(this.options[this.randomNumber()]);
    },
    gamePlay: function () {
        this.playerGame = [];
        this.gameCounter = 0;

        this.nextLevel();
        
        View.resetBackground();
        View.flashAllFields(this.currentGame, 500);
    },
    checkPlayerAnswer: function (event) {
        this.gameCounter++;
        if (this.gameCounter > this.currentGame.length) {
            return;
        }
        var selectedColor = Game.options[event.target.dataset.value];
        Game.playerGame.push(selectedColor);

        View.flashField(selectedColor, 300);

        for (var i = 0; i < this.playerGame.length; i++) {
            if (this.playerGame[i].id !== this.currentGame[i].id) {
                this.playerGame = [];
                this.gameCounter = 0;
                break;
            }
        }

        if (this.playerGame.length <= 0) {
            View.displayWrongGuessAlert();
        }

        if (this.playerGame.length === this.currentGame.length) {
            setTimeout(View.displayOnCorrectCycle, 300);
            setTimeout(this.gamePlay.bind(this), 1000)
        }

    }
}



var View = {
    displayWrongGuessAlert: function () {
        var i = 0;
        var intervalId = setInterval(function () {
            $('#display').text('!!!');

            setTimeout(function () {
                $('#display').text('');
            }, 100)

            i++;
            if (i >= 3) {
                clearInterval(intervalId);
            }
        }, 300);
    },
    displayOnCorrectCycle: function () {
        $('.controlsHolder').css('background-color', 'green');
    },
    resetBackground: function () {
        $('.controlsHolder').css('background-color', 'gray');
    },
    flashField: function (item) {
        $(item.id).addClass(item.flashClass);
        setTimeout(function () {
            $(item.id).removeClass(item.flashClass);
        }, 300);
    },
    flashAllFields: function (arr, time) {
        var i = 0;
    
        var intervalId = setInterval(function () {
            this.flashField(arr[i]);
            i++;
            if (i === arr.length) {
                clearInterval(intervalId);
            }
        }.bind(this), time);
    }
    
}

$('.colorBtn').on('click', function (event) { Game.checkPlayerAnswer(event)});

// $('.colorBtn').on('click', function (event) {
//     var selectedColor = Game.options[$(this).data('value')];
    
//     Game.playerGame.push(selectedColor);
//     highlightField(selectedColor, 300);

//     for (var i = 0; i < Game.playerGame.length; i++) {
//         if (Game.playerGame[i].id !== Game.currentGame[i].id) {
//             Game.playerGame = [];
//             break;
//         }
//     }

// });


var showedButtons = [];

// A function to generate a random number between 0-3.
function randomNumber() {
    return Math.floor(Math.random() * 4);
}

// Push the random number value to the end of the array.
function addToGame(arr, value) {
    arr.push(value);
}

function highlightField(item, time) {
    $(item.id).addClass(item.flashClass);
    setTimeout(function () {
        $(item.id).removeClass(item.flashClass);
    }, time);
}

function displayFields(arr, time) {
    var i = 0;

    var intervalId = setInterval(function () {
        highlightField(arr[i], time);
        i++;
        if (i === arr.length) {
            clearInterval(intervalId);
        }
    }, time);
}

