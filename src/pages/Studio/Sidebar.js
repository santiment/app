import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { track } from 'webkit/analytics'
import { Event } from 'studio/analytics'
import { newProjectMetric } from 'studio/metrics/utils'
import { useLockedAsset, useLockedAssetStore } from './stores'
import ProjectSelector from '../../ducks/Studio/Sidebar/ProjectSelector'

const Sidebar = ({ studio, settings, selectMetricRef }) => {
  const LockedAsset = useLockedAssetStore(studio)
  const lockedAsset = useLockedAsset(LockedAsset)
  const [target, setTarget] = useState()

  useEffect(
    () => {
      if (!studio) return
      setTarget(document.querySelector('.sidebar-project'))
    },
    [studio]
  )

  selectMetricRef.current = node => {
    if (lockedAsset.slug === settings.slug || node.noProject) return node

    return newProjectMetric(lockedAsset, node)
  }

  function onLockProjectSelect (project) {
    if (project && settings.slug !== project.slug) {
      track.event(Event.ChangeLockAsset, { asset: project.slug })
    }
    LockedAsset.set(project)
  }

  return target
    ? ReactDOM.createPortal(
      <ProjectSelector
        project={lockedAsset}
        onProjectSelect={onLockProjectSelect}
      />,
      target
    )
    : null
}

export default Sidebar
