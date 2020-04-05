import React, { useRef, useEffect } from 'react'
import Trends from '../../components/Trends/Trends'
import WordCloud from '../../components/WordCloud/WordCloud'
import AverageSocialVolume from '../../components/AverageSocialVolume'
import styles from './Sidebar.module.scss'

const Sidebar = ({ topic, ...props }) => {
  const asideRef = useRef(null)

  useEffect(() => {
    const sidebar = asideRef.current
    const header = document.querySelector('header')

    if (!header) {
      sidebar.style.top = 0
      return
    }

    const { offsetHeight } = header

    function fixSidebar () {
      requestAnimationFrame(() => {
        const dif = offsetHeight - window.scrollY
        sidebar.classList.toggle(styles.fixed, dif < 0)
      })
    }

    fixSidebar()

    window.addEventListener('scroll', fixSidebar)
    return () => window.removeEventListener('scroll', fixSidebar)
  }, [])

  return (
    <aside className={styles.sidebar} ref={asideRef}>
      <AverageSocialVolume {...props} text={topic} />
      <WordCloud
        hideWord
        className={styles.cloud}
        infoClassName={styles.cloud__header}
        word={topic}
      />
      <Trends className={styles.trends} isCompactView />
    </aside>
  )
}

export default Sidebar
