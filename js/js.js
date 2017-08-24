
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
    currentLevel: 0,
    gameCounter: 0,
    playerGuess: false,
    bindEvents: function () {
        $('#startBtn').on('click', this.startGame.bind(this));
    },
    startGame: function () {
        this.gamePlay();
        this.enableUserClicking();
    },
    enableUserClicking: function () {
        $('.colorBtn').on('click', function (event) { Game.checkPlayerAnswer(event) });
    },
    randomNumber: function () {
        return Math.floor(Math.random() * 4);
    },
    nextLevel: function () {
        this.currentGame.push(this.options[this.randomNumber()]);
    },
    gamePlay: function () {
        var currentLevel;
        this.playerGame = [];
        this.gameCounter = 0;

        this.nextLevel();
        this.currentLevel = this.currentGame.length;

        View.displayCurrentLevel(this.currentLevel);
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
            var index = 0;
            View.changeMainPanelColor('#FF0000')
               
            var intervalId = setInterval(function () {
                View.resetBackground();
                index++;

                if (index > 0) {
                    View.flashAllFields(this.currentGame, 500);
                    clearInterval(intervalId);
                }
            }.bind(this), 800);


            return;
        }

        if (this.playerGame.length === this.currentGame.length) {
            setTimeout(View.changeMainPanelColor('#60FF00'), 50);
            setTimeout(this.gamePlay.bind(this), 800)
        }

    }
}


var View = {
    displayCurrentLevel: function (level) {
        if (level < 10) {
            level = '0' + level;
        }
        $('#display').text(level);
    },
    changeMainPanelColor: function (color) {
        $('.controlsHolder').css('background-color', color);
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

Game.bindEvents();