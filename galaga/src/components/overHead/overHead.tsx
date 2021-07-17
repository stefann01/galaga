import React, { useMemo } from "react";

import { useGameContext } from "../../Context/gameProvider";
import { OVERHEAD_LIMIT } from "../../Context/gameReducer";
import styles from "./overHead.module.scss";

export default function OverHead() {
  const { bullets } = useGameContext();

  const overheadPercentage = useMemo(
    () => (bullets.length / OVERHEAD_LIMIT) * 100,
    [bullets.length]
  );

  return (
    <div className={styles.overHeadContainer}>
      <p
        style={{ width: `${overheadPercentage}%` }}
        data-value={`${overheadPercentage}`}
      >
        OVERHEAD
      </p>
      <progress
        max="100"
        value={`${overheadPercentage}`}
        className={styles.html5}
      >
        <div className={styles.progressBar}>
          <span style={{ width: `${overheadPercentage}%` }}>
            {overheadPercentage}%
          </span>
        </div>
      </progress>
    </div>
  );
}
