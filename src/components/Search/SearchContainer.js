import React, { Fragment } from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { SearchWithSuggestions, Button } from '@santiment-network/ui'
import { allProjectsForSearchGQL } from '../../pages/Projects/allProjectsGQL'
import ProjectIcon from '../ProjectIcon'
import styles from './SearchContainer.module.scss'

export const NavbarAssetsSearch = ({ history, data: { allProjects = [] } }) => {
  console.log(allProjects)
  return (
    <SearchWithSuggestions
      className={styles.wrapper}
      iconPosition='left'
      onSuggestionSelect={({ coinmarketcapId }) =>
        history.push(`/projects/${coinmarketcapId}`)
      }
      data={allProjects}
      predicate={searchTerm => {
        const upperCaseSearchTerm = searchTerm.toUpperCase()
        return ({ ticker, name }) =>
          name.toUpperCase().includes(upperCaseSearchTerm) ||
          ticker.toUpperCase().includes(upperCaseSearchTerm)
      }}
      suggestionContent={({ name, ticker }) => {
        return (
          <Fragment>
            <ProjectIcon
              className={styles.icon}
              size={16}
              ticker={ticker}
              name={name}
            />{' '}
            {name} ({ticker})
          </Fragment>
        )
      }}
      // className={styles.search}
    />
  )
}

const enhance = compose(
  graphql(allProjectsForSearchGQL),
  withRouter
)

export default enhance(NavbarAssetsSearch)

/* import React from 'react' */
/* import { push } from 'react-router-redux' */
/* import { connect } from 'react-redux' */
/* import { graphql } from 'react-apollo' */
/* import { compose } from 'recompose' */
/* import { allProjectsForSearchGQL } from './../../pages/Projects/allProjectsGQL' */
/* import { getAll } from './../../pages/Projects/projectSelectors' */
/* import * as actions from './../../actions/types' */
/* import Search from './Search' */
/*  */
/* const SearchContainer = ({ projects = [], isFocused, resetFocus, goto }) => { */
/* if (projects.length === 0) { */
/* return <Search loading /> */
/* } */
/* return ( */
/* <Search */
/* onSelectProject={cmcId => goto(cmcId)} */
/* focus={isFocused} */
/* resetFocus={resetFocus} */
/* projects={projects} */
/* /> */
/* ) */
/* } */
/*  */
/* const mapDataToProps = ({ allProjects }) => ({ */
/* projects: getAll(allProjects.allProjects) */
/* }) */
/*  */
/* const mapStateToProps = ({ rootUi }) => ({ */
/* isFocused: rootUi.isSearchInputFocused */
/* }) */
/*  */
/* const mapDispatchToProps = dispatch => ({ */
/* resetFocus: () => dispatch({ type: actions.APP_TOGGLE_SEARCH_FOCUS }), */
/* goto: cmcId => dispatch(push(`/projects/${cmcId}`)) */
/* }) */
/*  */

/* const enhance = compose( */
/* connect( */
/* mapStateToProps, */
/* mapDispatchToProps */
/* ), */
/* graphql(allProjectsForSearchGQL, { */
/* name: 'allProjects', */
/* props: mapDataToProps, */
/* options: () => ({ */
/* context: { isRetriable: true } */
/* }) */
/* }) */
/* ) */
/*  */
/* export default enhance(SearchContainer) */
