import qs from "qs";
import { toNumber, toString } from "lodash";

import { Dict } from "../api/AppDto";

export function formatCurrencyNumber(value: string | number = 0, fraction = 2): string {
  return toNumber(value)
    .toFixed(fraction)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatCardNumber(value: string | number = 0): string {
  return toString(value).replace(/(?=(\d{4})+(?!\d))/g, " ");
}

export function parseSearch<TData = any>(search = ""): TData & Dict<string> {
  return qs.parse(search.replace("?", "")) as TData & Dict<string>;
}
