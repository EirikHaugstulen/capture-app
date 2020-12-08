// @flow
import type { TrackerProgram } from '../../../../../metaData';
import type {
    CancelLoadTemplates,
    CancelLoadView,
    CancelUpdateList,
    Categories,
    ChangePage,
    ChangeRowsPerPage,
    ClearFilter,
    CustomMenuContents,
    CustomRowMenuContents,
    FiltersData,
    LoadedContext,
    LoadTemplates,
    LoadView,
    SelectRestMenuItem,
    SelectRow,
    SelectTemplate,
    SetColumnOrder,
    Sort,
    StickyFilters,
    UnloadingContext,
    UpdateFilter,
} from '../../WorkingLists';
import type {
    AddTemplate,
    CustomColumnOrder,
    RecordsOrder,
    UpdateTemplate,
    UpdateList,
} from '../../WorkingListsCommon';
import type { TeiWorkingListsTemplate, TeiWorkingListsTemplates, TeiRecords } from '../types';

export type Props = $ReadOnly<{|
    storeId: string,
|}>;

export type TeiWorkingListsReduxOutputProps = {|
    categories?: Categories,
    currentPage?: number,
    currentTemplate?: TeiWorkingListsTemplate,
    currentTemplateId?: string,
    currentViewHasTemplateChanges?: boolean,
    customColumnOrder?: CustomColumnOrder,
    customListViewMenuContents?: CustomMenuContents,
    customRowMenuContents?: CustomRowMenuContents,
    filters?: FiltersData,
    initialViewConfig?: Object,
    loadedContext?: LoadedContext,
    loading: boolean,
    loadViewError?: string,
    loadTemplatesError?: string,
    onAddTemplate: AddTemplate,
    onCancelLoadView: CancelLoadView,
    onCancelLoadTemplates: CancelLoadTemplates,
    onCancelUpdateList: CancelUpdateList,
    onChangePage: ChangePage,
    onChangeRowsPerPage: ChangeRowsPerPage,
    onClearFilter: ClearFilter,
    onDeleteTemplate: Function,
    onLoadView: LoadView,
    onLoadTemplates: LoadTemplates,
    onSelectListRow: SelectRow,
    onSelectRestMenuItem: SelectRestMenuItem,
    onSelectTemplate: SelectTemplate,
    onSetListColumnOrder: SetColumnOrder,
    onSortList: Sort,
    onUnloadingContext?: UnloadingContext,
    onUpdateFilter: UpdateFilter,
    onUpdateList: UpdateList,
    onUpdateTemplate: UpdateTemplate,
    orgUnitId: string,
    program: TrackerProgram,
    records?: TeiRecords,
    recordsOrder?: RecordsOrder,
    rowsPerPage?: number,
    sortByDirection?: string,
    sortById?: string,
    stickyFilters?: StickyFilters,
    templates?: TeiWorkingListsTemplates,
    templatesLoading: boolean,
    updating: boolean,
    updatingWithDialog: boolean,
    viewPreloaded?: boolean,
|};
