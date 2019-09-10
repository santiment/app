import React from 'react'
import { Link } from 'react-router-dom'
import GainersLosersGraph from './GainersLosersGraph'
import ProjectLabel from '../../components/ProjectLabel'
import PercentChanges from '../../components/PercentChanges'
import styles from './GainersAndLosersPage.module.scss'

const getColumns = ({ timeWindow }) => [
  {
    Header: 'Project',
    id: 'project',
    sortable: true,
    minWidth: 300,
    maxWidth: 450,
    accessor: ({ ticker, name, slug }) => ({ ticker, name, slug }),
    sortMethod: (previous, next) =>
      previous.name.toLowerCase() <= next.name.toLowerCase() ? 1 : -1,
    Cell: ({ value }) => (
      <Link className={styles.wrapper} to={`/projects/${value.slug}`}>
        <ProjectLabel {...value} />
      </Link>
    )
  },
  {
    Header: 'Change',
    id: 'change',
    sortable: true,
    maxWidth: 100,
    accessor: 'change',
    Cell: ({ value }) =>
      value ? <PercentChanges changes={value * 100} /> : 'No data'
  },
  {
    Header: '',
    id: 'status',
    minWidth: 320,
    Cell: ({ original }) => (
      <GainersLosersGraph slug={original.slug} timeWindow={timeWindow} />
    )
  }
]

export default getColumns
