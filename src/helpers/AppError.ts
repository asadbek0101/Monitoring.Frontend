import { isPlainObject } from "lodash";

export interface AppErrorProps<T = any> extends Omit<Error, "name">{
    data?: T;
    name?: string;
    status: number;
}

export class AppError implements AppErrorProps{
    public name: string;
    public status: number;
    public message: string;

    public readonly isAppError: boolean = true;

    data: any;

    constructor({data = [], name = "AppError", status, message }: AppErrorProps){
        const dataName = data && isPlainObject(data)? data.name : name;
        const dataMessage = data && isPlainObject(data)? data.message : "";

        this.data = data;
        this.name = name;
        this.status = status;
        this.message = message || dataMessage;
    }

    public getErrors(): string[]{
        return this.data.map(({userMsg}: any)=>userMsg).filter(Boolean)
    }
}