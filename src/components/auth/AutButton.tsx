import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

export default function AuthButton({ children }: Props) {
  return <button className="auth-button">{children}</button>;
}
