"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

import { motion, LayoutGroup } from "framer-motion";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isPlay, setIsPlay] = React.useState(false);
  const [reset, setReset] = React.useState(false);

  const id = React.useId();

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % 3];

  React.useEffect(() => {
    const intervalId = isPlay
      ? window.setInterval(() => setTimeElapsed((current) => current + 1), 1000)
      : null;
    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPlay]);

  React.useEffect(() => {
    setTimeElapsed(0);
    setIsPlay(false);
  }, [reset]);

  return (
    <LayoutGroup>
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
                    layoutId={`${id}`}
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
            <button>
              {isPlay ? (
                <Pause onClick={() => setIsPlay(false)} />
              ) : (
                <Play onClick={() => setIsPlay(true)} />
              )}
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
            <button onClick={() => setReset(!reset)}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </LayoutGroup>
  );
}

export default CircularColorsDemo;
