import "./assets/app-auth-container-layout.scss";
import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

export default function AppAuthContainerLayout({ children }: Props) {
  return (
    <div className="app-auth-container-layout">
      <img src={require("./assets/logo.png")} className="safe-city-logo" alt="" />
      <video autoPlay className="app-auth-video" loop muted>
        <source src={require("./assets/back_video.mp4")} type="video/mp4" />
      </video>
      <div className="auth-form-wrapper">{children}</div>
    </div>
  );
}
