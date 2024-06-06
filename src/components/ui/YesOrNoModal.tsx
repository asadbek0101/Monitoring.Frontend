import "./assets/yes-or-no-modal.scss";
import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "./Button";


interface Props{
    readonly title: string;
    readonly setResponse?: (value: any) => void;
}

export default function YesOrNoModal({
    title,
    setResponse
}:Props){

    const { translate } = useI18n();

    return (
        <div className="yes-or-no-modal">
            <div className="yes-or-no-modal-title text-center">
                    <span>{translate(title)}</span>
            </div>
            <div className="yes-or-no-modal-buttons d-flex justify-content-center mt-3">
                <Button
                    className="px-3 py-1 me-2 text-light fw-bold"
                    bgColor={BgColors.Green}
                    onClick={()=>setResponse && setResponse("YES")}
                    >
                    {translate("YES_BUTTON_TITLE")}
                </Button>
                <Button
                    className="px-3 py-1 ms-2 text-light fw-bold"
                    bgColor={BgColors.Red}
                    onClick={()=>setResponse && setResponse("NO")}
                    >
                    {translate("NO_BUTTON_TITLE")}
                </Button>
            </div>
        </div>
    )
}