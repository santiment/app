import { useEffect, useState } from 'react'
import AsideNav from './index.svelte'

const getRoot = () => document.querySelector('.App')

export default ({ pathname, isDesktop }) => {
  const [svelte, setSvelte] = useState()

  useEffect(() => {
    if (svelte) {
      if (!isDesktop) {
        svelte.$destroy()
        setSvelte(null)
      }

      return
    }

    const svelte = new AsideNav({ target: getRoot(), props: { pathname } })
    setSvelte(svelte)
  }, [isDesktop])

  useEffect(() => {
    if (!svelte) return

    svelte.$set({ pathname })
  }, [pathname])

  return null
}
