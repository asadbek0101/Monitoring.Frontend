import { useCallback } from "react";
import "./assets/status.scss";
import { useI18n } from "../../i18n/I18nContext";

interface Props{
    readonly value: string;
    readonly onChangeValue: (value: any) => void;
}

export default function StatusPicker({
    value,
    onChangeValue
}:Props){

    const { translate } = useI18n();

    const color = useCallback((status: string)=>{
        let COLOR ="";
        switch(status){
            case "1": COLOR = "green"; 
            break;
            case "0": COLOR = "gray"; 
            break;
            case "2": COLOR = "red"; 
            break;
            default: COLOR = "";
        };
        return COLOR;
    },[])

    return (
            <select 
                className="status-picker"
                disabled={value === "2"}
                value={value}
                style={{
                    backgroundColor: color(value),
                }}
                onChange={(event)=>{
                    onChangeValue(event.target.value);
                }}
                >
                <option value={"1"}>{translate("STATUS_SELECT_PICKER_ACTIVE_TITLE")}</option>
                <option value={"0"}>{translate("STATUS_SELECT_PICKER_NON_ACTIVE_TITLE")}</option>
                { value === "2" && <option value={"2"}> {translate("STATUS_SELECT_PICKER_DELETED_TITLE")} </option> }
            </select>
    )
}