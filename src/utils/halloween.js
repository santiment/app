import { useEffect } from 'react'
import { saveBoolean, getSavedBoolean } from 'webkit/utils/localStorage'
import { ui, useTheme } from '../stores/ui/theme'

export function isHalloweenDay() {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  return (currentMonth === 9 && currentDay > 24) || (currentMonth === 10 && currentDay < 5)
}

export const IS_HALLOWEEN_ENABLED = 'IS_HALLOWEEN_ENABLED'

export const useHalloweenMode = () => {
  const { isNightMode } = useTheme()

  useEffect(() => {
    const isHalloweenEnabled = getSavedBoolean(IS_HALLOWEEN_ENABLED)

    if (!isHalloweenEnabled && isNightMode === false && isHalloweenDay()) {
      ui.toggleNightMode()
      saveBoolean(IS_HALLOWEEN_ENABLED, true)
    }
  }, [isNightMode])
}
