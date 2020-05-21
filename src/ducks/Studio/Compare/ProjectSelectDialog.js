import React, { useState, useEffect } from 'react'
import Search from '@santiment-network/ui/Search'
import Dialog from '@santiment-network/ui/Dialog'
import Projects from './Projects'
import styles from './ProjectSelectDialog.module.scss'
import ProjectsSelectTabs from './ProjectSelectTabs'
import { assetsSorter } from '../../../components/Search/SearchProjects'

const ProjectSelectDialog = ({
  activeSlug,
  projects,
  open,
  onSelect,
  onClose,
  ...rest
}) => {
  const [allProjects, setAllProjects] = useState(projects)
  const [searchedProjects, setSearchedProjects] = useState(allProjects)
  const [lastSearchTerm, setLastSearchTerm] = useState('')

  useEffect(
    () => {
      if (!open) {
        setSearchedProjects(allProjects)
      }
    },
    [open]
  )

  useEffect(
    () => {
      searchProjects(lastSearchTerm)
    },
    [allProjects]
  )

  function searchProjects (searchTerm) {
    const lowerCase = searchTerm.toLowerCase()

    setSearchedProjects(
      allProjects
        .filter(
          ({ ticker, name }) =>
            name.toLowerCase().includes(lowerCase) ||
            ticker.toLowerCase().includes(lowerCase)
        )
        .sort(assetsSorter(searchTerm))
    )
    setLastSearchTerm(searchTerm)
  }

  function onDialogClose () {
    setSearchedProjects(allProjects)
    if (onClose) {
      onClose()
    }
  }

  function onTabSelect (projects, isLoading) {
    if (!projects || isLoading) return
    setAllProjects(projects.filter(({ slug }) => slug !== activeSlug))
  }

  return (
    <Dialog
      title='Select project'
      onClose={onDialogClose}
      open={open}
      {...rest}
    >
      <div className={styles.wrapper}>
        <Search className={styles.search} onChange={searchProjects} autoFocus />
        <ProjectsSelectTabs
          {...rest}
          onSelect={onTabSelect}
          className={styles.tabs}
        />
        <Projects
          projects={searchedProjects}
          onSelect={onSelect}
          className={styles.projects}
        />
      </div>
    </Dialog>
  )
}

ProjectSelectDialog.defaultProps = {
  projects: []
}

export default ProjectSelectDialog
