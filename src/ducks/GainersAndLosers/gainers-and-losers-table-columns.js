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
    accessor: ({ slug, name }) => ({
      ticker: slug,
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
      <GainersLosersGraph slug={original.slug} timeWindow={timeWindow} />
    )
  }
]

export default getColumns
