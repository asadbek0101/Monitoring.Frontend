import "./assets/tab-page.scss";
import { ReactNode } from "react"

interface Props{
    readonly children: ReactNode;
    readonly className?: string;
    readonly headerComponent?: ReactNode; 
    readonly footerComponent?: ReactNode; 
    readonly contentClassName?: string;
    readonly headerClassName?: string;
    readonly footerClassName?: string;
    readonly visibleContentShadow?: boolean;
}

export default function TabPage({
    children,
    className,
    headerComponent,
    footerComponent,
    contentClassName,
    headerClassName,
    footerClassName,
    visibleContentShadow,
}:Props){
    return (
        <div className={`tab-page-wrapper px-4 py-4 ${className}`}>
            <div className={`tab-page-header ${headerClassName}`}>
                {headerComponent}
            </div>
            <div className={`tab-page-body ${contentClassName}`}
                style={{
                    boxShadow: visibleContentShadow ? "none" : ""
                }}
                >
                {children}
            </div>
            <div className={`tab-page-footer ${footerClassName}`}>
                {footerComponent}
            </div>
        </div>
    )
}