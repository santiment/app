import { useEffect, useState } from 'react'
import AsideNav from './index.svelte'

const getRoot = () => document.querySelector('#root')

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

    if (!isDesktop) return

    const root = getRoot()
    setSvelte(new AsideNav({ target: root, props: { root, pathname } }))
  }, [isDesktop])

  useEffect(() => {
    if (!svelte) return

    svelte.$set({ pathname })
  }, [pathname])

  return null
}
