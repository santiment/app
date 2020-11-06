import React, { useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import ProjectSelectDialog from '../../Compare/ProjectSelectDialog'
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon'
import styles from './index.module.scss'

const Selector = ({ slug, name, onClick }) => (
  <div className={styles.selector} onClick={onClick}>
    <ProjectIcon size={20} slug={slug} className={styles.icon} />
    {name}
    <Icon type='arrow-down' className={styles.arrow} />
  </div>
)

const ProjectSelector = ({ project: { slug, name }, onProjectSelect }) => {
  const [isOpened, setIsOpened] = useState()

  function closeDialog () {
    setIsOpened(false)
  }

  function openDialog () {
    setIsOpened(true)
  }

  function onSelect (project) {
    onProjectSelect(project)
    closeDialog()
  }

  return (
    <ProjectSelectDialog
      open={isOpened}
      activeSlug={slug}
      onOpen={openDialog}
      onClose={closeDialog}
      onSelect={onSelect}
      trigger={<Selector slug={slug} name={name} onClick={openDialog} />}
    />
  )
}

export default ProjectSelector
