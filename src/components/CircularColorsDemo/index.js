export * from "./CircularColorsDemo";
import dynamic from "next/dynamic";

const CircularColorsDemo = dynamic(() => import("./CircularColorsDemo"));

export default CircularColorsDemo;
