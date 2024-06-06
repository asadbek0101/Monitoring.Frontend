import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { useCallback } from "react";
import { update } from "immupdate";

interface Dict<T> {
    readonly [key: string]: T;
}

type QueryType = Dict<string | number>;

export interface HelpersLocationProps extends Location {
    readonly query: QueryType;
}

interface HelpersProps<T> {
    readonly pushLocation: (location: Partial<HelpersLocationProps>) => void;
    readonly replaceLocation: (location: Partial<HelpersLocationProps>) => void;
  
    readonly pushNewQuery: (query: T | QueryType) => void;
    readonly replaceNewQuery: (query: T | QueryType) => void;
  
    readonly pushQuery: (query: T | QueryType) => void;
    readonly replaceQuery: (query: T | QueryType) => void;
}

function parseSearch<TData = any>(search = ""): TData & Dict<string> {
    return qs.parse(search.replace("?", "")) as TData & Dict<string>;
}

export default function useLocationHelpers<T>(): HelpersProps<T>{

const location = useLocation();
const navigate = useNavigate();

const getUpdatedLocation = useCallback(
    ({ query: locationQuery = {}, ...location }, newQuery = {}) => {
      const search = parseSearch(location.search);

      const query = update(search, locationQuery);

      return update(location, { search: qs.stringify(update(query, newQuery)) });
    },
[],
);

const getNewLocation = useCallback(({ ...location }, newQuery = {}) => {
    return update(location, { search: qs.stringify(newQuery) });
}, []);

return {
        pushLocation: (l: any) => navigate(getUpdatedLocation(l)),
        replaceLocation: (l: any) => navigate(getUpdatedLocation(l)),
        pushNewQuery: (query: any) => navigate(getNewLocation(location, query)),
        replaceNewQuery: (query: any) => navigate(getNewLocation(location, query)),
        pushQuery: (query: any) => navigate(getUpdatedLocation(location, query)),
        replaceQuery: (query: any) => navigate(getUpdatedLocation(location, query)),
    };
};