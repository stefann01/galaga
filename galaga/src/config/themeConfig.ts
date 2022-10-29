import { Theme } from "../model/Theme";

export const themeConfig = {
  minecraftTheme: {
    background: "/minecraftTheme/background.png",
    rocket: {
      skin: "/minecraftTheme/Steve.png",
      width: 40,
      height: 95,
      bullet: {
        skin: "/minecraftTheme/arrow.png",
        width: 10,
        height: 20,
      },
    },
    enemies: [
      {
        skin: "/minecraftTheme/Spider.png",
        bullet: "/minecraftTheme/SpiderWeb.png",
        width: 70,
        height: 36,
        bulletWidth: 20,
        bulletHeight: 20,
      },
      {
        skin: "/minecraftTheme/Enderman.png",
        bullet: "/minecraftTheme/EnderEye.png",
        width: 60,
        height: 160,
        bulletWidth: 20,
        bulletHeight: 20,
      },

      {
        skin: "/minecraftTheme/Spider.png",
        bullet: "/minecraftTheme/SpiderWeb.png",
        width: 70,
        height: 36,
        bulletWidth: 20,
        bulletHeight: 20,
      },
      {
        skin: "/minecraftTheme/WitherSkeleton.png",
        bullet: "/minecraftTheme/StoneSword.png",
        width: 40,
        height: 102,
        bulletWidth: 20,
        bulletHeight: 40,
      },
      {
        skin: "/minecraftTheme/drowned.png",
        bullet: "/minecraftTheme/trident.png",
        width: 51,
        height: 102,
        bulletWidth: 26,
        bulletHeight: 60,
      },
      {
        skin: "/minecraftTheme/stray.png",
        bullet: "/minecraftTheme/ArrowOfWeakness.png",
        width: 40,
        height: 102,
        bulletWidth: 20,
        bulletHeight: 36,
      },
      {
        skin: "/minecraftTheme/Enderman.png",
        bullet: "/minecraftTheme/EnderEye.png",
        width: 60,
        height: 160,
        bulletWidth: 20,
        bulletHeight: 20,
      },
      {
        skin: "/minecraftTheme/Skeleton.png",
        bullet: "/minecraftTheme/Arrow.png",
        width: 40,
        height: 102,
        bulletWidth: 11,
        bulletHeight: 40,
      },
      {
        skin: "/minecraftTheme/Blaze.png",
        bullet: "/minecraftTheme/fireBall.png",
        width: 50,
        height: 98,
        bulletWidth: 20,
        bulletHeight: 20,
      },
    ],
    currentEnemy: 0,
    coins: {
      skin: "/minecraftTheme/Coin.png",
      width: 30,
      height: 30,
    },
    firePower: {
      power33: {
        skin: "/minecraftTheme/power33.png",
        width: 30,
        height: 15,
      },
      power66: {
        skin: "/minecraftTheme/power66.png",
        width: 30,
        height: 20,
      },
      power99: {
        skin: "/minecraftTheme/power99.png",
        width: 30,
        height: 25,
      },
      power100: {
        skin: "/minecraftTheme/power100.png",
        width: 30,
        height: 25,
      },
    },
    enemiesLeft: {
      skin: "/minecraftTheme/MonstersLeft.png",
      width: 30,
      height: 30,
    },
    life: {
      skin: "/minecraftTheme/FullHeart.png",
    },
    death: {
      skin: "/minecraftTheme/EmptyHeart.png",
    },
  } as Theme,
};
