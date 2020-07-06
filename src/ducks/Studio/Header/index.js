import React, { useRef } from 'react'
import Settings from './Settings'
import Template from '../Template'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import styles from './index.module.scss'

export default props => {
  const headerRef = useRef(null)

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
      <Settings
        {...props}
        className={styles.settings}
        showMulti={false}
        headerRef={headerRef}
      />
    </div>
  )
}
