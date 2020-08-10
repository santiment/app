import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import { ALL_PROJECTS_FOR_SEARCH_QUERY } from '../../../Watchlists/gql/allProjectsGQL'

const GetProjects = ({ render, ...props }) => render(props)

GetProjects.defaultProps = {
  allProjects: [],
  isLoading: false
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})

export default compose(
  connect(mapStateToProps),
  graphql(ALL_PROJECTS_FOR_SEARCH_QUERY, {
    skip: ({ isLoggedIn, skipLoggedInState }) =>
      skipLoggedInState ? false : !isLoggedIn,
    options: () => ({
      context: { isRetriable: true },
      variables: { minVolume: 0 }
    }),
    props: ({ data }) => {
      const projects = data['allProjects'] || []
      return {
        allProjects: [...projects],
        isLoading: data.loading
      }
    }
  })
)(GetProjects)
