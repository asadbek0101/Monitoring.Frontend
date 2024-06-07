import { AppFilter, AppFilterProps } from "./AppFilter";

export enum CategoryFilterTabs {
  Form = "form",
  Table = "table",
}

interface CategoryFilterProps extends AppFilterProps<CategoryFilterTabs> {
  readonly categoryId: string;
  readonly searchValue: string;
}

export class CategoryFilter extends AppFilter<CategoryFilterTabs> {
  private readonly categoryId: string;
  private readonly searchValue: string;
  public constructor({ categoryId, searchValue, ...props } = {} as CategoryFilterProps) {
    super({ ...props });
    this.categoryId = categoryId || "";
    this.searchValue = searchValue || "";
  }

  public getCategoryId() {
    return this.categoryId;
  }

  public getCategoryFilter() {
    return {
      pageNumber: this.pageCount,
      pageSize: this.perPage,
      searchValue: this.searchValue,
    };
  }
}
