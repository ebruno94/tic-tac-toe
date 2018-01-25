var Game = {
  currentPlayer: undefined,
  players: [],
  startGame: function(squaresArray){
    Board.setSquares(squaresArray);
    this.setCurrentPlayer();
  },
  playAgain: function(){
    this.setCurrentPlayer();
  },
  setPlayers: function(one, two){
    this.players.push(Player1, Player2);
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
  icon: '',
  setIcon: function(){},
  chooseSquare: function(){}
};

var Board = {
  squares: [],
  win: false,
  setSquares: function(squaresArray){
    this.squares = squaresArray;
  },
  setWin: function(){
    if (this.squares[0].attr("src") === Game.currentPlayer.iconUrl && this.squares[1].attr("src") === Game.currentPlayer.iconUrl && this.squares[2].attr("src") === Game.currentPlayer.iconUrl) {
      this.win = true;
    };
  }
};
function Square() {
  this.value = undefined;
};

Square.prototype.getValue = function(value) {
  this.value = value;
};

Square.prototype.checkIfFilled = function() {
  if ($(this).find("img").attr("src") !== undefined) {
    return true;
  } else {
    return false;
  };
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
    Board.squares.each(function(square) {
      square.find("img").attr("src", undefined);
    });
  });

  $(".formImage").click(function() {
    $(this).parent().find("input").attr("checked", "");
  });

  $(".col-md-4").click(function(){
    if (!Square.prototype.checkIfFilled()) {
      $(this).find("img").attr("src", Game.currentPlayer.iconUrl)
    } else {
      alert("Space Taken. Try again!")
    };
    Board.setWin();
    if (Board.win) {
      $("#winContainer").toggleClass("hidden");
      $("#winner").text(Game.currentPlayer.name + " WINS!!!!");
    } else {
      Game.setCurrentPlayer();
      $("#activePlayer").text(Game.currentPlayer.name + "'s Turn");
    };

  });
});
