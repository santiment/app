import React, { useState, useEffect } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import Comparable from './Comparable'
import styles from './index.module.scss'
import withProjects from './withProjects'
import { projectSorter, hashComparable } from './utils'

const Compare = ({ slug, title, allProjects, comparedMetrics, ...rest }) => {
  const [projects, setProjects] = useState(allProjects)

  useEffect(
    () => {
      setProjects(
        allProjects
          .filter(project => project.slug !== slug)
          .sort(projectSorter)
      )
    },
    [allProjects]
  )

  return (
    <>
      <ContextMenu
        passOpenStateAs='isActive'
        position='bottom'
        align='start'
        trigger={
          <Button border className={styles.btn} classes={styles}>
            <Icon type='compare' className={styles.icon} />
            Compare
          </Button>
        }
      >
        <Panel variant='modal' padding>
          <div>Compare {title} with</div>
          {[...comparedMetrics, null].map((comparable, i) => (
            <Comparable
              {...rest}
              {...comparable}
              key={comparable ? hashComparable(comparable) : i}
              projects={projects}
              comparable={comparable}
            />
          ))}
        </Panel>
      </ContextMenu>
    </>
  )
}

export default withProjects(Compare)
