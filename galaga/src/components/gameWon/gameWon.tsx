import React, { useState } from "react";

import styles from "./gameWon.module.scss";

import prize from "../../assets/images/prize.png";

interface GameWonProps {
  onHome: () => void;
}

export default function GameWon({ onHome }: GameWonProps) {
  const [prizeModal, setPrizeModal] = useState(false);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h1>
          Congrats! <br />
          <span>
            You defeated the mighty galactors! Now, you shall receive your
            prize...
          </span>
        </h1>
        <button
          onClick={() => {
            setPrizeModal(true);
          }}
        >
          <h3>Get your prize adventurer!</h3>
        </button>
      </div>
      {prizeModal ? (
        <div className={styles.prizeModal}>
          <img src={prize} alt="galaga prize" />
          <p>
            Here's your galaga, the might weapon of the entire universe! With
            it, you can conquer the world! Use it wisely, adventurer!
          </p>
          <button
            onClick={() => {
              setPrizeModal(false);
              onHome();
            }}
          >
            <h3>Let's get back home adventurer!</h3>
          </button>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
