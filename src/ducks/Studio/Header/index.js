import React, { useEffect, useRef } from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Settings from './Settings'
import Template from '../Template'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import styles from './index.module.scss'

const SAN_HEADER_HEIGHT = 70

export default ({ isOverviewOpened, toggleOverview, ...props }) => {
  const headerRef = useRef(null)

  useEffect(
    () => {
      const { current: header } = headerRef
      let transform
      if (isOverviewOpened) {
        let { top } = header.getBoundingClientRect()

        if (window.scrollY < SAN_HEADER_HEIGHT) {
          top -= SAN_HEADER_HEIGHT - window.scrollY - 1
        }

        transform = `translateY(-${top}px)`
      } else {
        transform = null
      }
      header.classList.toggle(styles.wrapper_fixed, !!transform)
      header.style.transform = transform
    },
    [isOverviewOpened],
  )

  return (
    <div className={styles.wrapper} ref={headerRef}>
      <div className={styles.title}>
        <ProjectIcon
          className={styles.icon}
          size={32}
          slug={props.settings.slug}
        />
        {props.settings.title}
      </div>
      <div className={styles.divider} />
      <Template {...props} {...props.settings} />
      <Settings {...props} className={styles.settings} showMulti={false} />
      <Button
        border
        className={cx(
          styles.overview,
          isOverviewOpened && styles.overview_active,
        )}
        onClick={toggleOverview}
      >
        {isOverviewOpened ? 'Close' : 'Open'} Mapview
      </Button>
    </div>
  )
}
