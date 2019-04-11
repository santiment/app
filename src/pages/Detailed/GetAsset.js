import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import moment from 'moment'
import { projectBySlugGQL } from './DetailedGQL'

const GetAsset = ({ render, ...props }) => render({ ...props })

export default graphql(projectBySlugGQL, {
  name: 'Project',
  props: ({ Project }) => {
    const { projectBySlug = {} } = Project
    return {
      isLoading: Project.loading,
      isEmpty: !Project.hasOwnProperty('projectBySlug'),
      isError: Project.error,
      errorMessage: Project.error ? Project.error.message : '',
      project: projectBySlug
    }
  },
  options: ({ slug }) => {
    const to = moment()
      .endOf('day')
      .utc()
      .format()
    const fromOverTime = moment()
      .subtract(2, 'years')
      .utc()
      .format()
    const interval = moment(to).diff(fromOverTime, 'days') > 300 ? '7d' : '1d'
    return {
      variables: {
        slug: slug,
        from: moment()
          .subtract(30, 'days')
          .utc()
          .format(),
        to,
        fromOverTime,
        interval
      }
    }
  }
})(GetAsset)
