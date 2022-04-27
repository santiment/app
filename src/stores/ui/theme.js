import { useState, useEffect } from 'react'
import { get } from 'svelte/store'
import { ui } from 'insights/stores/ui'

const NIGHTMODE = 'nightmode'
export const THEMES = ['default', NIGHTMODE]

const DEFAULT = get(ui)
export function useTheme() {
  const [theme, setTheme] = useState(DEFAULT)

  useEffect(() => ui.subscribe((value) => setTheme({ ...value })), [])

  return theme
}

export { ui }
