import { get, isArray, isEqual, isEqualWith } from "lodash";

function createShallowEqualCustomizer<T>(depth = 1) {
  return (
    aVal: T[keyof T],
    bVal: T[keyof T],
    _idx: keyof T,
    _a: T,
    _b: T,
    stack?: { size: number },
    // eslint-disable-next-line
  ) => {
    // Shallow compares
    // For 1st level, stack === undefined.
    //   -> Do nothing (and implicitly return undefined so that it goes to compare 2nd level)
    // For 2nd level and up, stack !== undefined.
    //   -> Compare by === operator
    if (stack && stack.size > depth) {
      return aVal === bVal;
    }
  };
}

export function isShallowEqual<T>(a: T, b: T, depth?: number): boolean {
  // @ts-ignore
  return isEqualWith(a, b, createShallowEqualCustomizer(depth));
}

export function isEqualData<T>(a: T, b: T): boolean {
  if (isArray(a)) {
    return isEqualWith(a, b, isEqual);
  }

  return isEqual(a, b);
}

export function isEqualChild<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5]
>(a: T, b: T, key1: K1, key2?: K2, key3?: K3, key4?: K4, key5?: K5, key6?: K6) {
  const path = [key1, key2, key3, key4, key5, key6].filter((x) => x != null) as string[];
  const aChild = get(a, path);
  const bChild = get(b, path);

  return isEqual(aChild, bChild);
}

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
export type Omit<T, K extends keyof T> = Pick<
  T,
  ({ [P in keyof T]: P } &
    { [P in K]: never } & {
      [x: string]: never;
      [x: number]: never;
    })[keyof T]
>;

export function tryStringifyJSON<T>(data: T): null | string {
  try {
    return JSON.stringify(data);
  } catch {
    return null;
  }
}

export function sortData(data: any[], field: string, methodType: "lower" | "upper"){
  if(methodType === "lower"){
    return data.sort(function(a, b){return a[field] - b[field]});
  }

  return data.sort(function(a, b){return b[field] - a[field]});
}
