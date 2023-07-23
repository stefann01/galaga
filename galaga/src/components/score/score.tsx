import React from "react";

import OverHead from "../overHead/overHead";
import styles from "./score.module.scss";
import { Theme } from "../../model/Theme";
import Coin from "../../model/coin";

interface ScoreProps {
  lives: number;
  candies: number;
  score: number;
  overheadPercentage: number;
  enemiesNumber: number;
  rocketPower: number;
  theme: Theme;
}

const Score = React.memo(
  function ScoreComponent({
    lives,
    candies,
    score,
    overheadPercentage,
    enemiesNumber,
    rocketPower,
    theme,
  }: ScoreProps) {
    const powerPercent = (candies * 100) / Coin.powerIncreasePrice;
    const powerImageData =
      powerPercent < 33
        ? {
            skin: `${theme.firePower.power33.skin}`,
            width: theme.firePower.power33.width,
            height: theme.firePower.power33.height,
          }
        : powerPercent < 66
        ? {
            skin: `${theme.firePower.power66.skin}`,
            width: theme.firePower.power66.width,
            height: theme.firePower.power66.height,
          }
        : powerPercent < 99
        ? {
            skin: `${theme.firePower.power99.skin}`,
            width: theme.firePower.power99.width,
            height: theme.firePower.power99.height,
          }
        : {
            skin: `${theme.firePower.power100.skin}`,
            width: theme.firePower.power100.width,
            height: theme.firePower.power100.height,
          };
    return (
      <div className={styles.container}>
        <div className={styles.leftDisplayer}>
          <div className={styles.leftDisplayerItem}>
            <img
              src={`${theme.coins.skin}`}
              alt="candy"
              width={`${theme.coins.width}`}
              height={`${theme.coins.height}`}
            />
            <p className={styles.text}>:{candies}</p>
          </div>

          <div className={styles.leftDisplayerItem}>
            <img
              src={`${theme.enemiesLeft.skin}`}
              alt="enemies left"
              width={`${theme.enemiesLeft.width}`}
              height={`${theme.enemiesLeft.height}`}
            />
            <p className={styles.text}>:{enemiesNumber}</p>
          </div>

          <div className={styles.leftDisplayerItem}>
            <img
              src={powerImageData.skin}
              alt="fire power"
              width={`${powerImageData.width}`}
              height={`${powerImageData.height}`}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className={styles.overheadContainer}>
          <OverHead width={382} overheadPercentage={overheadPercentage} />
        </div>

        <div className={styles.rightDisplayer}>
          {lives < 5 &&
            lives > 0 &&
            [...Array(5 - lives)].map((_, index) => {
              return (
                <img
                  src={`${theme.death.skin}`}
                  alt={`life${index}`}
                  key={index}
                />
              );
            })}
          {[...Array(lives)].map((_, index) => {
            return (
              <img
                src={`${theme.life.skin}`}
                alt={`life${index}`}
                key={(index + 1) ** 2}
              />
            );
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
