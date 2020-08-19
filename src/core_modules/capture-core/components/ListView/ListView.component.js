// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withFilterSelectors } from './FilterSelectors/withFilterSelectors';
import { ListPagination } from './Pagination';
import { ColumnSelector } from './ColumnSelector';
import { withEndColumnMenu } from './withEndColumnMenu';
import DialogLoadingMask from '../LoadingMasks/DialogLoadingMask.component';
import { OnlineList } from '../List';
import { MoreMenu } from './MoreMenu';

import type { Column } from './types';

const ListWithEndColumnMenu = withEndColumnMenu()(OnlineList);

const getStyles = (theme: Theme) => ({
    container: {
    },
    topBarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.typography.pxToRem(8),
    },
    topBarLeftContainer: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    topBarButtonContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    paginationContainer: {
        fontSize: theme.typography.pxToRem(12),
        color: theme.palette.text.secondary,
        // $FlowFixMe
        fontWeight: theme.typography.fontWeightMedium,
        display: 'flex',
        justifyContent: 'flex-end',
    },
});

type Props = {
    listId: string,
    dataSource: Array<{eventId: string, [elementId: string]: any}>,
    columns: Array<Column>,
    classes: Object,
    filterButtons: React.Node,
    isUpdatingWithDialog?: ?boolean,
    onSetColumnOrder: Function,
    rowIdKey: string,
    customMenuContents?: ?Array<Object>,
};

class Index extends React.Component<Props> {
    handleSaveColumnOrder = (columnOrder: Array<Object>) => {
        this.props.onSetColumnOrder(this.props.listId, columnOrder);
    }

    renderTopBar = () => {
        const { classes, filterButtons, columns, listId, customMenuContents } = this.props;
        return (
            <div
                className={classes.topBarContainer}
            >
                <div
                    className={classes.topBarLeftContainer}
                >
                    {filterButtons}
                </div>
                <div
                    className={classes.topBarButtonContainer}
                >
                    <ColumnSelector
                        onSave={this.handleSaveColumnOrder}
                        columns={columns}
                    />
                    <MoreMenu
                        listId={listId}
                        customMenuContents={customMenuContents}
                    />
                </div>
            </div>
        );
    }

    renderPager = () => {
        const classes = this.props.classes;
        return (
            <div
                className={classes.paginationContainer}
            >
                <ListPagination
                    listId={this.props.listId}
                />
            </div>
        );
    }

    renderList = () => {
        const {
            classes,
            filterButtons,
            isUpdatingWithDialog,
            ...passOnProps
        } = this.props;
        return (
            <ListWithEndColumnMenu
                {...passOnProps}
            />
        );
    }

    render() {
        const { classes, isUpdatingWithDialog } = this.props; //eslint-disable-line

        return (
            <div
                className={classes.container}
            >
                {this.renderTopBar()}
                {this.renderList()}
                {this.renderPager()}
                {this.props.isUpdatingWithDialog && <DialogLoadingMask />}
            </div>
        );
    }
}

export const ListView = withFilterSelectors()(withStyles(getStyles)(Index));
