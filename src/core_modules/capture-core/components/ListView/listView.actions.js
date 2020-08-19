// @flow
import { actionCreator } from 'capture-core/actions/actions.utils';
import { methods } from '../../trackerOffline/trackerOfflineConfig.const';

export const listViewActionTypes = {
    SORT_WORKING_LIST: 'SortWorkingList',
    OPEN_EDIT_EVENT_PAGE: 'OpenEditEventPage',
    REQUEST_DELETE_EVENT: 'RequestDeleteEvent',
    START_DELETE_EVENT: 'StartDeleteEvent',
    DELETE_EVENT_FAILED: 'DeleteEventFailed',
    EVENT_DELETED: 'EventDeleted',
    WORKING_LIST_UPDATING: 'WorkingListUpdating',
    WORKING_LIST_UPDATING_WITH_DIALOG: 'WorkingListUpdatingWithDialog',
};

export const batchActionTypes = {
    WORKING_LIST_CONFIGS_RETRIEVED_BATCH: 'WorkingListConfigsRetrievedBatch',
    START_DELETE_EVENT_UPDATE_WORKING_LIST: 'StartDeleteEventUpdateWorkingList',
};

export const workingListUpdating = (listId: string) => actionCreator(listViewActionTypes.WORKING_LIST_UPDATING)({ listId });
export const workingListUpdatingWithDialog =
    (listId: string) => actionCreator(listViewActionTypes.WORKING_LIST_UPDATING_WITH_DIALOG)({ listId });

export const openEditEventPage =
    (eventId: string) => actionCreator(listViewActionTypes.OPEN_EDIT_EVENT_PAGE)(eventId);

export const requestDeleteEvent = (eventId: string) => actionCreator(listViewActionTypes.REQUEST_DELETE_EVENT)({ eventId });

/*
export const startDeleteEvent = (eventId: string) =>
    actionCreator(listViewActionTypes.START_DELETE_EVENT)({}, {
        offline: {
            effect: {
                url: `events/${eventId}`,
                method: methods.DELETE,
            },
            commit: { type: listViewActionTypes.EVENT_DELETED },
            rollback: { type: listViewActionTypes.DELETE_EVENT_FAILED },
        },
    });
*/