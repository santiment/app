import { graphql } from 'react-apollo'
import { projectBySlugGQL } from './DetailedGQL'
import { getTimeIntervalFromToday } from '../../../utils/dates'

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
    const { from: fromOverTime, to } = getTimeIntervalFromToday(-12 * 5, 'm')
    const { from } = getTimeIntervalFromToday(-1, 'm')
    return {
      variables: { slug, from, to, fromOverTime, interval: '7d' }
    }
  }
})(GetAsset)
