// @flow
import * as React from 'react';
import log from 'loglevel';
import { createHashHistory as createHistory } from 'history';
import { useDataEngine } from '@dhis2/app-runtime';
import { LoadingMaskForPage } from 'capture-core/components/LoadingMasks';
import { DisplayException } from 'capture-core/utils/exceptions';
import { environments } from 'capture-core/constants';
import type { HashHistory } from 'history/createHashHistory';
import { initializeAsync } from './init';
import getStore from '../../store/getStore';

type Props = {
    onRunApp: (store: ReduxStore, history: HashHistory) => void,
    onCacheExpired: Function,
};

const AppLoader = (props: Props) => {
    const { onRunApp, onCacheExpired } = props;
    const [loadError, setLoadError] = React.useState(null);
    const dataEngine = useDataEngine();

    const logError = React.useCallback((error) => {
        if (error instanceof Error) {
            log.error(error.toString());
        } else if (error) {
            log.error(JSON.stringify(error));
        }
    }, []);

    const load = React.useCallback(async () => {
        try {
            await initializeAsync(onCacheExpired, dataEngine.query.bind(dataEngine));
            const history = createHistory();
            // $FlowFixMe[incompatible-variance] automated comment
            const store = getStore(history, () => onRunApp(store, history));
        } catch (error) {
            let message = 'The application could not be loaded.';
            if (error && error instanceof DisplayException) {
                logError(error.innerError);
                message += ` ${error.toString()}`;
            } else {
                logError(error);
                if (process.env.NODE_ENV !== environments.prod) {
                    message += ' Please verify that the server is running.';
                } else {
                    message += ' Please see log for details.';
                }
            }
            setLoadError(message);
        }
    }, [
        logError,
        onCacheExpired,
        onRunApp,
        dataEngine,
    ]);

    React.useEffect(() => {
        load();
    }, [
        load,
    ]);

    return loadError || (
        <LoadingMaskForPage />
    );
};

export default AppLoader;