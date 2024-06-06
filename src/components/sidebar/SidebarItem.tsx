import "./assets/sidebar-item.scss";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appMenuTypeSelector } from "../../reducers/appReducer";
import { AppMenuType } from "../../api/AppDto";

interface Props {
  readonly children: ReactNode;
  readonly icon?: ReactNode;
  readonly child?: ReactNode;
  readonly link: string;
  readonly className?: string;
}

export default function SidebarItem({ children, className, child, icon, link }: Props) {
  const navigate = useNavigate();
  const url = useLocation().pathname;
  const menuType = useShallowEqualSelector(appMenuTypeSelector);
  const menu = useShallowEqualSelector(appMenuTypeSelector);
  return (
    <div className="sidebar-item-wrapper">
      <div
        className={`sidebar-item ${url.includes(link) ? " active-sidebar-item" : ""} ${className}`}
        onClick={() => {
          navigate(`/dashboard/${link}`);
        }}
      >
        {icon && <div className="sidebar-icon">{icon}</div>}
        {menuType === AppMenuType.Opened && <span>{children}</span>}
      </div>
      {menu === AppMenuType.Opened && (
        <div
          className={`${child && url.includes(link) ? "sidebar-item-child" : "closed-sidebar-item-child"}`}
        >
          {child}
        </div>
      )}
    </div>
  );
}
