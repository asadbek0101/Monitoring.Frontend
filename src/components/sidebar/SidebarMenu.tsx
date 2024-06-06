import "./assets/sidebar-menu.scss";
import { useI18n } from "../../i18n/I18nContext";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { Profile, profileSelector } from "../../reducers/authReducer";
import { appMenuTypeSelector } from "../../reducers/appReducer";
import { AppMenuType } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";

import MyLinksIcon from "../icons/MyLinksIcon";
import SidebarItem from "./SidebarItem";
import UsersIcon from "../icons/UsersIcon";
import ProductsIcon from "../icons/ProductsIcon";
import DashboardIcon from "../icons/DashboardIcon";
import FlagIcon from "../icons/FlagIcon";
import CameraIcon from "../icons/CameraIcon";

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
            {profile?.role}
          </span>
        )}
      </div>
      <div className="sidebar-menu-menu">
        <SidebarItem link="statistic" icon={<DashboardIcon />}>
          {translate("Statistika")}
        </SidebarItem>
        <SidebarItem link="todos" icon={<FlagIcon />}>
          {translate("Buyruqlar")}
        </SidebarItem>
        <SidebarItem link="reg-cate" icon={<FlagIcon />}>
          {translate("Buyruq toifalar hududlar uchun")}
        </SidebarItem>
        <SidebarItem link="categories" icon={<FlagIcon />}>
          {translate("Buyruq toifalari")}
        </SidebarItem>
        <SidebarItem link="templates" icon={<ProductsIcon />}>
          {translate("Shablonlar")}
        </SidebarItem>
        <SidebarItem link="users" icon={<UsersIcon />}>
          {translate("Foydalanuvchilar")}
        </SidebarItem>
      </div>
    </div>
  );
}
