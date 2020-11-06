import React, { useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import ProjectSelectDialog from '../../Compare/ProjectSelectDialog'
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon'
import styles from './index.module.scss'

const Selector = ({ slug, name, onClick }) => {
  return (
    <div className={styles.selector} onClick={onClick}>
      <ProjectIcon size={20} slug={slug} className={styles.icon} />
      {name}
      <Icon type='arrow-down' className={styles.arrow} />
    </div>
  )
}

const ProjectSelector = ({ settings: { slug, name } }) => {
  const [isOpened, setIsOpened] = useState()

  function closeDialog () {
    setIsOpened(false)
  }

  function openDialog () {
    setIsOpened(true)
  }

  function onProjectSelect (project) {
    // onSlugSelect(project)
    closeDialog()
  }

  return (
    <ProjectSelectDialog
      open={isOpened}
      activeSlug={slug}
      onOpen={openDialog}
      onClose={closeDialog}
      onSelect={onProjectSelect}
      trigger={<Selector slug={slug} name={name} onClick={openDialog} />}
    />
  )
}

export default ProjectSelector
