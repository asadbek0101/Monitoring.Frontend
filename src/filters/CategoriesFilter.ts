import { AppFilter, AppFilterProps } from "./AppFilter";

export enum CategoryFilterTabs {
  Form = "form",
  Table = "table",
}

interface CategoryFilterProps extends AppFilterProps<CategoryFilterTabs> {
  readonly categoryId: string;
}

export class CategoryFilter extends AppFilter<CategoryFilterTabs> {
  private readonly categoryId: string;
  public constructor({ categoryId, ...props } = {} as CategoryFilterProps) {
    super({ ...props });
    this.categoryId = categoryId || "";
  }

  public getCategoryId() {
    return this.categoryId;
  }
}
