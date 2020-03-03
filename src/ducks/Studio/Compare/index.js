import React, { useState, useEffect } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Input from '@santiment-network/ui/Input'
import Panel from '@santiment-network/ui/Panel'
import ProjectSelector from './ProjectSelector'
import styles from './index.module.scss'
import withProjects from './withProjects'

const projectSorter = ({ rank: a }, { rank: b }) => a - b

const hashComparable = ({ project, metric }) => project.slug + metric.key

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
        align='end'
        trigger={
          <Button border className={styles.btn} classes={styles}>
            <Icon type='compare' className={styles.icon} />
            Compare
          </Button>
        }
      >
        <Panel variant='modal' padding>
          <div>Compare {title} with</div>
          {comparedMetrics.map(comparable => (
            <ProjectSelector
              {...rest}
              key={hashComparable(comparable)}
              projects={projects}
              comparable={comparable}
            />
          ))}

          <ProjectSelector {...rest} projects={projects} />
        </Panel>
      </ContextMenu>
    </>
  )
}

export default withProjects(Compare)
