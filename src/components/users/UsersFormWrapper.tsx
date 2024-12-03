import { useCallback, useEffect, useMemo, useState } from "react";
import { UserFilter, UserFilterTabs } from "../../filters/UserFIlter";
import { useUsersContext } from "../../api/users/UsersContext";
import { showError } from "../../utils/NotificationUtils";
import { UserInitialProps } from "../../api/users/UsersDto";
import { toast } from "react-toastify";

import TabPage from "../tabs/TabPage";
import UsersForm from "./UsersForm";
import Button, { BgColors } from "../ui/Button";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import { useRegionContext } from "../../api/regions/RegionsApiContext";
import BackIcon from "../icons/BackIcon";

interface Props {
  readonly filter: UserFilter;
}

export default function UsersFormWrapper({ filter }: Props) {
  const [roles, setRoles] = useState<{ label: string; value: string | number }[]>([]);
  const [regions, setRegions] = useState<{ label: string; value: string | number }[]>([]);

  const [initialValues, setInitialValues] = useState<UserInitialProps>({
    id: 0,
    regionId: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
    phoneNumber: "",
    userName: "",
    image: "",
    role: "",
  });

  const { UsersApi } = useUsersContext();
  const { RegionsApi } = useRegionContext();

  const locationHelpers = useLocationHelpers();

  const userId = useMemo(() => filter.getUserId() || 0, [filter]);

  useEffect(() => {
    if (Boolean(userId)) {
      UsersApi.getOneUser({ id: userId })
        .then((r) => {
          const json = {
            ...r?.data,
            role: {
              label: r?.data?.roleName,
              value: r?.data?.roleValue,
            },
            region: {
              label: r?.data?.region,
              value: r?.data?.regionId,
            },
          };

          setInitialValues(json);
        })
        .catch(showError);
    }
  }, [UsersApi, userId]);

  useEffect(() => {
    UsersApi.getRolesList()
      .then((r) => {
        var _roles =
          r?.data &&
          r?.data.map((x: any) => {
            return {
              label: x.name,
              value: x.normalizedName,
            };
          });

        setRoles(_roles);
      })
      .catch(showError);
  }, [UsersApi]);

  useEffect(() => {
    RegionsApi.getRegionsList().then((r: any) => {
      const _regions = r?.data?.map((re: any) => {
        return {
          label: re.name,
          value: re.id,
        };
      });

      setRegions(_regions);
    });
  }, [RegionsApi]);

  const onSubmit = useCallback(
    (value: any) => {
      if (Boolean(userId)) {
        const json = {
          id: userId,
          ...value,
          roleName: value?.role?.label,
          roleValue: value?.role?.value,
          regionId: value?.region?.value,
        };

        UsersApi.updateUser(json)
          .then((r) => {
            if (r?.isError && !r?.isSuccess) {
              toast.error(r?.message);
            } else {
              toast.success(r?.message);
              locationHelpers.pushQuery({ tab: UserFilterTabs.UserTable });
            }
          })
          .catch(showError);
      } else {
        const json = {
          ...value,
          roleName: value?.role?.label,
          roleValue: value?.role?.value,
          regionId: value?.region?.value,
        };

        UsersApi.createUser(json)
          .then((r) => {
            if (r?.isError && !r?.isSuccess) {
              toast.error(r?.message);
            } else {
              toast.success(r?.message);
              locationHelpers.pushQuery({ tab: UserFilterTabs.UserTable });
            }
          })
          .catch(showError);
      }
    },
    [UsersApi, userId, locationHelpers],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between align-items-center">
          <Button
            className="px-3 py-2 d-flex align-items-center gap-3"
            bgColor={"#fff"}
            onClick={() => locationHelpers.pushQuery({ tab: UserFilterTabs.UserTable })}
          >
            <BackIcon />
            Orqaga
          </Button>
        </div>
      }
    >
      <UsersForm
        roles={roles}
        regions={regions}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
