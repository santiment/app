import React, { useMemo } from 'react'
import cx from 'classnames'
import {
  EXCHANGE_INTERESTS,
  EXCHANGES_DEFAULT_SETTINGS,
  useFlowToExchanges
} from './utils'
import { useProject } from '../../../hooks/project'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import Skeleton from '../../../components/Skeleton/Skeleton'
import { formatNumber } from '../../../utils/formatting'
import styles from './FlowToExchanges.module.scss'

const getFirstNotNull = data => data.find(({ value }) => value !== 0) || {}

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

  const status = useMemo(
    () => {
      if (data.length > 2) {
        const { value: first = 0 } = getFirstNotNull(data)
        const { value: second } = getFirstNotNull([...data].reverse())

        if (first === 0 || second === 0) {
          return EXCHANGE_INTERESTS.low
        }

        const relation = second / first

        if (relation < 1) {
          return EXCHANGE_INTERESTS.low
        } else if (relation >= 1 && relation <= 2) {
          return EXCHANGE_INTERESTS.normal
        } else {
          return EXCHANGE_INTERESTS.high
        }
      } else {
        return EXCHANGE_INTERESTS.normal
      }
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
            {formatNumber(sum)} {project.ticker}
          </div>
          <div
            className={cx(
              styles.status,
              status === EXCHANGE_INTERESTS.high && styles.high,
              status === EXCHANGE_INTERESTS.normal && styles.normal,
              status === EXCHANGE_INTERESTS.low && styles.low
            )}
          >
            {status}
          </div>
        </div>
      )}

      <Skeleton className={styles.skeleton} show={loading} repeat={1} />
    </div>
  )
}

export default FlowToExchanges
