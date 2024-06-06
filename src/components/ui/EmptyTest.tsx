import { useI18n } from "../../i18n/I18nContext"
import AddIcon from "../icons/AddIcon";
import Button, { BgColors } from "./Button";

interface Props{
    readonly onClick: () => void;
    readonly uploadFromExcel: () => void;
}

export default function EmptyTest({
    onClick,
    uploadFromExcel
}:Props){
    
    const { translate } = useI18n();

    return (
        <div style={{
            width: "100%",
            height: "78vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",            
        }}>
            <span className="fs-3 fw-bold">{translate("EMPTY_TITLE")}</span>
            <div
                style={{
                    width: '500px',
                    marginTop: "20px"
                }}
                >
                <div className="d-flex">
                <Button
                    className="py-2 w-50 mt-3 text-light me-2"
                    bgColor={BgColors.Yellow}
                    onClick={uploadFromExcel}
                    >
                    {translate("UPLOAD_EXCEL_BUTTON_TITLE")}
                </Button>
                <Button
                    className="py-2 w-50 mt-3 text-light"
                    bgColor={BgColors.Green}
                    onClick={onClick}
                    icon={<AddIcon/>}
                    >
                    {translate("ADD_QUESTION_BUTTON_TITLE")}
                </Button>
                </div>
            </div>
        </div>
    )
}