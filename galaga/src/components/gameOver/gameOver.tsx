import React from "react";

interface GameOverProps {
  onPlayAgain: () => void;
}

export default function GameOver({ onPlayAgain }: GameOverProps) {
  return (
    <>
      <h1>Game Over</h1>
      <button onClick={onPlayAgain}>PLay Again</button>
    </>
  );
}
