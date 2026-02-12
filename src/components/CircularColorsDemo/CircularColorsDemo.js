"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

import { motion } from "framer-motion";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [playStatus, setPlayStatus] = React.useState("idle"); // idle | playing | reset

  const id = React.useId();

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    if (playStatus === "idle" || playStatus === "reset") {
      playStatus === "reset" && setTimeElapsed(0);
      return;
    }
    const intervalId = window.setInterval(
      () => setTimeElapsed((current) => current + 1),
      1000,
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [playStatus]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox,
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selected-color-outline`}
                  className={styles.selectedColorOutline}
                />
              )}
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() => {
              if (playStatus === "playing") {
                setPlayStatus("idle");
              } else {
                setPlayStatus("playing");
                setTimeElapsed(timeElapsed + 1);
              }
            }}
          >
            {playStatus === "playing" ? <Pause /> : <Play />}
            <VisuallyHidden>
              {playStatus === "playing" ? "Pause" : "Play"}
            </VisuallyHidden>
          </button>
          <button onClick={() => setPlayStatus("reset")}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
