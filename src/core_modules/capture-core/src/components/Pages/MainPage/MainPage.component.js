// @flow
/**
 * @namespace MainPage
*/
import React, { Component } from 'react';

import withLoadHandler from './withLoadHandler';
import EventsList from './EventsList/EventsList.container';
import QuickSelector from '../../QuickSelector/QuickSelector.container';
import TempSelector from './TempSelector.container';

type Props = {
    currentSelectionsComplete: boolean,
};

class MainPage extends Component<Props> {
    render() {
        const { currentSelectionsComplete } = this.props;

        return (
            <div>
                {'{{main menu}}'}
                <TempSelector
                    selectionsCompleted={currentSelectionsComplete}
                />
                {
                    (() => {
                        if (!currentSelectionsComplete) {
                            return null;
                        }

                        return (
                            <EventsList />
                        );
                    })()
                }
            </div>
        );
    }
}

export default withLoadHandler()(MainPage);
