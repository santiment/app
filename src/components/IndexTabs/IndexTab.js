import React, { useState } from 'react'
import styles from './IndexTab.module.scss'
import cx from 'classnames'

const IndexTab = ({ tabs }) => {
  const [activeTab, setTab] = useState(0)

  const tab = tabs[activeTab]
  const { content } = tab

  return (
    <>
      <div className={styles.header}>
        {tabs.map((item, index) => {
          if (!item) {
            return null
          }

          const { title } = item

          return (
            <div
              key={index}
              className={cx(styles.title, index === activeTab && styles.active)}
              onClick={() => setTab(index)}
            >
              {title}
            </div>
          )
        })}
      </div>
      {content}
    </>
  )
}

export default IndexTab
