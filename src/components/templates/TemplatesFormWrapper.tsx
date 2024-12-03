import { useCallback, useEffect, useMemo, useState } from "react";
import { TemplateInitialProps } from "../../api/templates/TemplatesDto";
import { useTemplatesApiContext } from "../../api/templates/TemplatesApiContext";
import { showError } from "../../utils/NotificationUtils";
import { TempalteFilterTabs, TemplateFilter } from "../../filters/TemplateFilter";
import { toast } from "react-toastify";

import TabPage from "../tabs/TabPage";
import TemplatesForm from "./TemplatesForm";
import Button, { BgColors } from "../ui/Button";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import BackIcon from "../icons/BackIcon";

interface Props {
  readonly filter: TemplateFilter;
}

export default function TemplatesFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<TemplateInitialProps>({
    id: 0,
    name: "",
    info: "",
  });

  const { TemplatesApi } = useTemplatesApiContext();

  const templateId = useMemo(() => filter.getTemplateIdId() || 0, [filter]);

  const locationHelpers = useLocationHelpers();

  useEffect(() => {
    if (Boolean(templateId)) {
      TemplatesApi.getOneTemplate({ id: templateId })
        .then((r) => setInitialValues(r?.data))
        .catch(showError);
    }
  }, [TemplatesApi, templateId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (Boolean(templateId)) {
        const json = {
          id: templateId,
          ...value,
        };
        TemplatesApi.updateTemplate(json)
          .then((r: any) => {
            toast.success(r?.message);
            locationHelpers.pushQuery({ tab: TempalteFilterTabs.Table });
          })
          .catch(showError);
      } else {
        const json = {
          ...value,
        };
        TemplatesApi.createTemplate(json)
          .then((r: any) => {
            toast.success(r?.message);
            locationHelpers.pushQuery({ tab: TempalteFilterTabs.Table });
          })
          .catch(showError);
      }
    },
    [TemplatesApi, templateId, locationHelpers],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between">
          <Button
            className="px-3 py-2 d-flex align-items-center gap-3"
            bgColor={"#fff"}
            onClick={() => locationHelpers.pushQuery({ tab: TempalteFilterTabs.Table })}
          >
            <BackIcon />
            Orqaga
          </Button>
        </div>
      }
    >
      <TemplatesForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
