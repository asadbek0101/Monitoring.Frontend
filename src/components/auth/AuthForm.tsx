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
      <Formik initialValues={initialValues} onSubmit={() => onSubmit(initialValues)}>
        {() => (
          <Form>
            <div className="auth-form-title">
              <h5>{translate("Добро пожаловать!")}</h5>
              <h1>{translate("Войдите в систему")}</h1>
            </div>
            <div className="mt-5">
              <InputField
                label="Логин"
                name="username"
                placeholder={translate("Введите имя пользователя")}
                value={initialValues.username}
                onChange={onChangeUsername}
              />
              <InputField
                label="Пароль"
                name="password"
                placeholder={translate("********")}
                value={initialValues.password}
                onChange={onChangePassword}
                type="password"
                className="mt-2"
              />
            </div>
            <div className="mt-5">
              <Button type="submit">{translate("Вход в систему")}</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
