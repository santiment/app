import React, { useState } from 'react'
import cx from 'classnames'
import { SignalModal } from '../../pages/SonarFeed/SonarFeedPage'
import styles from './IndexTab.module.scss'

const IndexTab = ({ tabs, initialTab = 0 }) => {
  const [activeTab, setTab] = useState(initialTab)

  const tab = tabs[activeTab]
  const { content } = tab

  return (
    <>
      <div className={styles.header}>
        <div className={styles.tabs}>
          {tabs.map((item, index) => {
            if (!item) {
              return null
            }

            const { title } = item

            return (
              <div
                key={index}
                className={cx(
                  styles.title,
                  index === activeTab && styles.active
                )}
                onClick={() => setTab(index)}
              >
                {title}
              </div>
            )
          })}
        </div>

        <SignalModal canRedirect={false} />
      </div>
      {content}
    </>
  )
}

export default IndexTab
