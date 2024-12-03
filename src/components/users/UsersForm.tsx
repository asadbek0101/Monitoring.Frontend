import { Form, Formik } from "formik";
import { UserInitialProps } from "../../api/users/UsersDto";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { SelectPickerField } from "../form/SelectPrickerField";
import Button, { BgColors } from "../ui/Button";

interface Props {
  readonly roles: any;
  readonly regions: any;
  readonly initialValues: UserInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

export default function UsersForm({
  roles,
  regions,
  initialValues,
  setInitialValues,
  onSubmit,
}: Props) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
      {() => (
        <Form>
          <div className="row p-4">
            <GroupBox title="Foydalanuvchi yaratish">
              <div className="row">
                <div className="col-4">
                  <InputField name="firstName" label="Ismi" />
                </div>
                <div className="col-4">
                  <InputField name="lastName" label="Familiyasi" />
                </div>
                <div className="col-4">
                  <InputField name="middleName" label="Otasining ismi" />
                </div>
                <div className="col-4 mt-3">
                  <InputField name="email" label="E-pochta" />
                </div>
                <div className="col-4 mt-3">
                  <InputField name="phoneNumber" label="Telefon raqami" />
                </div>
                <div className="col-4 mt-3">
                  <SelectPickerField name="role" label="Lavozim" options={roles} />
                </div>
                <div className="col-4 mt-3">
                  <SelectPickerField name="region" label="Hudud" options={regions} />
                </div>
                <div className="col-4 mt-3">
                  <InputField name="userName" label="Username" />
                </div>
                <div className="col-4 mt-3">
                  <InputField name="password" label="Pasport" />
                </div>

                <div className="col-12 d-flex justify-content-end align-items-center mt-4">
                  <Button className="px-5 py-2 text-light" type="submit">
                    Yuborish
                  </Button>
                </div>
              </div>
            </GroupBox>
          </div>
        </Form>
      )}
    </Formik>
  );
}
