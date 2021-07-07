import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { studio as settingsStore } from 'studio/stores/studio'
import { mapview } from 'studio/stores/mapview'
import { useWidgetsStore, useStore, useHistory } from './stores'
import { useSidewidgetStore } from './Sidewidget'
import { shareWidgets } from './sharing/share'
import { parseTemplate } from './sharing/template'
import { Header as StudioHeader } from '../../ducks/Studio/Header'

const Header = ({ studio, settings, widgets, metrics, prevFullUrlRef }) => {
  const [target, setTarget] = useState()
  const $mapview = useStore(mapview)
  const widgetsStore = useWidgetsStore(studio)
  const sidewidgetStore = useSidewidgetStore(studio)
  const sidewidget = useStore(sidewidgetStore)
  const History = useHistory(studio)
  const sharePath = '/charts' + window.location.search

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

  function changeTimePeriod (start, end) {
    const { from, to } = settings
    const undo = () => settingsStore.setPeriod(new Date(from), new Date(to))
    const redo = () => settingsStore.setPeriod(start, end)

    History.add('Period change', undo, redo)
    redo()
  }

  function buildShareLink () {
    return prevFullUrlRef.current
  }

  return target
    ? ReactDOM.createPortal(
      <StudioHeader
        {...settings}
        settings={settings}
        widgets={widgets}
        metrics={metrics}
        sidepanel={sidewidget}
        sharePath={sharePath}
        saveWidgets={shareWidgets}
        souldReloadOnSave={false}
        headerRef={{ current: target }}
        isOverviewOpened={$mapview > 0}
        changeTimePeriod={changeTimePeriod}
        toggleOverview={mapview.toggle}
        toggleSidepanel={toggleSidepanel}
        parseTemplate={parseTemplate}
        setWidgets={widgetsStore.set}
        controller={buildShareLink}
      />,
      target
    )
    : null
}

export default Header
