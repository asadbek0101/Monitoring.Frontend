import { ReactNode } from "react";

export interface SideBarChildItemProps{
    readonly tab: string;
    readonly children: ReactNode;
}

export default function SidebarChildItem({
    children
}:SideBarChildItemProps){
    return (<div>{children}</div>)
}