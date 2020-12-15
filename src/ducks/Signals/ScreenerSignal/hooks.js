import { useMemo } from 'react'
import { FREQUENCY_REAL_TIME, SCREENER_FREQUENCES } from './utils'

export const useAlertCooldown = ({ values, setInitialValues }) => {
  const cooldownInitial = useMemo(
    () => {
      const { cooldown } = values

      const found = SCREENER_FREQUENCES.find(
        ({ cooldown: targerCooldown }) => targerCooldown === cooldown
      )

      if (found) {
        return found.label
      } else {
        return FREQUENCY_REAL_TIME.label
      }
    },
    [values]
  )

  function toggleSignalFrequency (val) {
    const item = SCREENER_FREQUENCES.find(({ label }) => label === val)

    if (item) {
      const newValues = { ...values, cooldown: item.cooldown }
      setInitialValues(newValues)
    }
  }

  return {
    cooldownInitial,
    toggleSignalFrequency
  }
}
