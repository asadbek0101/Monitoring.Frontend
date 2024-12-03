import { Form, Formik } from "formik";
import { CategoryInitialProps } from "../../api/categories/CategoriesDto";
import { GroupBox } from "../ui/GroupBox";
import { useCallback } from "react";
import { update } from "immupdate";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import Button from "../ui/Button";

interface Props {
  readonly initialValues: CategoryInitialProps;
  readonly onSubmit: (value: any) => void;
  readonly setInitialValues: (value: any) => void;
}

export default function CategoriesForm({ initialValues, setInitialValues, onSubmit }: Props) {
  const onChangeName = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          name: event?.target?.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          info: event?.target?.value,
        }),
      );
    },
    [setInitialValues],
  );

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} enableReinitialize={true}>
      {() => (
        <Form>
          <div className="row p-4">
            <div className="col-3" />

            <div className="col-6">
              <GroupBox title="Loyiha yaratish">
                <div className="row">
                  <div className="col-12">
                    <InputField
                      name="name"
                      label="Loyiha nomi"
                      onChange={onChangeName}
                      value={initialValues.name}
                      className="my-2"
                    />
                  </div>
                  <div className="col-12">
                    <TextAreaField
                      name="_info"
                      label="Qo'shimcha ma'lumot"
                      defaultValue={initialValues.info}
                      onChange={onChangeInfo}
                      className="my-2"
                    />
                  </div>
                  <div className="col-12 mt-4 d-flex align-items-center justify-content-end">
                    <Button type="submit" className="px-5 py-2 text-light">
                      Yuborish
                    </Button>
                  </div>
                </div>
              </GroupBox>
            </div>
            <div className="col-3" />
          </div>
        </Form>
      )}
    </Formik>
  );
}
