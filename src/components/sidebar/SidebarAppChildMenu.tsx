import "./assets/sidebar-child.scss";

import { Children, ReactElement } from "react";
import { SideBarChildItemProps } from "./SidebarChildItem";

interface SidebarAppChildMenuProps{
    readonly onChangeTab: (value: string) => void;
    readonly activeTab: string;
    readonly defaultTab: string;
    readonly children: ReactElement<SideBarChildItemProps>[] | ReactElement<SideBarChildItemProps>;
    readonly className?: string;
}

export default function SidebarAppChildMenu({
    onChangeTab, 
    activeTab, 
    children, 
    className, 
    defaultTab
}:SidebarAppChildMenuProps){
    return ( 
    <div className={`child-item-wrapper w-100 ${className}`}>
        {Children.map(children, (child, index)=>{
            return (
                <div 
                    key={index}
                    className={`w-100 child-item ${((!activeTab && defaultTab === child.props.tab) || activeTab === child.props.tab)? 'active-item' : '' } `} 
                    onClick={()=>onChangeTab(child.props.tab as string)}>
                    <span className="text-light">{child.props.children}</span>
                </div>
            )
        })}
    </div>
)
}