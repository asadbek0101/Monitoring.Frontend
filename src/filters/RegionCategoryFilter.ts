import { AppFilter, AppFilterProps } from "./AppFilter";

export enum RegionCategoryFilterTabs {
  Form = "form",
  Table = "table",
}

interface RegionCategoryFilterProps extends AppFilterProps<RegionCategoryFilterTabs> {
  readonly todoId: string;
  readonly regionId: string;
  readonly categoryId: string;
  readonly searchValue: string;
  readonly regionCategoryId: string;
}

export class RegionCategoryFilter extends AppFilter<RegionCategoryFilterTabs> {
  private readonly regionId: string;
  private readonly categoryId: string;
  private readonly searchValue: string;
  private readonly regionCategoryId: string;
  public constructor(
    {
      regionId,
      categoryId,
      searchValue,
      regionCategoryId,
      ...props
    } = {} as RegionCategoryFilterProps,
  ) {
    super({ ...props });
    this.regionId = regionId || "0";
    this.categoryId = categoryId || "0";
    this.searchValue = searchValue || "";
    this.regionCategoryId = regionCategoryId || "";
  }

  public getRegionCategoryFilter() {
    return {
      regionId: this.regionId,
      categoryId: this.categoryId,
      searchValue: this.searchValue,
      pageSize: this.perPage,
      pageNumber: this.pageCount,
    };
  }

  public getRegionCategoryId() {
    return this.regionCategoryId;
  }
}
