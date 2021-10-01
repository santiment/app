import React, { useState, useLayoutEffect } from 'react'
import cx from 'classnames'
import { useHistory } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import { TOP_LINKS } from './anchors'
import { useNavigationAnchor } from '../../../components/LeftPageNavigation/LeftPageNavigation'
// import { hashLinkScroll } from '../hooks'
import { useEventListener } from '../../../hooks/eventListeners'
import styles from './index.module.scss'

const BottomButton = ({ onClick, children, text }) => (
  <div className={styles.buttonBottom}>
    {children}
    {text}
  </div>
)

const NavLink = ({ item, active, setActive, history }) => (
  <Link
    to={`#${item.link}`}
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
  const [elems, setElems] = useState([])
  const history = useHistory()

  useEventListener('scroll', onScroll)

  useLayoutEffect(() => {
    const anchors = TOP_LINKS.map(item => `#${item.link}`)

    if (anchors.indexOf(history.location.hash) !== -1) {
      window.removeEventListener('scroll', onScroll)
      hashLinkScroll()
    }

    const elems = TOP_LINKS.map(({ link }) => document.getElementById(link))
    setElems(elems)
  }, [])

  function hashLinkScroll () {
    const { hash } = history.location
    if (hash !== '') {
      const elements = document.querySelectorAll(`a[href='/${hash}']`)
      if (elements && elements.length > 0) {
        elements[0].scrollIntoView({
          behavior: 'smooth',
          callback: () => {
            console.log('finished')
          }
        })
      }
    }
  }

  function onScroll () {
    console.log('scroll')
    const offsets = elems.map(el => {
      const { top, height } = el.getBoundingClientRect()
      return top + height / 2
    })

    const findCurrentTab = offsets.findIndex(pos => pos > 0)
    const tab = TOP_LINKS[findCurrentTab]

    if (tab && tab !== active) {
      setActive(tab)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        {TOP_LINKS.map((item, idx) => (
          <NavLink
            history={history}
            item={item}
            setActive={setActive}
            active={active}
            key={idx}
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
