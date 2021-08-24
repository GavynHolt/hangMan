# Hang Man

I hope you enjoy my version of the class game, Hang Man!
This project was created with React, SCSS, and utilizes two REST APIs and Google's Firebase Realtime Database.

### Visit Project Here

https://hangmanreactgame.netlify.app/

## Get Started

To start, simply press "Start Game" to load the main game page. A useEffect() call will generate a random word, and an associated word hint from the Merriam Webster Dictionary API.

To guess letters in the word, press either the on screen letters, or type the letter on your keyboard. If the letter is in the word, it will be displayed. If not, it will show up as a used letter with a red strikethrough, while both points and the number of turns left will be decremented.

TO WIN: Guess the word with up to 6 wrong guesses. Your score will be calculated based on the length of the word, the number of wrong guesses, and whether or not the word hint was displayed.

## End Game

At the end of the game, no matter if you win or lose, a modal window will pop up, showing the game word for reference. If you win, congratulations! You can enter your name for the Firebase leaderboard here, and your name, the game word, and your score will be recorded for all to see.

Afterwards, there will be 3 options: Go Home will return to the main page, Play Again will start a new game, and Leaderboard will display the Firebase leaderboard in decreasing score order.
