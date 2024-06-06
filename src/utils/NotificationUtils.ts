import { isArray } from "lodash";
import { toast } from 'react-toastify';

import { AppError } from "../helpers/AppError";

export function showError(error: AppError): void {
  const errors = error.getErrors();

  if (isArray(errors)) {
    errors.forEach((error) => {
      toast.error(error);
    });
  }
}
