import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { useI18n } from "../../i18n/I18nContext";
import { tokenSelector } from "../../reducers/authReducer";
import { JwtToObject } from "../../utils/JwtToObjectUtils";
import { GroupBox } from "../ui/GroupBox";
import YesRoNoUserRole from "../ui/YesOrNoUserRole";

export default function SettingsTable(){

    const { translate } = useI18n();

    const token: any = useShallowEqualSelector(tokenSelector);

    const jwtToObject: any = JwtToObject(token);

    return (
        <div className="settings-table p-4">
            <GroupBox title={translate("SETTINGS_TABLE_USER_ROLES_TITLE")}>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                    <th style={{
                        width: "25%"
                    }} scope="col">{translate("SETTINGS_TABLE_CREATE_LESSON_COLUMN_TITLE")}</th>
                    <th style={{
                        width: "25%"
                    }} scope="col">{translate("SETTINGS_TABLE_CREATE_USER_COLUMN_TITLE")}</th>
                    <th style={{
                        width: "25%"
                    }} scope="col">{translate("SETTINGS_TABLE_CREATE_TEACHER_COLUMN_TITLE")}</th>
                    <th style={{
                        width: "25%"
                    }} scope="col">{translate("SETTINGS_TABLE_CREATE_ADMIN_COLUMN_TITLE")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <YesRoNoUserRole temp={jwtToObject.isCreateLesson === "1"}/>
                    </td>
                    <td>
                        <YesRoNoUserRole temp={jwtToObject.isCreateUser === "1"}/>
                    </td>
                    <td>
                        <YesRoNoUserRole temp={jwtToObject.isCreateTeacher === "1"}/>
                    </td>
                    <td>
                        <YesRoNoUserRole temp={jwtToObject.isCreateAdmin === "1"}/>
                    </td>
                    </tr>
                </tbody>
            </table>
            </GroupBox>
        </div>
    )
}