import { useEffect } from 'react'
import { ui, useTheme } from '../stores/ui/theme'

export function isHalloweenDay() {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  return (currentMonth === 9 && currentDay > 24) || (currentMonth === 10 && currentDay < 5)
}

export const useHalloweenMode = () => {
  const { isNightMode } = useTheme()

  useEffect(() => !isNightMode && isHalloweenDay() && ui.toggleNightMode(), [])
}
