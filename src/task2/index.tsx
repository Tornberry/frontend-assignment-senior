import { FC } from "react";
import { ThemeProvider, useTheme } from "./context/theme-context";
import { ComponentShowcase } from "./components/component-showcase";

const Task2: FC = () => {
  return (
    <ComponentShowcase />
  );
};

export default Task2;