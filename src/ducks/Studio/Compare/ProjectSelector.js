import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import SearchInput from '@santiment-network/ui/Search'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import Projects from './Projects'
import styles from './Projects.module.scss'
import Search, { getMetricSuggestions } from '../Sidebar/Search'
import withMetrics from '../withMetrics'
import MetricIcon from '../../SANCharts/MetricIcon'

const MetricSearch = withMetrics(
  ({ categories, loading, className, ...rest }) => (
    <Search
      {...rest}
      className={cx(className, loading && styles.loading)}
      categories={categories}
      emptySuggestions={getMetricSuggestions(categories)}
      inputProps={{
        placeholder: 'Type to search metrics...'
      }}
    />
  )
)

export default ({ comparable, projects, setComparedMetrics }) => {
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [searchedProjects, setSearchedProjects] = useState(projects)
  const [opened, setOpened] = useState()
  const [isEditing, setEditing] = useState()
  const metricSelectorRef = useRef(null)

  const { slug, ticker } = selectedProject

  useEffect(
    () => {
      if (isEditing) {
      }
    },
    [isEditing]
  )

  function searchProjects (searchTerm) {
    const lowerCase = searchTerm.toLowerCase()

    setSearchedProjects(
      projects.filter(
        ({ ticker, name }) =>
          name.toLowerCase().includes(lowerCase) ||
          ticker.toLowerCase().includes(lowerCase)
      )
    )
  }

  function closeDialog () {
    setOpened(false)
  }

  function openDialog () {
    setOpened(true)
  }

  function selectProject (project) {
    setSelectedProject(project)
    closeDialog()
  }

  function onMetricSelect (metric) {
    if (comparable) {
      setEditing()
      comparable.metric = metric
      return setComparedMetrics(state => state.slice())
    }

    setComparedMetrics(state => [
      ...state,
      {
        metric,
        project: selectedProject
      }
    ])
  }

  function editMetric () {
    setEditing(true)
    metricSelectorRef.current.firstElementChild.firstElementChild.focus()
  }

  function stopEditing () {
    setEditing()
  }

  return (
    <div className={styles.row}>
      <ContextMenu
        open={opened}
        onClose={closeDialog}
        onOpen={openDialog}
        passOpenStateAs='isActive'
        position='bottom'
        align='start'
        trigger={
          <Button border classes={styles}>
            <ProjectIcon className={styles.icon} size={16} slug={slug} />
            {ticker}
            <Icon type='arrow-down' className={styles.arrow} />
          </Button>
        }
      >
        <Panel className={styles.panel}>
          <SearchInput
            className={styles.search}
            onChange={searchProjects}
            autoFocus
          />
          <Projects projects={searchedProjects} onSelect={selectProject} />
        </Panel>
      </ContextMenu>
      <div className={styles.metric} ref={metricSelectorRef}>
        <MetricSearch
          slug={slug}
          toggleMetric={onMetricSelect}
          onBlur={stopEditing}
        />
        {!isEditing && comparable && (
          <div className={styles.selected}>
            <MetricIcon
              node={comparable.metric.node}
              // color={colors[dataKey]}
              className={styles.label}
            />
            {comparable.metric.label}
            <Icon type='edit' className={styles.edit} onClick={editMetric} />
          </div>
        )}
      </div>
    </div>
  )
}
