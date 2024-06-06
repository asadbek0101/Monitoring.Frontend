import { BaseApi } from "../BaseApi";

export class TemplatesApi extends BaseApi {
  public getAllTemplates(query: any): Promise<any[]> {
    return this.get("Templates/GetAll", {
      query,
    });
  }

  public getOneTemplate(query: any): Promise<any> {
    return this.get("Templates/GetOne", {
      query,
    });
  }

  public getTemplatesList(query: any): Promise<any[]> {
    return this.get("Templates/GetList", {
      query,
    });
  }

  public createTemplate(json: any): Promise<any> {
    return this.post("Templates/Create", {
      json,
    });
  }

  public updateTemplate(json: any): Promise<any> {
    return this.put("Templates/Update", {
      json,
    });
  }

  public deleteTemplates(json: any): Promise<any> {
    return this.post("Templates/Delete", {
      json,
    });
  }
}
