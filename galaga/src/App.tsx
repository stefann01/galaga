import styles from "./App.module.scss";
import React, { useState, useEffect } from "react";
import Bullet from "./model/bullet";
import Enemy from "./model/enemy";

function EnemyGenerator() {}

function App() {
  const [rocketPosition, setRocketPosition] = useState({
    x: Math.trunc(window.innerWidth / 2),
    y: Math.trunc(window.innerHeight - 30),
  });

  const [bullets, setBullets] = useState<Bullet[]>([]);

  const [rocketVelocity, setRocketVelocity] = useState(50);
  const [pressedKeys, setPressedKeys] = useState<number[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([
    new Enemy(60, 220),
    new Enemy(220, 50),
    new Enemy(400, 280),
    new Enemy(100, 300),
    new Enemy(20, 20),
  ]);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      setPressedKeys((prevSetKeys) => {
        return [...prevSetKeys, event.keyCode];
      });
    });

    document.addEventListener("keyup", (event) => {
      setPressedKeys((prevSetKeys) => {
        return prevSetKeys.filter((keyCode) => keyCode !== event.keyCode);
      });
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (pressedKeys.includes(37) || e.keyCode === 37) {
        setRocketPosition((prevRocketPosition) => {
          console.log(prevRocketPosition);

          if (prevRocketPosition.x > 0 + rocketVelocity) {
            return {
              ...prevRocketPosition,
              x: prevRocketPosition.x - rocketVelocity,
            };
          }
          return prevRocketPosition;
        });
      }
      if (pressedKeys.includes(39) || e.keyCode === 39) {
        setRocketPosition((prevRocketPosition) => {
          console.log(prevRocketPosition);
          if (prevRocketPosition.x < window.innerWidth - 10) {
            return {
              ...prevRocketPosition,
              x: prevRocketPosition.x + rocketVelocity,
            };
          }
          return prevRocketPosition;
        });
      }

      if (pressedKeys.includes(32) || e.keyCode === 32) {
        setBullets((prevBullets) => {
          return [
            ...prevBullets,
            new Bullet(rocketPosition.x, rocketPosition.y),
          ];
        });
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [rocketPosition, pressedKeys]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prevBullets) => {
        return prevBullets
          .map((bullet) => {
            return { ...bullet, y: bullet.y - 1 };
          })
          .filter((bullet) => bullet.y > 0);
      });
      // setEnemies(prevEnemies=>{
      //   return prevEnemies.filter(enemy=>{
      //     return bullets.find(bullet=>)
      //   })
      // })
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.rocket}
        style={{
          left: rocketPosition.x,
          top: rocketPosition.y,
        }}
      ></div>
      {bullets.map((bullet) => (
        <div
          className={styles.bullet}
          style={{
            left: bullet.x,
            top: bullet.y,
          }}
        ></div>
      ))}

      {enemies.map((enemy) => (
        <div
          className={styles.enemy}
          style={{
            left: enemy.x,
            top: enemy.y,
          }}
        ></div>
      ))}
    </div>
  );
}

export default App;
