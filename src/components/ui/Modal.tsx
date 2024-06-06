import React, {ReactNode, useEffect} from "react";
import "./assets/modal.scss";

interface ModalProps{
    readonly children: ReactNode;
    readonly show: boolean;
    readonly closeHandler: ()=>void;
    readonly className?: string;
    readonly contentClassName?: string;
    readonly width?: string;
    readonly height?: string;
}

export default function Modal({
    children, 
    show = true, 
    closeHandler, 
    className, 
    contentClassName,
    width, 
    height
}:ModalProps){
    
    window.onclick = function(event: any) {
        if(event.target.matches('.modal-container')){
            closeHandler();
        }
    }

    useEffect(()=>{
        if(show){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto";
        }
    },[show])

    if(!show){
        return null
    } 
    
    return (
        <div className={`modal-container ${className}`}>
            <div className={`modal-children ${contentClassName}`} 
                style={{width: `${width}`, height: `${height}`}}>
                {children}
            </div>
        </div>
    )
}