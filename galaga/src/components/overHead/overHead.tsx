import React from "react";

import styles from "./overHead.module.scss";

interface OverHeadProps {
  width: number;
  overheadPercentage: number;
}

export default function OverHead({ width, overheadPercentage }: OverHeadProps) {
  const progressBarStyle: React.CSSProperties = {
    width,
  };

  const indicatorStyles: React.CSSProperties = {
    width: `${overheadPercentage}%`,
  };

  return (
    <div className={styles.wrapper}>
      {overheadPercentage === 100 && (
        <h1 className={styles.text}> Overheat!</h1>
      )}
      <div className={styles.progressBar} style={{ ...progressBarStyle }}>
        <div className={styles.indicator} style={{ ...indicatorStyles }}></div>
      </div>
    </div>
  );
}
