// @flow
import { flatMap, map } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { searchPageActionTypes } from './SearchPage.container';
import { getTrackedEntityInstances } from '../../../trackedEntityInstances/trackedEntityInstanceRequests';
import {
    getTrackerProgramThrowIfNotFound as getTrackerProgram,
} from '../../../metaData';

export const trackedEntitySearchUsingUniqueIdentifierEpic = (action$: InputObservable, store: ReduxStore) =>
    action$.ofType(searchPageActionTypes.ON_SEARCH).pipe(
        flatMap(({ payload: { formId, selectedProgramId } }) => {
            const { formsValues } = store.getState();
            const searchTerm = formsValues[formId];
            const fieldId = Object.keys(searchTerm)[0];
            const queryArgs = {
                filter: [`${fieldId}:eq:${searchTerm[fieldId]}`],
                program: selectedProgramId,
                pageNumber: 1,
                ouMode: 'ACCESSIBLE',
            };
            const attributes = getTrackerProgram(selectedProgramId).attributes;

            return from(getTrackedEntityInstances(queryArgs, attributes)).pipe(
                map(({ trackedEntityInstanceContainers }) => {
                    const searchResults = trackedEntityInstanceContainers;
                    if (searchResults.length > 0) {
                        const { id: trackedEntityInstanceId, tei: { orgUnit: orgUnitId } } = searchResults[0];
                        const oldTrackerCaptureAppUrl =
                          (process.env.REACT_APP_TRACKER_CAPTURE_APP_PATH || '..').replace(/\/$/, '');
                        const urlParameters =
                          `/#/dashboard?tei=${trackedEntityInstanceId}&ou=${orgUnitId}&program=${selectedProgramId}`;
                        window.location.href = `${oldTrackerCaptureAppUrl}${urlParameters}`;
                        return {};
                    }
                    // trigger action that will display modal to inform user that results are empty.
                    return {};
                }),
            );
        }),
    );