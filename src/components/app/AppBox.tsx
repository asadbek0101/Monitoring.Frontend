import "./assets/app-box.scss";
import { ReactNode } from "react";

interface Props{
    readonly children: ReactNode;
    readonly className?: string;
    readonly style?: any;
}

export default function AppBox({
    children,
    className,
    style
}:Props){
    return (
        <div className={`app-box ${className}`} style={style}>
            {children}
        </div>
    )
}