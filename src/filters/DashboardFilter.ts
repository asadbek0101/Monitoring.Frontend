import { AppFilter, AppFilterProps } from "./AppFilter";

interface DashboardFilterProps extends AppFilterProps<any> {
  readonly regionId: string;
}

export class DashboardFilter extends AppFilter<any> {
  private readonly regionId: string;
  public constructor({ regionId, ...props } = {} as DashboardFilterProps) {
    super({ ...props });
    this.regionId = regionId || "0";
  }

  public getRegionId() {
    return this.regionId;
  }
}
