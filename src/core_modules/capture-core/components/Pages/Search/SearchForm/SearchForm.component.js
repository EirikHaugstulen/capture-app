// @flow
import React, { useEffect, useMemo, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import i18n from '@dhis2/d2-i18n';
import { Button } from '@dhis2/ui-core';
import Form from '../../../D2Form/D2Form.component';
import { searchScopes } from '../SearchPage.container';
import { Section, SectionHeaderSimple } from '../../../Section';
import type { Props } from './SearchForm.types';
import { searchPageStatus } from '../../../../reducers/descriptions/searchPage.reducerDescription';

const getStyles = (theme: Theme) => ({
    searchDomainSelectorSection: {
        maxWidth: theme.typography.pxToRem(900),
        marginBottom: theme.typography.pxToRem(20),
    },
    searchRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchRowSelectElement: {
        width: '100%',
    },
    searchButtonContainer: {
        padding: theme.typography.pxToRem(10),
        display: 'flex',
        alignItems: 'center',
    },
    textInfo: {
        textAlign: 'right',
        fontSize: '14px',
        flexGrow: 1,
    },
    textError: {
        textAlign: 'right',
        fontSize: theme.typography.pxToRem(14),
        flexGrow: 1,
        color: theme.palette.error.main,
    },
});

const Index = ({
    searchViaUniqueIdOnScopeTrackedEntityType,
    searchViaUniqueIdOnScopeProgram,
    searchViaAttributesOnScopeProgram,
    searchViaAttributesOnScopeTrackedEntityType,
    selectedSearchScopeId,
    classes,
    availableSearchOptions,
    forms,
    searchStatus,
    isSearchViaAttributesValid,
}: Props) => {
    const [error, setError] = useState(false);
    const [expandedFormId, setExpandedFormId] = useState(null);

    // each time the user selects new search scope we want the expanded form id to be initialised
    useEffect(() => {
        setExpandedFormId(null);
    },
    [selectedSearchScopeId],
    );

    const sortedSearchGroup =
      selectedSearchScopeId ?
          availableSearchOptions[selectedSearchScopeId].searchGroups
              .sort(({ unique: xBoolean }, { unique: yBoolean }) => {
                  if (xBoolean === yBoolean) {
                      return 0;
                  }
                  if (xBoolean) {
                      return -1;
                  }
                  return 1;
              })
          :
          [];
    useEffect(() => {
        sortedSearchGroup
            .forEach(({ formId }, index) => {
                if (!expandedFormId && index === 0) {
                    setExpandedFormId(formId);
                }
            });
    }, [sortedSearchGroup, expandedFormId]);

    return useMemo(() => {
        const formReference = {};

        const handleSearchViaUniqueId = (selectedId, formId, searchScope) => {
            const isValid = formReference[formId].validateFormScrollToFirstFailedField({});

            if (isValid) {
                switch (searchScope) {
                case searchScopes.PROGRAM:
                    searchViaUniqueIdOnScopeProgram({ programId: selectedId, formId });
                    break;
                case searchScopes.TRACKED_ENTITY_TYPE:
                    searchViaUniqueIdOnScopeTrackedEntityType({ trackedEntityTypeId: selectedId, formId });
                    break;
                default:
                    break;
                }
            }
        };

        const handleSearchViaAttributes = (selectedId, formId, searchScope, minAttributesRequiredToSearch) => {
            const isValid = isSearchViaAttributesValid(minAttributesRequiredToSearch, formId);

            if (isValid) {
                setError(false);
                switch (searchScope) {
                case searchScopes.PROGRAM:
                    searchViaAttributesOnScopeProgram({ programId: selectedId, formId });
                    break;
                case searchScopes.TRACKED_ENTITY_TYPE:
                    searchViaAttributesOnScopeTrackedEntityType({ trackedEntityTypeId: selectedId, formId });
                    break;
                default:
                    break;
                }
            } else {
                setError(true);
            }
        };

        const FormInformativeMessage = ({ minAttributesRequiredToSearch }) =>
            (<div className={error ? classes.textError : classes.textInfo}>
                Fill in at least {minAttributesRequiredToSearch}  attributes to search
            </div>);
        return (<>
            {
                sortedSearchGroup
                    .filter(searchGroup => searchGroup.unique)
                    .map(({ searchForm, formId, searchScope }) => {
                        const isSearchSectionCollapsed = !(expandedFormId === formId);
                        const name = searchForm.getElements()[0].formName;

                        return (
                            <div key={formId} data-test="dhis2-capture-form-unique">
                                <Section
                                    isCollapsed={isSearchSectionCollapsed}
                                    className={classes.searchDomainSelectorSection}
                                    header={
                                        <SectionHeaderSimple
                                            containerStyle={{ paddingLeft: 8, borderBottom: '1px solid #ECEFF1' }}
                                            title={i18n.t('Search {{name}}', { name })}
                                            onChangeCollapseState={() => { setExpandedFormId(formId); }}
                                            isCollapseButtonEnabled={isSearchSectionCollapsed}
                                            isCollapsed={isSearchSectionCollapsed}
                                        />
                                    }
                                >
                                    <div className={classes.searchRow}>
                                        <div className={classes.searchRowSelectElement}>
                                            {
                                                forms[formId] &&
                                                <Form
                                                    formRef={
                                                        (formInstance) => { formReference[formId] = formInstance; }
                                                    }
                                                    formFoundation={searchForm}
                                                    id={formId}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className={classes.searchButtonContainer}>
                                        <Button
                                            disabled={searchStatus === searchPageStatus.LOADING}
                                            onClick={() =>
                                                selectedSearchScopeId &&
                                            handleSearchViaUniqueId(
                                                selectedSearchScopeId,
                                                formId,
                                                searchScope,
                                            )}
                                        >
                                            Find by {name}.
                                        </Button>
                                    </div>
                                </Section>
                            </div>
                        );
                    })
            }

            {
                sortedSearchGroup
                    .filter(searchGroup => !searchGroup.unique)
                    .map(({ searchForm, formId, searchScope, minAttributesRequiredToSearch }) => {
                        const name = searchForm.getElements()[0].formName;
                        const isSearchSectionCollapsed = !(expandedFormId === formId);

                        return (
                            <div key={formId} data-test="dhis2-capture-form-attributes">
                                <Section
                                    isCollapsed={isSearchSectionCollapsed}
                                    className={classes.searchDomainSelectorSection}
                                    header={
                                        <SectionHeaderSimple
                                            containerStyle={{ paddingLeft: 8, borderBottom: '1px solid #ECEFF1' }}
                                            title={i18n.t('Search {{name}}', { name })}
                                            onChangeCollapseState={() => { setExpandedFormId(formId); }}
                                            isCollapseButtonEnabled={isSearchSectionCollapsed}
                                            isCollapsed={isSearchSectionCollapsed}
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
                                        <Button
                                            disabled={searchStatus === searchPageStatus.LOADING}
                                            onClick={() =>
                                                selectedSearchScopeId &&
                                            handleSearchViaAttributes(
                                                selectedSearchScopeId,
                                                formId,
                                                searchScope,
                                                minAttributesRequiredToSearch,
                                            )
                                            }
                                        >
                                            Search by {name}
                                        </Button>
                                        <FormInformativeMessage
                                            minAttributesRequiredToSearch={minAttributesRequiredToSearch}
                                        />
                                    </div>
                                </Section>
                            </div>

                        );
                    })
            }

        </>);
    },
    [
        classes.searchButtonContainer,
        classes.searchDomainSelectorSection,
        classes.searchRowSelectElement,
        classes.searchRow,
        classes.textInfo,
        classes.textError,
        forms,
        sortedSearchGroup,
        selectedSearchScopeId,
        searchStatus,
        searchViaUniqueIdOnScopeTrackedEntityType,
        searchViaUniqueIdOnScopeProgram,
        searchViaAttributesOnScopeProgram,
        searchViaAttributesOnScopeTrackedEntityType,
        isSearchViaAttributesValid,
        error,
        expandedFormId,
    ]);
};


export const SearchFormComponent = withStyles(getStyles)(Index);