import { useState } from "react"
import TextEditorField from "../form/TextEditorField";
import Button, { BgColors } from "./Button";
import { useI18n } from "../../i18n/I18nContext";

interface Props{
    readonly value: string;
    readonly setValue: (value: string) => void;
    readonly className?: string;
    readonly onSubmit: (value: string) => void;
}

export default function AppCreatePage({
    value,
    setValue,
    className,
    onSubmit
}:Props){

    const { translate } = useI18n();

    const [isRender, setIsRender] = useState(false);

    return (
        <div className={`app-create-page ${className}`}>
            

            <div 
                style={{
                    width: "100%",
                    height: "74vh",
                    overflow: "hidden",
                    overflowY: "scroll",
                    backgroundColor: "#fff",
                    padding: "20px"
                }}
                >
            {!isRender && (
                <div>
                    <TextEditorField
                        height="70vh"
                        value={value} 
                        onChange={setValue}
                        />
                </div>
            )}
            {isRender && (
                <div dangerouslySetInnerHTML={{__html: value}}/>
            )}
            </div>

            <div className="app-create-page-header mt-3 d-flex">
                <Button 
                    className="px-3 py-2 text-light"
                    bgColor={BgColors.Yellow}
                    onClick={()=>setIsRender(!isRender)}
                    >
                    {isRender ? translate("WRITE_BUTTON_TITLE") : translate("SHOW_BUTTON_TITLE")}
                </Button>
                <Button 
                    className="px-3 py-2 text-light ms-3"
                    bgColor={BgColors.Green}
                    disabled={value === ""}
                    onClick={()=>onSubmit(value)}
                    >
                    {translate("SAVE_BUTTON_TITLE")}
                </Button>
            </div>
        </div>
    )
}
