import Header from "../header/Header";

interface Props{
    readonly onChangeMenu: () => void;
    readonly onChangeLogout: () => void;
}

export default function AppHeaderWrapper({
    onChangeMenu,
    onChangeLogout
}:Props){
    return <Header 
                onChangeMenu={onChangeMenu}
                onChangeLogout={onChangeLogout}
                />
}