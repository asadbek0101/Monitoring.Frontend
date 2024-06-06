import { AppFilter, AppFilterProps } from "./AppFilter";

export enum TempalteFilterTabs {
  Form = "form",
  Table = "table",
}

interface TemplateFilterProps extends AppFilterProps<TempalteFilterTabs> {
  readonly templateId: string;
}

export class TemplateFilter extends AppFilter<TempalteFilterTabs> {
  private readonly templateId: string;
  public constructor({ templateId, ...props } = {} as TemplateFilterProps) {
    super({ ...props });
    this.templateId = templateId || "";
  }

  public getTemplateIdId() {
    return this.templateId;
  }
}
