// @flow
import { actionCreator } from 'capture-core/actions/actions.utils';
import { reservedUrlKeys } from '../../UrlSync/withUrlSync';

export const actionTypes = {
    EDIT_EVENT_FROM_URL: 'EditEventFromUrl',
    EVENT_FROM_URL_RETRIEVED: 'EventFromUrlRetrievedForEditEvent',
    EVENT_FROM_URL_COULD_NOT_BE_RETRIEVED: 'EventFromUrlCouldNotBeRetrievedForEditEvent',
    ORG_UNIT_RETRIEVED_ON_URL_UPDATE: 'OrgUnitRetrievedForEditEventOnUrlUpdate',
    ORG_UNIT_RETRIEVAL_FAILED_ON_URL_UPDATE: 'OrgUnitRetrievalFailedForEditEventOnUrlUpdate',
};

export const editEventFromUrl = (selections: Object) =>
    actionCreator(actionTypes.EDIT_EVENT_FROM_URL)({
        eventId: selections[reservedUrlKeys.ENTIRE_PARAM_STRING],
        page: selections.page,
    });

export const eventFromUrlCouldNotBeRetrieved = (message: string) =>
    actionCreator(actionTypes.EVENT_FROM_URL_COULD_NOT_BE_RETRIEVED)(message);

export const eventFromUrlRetrieved = (eventContainer: Object) =>
    actionCreator(actionTypes.EVENT_FROM_URL_RETRIEVED)(eventContainer);

export const orgUnitRetrievedOnUrlUpdate = (orgUnit: Object, eventContainer: Object) =>
    actionCreator(actionTypes.ORG_UNIT_RETRIEVED_ON_URL_UPDATE)({ orgUnit, eventContainer });

export const orgUnitCouldNotBeRetrievedOnUrlUpdate = (eventContainer: Object) =>
    actionCreator(actionTypes.ORG_UNIT_RETRIEVAL_FAILED_ON_URL_UPDATE)({ eventContainer });
