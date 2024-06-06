import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { SelectPickerField } from "../form/SelectPrickerField";
import { TextAreaField } from "../form/TextAreaField";
import { RegionCategoryInitialProps } from "../../api/region-categoies/RegionCategoriesDto";
import { SelectBoxProps } from "../../api/AppDto";
import { useCallback } from "react";
import { update } from "immupdate";
import Button, { BgColors } from "../ui/Button";

interface Props {
  readonly regions: SelectBoxProps[];
  readonly categories: SelectBoxProps[];
  readonly initialValues: RegionCategoryInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
  readonly isDisabled: boolean;
}

export default function RegionCategoriesForm({
  regions,
  categories,
  initialValues,
  setInitialValues,
  onSubmit,
  isDisabled,
}: Props) {
  const onChangeRegionId = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          regionId: event,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeCategoryId = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          categoryId: event,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeComment = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          comment: event?.target?.value,
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
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <SelectPickerField
                      name="regionId"
                      label="Hudud"
                      options={regions}
                      disabled={isDisabled}
                      onChanges={onChangeRegionId}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <SelectPickerField
                      name="categoryId"
                      label="Buyruq toifasi"
                      options={categories}
                      disabled={isDisabled}
                      onChanges={onChangeCategoryId}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <TextAreaField
                      label="Izoh..."
                      name="_comment"
                      onChange={onChangeComment}
                      defaultValue={initialValues.comment}
                    />
                  </div>
                  <div className="col-12 mt-3 d-flex align-items-center justify-content-end">
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
