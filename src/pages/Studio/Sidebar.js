import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { track } from 'webkit/analytics'
import { Event } from 'studio/analytics'
import { newProjectMetric, newAddressMetric } from 'studio/metrics/utils'
import { useLockedAsset, useLockedAssetStore } from './stores'
import ProjectSelector from '../../ducks/Studio/Sidebar/ProjectSelector'

const Sidebar = ({ studio, settings, selectMetricRef, onSidebarProjectMountRef }) => {
  const LockedAsset = useLockedAssetStore(studio)
  const lockedAsset = useLockedAsset(LockedAsset)
  const [target, setTarget] = useState()

  onSidebarProjectMountRef.current = setTarget

  selectMetricRef.current = (node) => {
    if (node.noProject) return node

    const { slug, address } = lockedAsset

    if (address) {
      if (address === settings.address) return node
      return newAddressMetric(address, node)
    }

    if (!settings.address && slug === settings.slug) return node
    return newProjectMetric(lockedAsset, node)
  }

  function onLockProjectSelect(project) {
    if (project && settings.slug !== project.slug) {
      track.event(Event.ChangeLockAsset, { asset: project.slug })
    }
    LockedAsset.set(project)
  }

  return target
    ? ReactDOM.createPortal(
        <ProjectSelector
          project={lockedAsset}
          address={settings.address}
          onProjectSelect={onLockProjectSelect}
        />,
        target,
      )
    : null
}

export default Sidebar
