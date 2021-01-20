import React, { useState, useEffect } from 'react'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ComparableMetric from './Metric'
import {
  buildCompareKey,
  getProjectHiddenMetrics,
  makeComparableObject
} from '../utils'
import ProjectSelectDialog from '../ProjectSelectDialog'
import { DEFAULT_TABS } from '../ProjectSelectTabs'
import { FIAT_MARKET_ASSETS } from '../../../dataHub/fiat'
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon'
import styles from './index.module.scss'

const CUSTOM_CATEGORY = {
  Fiat: () => Promise.resolve(FIAT_MARKET_ASSETS)
}

const CUSTOM_TABS = DEFAULT_TABS.concat(Object.keys(CUSTOM_CATEGORY))

const CategoryModifier = {
  All: assets => assets.concat(FIAT_MARKET_ASSETS)
}

export default ({
  comparable,
  project,
  metric,
  projects,
  colors,
  hiddenMetricsMap,
  setComparables,
  activeSlug,
  ...rest
}) => {
  const [selectedProject, setSelectedProject] = useState(project || projects[0])
  const [selectedMetric, setSelectedMetric] = useState(metric)
  const [opened, setOpened] = useState()

  const { slug, ticker, logoUrl } = selectedProject || {}

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
          makeComparableObject({
            metric: selectedMetric,
            project: selectedProject
          })
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
            <ProjectIcon
              className={styles.icon}
              size={16}
              slug={slug}
              logoUrl={logoUrl}
            />
            {ticker}
            <Icon type='arrow-down' className={styles.arrow} />
          </Button>
        }
        open={opened}
        activeSlug={activeSlug}
        projects={projects}
        customTabs={CUSTOM_TABS}
        CustomCategory={CUSTOM_CATEGORY}
        CategoryModifier={CategoryModifier}
        onOpen={openDialog}
        onClose={closeDialog}
        onSelect={selectProject}
      />
      <ComparableMetric
        {...rest}
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
          type='close-medium'
          className={styles.remove}
          onClick={removeComparable}
        />
      )}
    </div>
  )
}
