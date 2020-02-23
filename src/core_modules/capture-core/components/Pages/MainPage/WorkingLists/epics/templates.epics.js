// @flow
import { batchActions } from 'redux-batched-actions';
import { fromPromise } from 'rxjs/observable/fromPromise';
import i18n from '@dhis2/d2-i18n';
import log from 'loglevel';
import { errorCreator } from 'capture-core-utils';
import {
    actionTypes,
    batchActionTypes,
    fetchTemplatesSuccess,
    fetchTemplatesError,
    selectTemplate,
    updateTemplateSuccess,
    updateTemplateError,
    addTemplateSuccess,
    addTemplateError,
    deleteTemplateSuccess,
    deleteTemplateError,
} from '../workingLists.actions';
import { getTemplatesAsync } from './templatesFetcher';
import { getApi } from '../../../../../d2';

export const retrieveTemplatesEpic = (action$: InputObservable, store: ReduxStore) =>
    action$.ofType(
        actionTypes.TEMPLATES_FETCH,
    )
        .switchMap((action) => {
            const listId = action.payload.listId;
            const promise = getTemplatesAsync(store.getState())
                .then(container => batchActions([
                    selectTemplate(container.default.id, listId, container.default),
                    fetchTemplatesSuccess(container.workingListConfigs, listId),
                ], batchActionTypes.TEMPLATES_FETCH_SUCCESS_BATCH))
                .catch((error) => {
                    log.error(
                        errorCreator(error)({ epic: 'retrieveTemplatesEpic' }),
                    );
                    return fetchTemplatesError(i18n.t('an error occurred loading working lists'), listId);
                });

            return fromPromise(promise)
                .takeUntil(
                    action$.ofType(actionTypes.TEMPLATES_FETCH_CANCEL)
                        .filter(cancelAction => cancelAction.payload.listId === listId),
                );
        });

export const updateTemplateEpic = (action$: InputObservable, store: ReduxStore) =>
    action$.ofType(
        actionTypes.TEMPLATE_UPDATE,
    )
        .concatMap((action) => {
            const programId = store.getState().currentSelections.programId;
            const {
                template,
                eventQueryCriteria,
                listId,
            } = action.payload;

            const eventFilterData = {
                name: template.name,
                program: programId,
                eventQueryCriteria,
            };

            const requestPromise = getApi()
                .update(`eventFilters/${template.id}`, eventFilterData)
                .then(() => {
                    const isActiveTemplate =
                        store.getState().workingListsTemplates[listId].selectedTemplateId === template.id;
                    return updateTemplateSuccess(
                        template.id,
                        eventQueryCriteria, {
                            listId,
                            isActiveTemplate,
                        });
                })
                .catch((error) => {
                    log.error(
                        errorCreator('could not update template')({
                            error,
                            eventFilterData,
                        }),
                    );
                    const isActiveTemplate =
                        store.getState().workingListsTemplates[listId].selectedTemplateId === template.id;
                    return updateTemplateError(
                        template.id,
                        eventQueryCriteria, {
                            listId,
                            isActiveTemplate,
                        });
                });

            return fromPromise(requestPromise)
                .takeUntil(
                    action$
                        .ofType(actionTypes.TEMPLATE_UPDATE)
                        .filter(cancelAction => cancelAction.payload.template.id === template.id),
                )
                .takeUntil(
                    action$
                        .ofType(actionTypes.CONTEXT_UNLOADING)
                        .filter(cancelAction => cancelAction.payload.listId === listId),
                );
        });

export const addTemplateEpic = (action$: InputObservable, store: ReduxStore) =>
    action$.ofType(
        actionTypes.TEMPLATE_ADD,
    )
        .concatMap((action) => {
            const programId = store.getState().currentSelections.programId;
            const {
                name,
                eventQueryCriteria,
                clientId,
                listId,
            } = action.payload;

            const eventFilterData = {
                name,
                program: programId,
                eventQueryCriteria,
            };

            const requestPromise = getApi()
                .post('eventFilters', eventFilterData)
                .then((result) => {
                    const isActiveTemplate =
                        store.getState().workingListsTemplates[listId].selectedTemplateId === clientId;
                    return addTemplateSuccess(result.response.uid, clientId, { listId, isActiveTemplate });
                })
                .catch((error) => {
                    log.error(
                        errorCreator('could not update template')({
                            error,
                            eventFilterData,
                        }),
                    );
                    const isActiveTemplate =
                        store.getState().workingListsTemplates[listId].selectedTemplateId === clientId;
                    return addTemplateError(clientId, { listId, isActiveTemplate });
                });

            return fromPromise(requestPromise)
                .takeUntil(
                    action$
                        .ofType(actionTypes.CONTEXT_UNLOADING)
                        .filter(cancelAction => cancelAction.payload.listId === listId),
                );
        });

export const deleteTemplateEpic = (action$: InputObservable, store: ReduxStore) =>
    action$.ofType(
        actionTypes.TEMPLATE_DELETE,
    )
        .concatMap((action) => {
            const {
                template,
                listId,
            } = action.payload;

            const requestPromise = getApi()
                .delete(`eventFilters/${template.id}`)
                .then(() => deleteTemplateSuccess(template, listId))
                .catch((error) => {
                    log.error(
                        errorCreator('could not delete template')({
                            error,
                            template,
                        }),
                    );
                    return deleteTemplateError(template, listId);
                });

            return fromPromise(requestPromise)
                .takeUntil(
                    action$
                        .ofType(actionTypes.TEMPLATE_DELETE)
                        .filter(cancelAction => cancelAction.payload.template.id === template.id),
                )
                .takeUntil(
                    action$
                        .ofType(actionTypes.CONTEXT_UNLOADING)
                        .filter(cancelAction => cancelAction.payload.listId === listId),
                );
        });