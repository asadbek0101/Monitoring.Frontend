import "./assets/auth-form.scss";
import { Form, Formik } from "formik";
import { AuthProps } from "../../api/auth/AuthDto";
import { InputField } from "../form/InputField";
import Button from "../ui/Button";
import { useCallback } from "react";
import { update } from "immupdate";
import { useI18n } from "../../i18n/I18nContext";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appLanguageSelector, switchLanguage } from "../../reducers/appReducer";
import { useDispatch } from "react-redux";

interface Props {
  readonly initialValues: AuthProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: AuthProps) => void;
}

export default function AuthForm({ initialValues, setInitialValues, onSubmit }: Props) {
  const { translate } = useI18n();

  const dispatch = useDispatch();

  const language = useShallowEqualSelector(appLanguageSelector);

  const onChangeUsername = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          username: value.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangePassword = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          password: value.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  return (
    <div className="auth-form">
      <div className="d-flex justify-content-end">
        <select
          className="auth-lang-select"
          name=""
          id=""
          value={language}
          onChange={(event: any) => dispatch(switchLanguage({ language: event.target.value }))}
        >
          <option value="uz">Uz</option>
          <option value="en">En</option>
          <option value="ru">Ru</option>
        </select>
      </div>
      <Formik initialValues={initialValues} onSubmit={() => onSubmit(initialValues)}>
        {() => (
          <Form>
            <h1>{translate("Kirish")}</h1>
            <InputField
              name="username"
              placeholder={translate("AUTH_FORM_USERNAME_FIELD_TITLE")}
              value={initialValues.username}
              onChange={onChangeUsername}
            />
            <InputField
              name="password"
              placeholder={translate("AUTH_FORM_PASSWORD_FIELD_TITLE")}
              value={initialValues.password}
              onChange={onChangePassword}
              type="password"
            />
            <Button type="submit">{translate("SEND_BUTTON_TITLE")}</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
