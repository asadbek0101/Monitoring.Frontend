import "./assets/app-button.scss";
import { ReactNode } from "react";

export enum BgColors {
  Green = "green",
  Red = "red",
  White = "#fff",
  Yellow = "#FFA500",
}

interface Props {
  readonly children: ReactNode;
  readonly className?: string;
  readonly icon?: ReactNode;
  readonly bgColor?: string;
  readonly onClick?: () => void;
  readonly heigh?: string;
  readonly disabled?: boolean;
  readonly type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  className,
  heigh,
  icon,
  bgColor,
  onClick,
  disabled = false,
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`app-button ${className} ${disabled && "disabled"}`}
      style={{
        backgroundColor: bgColor,
        height: heigh,
      }}
      onClick={onClick && onClick}
    >
      {icon}
      {children}
    </button>
  );
}
