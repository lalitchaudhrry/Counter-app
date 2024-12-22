import React, { useState, useEffect } from 'react';

const Game = () => {
  const [timeLeft, setTimeLeft] = useState(5); // Timer starts from 5 seconds
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber()); // Random target number between 1 and 100
  const [options, setOptions] = useState(generateOptions()); // Generate 4 options, one of them correct
  const [message, setMessage] = useState(""); // Message for wrong guess or time-out
  const [gameOver, setGameOver] = useState(false);

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft === 0) {
      setMessage("Time's up! Wrong guess.");
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Generate a random number between 1 and 100
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  // Generate four options: one correct and three random wrong ones
  const generateOptions = () => {
    const correctOption = targetNumber;
    const optionsArray = [correctOption];
    while (optionsArray.length < 4) {
      const randomOption = Math.floor(Math.random() * 100) + 1;
      if (!optionsArray.includes(randomOption)) {
        optionsArray.push(randomOption);
      }
    }
    return shuffle(optionsArray); // Shuffle the options to randomize the order
  };

  // Shuffle the options
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Handle the user's guess
  const handleGuess = (option) => {
    if (gameOver) return; // Prevent guessing after the game is over
    if (option === targetNumber) {
      setMessage("You win! 🎉");
      setGameOver(true);
    } else {
      setMessage("Wrong guess! Try again.");
    }
  };

  // Render the game
  return (
    <div className="game-container">
      <h1>Guess the Number Game</h1>
      <h3>Time Left: {timeLeft} seconds</h3>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleGuess(option)}
            className="option-button"
            disabled={gameOver}
          >
            {option}
          </button>
        ))}
      </div>
      {message && <h3 className="game-message">{message}</h3>}
    </div>
  );
};

export default Game;
