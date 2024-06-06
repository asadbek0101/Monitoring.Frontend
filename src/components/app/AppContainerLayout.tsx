import "./assets/app-container-layout.scss";
import { ReactNode } from "react"

interface Props{
    readonly children: ReactNode;
}

export default function AppContainerLayout({
    children
}:Props){
    
    return (
        <div className="app-container-layuot">
            {children}
        </div>
    )
}