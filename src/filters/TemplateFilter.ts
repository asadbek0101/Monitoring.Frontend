import { AppFilter, AppFilterProps } from "./AppFilter";

export enum TempalteFilterTabs {
  Form = "form",
  Table = "table",
}

interface TemplateFilterProps extends AppFilterProps<TempalteFilterTabs> {
  readonly templateId: string;
  readonly searchValue: string;
}

export class TemplateFilter extends AppFilter<TempalteFilterTabs> {
  private readonly templateId: string;
  private readonly searchValue: string;
  public constructor({ templateId, searchValue, ...props } = {} as TemplateFilterProps) {
    super({ ...props });
    this.templateId = templateId || "";
    this.searchValue = searchValue || "";
  }

  public getTemplateIdId() {
    return this.templateId;
  }

  public getTemplateFilter() {
    return {
      pageNumber: this.pageCount,
      pageSize: this.perPage,
      searchValue: this.searchValue,
    };
  }
}
