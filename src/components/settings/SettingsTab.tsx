import TabPage from "../tabs/TabPage";
import SettingsFormWrapper from "./SettingsFormWrapper";
import SettingsTableWrapper from "./SettingsTableWrapper";

export default function SettingsTab(){
    return (
        <TabPage>
            <SettingsFormWrapper/>
            <SettingsTableWrapper/>
        </TabPage>
    )
}