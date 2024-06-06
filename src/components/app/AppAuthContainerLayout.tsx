import "./assets/app-auth-container-layout.scss";
import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

export default function AppAuthContainerLayout({ children }: Props) {
  return (
    <div className="app-auth-container-layout">
      <div className="auth-logo-image"></div>
      <div className="auth-form-wrapper">{children}</div>
    </div>
  );
}
