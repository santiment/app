import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { studio as settingsStore } from 'studio/stores/studio'
import { mapview } from 'studio/stores/mapview'
import { useWidgetsStore, useStore } from './stores'
import { useSidewidgetStore } from './Sidewidget'
import { shareWidgets } from './sharing/share'
import { parseTemplate } from './sharing/template'
import { Header as StudioHeader } from '../../ducks/Studio/Header'

const Header = ({ studio, settings, widgets, metrics }) => {
  const [target, setTarget] = useState()
  const $mapview = useStore(mapview)
  const widgetsStore = useWidgetsStore(studio)
  const sidewidgetStore = useSidewidgetStore(studio)
  const sidewidget = useStore(sidewidgetStore)

  useEffect(
    () => {
      if (!studio) return
      setTarget(document.querySelector('.header'))
    },
    [studio]
  )

  function toggleSidepanel (value) {
    sidewidgetStore.set(value === sidewidget ? null : value)
  }

  return target
    ? ReactDOM.createPortal(
      <StudioHeader
        {...settings}
        settings={settings}
        widgets={widgets}
        metrics={metrics}
        sidepanel={sidewidget}
        saveWidgets={shareWidgets}
        souldReloadOnSave={false}
        headerRef={{ current: target }}
        isOverviewOpened={$mapview > 0}
        changeTimePeriod={settingsStore.setPeriod}
        toggleOverview={mapview.toggle}
        toggleSidepanel={toggleSidepanel}
        parseTemplate={parseTemplate}
        setWidgets={widgetsStore.set}
      />,
      target
    )
    : null
}

export default Header
