import React from 'react'
import GainersLosersGraph from './GainersLosersGraph'

const getColumns = ({ timeWindow }) => [
  {
    Header: 'Project',
    id: 'project',
    sortable: true,
    minWidth: 200,
    maxWidth: 300,
    accessor: 'project'
  },
  {
    Header: 'Change',
    id: 'change',
    sortable: true,
    maxWidth: 100,
    accessor: 'change',
    getProps: (state, rowInfo) => ({
      style: {
        color: rowInfo && rowInfo.row.change >= 0 ? 'green' : 'red'
      }
    })
  },
  {
    Header: 'Graph',
    id: 'status',
    minWidth: 320,
    Cell: ({ original }) => (
      <GainersLosersGraph slug={original.project} timeWindow={timeWindow} />
    )
  }
]

export default getColumns
