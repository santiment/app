import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import StudioInfo from '../../ducks/SANCharts/Header'
import Tabs from '../../ducks/Studio/Tabs'
import styles from './index.module.scss'

const ProjectInfo = ({ studio, settings, onProjectSelect }) => {
  const [target, setTarget] = useState()

  useEffect(
    () => {
      if (!studio) return

      const target = document.querySelector('.studio-top')
      target.classList.add(styles.project)
      setTarget(target)
    },
    [studio]
  )

  return target
    ? ReactDOM.createPortal(
        <>
          <StudioInfo slug={settings.slug} onSlugSelect={onProjectSelect} />
          <Tabs className={styles.tabs} settings={settings} />
        </>,
        target
    )
    : null
}

export default ProjectInfo
