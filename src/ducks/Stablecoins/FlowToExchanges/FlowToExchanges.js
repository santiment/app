import React, { useMemo } from 'react'
import { EXCHANGES_DEFAULT_SETTINGS, useFlowToExchanges } from './utils'
import { useProject } from '../../../hooks/project'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import Skeleton from '../../../components/Skeleton/Skeleton'
import { millify } from '../../../utils/formatting'
import styles from './FlowToExchanges.module.scss'

const FlowToExchanges = ({ item: { slug } }) => {
  const { data, loading } = useFlowToExchanges({
    slug,
    ...EXCHANGES_DEFAULT_SETTINGS
  })

  const [project = {}] = useProject(slug)

  const sum = useMemo(
    () => {
      return data.reduce((acc, val) => {
        return acc + val.value
      }, 0)
    },
    [data]
  )

  return (
    <div className={styles.container}>
      {!loading && (
        <div className={styles.title}>
          <ProjectIcon size={36} slug={slug} />
          <div className={styles.name}>{project.name}</div>
          <div className={styles.value}>
            {millify(sum)} {project.ticker}
          </div>
        </div>
      )}

      <Skeleton className={styles.skeleton} show={loading} repeat={1} />
    </div>
  )
}

export default FlowToExchanges
