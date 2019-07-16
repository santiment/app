import React from 'react'
import { AutoSizer, List } from 'react-virtualized'
import Label from '@santiment-network/ui/Label'
import { Checkbox } from '@santiment-network/ui'
import styles from './ProjectsList.module.scss'

const ROW_HEIGHT = 32

const ProjectsList = ({ items, listItems, onToggleProject, isContained }) => {
  const rowRenderer = ({ key, index, style }) => {
    const { name, ticker, id } = items[index]
    const isAssetInList = listItems.some(({ id: itemId }) => itemId === id)
    return (
      <div
        key={key}
        className={styles.project}
        style={style}
        onClick={() => {
          onToggleProject({
            project: items[index],
            listItems,
            isAssetInList
          })
        }}
      >
        <Checkbox
          isActive={isAssetInList}
          disabled={isContained ? false : isAssetInList}
        />
        <div className={styles.asset}>
          <span className={styles.name}>{name}</span>
          <Label accent='waterloo'>({ticker})</Label>
        </div>
      </div>
    )
  }

  const wrapperStyles = {
    height: items.length > 4 ? `160px` : `${32 * items.length}px`,
    paddingRight: items.length > 4 ? '0' : `5px`
  }

  return (
    <div style={wrapperStyles} className={styles.wrapperList}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className={styles.list}
            width={width}
            height={height}
            rowHeight={ROW_HEIGHT}
            rowCount={items.length}
            overscanRowCount={5}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default ProjectsList
