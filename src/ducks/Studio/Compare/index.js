import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import Comparable from './Comparable'
import withProjects from './withProjects'
import { projectSorter, hashComparable, buildHiddenMetrics } from './utils'
import { getSyncedColors } from '../../SANCharts/Chart/Synchronizer'
import styles from './index.module.scss'

const Compare = ({
  slug,
  title,
  allProjects,
  comparables,
  activeMetrics,
  className,
  ...rest
}) => {
  const [projects, setProjects] = useState(allProjects)

  useEffect(
    () => {
      setProjects(
        allProjects
          .filter(project => project.slug !== slug)
          .sort(projectSorter)
      )
    },
    [allProjects, slug]
  )

  const array = activeMetrics.length < 5 ? [...comparables, null] : comparables
  const colors = getSyncedColors(activeMetrics)
  const hiddenMetricsMap = buildHiddenMetrics(comparables)
  return (
    <>
      <ContextMenu
        passOpenStateAs='isActive'
        position='bottom'
        align='start'
        trigger={
          <Button border className={cx(styles.btn, className)} classes={styles}>
            <Icon type='compare' className={styles.icon} />
            Compare
          </Button>
        }
      >
        <Panel variant='modal' padding>
          <div>Compare {title} with</div>
          {array.map((comparable, i) => (
            <Comparable
              {...rest}
              {...comparable}
              key={comparable ? hashComparable(comparable) : i}
              projects={projects}
              comparable={comparable}
              colors={colors}
              hiddenMetricsMap={hiddenMetricsMap}
            />
          ))}
        </Panel>
      </ContextMenu>
    </>
  )
}

export default withProjects(Compare)
