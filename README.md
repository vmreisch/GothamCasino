# GothamCasino

HTML/JS/CSS Gotham dice game

Rules
- Goal is to roll a dice and reach a total score if 21
    - Rolling a 1 will clear current score and will change turn to other player
    - Current score will be added to total score if player decides to hold and it becomes next players turn
    - Process repeats until a player reaches a total of 21 total points
        - "New game" button will reset the game if players choose to
            - Can happen if someone wins or if they just decide to start over


Step 1 (HTML/CSS)

1. Display a split screen for player 1 and player 2
2. One side will be a Gotham Villan, other side a Gotham hero
3. Each player has total score and current score
4. 3 buttons - New game - Roll Dice - Hold

Step 2 (HTML/JS/CSS)

1. Generate dice roll
2. Display dice
3. Dislplay current score
4. Display who's turn it is
5. Add dice to current score if not a 1
6. Reset current score if a 1 is rolled
7. Current score to Total score if player decides to hold

Step 3 (HTML/CSS/JS/JQUERY)
1. Integrate batman theme with API
    - Super Hero API: https://superheroapi.com/
    - One player will represented by a "good guy" and the other with a "bad guy"
