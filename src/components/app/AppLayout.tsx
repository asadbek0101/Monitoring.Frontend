import "./assets/app-layout.scss";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appMenuTypeSelector, switchMenuType } from "../../reducers/appReducer";
import { AppMenuType, UserRoles } from "../../api/AppDto";
import { profileSelector } from "../../reducers/authReducer";
import { CheckRole } from "../../utils/CheckRole";
import { useAuthContext } from "../../api/auth/AuthContext";

import AppHeaderWrapper from "./AppHeaderWrapper";
import AppSidebarWrapper from "./AppSidebarWrapper";

interface Props {
  readonly children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const menuType = useShallowEqualSelector(appMenuTypeSelector);
  const profile = useShallowEqualSelector(profileSelector);

  const dispatch = useDispatch();

  const { logout } = useAuthContext();

  return (
    <div className="app-layout-container">
      <div
        className={`app-sidebar ${menuType === AppMenuType.Closed ? "close-app-sidebar-menu" : ""}`}
      >
        <AppSidebarWrapper />
      </div>
      <div
        className={`app-pages ${menuType === AppMenuType.Closed ? "full-app-pages" : ""} ${!CheckRole(UserRoles.Programmer, profile) && !CheckRole(UserRoles.DepartmentHead, profile) ? "admin-pages" : ""}`}
      >
        <div className="app-pages-header">
          <AppHeaderWrapper
            onChangeMenu={() => {
              dispatch(
                switchMenuType({
                  menuType:
                    menuType === AppMenuType.Opened ? AppMenuType.Closed : AppMenuType.Opened,
                }),
              );
            }}
            onChangeLogout={logout}
          />
        </div>
        <div className="app-pages-page">{children}</div>
      </div>
    </div>
  );
}
