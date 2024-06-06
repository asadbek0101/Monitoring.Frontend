
import { useI18n } from "../../i18n/I18nContext";
import "./assets/logout-button.scss";

interface Props{
    readonly onClick: () => void;
}

export default function LogoutButton({
    onClick
}:Props){

    const { translate } = useI18n();

    return (
        <button className="logout-button" onClick={onClick}>
            {translate("LOGOUT_BUTTON_TITLE")}
        </button>
    )
}