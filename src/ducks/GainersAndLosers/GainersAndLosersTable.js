import React from 'react'
import ReactTable, { ReactTableDefaults } from 'react-table'
import { graphql } from 'react-apollo'
import getColumns from './gainers-and-losers-table-columns'
import { TOP_SOCIAL_GAINERS_LOSERS_QUERY } from './gainersLosersQuery'
import { getTimeRangeByDuration } from '../../utils/utils'
import 'react-table/react-table.css'

const defaultTableProps = {
  ...ReactTableDefaults,
  showPaginationTop: false,
  showPaginationBottom: true,
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  sortable: false,
  loadingText: 'Loading...',
  resizable: true,
  getTheadThProps: () => ({ style: { textAlign: 'center' } }),
  getTrProps: () => ({ style: { textAlign: 'center' } }),
  getTbodyProps: () => ({ style: { overflow: 'hidden' } }),
  getTdProps: () => ({
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}

const GainersLosersTable = ({
  isLoading,
  timeWindow,
  topSocialGainersLosers,
  isError
}) => (
  <ReactTable
    {...defaultTableProps}
    loading={isLoading}
    noDataText={isError && 'Error fetching data'}
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
          ? projects
            .filter(({ slug }) => ownProps.allProjects[slug])
            .map(project => ({
              ...project,
              ticker: ownProps.allProjects[project.slug].ticker,
              name: ownProps.allProjects[project.slug].name
            }))
          : []
    }

    return {
      topSocialGainersLosers: mappedGainersLosers,
      isLoading: loading,
      isError: ownProps.error || error
    }
  }
})

export default withGainersLosers(GainersLosersTable)
