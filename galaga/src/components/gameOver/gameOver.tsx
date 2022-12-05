import React from "react";

import styles from "./gameOver.module.scss";

interface GameOverProps {
	onPlayAgain: () => void;
	onHome: () => void;
}

export default function GameOver({ onPlayAgain, onHome }: GameOverProps) {
	return (
		<section className={styles.wrapper}>
			<div className={styles.container}>
				<h1>Game Over</h1>
				<button onClick={onPlayAgain}>
					{" "}
					<h3> Play Again</h3>
				</button>
				<button onClick={onHome}>
					{" "}
					<h3> To homepage</h3>
				</button>
			</div>
		</section>
	);
}
