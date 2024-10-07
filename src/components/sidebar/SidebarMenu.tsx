import "./assets/sidebar-menu.scss";
import { useI18n } from "../../i18n/I18nContext";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { Profile, profileSelector } from "../../reducers/authReducer";
import { appMenuTypeSelector } from "../../reducers/appReducer";
import { AppMenuType, UserRoles } from "../../api/AppDto";
import { CheckRole } from "../../utils/CheckRole";
import { useNavigate } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import UsersIcon from "../icons/UsersIcon";
import ProductsIcon from "../icons/ProductsIcon";
import DashboardIcon from "../icons/DashboardIcon";
import FlagIcon from "../icons/FlagIcon";

export default function SidebarMenu() {
  const { translate } = useI18n();

  const profile: Profile | undefined = useShallowEqualSelector(profileSelector);

  const menu = useShallowEqualSelector(appMenuTypeSelector);

  const navigate = useNavigate();

  return (
    <div className="sidebar-menu">
      <div className="sidebar-menu-header">
        {menu === AppMenuType.Opened && (
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard/statistic")}
          >
            {profile?.RoleName}
          </span>
        )}
      </div>
      <div className="sidebar-menu-menu">
        <SidebarItem link="statistic" icon={<DashboardIcon />}>
          {translate("Statistika")}
        </SidebarItem>
        <SidebarItem link="todos" icon={<FlagIcon />}>
          {translate("Tadbirlar")}
        </SidebarItem>
        {Boolean(
          CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile),
        ) && (
          <SidebarItem link="categories" icon={<FlagIcon />}>
            {translate("Loyihalar")}
          </SidebarItem>
        )}
        {Boolean(
          CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile),
        ) && (
          <SidebarItem link="templates" icon={<ProductsIcon />}>
            {translate("Shablonlar")}
          </SidebarItem>
        )}
        {Boolean(
          CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile),
        ) && (
          <SidebarItem link="reg-cate" icon={<FlagIcon />}>
            {translate("Loyihalar hududlar uchun")}
          </SidebarItem>
        )}
        {CheckRole(UserRoles.Programmer, profile) && (
          <SidebarItem link="users" icon={<UsersIcon />}>
            {translate("Foydalanuvchilar")}
          </SidebarItem>
        )}
      </div>
    </div>
  );
}

// {Boolean(
//   CheckRole(UserRoles.Programmer, profile) ||
//     CheckRole(UserRoles.DepartmentHead, profile) ||
//     CheckRole(UserRoles.ChiefSpecialist, profile),
// ) && (
//   <SidebarItem link="reg-cate" icon={<FlagIcon />}>
//     {translate("Loyihalar hududlar uchun")}
//   </SidebarItem>
// )}
