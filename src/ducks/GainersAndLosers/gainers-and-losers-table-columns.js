import React from 'react'
import GainersLosersGraph from './GainersLosersGraph'
import ProjectLabel from '../../components/ProjectLabel'
import PercentChanges from '../../components/PercentChanges'

const getColumns = ({ timeWindow }) => [
  {
    Header: 'Project',
    id: 'project',
    sortable: true,
    minWidth: 300,
    accessor: ({ project, name }) => ({
      ticker: project,
      name
    }),
    Cell: ({ value }) => <ProjectLabel {...value} />
  },
  {
    Header: 'Change',
    id: 'change',
    sortable: true,
    maxWidth: 100,
    accessor: 'change',
    Cell: ({ value }) =>
      value ? <PercentChanges changes={value} /> : 'No data'
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
