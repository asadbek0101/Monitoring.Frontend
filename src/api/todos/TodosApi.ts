import { BaseApi } from "../BaseApi";

export class TodosApi extends BaseApi {
  public getAllTodos(query: any): Promise<any> {
    return this.get("Todos/GetAll", {
      query,
    });
  }

  public getAllFileNames(query: any): Promise<any> {
    return this.get("Todos/GetAllFileNames", {
      query,
    });
  }

  public getOneTodo(query: any): Promise<any> {
    return this.get("Todos/GetOne", {
      query,
    });
  }

  public getTodosByRegion(query: any): Promise<any> {
    return this.get("Todos/GetByRegion", {
      query,
    });
  }

  public createTodo(json: any): Promise<any> {
    return this.post("Todos/Create", {
      json,
    });
  }

  public updateTodo(json: any): Promise<any> {
    return this.put("Todos/Update", {
      json,
    });
  }

  public deleteTodos(json: any): Promise<any> {
    return this.post("Todos/Delete", {
      json,
    });
  }
}
