// @flow
import { combineEpics } from 'redux-observable';
import {
    mainSelectionsCompletedEpic,
    orgUnitDataRetrivedEpic,
    mainSelectionsFromUrlGetOrgUnitDataEpic,
    mainSelectionsFromUrlEmptyOrgUnitEpic,
    mainSelectionsFromUrlValidationEpic,
} from 'capture-core/components/Pages/MainPage/mainSelections.epics';
import {
    selectionsFromUrlGetOrgUnitDataForNewEventEpic,
    selectionsFromUrlEmptyOrgUnitForNewEventEpic,
    selectionsFromUrlValidationForNewEventEpic,
} from 'capture-core/components/Pages/NewEvent/epics/newEventSelections.epics';
import {
    openNewEventPageLocationChangeEpic,
} from 'capture-core/components/Pages/NewEvent/epics/newEvent.epics';
import {
    openNewEventInDataEntryEpic,
    runRulesForSingleEventEpic,
} from 'capture-core/components/Pages/NewEvent/DataEntry/epics/newEventDataEntry.epics';
import {
    saveNewEventEpic,
    saveNewEventLocationChangeEpic,
} from 'capture-core/components/Pages/NewEvent/DataEntry/epics/saveNewSingleEvent.epics';
import {
    cancelNewEventEpic,
    cancelNewEventLocationChangeEpic,
} from 'capture-core/components/Pages/NewEvent/DataEntry/epics/cancelNewSingleEvent.epics';
import {
    cancelNewEventIncompleteSelectionsLocationChangeEpic,
} from 'capture-core/components/Pages/NewEvent/DataEntry/epics/cancelNewSingleEventSelectionsIncomplete.epics';
import {
    retrieveWorkingListEpic,
    updateWorkingListEpic,
} from 'capture-core/components/Pages/MainPage/EventsList/eventsList.epics';
import {
    getEventFromUrlEpic,
    getOrgUnitOnUrlUpdateEpic,
} from 'capture-core/components/Pages/EditEvent/epics/editEvent.epics';
import {
    openEditEventInDataEntryEpic,
} from 'capture-core/components/Pages/EditEvent/DataEntry/epics/editEventDataEntry.epics';

import { loadStartupData } from '../init/entry.epics';

export default combineEpics(
    loadStartupData,
    mainSelectionsCompletedEpic,
    orgUnitDataRetrivedEpic,
    retrieveWorkingListEpic,
    updateWorkingListEpic,
    mainSelectionsFromUrlGetOrgUnitDataEpic,
    mainSelectionsFromUrlEmptyOrgUnitEpic,
    mainSelectionsFromUrlValidationEpic,
    selectionsFromUrlGetOrgUnitDataForNewEventEpic,
    selectionsFromUrlEmptyOrgUnitForNewEventEpic,
    selectionsFromUrlValidationForNewEventEpic,
    openNewEventPageLocationChangeEpic,
    openNewEventInDataEntryEpic,
    runRulesForSingleEventEpic,
    saveNewEventLocationChangeEpic,
    saveNewEventEpic,
    cancelNewEventLocationChangeEpic,
    cancelNewEventEpic,
    cancelNewEventIncompleteSelectionsLocationChangeEpic,
    getEventFromUrlEpic,
    getOrgUnitOnUrlUpdateEpic,
    openEditEventInDataEntryEpic,
);
