import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { track } from 'webkit/analytics'
import { Event } from 'studio/analytics'
import ProjectSelector from '../../ducks/Studio/Sidebar/ProjectSelector'

const Sidebar = ({ studio, settings, onProjectSelect }) => {
  const [target, setTarget] = useState()

  useEffect(
    () => {
      if (!studio) return
      setTarget(document.querySelector('.sidebar-project'))
    },
    [studio]
  )

  function onLockProjectSelect (project) {
    if (project && settings.slug !== project.slug) {
      track.event(Event.ChangeLockAsset, { asset: project.slug })
    }

    onProjectSelect(project)
  }

  return target
    ? ReactDOM.createPortal(
      <ProjectSelector
        project={settings}
        onProjectSelect={onLockProjectSelect}
      />,
      target
    )
    : null
}

export default Sidebar
