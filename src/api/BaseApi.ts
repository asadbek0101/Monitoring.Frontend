import qs from "qs";
import { pathParams } from "../utils/PathParams";
import ky, { Hooks, Options as KYOptions, ResponsePromise } from "ky";

import { apiLogger } from "../utils/ApiUtils";
import { AppLanguage } from "../i18n/I18nContext";
import { toCamelCase } from "../utils/CaseUtils";
import { AppError, AppErrorProps } from "../helpers/AppError";

export interface ApiProps {
  readonly host: string;
  readonly token?: string;
  readonly logout?: () => void;
  readonly employeeId?: string;
  readonly userId?: string;
  readonly language: AppLanguage;
  readonly taxNo?: string;
  readonly login?: string;
}

export interface ResponseListProps<TData = any> {
  readonly list: TData[];
  readonly page: number;
  readonly perPage: number;
  readonly pageCount: number;
  readonly totalCount: number;
}

export interface Options extends KYOptions {
  readonly query?: object;
  readonly params?: object;
}

export class BaseApi {
  private readonly host: string;
  private readonly token?: string;
  private readonly logout?: () => void;
  protected readonly userId?: string;
  protected readonly taxNo?: string;
  protected readonly language: AppLanguage;
  protected readonly login?: string;

  constructor({ token, host, logout, language, userId, taxNo, login }: ApiProps) {
    this.host = host;
    this.token = token;
    this.logout = logout;
    this.language = language;
    this.userId = userId;
    this.taxNo = taxNo;
    this.login = login;
  }

  private queryToString(query = {}): string {
    return qs.stringify(query);
  }

  private createRequestUrl(url: string, query = {}, params = {}): string {
    const formattedUrl = pathParams(url, params);

    return [formattedUrl, this.queryToString(query)].filter(Boolean).join("?");
  }

  private createRequestOptions(options: KYOptions): KYOptions {
    const { hooks = {} as Hooks, headers: optionHeaders = [] as any } = options;

    const headers = new Headers(optionHeaders);

    if (this.language) {
      headers.set("lang", this.language);
    }

    if (this.userId) {
      headers.set("userId", this.userId);
    }

    if (this.token) {
      headers.set("Authorization", `Bearer ${this.token}`);
    }

    return {
      timeout: 120000,
      prefixUrl: this.host,
      ...options,
      headers: [...(headers as any), ...optionHeaders],
      hooks: {
        ...hooks,
        beforeRequest: [...(hooks?.beforeRequest || []), apiLogger],
        afterResponse: [
          ...(hooks?.afterResponse || []),
          async (_, __, response) => {
            if ((response.status === 403 || response.status === 401) && this.logout) {
              this.logout();
            }
          },
        ],
      },
    };
  }

  private request(url: string, options: Options = {}): ResponsePromise {
    const { query, params, ...kyOptions } = options;

    const formattedOptions = this.createRequestOptions(kyOptions);
    const formattedUrl = this.createRequestUrl(url, query, params);

    return ky(formattedUrl, formattedOptions);
  }

  private jsonRequest<TData>(url: string, options?: Options): Promise<TData> {
    return new Promise<TData>((resolve, reject) => {
      this.request(url, options)
        .then((response) => {
          if (response.ok) {
            return response.json().then((data: any) => {
              if (data.success && data.data) {
                return data.data;
              } else if (data) {
                return data;
              } else {
                return this.parseError(data);
              }
            });
          }

          return response
            .json()
            .then((data: any) => this.parseError(data))
            .then((error) => {
              throw error;
            });
        })
        .then(resolve)
        .catch((error) => {
          if (error instanceof AppError) {
            reject(error);
          } else if (error?.response?.json) {
            error?.response?.json().then((data: Response) => reject(this.parseError(data)));
          } else if (error) {
            reject(
              this.parseError({
                statusText: error.message,
                errors: [{ userMsg: error.message }],
              } as any),
            );
          } else {
            reject(
              this.parseError({
                statusText: "Unknown",
                errors: [{ userMsg: "Unknown" }],
              } as any),
            );
          }
        });
    });
  }

  private parseError(response: Response): AppError {
    const error = new Error(response.statusText) as AppErrorProps;

    error.status = response?.status;
    // @ts-ignore
    error.data = toCamelCase(response?.errors || []);

    return new AppError(error);
  }

  protected downloadPdf<TData = any>(
    url: string,
    fileName = "filename",
    options?: Options,
  ): Promise<void> {
    return this.request(url, options)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = `${fileName}.pdf`;

        document.body.appendChild(a);

        a.click();
        a.remove();
      });
  }

  protected downloadWord<TData = any>(
    url: string,
    fileName = "filename",
    options?: Options,
  ): Promise<void> {
    return this.request(url, options)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = `${fileName}.docx`;

        document.body.appendChild(a);

        a.click();
        a.remove();
      });
  }

  protected getCaptcha<TData = any>(url: string, options?: Options): Promise<any> {
    return this.request(url, options).then((r) => {
      const a = document.createElement("img");
      a.src = r.url;
      a.alt = "captcha";
      return a;
    });
  }

  public get<TData = any>(url: string, options?: Options): Promise<TData> {
    return this.jsonRequest(url, { ...options, method: "get" });
  }

  protected post<TData = any>(url: string, options?: Options): Promise<TData> {
    return this.jsonRequest(url, { ...options, method: "post" });
  }

  protected put<TData = any>(url: string, options?: Options): Promise<TData> {
    return this.jsonRequest(url, { ...options, method: "put" });
  }

  protected patch<TData = any>(url: string, options?: Options): Promise<TData> {
    return this.jsonRequest(url, { ...options, method: "patch" });
  }

  protected delete<TData = any>(url: string, options?: Options): Promise<TData> {
    return this.jsonRequest(url, { ...options, method: "delete" });
  }
}
