import { useEffect, useState, useRef, useCallback } from "react";
const STARTING_TIME = 10;
const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog.";
const TIME_CONST = 6;

export default function WritingText() {
  const [initialText, setInitialText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [startTimer, setStartTimer] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [matching, setMatching] = useState(false);
  const textBoxRef = useRef(null);

  function handleChange(e) {
    const { value } = e.target;
    setInitialText(value);
  }

  function calculateWordCount(text) {
    const wordsArr = text.trim().split(/\s+/);
    return wordsArr.length;
  }

  const endGame = useCallback(() => {
    setStartTimer(false);
    setWordCount(calculateWordCount(initialText));
    setMatching(initialText === SAMPLE_TEXT);
    textBoxRef.current.disabled = true;
  }, [initialText]);

  useEffect(() => {
    if (startTimer && timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, startTimer, endGame]);

  function restartStage() {
    setStartTimer(true);
    setTimeRemaining(STARTING_TIME);
    setInitialText("");
    setMatching(false);
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  return (
    <div className="main">
      <h1>Can you type the following text?</h1>
      <p>{SAMPLE_TEXT}</p>
      <textarea
        ref={textBoxRef}
        onChange={handleChange}
        value={initialText}
        disabled={!startTimer}
        placeholder="Start typing..."
      />
      <h2>Time remaining: {timeRemaining}</h2>
      {!startTimer && (
        <button onClick={restartStage}>
          {timeRemaining === STARTING_TIME ? "Start" : "Restart"}
        </button>
      )}
      {startTimer && <button onClick={endGame}>Stop</button>}

      {timeRemaining === 0 && (
        <p>
          {matching
            ? "Text matched! Good job!"
            : "Text didn't match. Keep practicing."}
        </p>
      )}
      {/* <p>Matching: {matching.toString()}</p> */}
      <p>Average Typing Speed: {wordCount * TIME_CONST} words per minute</p>
    </div>
  );
}
