import { useState } from 'react'

export const useMetricSettings = (defaultSettings) => {
  const [settings, setSettings] = useState(defaultSettings)

<<<<<<< HEAD
  function selectSuggest (props) {
    setSettings((state) => ({ ...state, ...props }))
  }

  function clickCheckbox () {
=======
  function selectSuggest(props) {
    setSettings((state) => ({ ...state, ...props }))
  }

  function clickCheckbox() {
>>>>>>> master
    setSettings((state) => ({ ...state, isActive: !settings.isActive }))
  }

  return {
    settings,
    setSettings,
    selectSuggest,
    clickCheckbox,
  }
}
