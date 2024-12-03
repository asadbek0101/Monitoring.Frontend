import "./assets/logout-button.scss";
import { useI18n } from "../../i18n/I18nContext";
import LogoutIcon from "../icons/LogoutIcon";

interface Props {
  readonly onClick: () => void;
}

export default function LogoutButton({ onClick }: Props) {
  const { translate } = useI18n();

  return (
    <button className="logout-button px-3 py-2 text-light" onClick={onClick}>
      <LogoutIcon color="#fff" />
      {translate("Chiqish")}
    </button>
  );
}
