import { Formik, Form } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import Button, { BgColors } from "../ui/Button";
import { AppLanguage, useI18n } from "../../i18n/I18nContext";
import { Direction } from "../../api/AppDto";
import { RadioGroupField } from "../form/RadioGroupField";
import { appLanguageSelector } from "../../reducers/appReducer";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { update } from "immupdate";
import { useCallback } from "react";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly saveLanguage: (value: any) => void;
  readonly savePassword: (value: any) => void;
}

export default function SettingsForm({
  initialValues,
  setInitialValues,
  saveLanguage,
  savePassword,
}: Props) {
  const languageSelector = useShallowEqualSelector(appLanguageSelector);

  const { translate } = useI18n();

  const onChangeOldPassword = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          oldPassword: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeNewPassword = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          newPassword: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeConfirmPassword = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          confirmPassword: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  return (
    <Formik
      initialValues={{ ...initialValues, language: languageSelector }}
      onSubmit={() => console.log("")}
    >
      {() => (
        <Form className="p-4">
          <div className="row mt-4">
            <div className="col-4">
              <GroupBox title={translate("SETTINGS_FORM_USER_INFO_TITLE")}>
                <div className="row">
                  <div className="col-12 my-2">
                    <InputField
                      disabled
                      name="userEmail"
                      label="SETTINGS_FORM_USER_EMAIL_FIELD_TITLE"
                      value={initialValues.userEmail}
                    />
                  </div>
                  <div className="col-12 my-3">
                    <InputField
                      disabled
                      name="userName"
                      label="SETTINGS_FORM_USER_NAME_FIELD_TITLE"
                      value={initialValues.userName}
                    />
                  </div>
                  <div className="col-12 my-3">
                    <InputField
                      disabled
                      name="confirm-password"
                      label="SETTINGS_FORM_USER_PASSWORD_FIELD_TITLE"
                      type="password"
                      value="************"
                      passwordIcon="hidden"
                    />
                  </div>
                </div>
              </GroupBox>
            </div>
            <div className="col-4">
              <GroupBox title="SETTINGS_FORM_USER_LANGUAGE_TITLE">
                <RadioGroupField
                  name="language"
                  direction={Direction.Vertical}
                  items={[
                    {
                      value: "uz",
                      title: "UZBEK_LANGUAGE",
                      icon: true,
                      language: AppLanguage.Uzbek,
                      languageIcon: true,
                    },
                    {
                      value: "en",
                      title: "ENGLISH_LANGUAGE",
                      icon: true,
                      language: AppLanguage.English,
                      languageIcon: true,
                    },
                    {
                      value: "ru",
                      title: "RUSSIAN_LANGUAGE",
                      icon: true,
                      language: AppLanguage.Russian,
                      languageIcon: true,
                    },
                  ]}
                  onChanges={(value) => saveLanguage(value)}
                />
              </GroupBox>
            </div>
            <div className="col-4">
              <GroupBox title="SETTINGS_FORM_RESET_PASSWORD_TITLE">
                <div className="row">
                  <div className="col-12 my-2">
                    <InputField
                      name="old-password"
                      label="SETTINGS_FORM_USER_OLD_PASSWORD_FIELD_TITLE"
                      onChange={onChangeOldPassword}
                      value={initialValues.oldPassword}
                    />
                  </div>
                  <div className="col-12 my-3">
                    <InputField
                      name="new-password"
                      label="SETTINGS_FORM_USER_NEW_PASSWORD_FIELD_TITLE"
                      onChange={onChangeNewPassword}
                      value={initialValues.newPassword}
                    />
                  </div>
                  <div className="col-12 my-3">
                    <InputField
                      name="confirm-password"
                      label="SETTINGS_FORM_USER_CONFIRM_PASSWORD_FIELD_TITLE"
                      onChange={onChangeConfirmPassword}
                      value={initialValues.confirmPassword}
                    />
                  </div>
                </div>
              </GroupBox>
            </div>
            <div className="col-12 pt-3 d-flex justify-content-end">
              <Button
                bgColor={BgColors.Green}
                className="text-light px-4 py-1"
                onClick={() => savePassword(initialValues)}
                heigh="34px"
              >
                {translate("SAVE_BUTTON_TITLE")}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
