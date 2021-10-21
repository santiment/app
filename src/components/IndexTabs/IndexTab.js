import React, { useState } from 'react'
import cx from 'classnames'
import styles from './IndexTab.module.scss'

const IndexTab = ({
  tabs,
  initialTab = 0,
  renderTopActions = [],
  bottomActions = []
}) => {
  const [activeTab, setTab] = useState(initialTab)

  const tab = tabs[activeTab]
  const { content, title } = tab

  return (
    <>
      <div className={styles.header}>
        {renderTopActions(activeTab)}
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
        <div className={styles.actions}>
          {bottomActions
            .filter(({ showOnTabs, hide }) => {
              if (hide) {
                return 0
              }
              if (showOnTabs) {
                return showOnTabs.includes(title)
              }

              return 1
            })
            .map(({ component: Action, props }, index) => {
              if (!Action) {
                return null
              }

              return <Action key={index} {...props} />
            })}
        </div>
      </div>
      {content}
    </>
  )
}

export default IndexTab
