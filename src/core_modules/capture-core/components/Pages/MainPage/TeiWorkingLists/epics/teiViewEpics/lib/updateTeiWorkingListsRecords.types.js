// @flow
import type { FiltersData } from '../../../../WorkingLists';
import type { TeiColumnsMetaForDataFetching, TeiFiltersOnlyMetaForDataFetching } from '../../../types';

export type Input = {|
    page: number,
    pageSize: number,
    programId: string,
    orgUnitId: string,
    filters: FiltersData,
    sortById: string,
    sortByDirection: string,
    storeId: string,
    columnsMetaForDataFetching: TeiColumnsMetaForDataFetching,
    filtersOnlyMetaForDataFetching: TeiFiltersOnlyMetaForDataFetching,
    singleResourceQuery: SingleResourceQuery,
    absoluteApiPath: string,
|};