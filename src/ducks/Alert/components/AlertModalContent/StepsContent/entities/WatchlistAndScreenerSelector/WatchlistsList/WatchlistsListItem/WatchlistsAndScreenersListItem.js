import React, { forwardRef } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { clipText } from '../../../../../../../utils'
import styles from './WatchlistsAndScreenersListItem.module.scss'

const WatchlistsAndScreenersListItem = forwardRef(
  ({ item, isSelectedItem, style, onSelect }, ref) => {
    const { name, id, listItems } = item

    const assetsStr =
      listItems && listItems.map(entity => entity.project.name).join(', ')

    return (
      <div ref={ref} style={style} className={styles.paddingWrapper}>
        <div
          className={cx(styles.wrapper, isSelectedItem && styles.selectedItem)}
          onClick={() => onSelect(+id)}
        >
          <div className={styles.title}>
            {name}
            {isSelectedItem && (
              <Icon
                type='checkmark'
                className={styles.icon}
                onClick={() => onSelect(+id)}
              />
            )}
          </div>
          <div className={styles.description}>{clipText(assetsStr, 60)}</div>
        </div>
      </div>
    )
  }
)

export default WatchlistsAndScreenersListItem
