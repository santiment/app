import React from 'react'
import ReactTable from 'react-table'
import moment from 'moment'
import { graphql } from 'react-apollo'
import getColumns from './gainers-and-losers-table-columns'
import { TOP_SOCIAL_GAINERS_LOSERS_GQL } from './gainersLosersGQL'
import { getTimeRangeByDuration } from '../../utils/utils'
import 'react-table/react-table.css'

const GainersLosersTable = ({
  isLoading,
  timeWindow,
  topSocialGainersLosers
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
    resizable
    data={topSocialGainersLosers}
    columns={getColumns({ timeWindow })}
  />
)

const withApollo = graphql(TOP_SOCIAL_GAINERS_LOSERS_GQL, {
  options: ({ status, timeWindow }) => ({
    variables: {
      status,
      size: 10000,
      ...getTimeRangeByDuration(timeWindow)
    }
  }),
  props: ({ data: { topSocialGainersLosers = [] } }) => {
    const topGainersDatetime = (topSocialGainersLosers || []).map(
      ({ datetime }) => moment(datetime)
    )
    const recentRecordTime = moment.max(topGainersDatetime)
    const { projects } =
      (topSocialGainersLosers || []).find(({ datetime }) =>
        moment(datetime).isSame(recentRecordTime)
      ) || {}

    return {
      topSocialGainersLosers: projects
    }
  }
})

export default withApollo(GainersLosersTable)
