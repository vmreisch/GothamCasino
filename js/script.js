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
//btnNew.on("click", init);

const heroCharacterId = "69";
const villaintCharacterId = "370";

const baseURL = "https://superheroapi.com/api/";
const apiKey = "10159908020207473";

const heroBackground = $("#hero");
const villainBackground = $("#villain");

const heroImageEndpoint = `${baseURL}${apiKey}/${heroCharacterId}/image`;
const villainImageEndpoint = `${baseURL}${apiKey}/${villaintCharacterId}/image`;

const fetchHeroImage = function () {
  const heroImageEndpoint = `${baseURL}${apiKey}/${heroCharacterId}/image`;
  // fetch(heroImageEndpoint)
  //   .then((data) => data.json())
  //   .then((data) => console.log(data));
  $.ajax({
    url: heroImageEndpoint,
    method: "GET",
    dataType: "json",
    success: function (response) {
      const imageUrl = response.url;
      heroBackground.css("background-image", `url(${imageUrl})`);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
};

const fetchVillainImage = function () {
  const villainImageEndpoint = `${baseURL}${apiKey}/${villaintCharacterId}/image`;

  $.ajax({
    url: villainImageEndpoint,
    method: "GET",
    dataType: "json",
    success: function (response) {
      const imageUrl = response.url;
      villainBackground.css("background-image", `url(${imageUrl})`);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
};

btnNew.on("click", function () {
  init();
  fetchHeroImage();
  fetchVillainImage();
});

// function changeBackgroundImage(element, imageUrl) {
//   element.css("background-image", `url(${imageUrl})`);
// }

// $.ajax({
//   url: heroImageEndpoint,
//   method: "GET",
//   success: function (response) {
//     const heroImageUrl = response.url;

//     changeBackgroundImage(heroBackground, heroImageUrl);
//   },
//   error: function (error) {
//     console.log("Error:", error);
//   },
// });

// $.ajax({
//   url: villainImageEndpoint,
//   method: "GET",
//   success: function (response) {
//     const villainImageUrl = response.url;

//     changeBackgroundImage(villainBackground, villainImageUrl);
//   },
//   error: function (error) {
//     console.log("Error:", error);
//   },
// });
