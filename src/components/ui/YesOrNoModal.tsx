import "./assets/yes-or-no-modal.scss";
import { useI18n } from "../../i18n/I18nContext";
import Button from "./Button";
import AlarmIcon from "../icons/AlarmIcon";

interface Props {
  readonly title: string;
  readonly setResponse?: (value: any) => void;
}

export default function YesOrNoModal({ title, setResponse }: Props) {
  const { translate } = useI18n();

  return (
    <div className="yes-or-no-modal">
      <div className="yes-or-no-icon">
        <AlarmIcon />
      </div>
      <div className="yes-or-no-modal-title text-center">
        <span>{translate(title)}</span>
      </div>
      <div className="yes-or-no-modal-buttons d-flex justify-content-center mt-3">
        <Button
          className="px-5 py-2 me-2 "
          onClick={() => setResponse && setResponse("YES")}
          bgColor="rgba(230, 234, 243, 1)"
        >
          Ha
        </Button>
        <Button
          className="px-5 py-2 ms-2 text-light"
          onClick={() => setResponse && setResponse("NO")}
        >
          Yo'q
        </Button>
      </div>
    </div>
  );
}
