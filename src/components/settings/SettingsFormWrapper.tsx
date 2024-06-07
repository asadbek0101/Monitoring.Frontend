import { useCallback, useEffect, useState } from "react";
import Modal from "../ui/Modal";
import SettingsForm from "./SettingsForm";
import YesOrNoModal from "../ui/YesOrNoModal";
import { useDispatch } from "react-redux";
import { switchLanguage } from "../../reducers/appReducer";
import { AppLanguage } from "../../i18n/I18nContext";
import { GroupBox } from "../ui/GroupBox";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { Profile, profileSelector } from "../../reducers/authReducer";
import { update } from "immupdate";

export default function SettingsFormWrapper() {
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    userEmail: "",
    userName: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [languageModal, setLanguageModal] = useState(false);
  const [language, setLanguage] = useState<AppLanguage>(AppLanguage.English);

  const profile: Profile | undefined = useShallowEqualSelector(profileSelector);

  useEffect(() => {
    setInitialValues((prev: any) =>
      update(prev, {
        userEmail: profile?.email,
        userName: profile?.name,
      }),
    );
  }, [profile]);

  const savePassword = useCallback((value: any) => {}, []);

  return (
    <>
      <SettingsForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        saveLanguage={(value) => {
          setLanguage(value);
          setLanguageModal(true);
        }}
        savePassword={savePassword}
      />
      <Modal
        show={languageModal}
        closeHandler={() => setLanguageModal(false)}
        className="d-flex justify-content-center align-items-center"
        contentClassName="rounded p-4"
        width="500px"
      >
        <GroupBox>
          <YesOrNoModal
            title="SETTINGS_FORM_LANGUAGE_QUESTION_TITLE"
            setResponse={(value: string) => {
              if (value === "YES") {
                dispatch(switchLanguage({ language: language }));
                setLanguageModal(false);
              } else {
                setLanguageModal(false);
              }
            }}
          />
        </GroupBox>
      </Modal>
    </>
  );
}
