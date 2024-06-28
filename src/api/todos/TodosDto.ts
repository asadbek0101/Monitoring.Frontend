export interface TodoInitialProps {
  readonly regionId: number | any;
  readonly categoryId: number | any;
  readonly templateId: number;
  readonly inPlan: number | string;
  readonly inProcess: number | string;
  readonly inPercentage: number | string;
  readonly comment: string;
  readonly fileName: string;
  readonly file: any;
}
