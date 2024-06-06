import "./assets/menu-button.scss";
import MenuIcon from "../icons/MenuIcon";

interface Props{
    readonly onClick: () => void;
}

export default function MenuButton({
    onClick
}:Props){
    return (
        <button className="menu-button" onClick={onClick}>
            <MenuIcon/>
        </button>
    )
}