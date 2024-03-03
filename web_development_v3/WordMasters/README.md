# Word Masters: A Wordle Clone

Welcome to Word Masters! This is a web-based game inspired by the popular word guessing game Wordle.

## How to Play:

- Guess a five-letter word.
- The game will provide visual feedback based on your guess:
  - Green: Letter is in the correct position.
  - Yellow: Letter is in the word but not in the right place.
  - Gray: Letter is not in the word.
- You have six tries to guess the secret word.
- If you guess the word correctly, you win!
- Note: This demo currently does not work optimally on mobile devices.

## Data Source:

This game uses an API from Frontend Masters to retrieve the secret word. You have two options:

- Daily Word: Use [https://words.dev-apis.com/word-of-the-day](https://words.dev-apis.com/word-of-the-day) to get the current day's word, which changes daily at midnight.
- Random Word: Use [https://words.dev-apis.com/word-of-the-day?random=1](https://words.dev-apis.com/word-of-the-day?random=1) to get a random five-letter word.

## API Details:

- GET [https://words.dev-apis.com/word-of-the-day](https://words.dev-apis.com/word-of-the-day)
  - Response: { "word": "STRING", "puzzleNumber": NUMBER }
    - word: The secret word.
    - puzzleNumber: The puzzle number for the day (daily word option).
- POST [https://words.dev-apis.com/validate-word](https://words.dev-apis.com/validate-word) (POST request required!)
  - Request Body (JSON): { "word": "STRING" }
    - word: The player's guess.
  - Response: { "word": "STRING", "validWord": BOOLEAN }
    - word: The echoed guess.
    - validWord: true if the guess is a valid five-letter word, false otherwise.

## Disclaimer:

The chosen words are entirely random and do not have any hidden meaning. They are simply meant to provide a fun word puzzle experience.

## Future Development:

- Mobile responsiveness.
- Additional features (e.g., statistics, keyboard support).

Feel free to explore the code and contribute to this project!
