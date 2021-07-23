import React, { useMemo } from "react";

import { useGameContext } from "../../Context/gameProvider";
import { OVERHEAD_LIMIT } from "../../Context/gameReducer";
import styles from "./overHead.module.scss";

interface OverHeadProps {
  width: number;
}

export default function OverHead({ width }: OverHeadProps) {
  const { bullets } = useGameContext();

  const overheadPercentage = useMemo(
    () => (bullets.length / OVERHEAD_LIMIT) * 100,
    [bullets.length]
  );

  const progressBarStyle: React.CSSProperties = {
    width,
  };

  const indicatorStyles: React.CSSProperties = {
    width: `${overheadPercentage}%`,
  };

  return (
    <div className={styles.wrapper}>
      {overheadPercentage === 100 && (
        <h1 className={styles.text}> Overhead!</h1>
      )}
      <div className={styles.progressBar} style={{ ...progressBarStyle }}>
        <div className={styles.indicator} style={{ ...indicatorStyles }}></div>
      </div>
    </div>
  );
}
