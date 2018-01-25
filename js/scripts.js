var Game = {
  currentPlayer: undefined,
  players: [],
  startGame: function(squaresArray){
    Board.setSquares(squaresArray);
    this.setCurrentPlayer();
  },
  playAgain: function(){
    this.setCurrentPlayer();
    Board.win = false;
  },
  setPlayers: function(one, two){
    this.players.push(one, two);
  },
  setCurrentPlayer: function(){
    if (this.currentPlayer === Game.players[0]) {
      this.currentPlayer = Game.players[1];
    } else {
      this.currentPlayer = Game.players[0];
    };
  }
};

var Player1 = {
  name: '',
  iconUrl: '',
  setName: function(name){
    this.name = name;
  },
  setIcon: function(iconUrl){
    this.iconUrl = iconUrl;
  }
};

var Player2 = {
  name: '',
  iconUrl: '',
  setName: function(name){
    this.name = name;
  },
  setIcon: function(iconUrl){
    this.iconUrl = iconUrl;
  }
};

var Computer = {
  name: "Alexa",
  iconUrl: 'img/vampire.png',
  setIcon: function(){},
  chooseSquare: function(){
    var randIndex = Math.floor(Math.random()*9);
    var tempObject = Board.squares[randIndex];
    if (tempObject.find("img").attr("src") !== undefined && tempObject.find("img").attr("src") !== '') {
      console.log(randIndex);
      console.log(tempObject);
      Computer.chooseSquare();
    } else {
      tempObject.find("img").attr("src", Game.currentPlayer.iconUrl);
      tempObject.find("img").toggleClass("hidden");
    };

  }
};

var Board = {
  squares: [],
  activeSquare: undefined,
  win: false,
  setSquares: function(squaresArray){
    this.squares = squaresArray;
  },
  setWin: function(){
    if ( ((this.squares[0].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[1].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[2].find("img").attr("src") === Game.currentPlayer.iconUrl))
    || ((this.squares[3].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[4].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[5].find("img").attr("src") === Game.currentPlayer.iconUrl))
    || ((this.squares[6].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[7].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[8].find("img").attr("src") === Game.currentPlayer.iconUrl))
    || ((this.squares[0].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[3].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[6].find("img").attr("src") === Game.currentPlayer.iconUrl))
    || ((this.squares[1].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[4].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[7].find("img").attr("src") === Game.currentPlayer.iconUrl))
    || ((this.squares[2].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[5].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[8].find("img").attr("src") === Game.currentPlayer.iconUrl))
    || ((this.squares[0].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[4].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[8].find("img").attr("src") === Game.currentPlayer.iconUrl))
    || ((this.squares[6].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[4].find("img").attr("src") === Game.currentPlayer.iconUrl && this.squares[2].find("img").attr("src") === Game.currentPlayer.iconUrl)) ) {
      this.win = true;
    };
  },
  setActiveSquare: function(activeSquare) {
    this.activeSquare = activeSquare;
  },
  checkIfFilled: function() {
    if (this.activeSquare.find("img").attr("src") !== undefined && this.activeSquare.find("img").attr("src") !== '') {
      return true;
    } else {
      return false;
    };
  }
};


$(document).ready(function(){

  $("#pvp").click(function(){
    Game.setPlayers(Player1, Player2);
    $("#setupFormContainer").toggleClass("hidden");
  });
  $("#pvAI").click(function(){
    Game.setPlayers(Player1, Computer);
    $("#setupFormContainer, .onlyPvp ").toggleClass("hidden");
  });
  $("#setupForm").submit(function(event){
      event.preventDefault();
      Player1.setName($("#player1Name").val());
      Player2.setName($("#player2Name").val());
      Player1.setIcon($("input:radio[name=player1Icon]:checked").val());
      Player2.setIcon($("input:radio[name=player2Icon]:checked").val());
      $("#setupFormContainer, #gameContainer").toggleClass("hidden");
      Game.startGame([$("#one"), $("#two"), $("#three"), $("#four"), $("#five"), $("#six"), $("#seven"), $("#eight"), $("#nine")]);
  });

  $("#buttonReset").click(function(){
    location.reload();
  });

  $("#playAgain").click(function(){
    Game.playAgain();
    Board.squares.forEach(function(square) {
      square.find("img").removeAttr("src");
      $(".square img").addClass("hidden");
    });
    $("#winContainer, .gameBoard, .resetRow").toggleClass("hidden");
    if (Game.currentPlayer === Computer) {
      Computer.chooseSquare();
      Board.setWin();
      if (Board.win) {
        $("#winContainer, .gameBoard, .resetRow").toggleClass("hidden");
        $("#winner").text(Game.currentPlayer.name + " WINS!!!!");
      };
      Game.setCurrentPlayer();
      $("#activePlayer").text(Game.currentPlayer.name + "'s Turn");
    };
  });

  $(".radio .formImage").click(function() {
    $(this).prev().attr("checked", true);
  });

  $(".col-md-4").click(function(){
    Board.setActiveSquare($(this));
    if (Board.checkIfFilled()) {
      alert("Space Taken. Try again!");
    } else {
      $(this).find("img").attr("src", Game.currentPlayer.iconUrl);
      $(this).find("img").toggleClass("hidden");
      Board.setWin();
      if (Board.win) {
        $("#winContainer, .gameBoard, .resetRow").toggleClass("hidden");
        $("#winner").text(Game.currentPlayer.name + " WINS!!!!");
      } else {
        Game.setCurrentPlayer();
        $("#activePlayer").text(Game.currentPlayer.name + "'s Turn");
        if (Game.currentPlayer.name === "Alexa") {
          Computer.chooseSquare();
          Board.setWin();
          if (Board.win) {
            $("#winContainer, .gameBoard, .resetRow").toggleClass("hidden");
            $("#winner").text(Game.currentPlayer.name + " WINS!!!!");
            Game.setCurrentPlayer(); 
          };
          Game.setCurrentPlayer();
          $("#activePlayer").text(Game.currentPlayer.name + "'s Turn");
        };
      };
    };
  });
});
