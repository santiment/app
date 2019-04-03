import React from 'react'
import ReactTable from 'react-table'
import { graphql } from 'react-apollo'
import getColumns from './gainers-and-losers-table-columns'
import { TOP_SOCIAL_GAINERS_LOSERS_QUERY } from './gainersLosersQuery'
import { getTimeRangeByDuration } from '../../utils/utils'
import 'react-table/react-table.css'

const GainersLosersTable = ({
  isLoading,
  timeWindow,
  topSocialGainersLosers,
  error
}) => (
  <ReactTable
    loading={isLoading}
    showPaginationTop={false}
    showPaginationBottom
    defaultPageSize={10}
    getTheadThProps={() => ({ style: { textAlign: 'center' } })}
    getTrProps={() => ({ style: { textAlign: 'center' } })}
    getTdProps={() => ({
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    })}
    getTbodyProps={() => ({ style: { overflow: 'hidden' } })}
    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
    sortable={false}
    loadingText='Loading...'
    noDataText={error && 'Error fetching data'}
    resizable
    data={topSocialGainersLosers}
    columns={getColumns({ timeWindow })}
  />
)

const withGainersLosers = graphql(TOP_SOCIAL_GAINERS_LOSERS_QUERY, {
  options: ({ status, timeWindow }) => ({
    variables: {
      status,
      size: 10000,
      ...getTimeRangeByDuration(timeWindow)
    }
  }),
  props: ({
    data: { topSocialGainersLosers = [], loading, error },
    ownProps
  }) => {
    let mappedGainersLosers = []

    if (!loading) {
      const { projects } = topSocialGainersLosers.pop() || {}

      mappedGainersLosers =
        ownProps.allProjects && projects
          ? projects.map(projectItem => ({
            ...projectItem,
            name: ownProps.allProjects[projectItem.slug].name
          }))
          : []
    }

    return {
      topSocialGainersLosers: mappedGainersLosers,
      isLoading: loading,
      error: ownProps.error || error
    }
  }
})

export default withGainersLosers(GainersLosersTable)
