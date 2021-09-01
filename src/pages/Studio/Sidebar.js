import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { track } from 'webkit/analytics'
import { Cache } from 'webkit/api/cache'
import { Event } from 'studio/analytics'
import { newProjectMetric } from 'studio/metrics/utils'
import { USER_LAYOUTS_QUERY } from 'studio/api/layouts'
import { useLockedAsset, useLockedAssetStore } from './stores'
import { shareWidgets } from './sharing/share'
import ProjectSelector from '../../ducks/Studio/Sidebar/ProjectSelector'
import NewTemplate from '../../ducks/Studio/Template/Dialog/NewTemplate'

const Sidebar = ({
  studio,
  settings,
  widgets,
  selectMetricRef,
  onSidebarProjectMountRef
}) => {
  const LockedAsset = useLockedAssetStore(studio)
  const lockedAsset = useLockedAsset(LockedAsset)
  const [target, setTarget] = useState()
  const [isOpened, setIsOpened] = useState(false)

  window.showNewLayoutDialog = () => setIsOpened(true)

  onSidebarProjectMountRef.current = setTarget

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

  function onNew (layout) {
    window.selectLayout(layout)
    const data = Cache.get(USER_LAYOUTS_QUERY)
    if (data) {
      data.currentUser.layouts.unshift(layout)
      Cache.set(USER_LAYOUTS_QUERY, data)
      window.refetchMyLayout()
    }
    closeNewLayoutDialog()
  }

  function closeNewLayoutDialog () {
    setIsOpened(false)
  }

  return target
    ? ReactDOM.createPortal(
        <>
          <ProjectSelector
            project={lockedAsset}
            onProjectSelect={onLockProjectSelect}
          />
          <NewTemplate
            widgets={widgets}
            projectId={settings.projectId}
            saveWidgets={shareWidgets}
            onNew={onNew}
            open={isOpened}
            onOpen={() => setIsOpened(true)}
            onClose={closeNewLayoutDialog}
          />
        </>,
        target
    )
    : null
}

export default Sidebar
