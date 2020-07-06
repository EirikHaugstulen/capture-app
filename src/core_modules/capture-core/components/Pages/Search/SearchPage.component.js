// @flow
import React, { useMemo, useState, useEffect } from 'react';
import i18n from '@dhis2/d2-i18n';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { SingleSelect, SingleSelectOption } from '@dhis2/ui-core';
import { LockedSelector } from '../../LockedSelector';
import type { Props } from './SearchPage.types';
import { Section, SectionHeaderSimple } from '../../Section';
import Button from '../../Buttons/Button.component';
import Form from '../../D2Form/D2Form.component';

const getStyles = (theme: Theme) => ({
    divider: {
        padding: '8px',
    },
    container: {
        padding: '10px 24px 24px 24px',
    },
    paper: {
        marginBottom: theme.typography.pxToRem(10),
        padding: theme.typography.pxToRem(10),
    },
    emptySelectionPaperContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 50,
    },
    emptySelectionPaperContainer: {
        padding: 24,
    },
    customEmpty: {
        textAlign: 'center',
        padding: '8px 24px',
    },
    searchDomainSelectorSection: {
        maxWidth: theme.typography.pxToRem(900),
        marginBottom: theme.typography.pxToRem(20),
    },
    searchRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchRowTitle: {
        flexBasis: 200,
        marginLeft: 8,
    },
    searchRowSelectElement: {
        width: '100%',
    },
    searchButtonContainer: {
        padding: theme.typography.pxToRem(10),
        display: 'flex',
        alignItems: 'center',
    },
});


const Index = ({
    classes,
    trackedEntityTypesWithCorrelatedPrograms,
    preselectedProgram,
    availableSearchOptions,
    addFormIdToReduxStore,
    forms,
}: Props) => {
    const [selectedOption, setSelected] = useState(preselectedProgram);

    // dan abramov suggest to stringify https://twitter.com/dan_abramov/status/1104414469629898754?lang=en
    // so that useEffect can do the comparison
    const stringifyPrograms = JSON.stringify(availableSearchOptions);
    useEffect(() => {
        // in order for the Form component to render
        // need to add a formId under the `forms` reducer
        selectedOption.value &&
          JSON.parse(stringifyPrograms)[selectedOption.value].searchGroups
              .forEach(({ formId }) => {
                  addFormIdToReduxStore(formId);
              });
    },
    [
        stringifyPrograms,
        selectedOption.value,
        addFormIdToReduxStore,
    ]);


    return (<>
        <LockedSelector />
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Section
                    className={classes.searchDomainSelectorSection}
                    header={
                        <SectionHeaderSimple
                            containerStyle={{ paddingLeft: 8, borderBottom: '1px solid #ECEFF1' }}
                            title={i18n.t('Search')}
                        />
                    }
                >
                    <div className={classes.searchRow} style={{ padding: '8px 0' }}>
                        <div className={classes.searchRowTitle}>Search for</div>
                        <div className={classes.searchRowSelectElement} style={{ marginRight: 8 }}>
                            <SingleSelect
                                onChange={({ selected }) => { setSelected(selected); }}
                                selected={selectedOption}
                                empty={<div className={classes.customEmpty}>Custom empty component</div>}
                            >
                                {
                                    useMemo(() => Object.values(trackedEntityTypesWithCorrelatedPrograms)
                                        // $FlowFixMe https://github.com/facebook/flow/issues/2221
                                        .map(({ trackedEntityTypeName, trackedEntityTypeId, programs: tePrograms }) =>
                                            // SingleSelect component wont allow us to wrap the SingleSelectOption
                                            // in any other element and still make use of the default behaviour.
                                            // Therefore we are returning the group title and the
                                            // SingleSelectOption in an array.
                                            [
                                                <SingleSelectOption
                                                    value={trackedEntityTypeId}
                                                    label={trackedEntityTypeName}
                                                />,
                                                tePrograms.map(({ programName, programId }) =>
                                                    (<SingleSelectOption value={programId} label={programName} />)),
                                                <div className={classes.divider} key={trackedEntityTypeId}>
                                                    <hr />
                                                </div>,
                                            ],
                                        ),
                                    [
                                        classes.divider,
                                        trackedEntityTypesWithCorrelatedPrograms,
                                    ])
                                }
                            </SingleSelect>
                        </div>
                    </div>
                </Section>

                {
                    selectedOption.value && availableSearchOptions[selectedOption.value].searchGroups
                        .filter(searchGroup => searchGroup.unique)
                        .map(({ searchForm, formId }) => {
                            const name = searchForm.getElements()[0].formName;
                            return (
                                <Section
                                    className={classes.searchDomainSelectorSection}
                                    header={
                                        <SectionHeaderSimple
                                            containerStyle={{ paddingLeft: 8, borderBottom: '1px solid #ECEFF1' }}
                                            title={i18n.t('Search {{name}}', { name })}
                                        />
                                    }
                                >
                                    <div className={classes.searchRow}>
                                        <div className={classes.searchRowSelectElement}>
                                            {
                                                forms[formId] &&
                                                <Form
                                                    formFoundation={searchForm}
                                                    id={formId}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className={classes.searchButtonContainer}>
                                        <Button onClick={() => {}}>
                                            Find by {name}
                                        </Button>
                                    </div>
                                </Section>
                            );
                        })
                }
            </Paper>

            {
                !selectedOption.value &&
                    <Paper elevation={0}>
                        <div className={classes.emptySelectionPaperContent}>
                            {i18n.t('Make a selection to start searching')}
                        </div>
                    </Paper>
            }

        </div>
    </>);
};

export const SearchPage = withStyles(getStyles)(Index);
