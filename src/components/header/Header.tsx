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
      <LogoutButton onClick={onChangeLogout} />
    </header>
  );
}
