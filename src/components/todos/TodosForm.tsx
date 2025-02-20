import { Form, Formik } from "formik";
import { SelectBoxProps, UserRoles } from "../../api/AppDto";
import { TodoInitialProps } from "../../api/todos/TodosDto";
import { GroupBox } from "../ui/GroupBox";
import { SelectPickerField } from "../form/SelectPrickerField";
import { useCallback } from "react";
import { update } from "immupdate";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import { CheckRole } from "../../utils/CheckRole";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { profileSelector } from "../../reducers/authReducer";

import Button from "../ui/Button";
import FileUpload from "../ui/FileUpload";

interface Props {
  readonly todoId: string | number;
  readonly regions: SelectBoxProps[];
  readonly categories: SelectBoxProps[];
  readonly templates: SelectBoxProps[];
  readonly initialValues: TodoInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onChangeRegionId: (value: any) => void;
  readonly onChangeCategoryId: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

export default function TodosForm({
  todoId,
  regions,
  categories,
  templates,
  initialValues,
  setInitialValues,
  onChangeRegionId,
  onChangeCategoryId,
  onSubmit,
}: Props) {
  const profile = useShallowEqualSelector(profileSelector);

  const checkRegion = useCallback(() => {
    return (
      CheckRole(UserRoles.Programmer, profile) ||
      CheckRole(UserRoles.DepartmentHead, profile) ||
      CheckRole(UserRoles.ChiefSpecialist, profile)
    );
  }, [profile]);

  const onChangeTemplateId = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          templateId: event,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeInPlan = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          inPlan: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeInProcess = useCallback(
    (event: any) => {
      if (Number(initialValues.inPlan) >= Number(event.target.value)) {
        setInitialValues((prev: any) =>
          update(prev, {
            inProcess: event.target.value,
          }),
        );
      }
    },
    [setInitialValues, initialValues.inPlan],
  );

  const onChangeFile = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          file: event.target.files[0],
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeComment = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          comment: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onBlurInPlan = useCallback(
    (event: any) => {
      const _inPlan = Number(event.target.value);
      const _inProcess = Number(initialValues.inProcess);
      let _result = 0;

      if (Boolean(_inPlan) && Boolean(_inProcess)) {
        _result = (_inProcess * 100) / _inPlan;
      }

      if (_inPlan >= _inProcess) {
        setInitialValues((prev: any) =>
          update(prev, {
            inPercentage: `${_result?.toString()?.substring(0, 4)}%`,
          }),
        );
      }
    },
    [setInitialValues, initialValues.inProcess],
  );

  const onBlurInProcess = useCallback(
    (event: any) => {
      const _inPlan = Number(initialValues.inPlan);
      const _inProcess = Number(event.target.value);
      let _result = 0;

      if (Boolean(_inPlan) && Boolean(_inProcess)) {
        _result = (_inProcess * 100) / _inPlan;
      }

      setInitialValues((prev: any) =>
        update(prev, {
          inPercentage: `${_result?.toString()?.substring(0, 4)}%`,
        }),
      );
    },
    [setInitialValues, initialValues.inPlan],
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
      {() => (
        <Form>
          <div className="row p-4">
            <div className="col-2" />
            <div className="col-8">
              <GroupBox title="Tadbir yaratish">
                <div className="row">
                  <div className="col-4">
                    <SelectPickerField
                      name="regionId"
                      options={regions}
                      label="Hudud nomi"
                      isSearchable
                      disabled={todoId !== 0 || !checkRegion()}
                      onChanges={onChangeRegionId}
                    />
                  </div>
                  <div className="col-4">
                    <SelectPickerField
                      name="categoryId"
                      options={categories}
                      label="Loyiha nomi"
                      isSearchable
                      disabled={todoId !== 0}
                      onChanges={onChangeCategoryId}
                    />
                  </div>
                  <div className="col-4">
                    <SelectPickerField
                      name="templateId"
                      options={templates}
                      label="Tadbir nomi"
                      isSearchable
                      disabled={todoId !== 0}
                      onChanges={onChangeTemplateId}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <InputField
                      name="inPlan"
                      label="Rejada"
                      value={initialValues.inPlan}
                      onChange={onChangeInPlan}
                      onBlur={onBlurInPlan}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <InputField
                      name="inProcess"
                      label="Amalda"
                      value={initialValues.inProcess}
                      onChange={onChangeInProcess}
                      onBlur={onBlurInProcess}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <InputField
                      name="inPercentage"
                      label="Foizda"
                      value={initialValues.inPercentage}
                      onChange={onChangeInPlan}
                      disabled
                    />
                  </div>

                  <div className="col-12 mt-3">
                    <TextAreaField
                      name="_comment"
                      label="Izoh..."
                      onChange={onChangeComment}
                      defaultValue={initialValues.comment}
                    />
                  </div>
                  <div className="col-12 mt-4">
                    <FileUpload
                      setFiles={(value) => onChangeFile(value)}
                      title="File yuklash"
                      isThere={Boolean(initialValues.fileName)}
                    />
                  </div>
                  <div className="col-12 mt-3 d-flex justify-content-end">
                    <Button type="submit" className="px-5 py-2 text-light ">
                      Yuborish
                    </Button>
                  </div>
                </div>
              </GroupBox>
            </div>
            <div className="col-2" />
          </div>
        </Form>
      )}
    </Formik>
  );
}
