import React, { useState } from 'react'
import cx from 'classnames'
import styles from './IndexTab.module.scss'

const IndexTab = ({ tabs, initialTab = 0, renderTopActions = [], bottomActions = [] }) => {
  const [activeTab, setTab] = useState(initialTab)

  const tab = tabs[activeTab]
  const { content, id } = tab

  return (
    <>
      <div className={cx('row justify mrg--b mrg-xxl', styles.wrapper)}>
        {renderTopActions(activeTab)}
        <div className={cx(styles.tabs, 'row')}>
          {tabs.map((item) => {
            if (!item) {
              return null
            }

            const { title, id } = item

            return (
              <div
                key={id}
                className={cx(
                  styles.title,
                  'btn mrg--l mrg-xxl  h4 txt-m',
                  id === activeTab && styles.active,
                )}
                onClick={() => setTab(id)}
              >
                {title}
              </div>
            )
          })}
        </div>
        <div className={cx(styles.actions, 'row v-center')}>
          {bottomActions
            .filter(({ showOnTabs, hide, component }) => {
              if (!component) {
                return false
              }
              if (hide) {
                return false
              }
              if (showOnTabs) {
                return showOnTabs.includes(id)
              }

              return true
            })
            .map(({ component: Action, props, id }) => (
              <Action key={id} {...props} />
            ))}
        </div>
      </div>
      {content}
    </>
  )
}

export default IndexTab
