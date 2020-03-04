import React, { useState, useEffect } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ComparableMetric from './Metric'
import { buildCompareKey, getProjectHiddenMetrics } from '../utils'
import ProjectSelectDialog from '../ProjectSelectDialog'
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon'
import styles from './index.module.scss'

export default ({
  comparable,
  project,
  metric,
  projects,
  colors,
  hiddenMetricsMap,
  setComparables
}) => {
  const [selectedProject, setSelectedProject] = useState(project || projects[0])
  const [selectedMetric, setSelectedMetric] = useState(metric)
  const [opened, setOpened] = useState()

  const { slug, ticker } = selectedProject

  useEffect(
    () => {
      if (comparable) {
        comparable.key = buildCompareKey(selectedMetric, selectedProject)
        comparable.metric = selectedMetric
        comparable.project = selectedProject

        return setComparables(state => state.slice())
      }

      return (
        selectedMetric &&
        setComparables(state => [
          ...state,
          {
            key: buildCompareKey(selectedMetric, selectedProject),
            metric: selectedMetric,
            project: selectedProject
          }
        ])
      )
    },
    [selectedProject, selectedMetric]
  )

  function selectProject (project) {
    setSelectedProject(project)
    closeDialog()
  }

  function removeComparable () {
    setComparables(state => state.filter(comp => comp !== comparable))
  }

  function closeDialog () {
    setOpened(false)
  }

  function openDialog () {
    setOpened(true)
  }

  return (
    <div className={styles.row}>
      <ProjectSelectDialog
        trigger={
          <Button border>
            <ProjectIcon className={styles.icon} size={16} slug={slug} />
            {ticker}
            <Icon type='arrow-down' className={styles.arrow} />
          </Button>
        }
        open={opened}
        projects={projects}
        onOpen={openDialog}
        onClose={closeDialog}
        onSelect={selectProject}
      />
      <ComparableMetric
        comparable={comparable}
        slug={slug}
        colors={colors}
        hiddenMetrics={getProjectHiddenMetrics(
          hiddenMetricsMap,
          selectedProject
        )}
        onSelect={setSelectedMetric}
      />
      {comparable && (
        <Icon
          type='close'
          className={styles.remove}
          onClick={removeComparable}
        />
      )}
    </div>
  )
}
