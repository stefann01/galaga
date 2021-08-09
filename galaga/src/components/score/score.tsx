import React from "react";

import OverHead from "../overHead/overHead";
import styles from "./score.module.scss";
import Candy from "../../assets/icons/candy.svg";
import Alien from "../../assets/icons/Monstrulet2.2.svg";
import FullLife from "../../assets/icons/FullLife.svg";
import EmptyLife from "../../assets/icons/EmptyLife.svg";

interface ScoreProps {
  lives: number;
  candies: number;
  score: number;
  overheadPercentage: number;
  enemiesNumber: number;
  rocketPower: number;
}

const Score = React.memo(
  function ScoreComponent({
    lives,
    candies,
    score,
    overheadPercentage,
    enemiesNumber,
    rocketPower,
  }: ScoreProps) {
    return (
      <div className={styles.container}>
        <div className={styles.leftDisplayer}>
          <div className={styles.leftDisplayerItem}>
            <img src={Candy} alt="candy" width={40} height={30} />
            <p className={styles.text}>:{candies}</p>
          </div>

          <div className={styles.leftDisplayerItem}>
            <img src={Alien} alt="enemy" />
            <p className={styles.text}>:{enemiesNumber}</p>
          </div>

          <div className={styles.leftDisplayerItem}>
            <p>Power: {rocketPower}</p>
          </div>
        </div>

        <div className={styles.overheadContainer}>
          <OverHead width={382} overheadPercentage={overheadPercentage} />
        </div>

        <div className={styles.rightDisplayer}>
          {lives < 5 &&
            [...Array(5 - lives)].map((index) => {
              return <img src={EmptyLife} alt={`life${index}`} />;
            })}
          {[...Array(lives)].map((index) => {
            return <img src={FullLife} alt={`life${index}`} />;
          })}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.candies === nextProps.candies &&
      prevProps.overheadPercentage === nextProps.overheadPercentage &&
      prevProps.lives === nextProps.lives
    ) {
      return true;
    }
    return false;
  }
);

export default Score;
