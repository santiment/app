import React from 'react'
import cx from 'classnames'
import { HashLink as Link } from 'react-router-hash-link'
import { useEventListener } from '../../../hooks/eventListeners'
import { TOP_LINKS } from './anchors'
import { useNavigationAnchor } from '../../../components/LeftPageNavigation/LeftPageNavigation'
import styles from './index.module.scss'

const BottomButton = ({ onClick, children, text }) => (
  <div className={styles.buttonBottom}>
    {children}
    {text}
  </div>
)

const NavLink = ({ item, active, setActive }) => (
  <Link
    to={`#${item.link}`}
    onClick={() => setActive(item)}
    className={cx(
      styles.anchor,
      item.link === active.link && styles.activeAnchor
    )}
  >
    <div className={styles.iconBack}>
      <item.Icon />
    </div>
    {item.title}
  </Link>
)

const onIntercomClick = () => {
  if (window.Intercom) {
    window.Intercom('show')
  }
}

const onQuickstartClick = () => {
  console.log('ggg')
}

const Navigation = () => {
  const { setActive, active } = useNavigationAnchor(TOP_LINKS, 'link')

  useEventListener('scroll', () => {
    const currEl = TOP_LINKS.find(elem => {
      const el = document.getElementById(elem.link)
      const rect = el.getBoundingClientRect()
      return rect.top + rect.height / 3 > 0
    })

    if (currEl && currEl.link !== active.link) {
      setActive(currEl)
    }
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        {TOP_LINKS.map((item, idx) => (
          <NavLink
            item={item}
            active={active}
            key={idx}
            setActive={setActive}
          />
        ))}
      </div>
      <div className={styles.bottom}>
        <BottomButton text='Quickstart' onClick={onQuickstartClick}>
          <svg className={styles.icon} width='12' height='16'>
            <path d='m12 16-6-4.4L0 16V1.8C0 1.3.2.8.5.5.8.2 1.3 0 1.7 0h8.6c.4 0 .9.2 1.2.5.3.4.5.8.5 1.3V16Z' />
          </svg>
        </BottomButton>
        <BottomButton text='Help & Feedback' onClick={onIntercomClick}>
          <svg className={styles.icon} width='14' height='16'>
            <path d='m14 16-4.3-1.7h-8c-1 0-1.7-.8-1.7-1.8V1.8C0 .8.8 0 1.7 0h10.6c1 0 1.7.8 1.7 1.8V16Zm-2-6a.4.4 0 0 0-.7 0S9.8 11.3 7 11.3a6.8 6.8 0 0 1-4.4-1.4.4.4 0 0 0-.5.1.5.5 0 0 0 0 .7S4 12.3 7 12.3c3.1 0 4.8-1.5 4.9-1.6l.1-.3V10Z' />
          </svg>
        </BottomButton>
      </div>
    </div>
  )
}
export default Navigation
