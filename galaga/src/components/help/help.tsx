import React from "react";
import styles from "./help.module.scss";
import { Tag } from "../Tag/Tag";

interface HelpProps {
  onClose: CallableFunction;
}

export default function Help({ onClose }: HelpProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Hey adventurer!</h1>
        <button
          className={styles.closeButton}
          onClick={() => {
            onClose();
          }}
        >
          <h3>Back</h3>
        </button>
        <p className={styles.tutorial}>
          {" "}
          So, you have come to defeat the greatest challenge of all time, the
          challenge that many so-called heroes of the solar systems have tried
          to defeat, to win the most powerful weapon in the entire universe,{" "}
          <br /> <span> the Galaga! </span> <br /> <br /> Let me warn you, many
          adventurers have tried to take down this challenge, and many have died
          trying to gain power... Do you think you are brave enough? <br />
          <br />
          Let me show you the rules! There are 10 levels that you have to beat,
          but be careful, with each advanced level, it becomes more difficult!
          And be careful! <br /> <span> You only have 5 lives! </span> When your
          5 lives run out, you're dead! <br />
          <img src="" alt="" />
          <br /> Your mission is to defeat all the protectors of Galaga, the
          galactors, BUT BE CAREFUL! They can change their shape! But you can
          too! Before entering the arena, you can change your form by entering
          the settings and choosing the desired theme. <br />
          <br />
          Galactors have a special ability that makes them difficult to defeat.{" "}
          <br /> <span> You can't touch them! </span> If you touched them, you
          died! So you have to fight them from a distance, pressing the space
          key or click. Each gallactor can drop coins. With each penny, your
          money crystal will increase, and when your crystal is big enough, you
          can buy a life by pressing the B key, or you can increase your power
          by pressing the F key. <br />
          <br /> And that being said, good luck adventurer, in the great fight,
          to win the GALAGA!
        </p>
        <br />
        <div className={styles.controls}>
          {/* TODO: Replace with display grid */}
          <div className={styles.tagContainer}>
            <div>
              <Tag title="Mouse" /> - Movement
            </div>
            <div>
              <Tag title="Space / Click" /> - Shooting
            </div>
          </div>

          <div className={styles.tagContainer}>
            <div>
              <Tag title="Key B" /> - Buy lives
            </div>
            <div>
              <Tag title="Key F" /> - Power up
            </div>
          </div>

          <div className={styles.tagContainer}>
            <div>
              <Tag title="Key P" /> - Pause
            </div>
            <div>
              <Tag title="Key M" /> - Mute
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
