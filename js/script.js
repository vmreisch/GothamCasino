"use strict";
const player0El = $(".player-0");
const player1El = $(".player-1");
const score0El = $("#score-0");
const score1El = $("#score-1");
const current0El = $("#current-0");
const current1El = $("#current-1");

const diceEl = $(".dice");
const btnNew = $(".btn-new");
const btnRoll = $(".btn-roll");
const btnHold = $(".btn-hold");

score0El.text(0);
score1El.text(0);
diceEl.addClass("hidden");

let scores, currentScore, activePlayer, playing;
const heroArr = [561, 165, 69];
const villainArr = [370, 558, 60];

function randomChar() {
  return Math.floor(Math.random() * 3);
}

const heroBackground = $("#hero");
const villainBackground = $("#villain");

const fetchHeroImage = function () {
  const heroImageEndpoint = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${
    heroArr[randomChar()]
  }.json`;
  $.ajax({
    url: heroImageEndpoint,
    method: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response);
      const imageUrl = response.images.md;
      heroBackground.css("background-image", `url(${imageUrl})`);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
};
fetchHeroImage();

const fetchVillainImage = function () {
  const villainImageEndpoint = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${
    villainArr[randomChar()]
  }.json`;

  $.ajax({
    url: villainImageEndpoint,
    method: "GET",
    dataType: "json",
    success: function (response) {
      const imageUrl = response.images.md;
      villainBackground.css("background-image", `url(${imageUrl})`);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
};

fetchVillainImage();

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.text(0);
  score1El.text(0);
  current0El.text(0);
  current1El.text(0);
  diceEl.addClass("hidden");
  player0El.removeClass("player-winner");
  player1El.removeClass("player-winner");
  player0El.addClass("player-active");
  player1El.removeClass("player-active");
};
init();

const switchPlayer = function () {
  $(`#current-${activePlayer}`).text(0);
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.toggleClass("player-active");
  player1El.toggleClass("player-active");
};

btnRoll.on("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.removeClass("hidden");
    diceEl.attr("src", `dice-${dice}.webp`);

    if (dice !== 1) {
      currentScore += dice;
      $(`#current-${activePlayer}`).text(currentScore);
    } else {
      switchPlayer();
    }
  }
});

btnHold.on("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    $(`#score-${activePlayer}`).text(scores[activePlayer]);

    if (scores[activePlayer] >= 21) {
      playing = false;
      diceEl.addClass("hidden");
      $(`.player-${activePlayer}`).addClass("player-winner");
      $(`.player-${activePlayer}`).removeClass("player-active");
    } else {
      switchPlayer();
    }
  }
});
btnNew.on("click", function () {
  init();
  fetchHeroImage();
  fetchVillainImage();
});
