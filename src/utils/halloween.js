import { loadKeyState } from './localStorage'

// true if Oct 25 - Nov 1 and user didn't toggle night mode
export function isShowHalloween () {
  const isDisabledByUser = loadKeyState('disabledHalloweenMode')

  return isHalloweenDay() && !isDisabledByUser
}

// true if Oct 25 - Nov 1
export function isHalloweenDay () {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  return (
    (currentMonth === 9 && currentDay > 24) ||
    (currentMonth === 10 && currentDay < 2)
  )
}

export function getCheckedGraves () {
  const res = localStorage.getItem('halloweenGraves')

  return res ? res.split(',') : []
}

export function addGrave (slug) {
  const graves = new Set(getCheckedGraves())
  graves.add(slug)
  localStorage.setItem('halloweenGraves', [...graves].toString())

  return graves
}
