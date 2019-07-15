import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'

const GetProjects = ({ render, ...props }) => render(props)

GetProjects.defaultProps = {
  allProjects: [],
  isLoading: false
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})

const getEnhancedProjects = ({ query, name, requiresAuth = false }) =>
  compose(
    connect(mapStateToProps),
    graphql(query, {
      skip: ({ isLoggedIn }) => requiresAuth && !isLoggedIn,
      options: () => ({
        context: { isRetriable: true }
      }),
      props: ({ data }) => {
        const projects = data[name] || []
        return {
          allProjects: [...projects],
          isLoading: data.loading
        }
      }
    })
  )(GetProjects)

export default getEnhancedProjects
