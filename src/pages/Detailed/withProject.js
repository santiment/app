import { graphql } from 'react-apollo'
import { projectBySlugGQL } from '../Detailed/gqlWrappers/DetailedGQL'
import { getTimeIntervalFromToday, MONTH } from '../../utils/dates'

export default graphql(projectBySlugGQL, {
  props: ({ data: { projectBySlug: project = {}, loading, error } }) => {
    const { mainContractAddress, infrastructure } = project
    const isERC20 = mainContractAddress && infrastructure === 'ETH'

    return {
      project,
      isERC20,
      loading,
      error
    }
  },
  options: ({ slug }) => {
    const { from: fromOverTime, to } = getTimeIntervalFromToday(-24, MONTH)
    const { from } = getTimeIntervalFromToday(-1, MONTH)

    return {
      variables: {
        slug,
        from: from.toISOString(),
        to: to.toISOString(),
        fromOverTime: fromOverTime.toISOString(),
        interval: '7d'
      }
    }
  },
  skip: ({ slug }) => !slug
})
