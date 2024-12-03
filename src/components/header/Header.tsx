import "./assets/header.scss";
import { UserRoles } from "../../api/AppDto";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { profileSelector } from "../../reducers/authReducer";
import { CheckRole } from "../../utils/CheckRole";

import LogoutButton from "./LogoutButton";

interface Props {
  readonly onChangeMenu: () => void;
  readonly onChangeLogout: () => void;
}

export default function Header({ onChangeMenu, onChangeLogout }: Props) {
  const profile = useShallowEqualSelector(profileSelector);

  console.log(profile);

  return (
    <header
      style={{
        borderLeft: !(
          CheckRole(UserRoles.Programmer, profile) || CheckRole(UserRoles.DepartmentHead, profile)
        )
          ? "none"
          : "2px solid white",
      }}
    >
      <div className="profile-info">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gv6VVdtAGLqBK9MXIBOUGJ-hWeVdiiN-3Q&s"
          width={40}
          height={40}
          alt=""
        />
        <div className="profile-info-full-name-role-name">
          <span className="profile-full-name">{profile?.name}</span>
          <span className="profile-role-name">{profile?.RoleName}</span>
        </div>
      </div>
      <LogoutButton onClick={onChangeLogout} />
    </header>
  );
}
