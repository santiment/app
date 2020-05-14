import React, { useState } from 'react'
import styles from './IndexTab.module.scss'
import cx from 'classnames'

const IndexTab = ({ tabs }) => {
  const [activeTab, setTab] = useState(tabs[0])

  return (
    <>
      <div className={styles.header}>
        {tabs.map(tab => {
          if (!tab) {
            return null
          }

          const { type } = tab

          return (
            <div
              key={type}
              className={cx(
                styles.title,
                type === activeTab.type && styles.active
              )}
              onClick={() => setTab(tab)}
            >
              {type}
            </div>
          )
        })}
      </div>
      {activeTab.content}
    </>
  )
}

export default IndexTab
