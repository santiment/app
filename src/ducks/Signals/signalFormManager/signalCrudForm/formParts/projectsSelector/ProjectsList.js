import React from 'react'
import cx from 'classnames'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Label from '@santiment-network/ui/Label'
import { Checkbox } from '@santiment-network/ui'
import ProjectIcon from '../../../../../../components/ProjectIcon/ProjectIcon'
import { formatTokensCount } from '../../../../../../utils/formatting'
import styles from './ProjectsList.module.scss'

const ROW_HEIGHT = 32
const MAX_SHOWING_ITEMS = 4

const ProjectsList = ({
  items,
  listItems,
  onToggleProject,
  isContained,
  hideCheckboxes = false
}) => {
  const rowRenderer = ({ key, index, style }) => {
    const { name, ticker, slug, id, balance } = items[index]
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
        {!hideCheckboxes && (
          <Checkbox
            isActive={isAssetInList}
            disabled={isContained ? false : isAssetInList}
          />
        )}
        <div
          className={cx(
            styles.asset,
            !isContained && isAssetInList && styles.disabled
          )}
        >
          <ProjectIcon className={styles.icon} size={16} slug={slug} />
          <span className={styles.name}>{name}</span>
          <Label accent='waterloo'>
            (
            {balance >= 0 && (
              <Label className={styles.balance}>
                {formatTokensCount(balance)}
              </Label>
            )}
            {ticker})
          </Label>
        </div>
      </div>
    )
  }

  const wrapperStyles = {
    height:
      items.length > MAX_SHOWING_ITEMS ? `160px` : `${32 * items.length}px`,
    paddingRight: items.length > MAX_SHOWING_ITEMS ? '0px' : `5px`
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
