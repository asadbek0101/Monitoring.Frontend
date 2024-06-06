import { Form, Formik } from "formik";
import { TemplateInitialProps } from "../../api/templates/TemplatesDto";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { useCallback } from "react";
import { update } from "immupdate";
import { TextAreaField } from "../form/TextAreaField";
import Button, { BgColors } from "../ui/Button";

interface Props {
  readonly initialValues: TemplateInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

export default function TemplatesForm({ initialValues, setInitialValues, onSubmit }: Props) {
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
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
      {() => (
        <Form>
          <div className="row p-4">
            <div className="col-6">
              <GroupBox title="Shablon yaratish">
                <div className="row">
                  <div className="col-12 mt-3">
                    <InputField
                      name="name"
                      value={initialValues.name}
                      onChange={onChangeName}
                      label="Nomi"
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <TextAreaField
                      name="_info"
                      defaultValue={initialValues.info}
                      onChange={onChangeInfo}
                      label="Qo'shimcha ma'lumot"
                    />
                  </div>
                  <div className="col-12 mt-2 d-flex align-items-center justify-content-end">
                    <Button type="submit" className="px-3 py-2 text-light" bgColor={BgColors.Green}>
                      Yuborish
                    </Button>
                  </div>
                </div>
              </GroupBox>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
