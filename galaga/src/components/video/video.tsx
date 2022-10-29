import React from "react";
import styles from "./video.module.scss";

interface BackgroundProps {
  imgUrl: string;
  children: React.ReactNode;
}

export default function Background({ imgUrl, children }: BackgroundProps) {
  return (
    <div className={styles.videoContainer}>
      <img
        src={process.env.PUBLIC_URL + imgUrl}
        alt=""
        className={styles.image}
      />
      {children}
    </div>
  );
}
