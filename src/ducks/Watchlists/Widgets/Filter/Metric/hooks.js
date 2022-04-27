import { useState } from 'react'

export const useMetricSettings = (defaultSettings) => {
  const [settings, setSettings] = useState(defaultSettings)

  function selectSuggest(props) {
    setSettings((state) => ({ ...state, ...props }))
  }

  function clickCheckbox() {
    setSettings((state) => ({ ...state, isActive: !settings.isActive }))
  }

  return {
    settings,
    setSettings,
    selectSuggest,
    clickCheckbox,
  }
}
