import React, { useCallback } from 'react'
import cx from 'classnames'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Label from '@santiment-network/ui/Label'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized'

import ProjectIcon from '../../../../../components/ProjectIcon/ProjectIcon'

import { formatTokensCount } from '../../../../../utils/formatting'

import styles from './ProjectsList.module.scss'

const ROW_HEIGHT = 32
const MAX_SHOWING_ITEMS = 4

const ProjectsList = ({
  items,
  listItems,
  onToggleProject,
  isContained,
  hideCheckboxes = false,
  sections
}) => {
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: ROW_HEIGHT
  })

  function subExtractor (sections = [], index) {
    let itemIndex = index
    for (let ii = 0; ii < sections.length; ii++) {
      const section = sections[ii]
      itemIndex -= 1
      if (itemIndex >= section.data.length) {
        itemIndex -= section.data.length
      } else if (itemIndex === -1) {
        return {
          item: {
            title: section.title
          },
          index: index,
          header: true,
          isLast: false
        }
      } else {
        return {
          item: section.data[itemIndex],
          index: index,
          header: false,
          isLast: !section.data[itemIndex + 1]
        }
      }
    }
  }

  const rowRenderer = useCallback(
    ({ key, index, style, parent }) => {
      const { item, index: itemIndex, header, isLast } = subExtractor(
        sections,
        index
      )

      const isSelectedItem = listItems.length > 0 && index === 0

      if (header) {
        return (
          <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={itemIndex}
          >
            <div style={style} className={styles.sectionTitle}>
              {item.title}
            </div>
          </CellMeasurer>
        )
      } else if (!header) {
        const isAssetInList = listItems.some(
          ({ id: itemId }) => itemId === item.id
        )
        const { name, ticker, slug, balance, logoUrl } = item

        return (
          <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <div
              style={style}
              className={cx(isSelectedItem && styles.selectedItem)}
            >
              <div
                className={cx(styles.project, !isLast && styles.projectPadding)}
                onClick={() => {
                  onToggleProject({
                    project: item,
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
                  <ProjectIcon
                    className={styles.icon}
                    size={16}
                    slug={slug}
                    logoUrl={logoUrl}
                  />
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
            </div>
          </CellMeasurer>
        )
      }
    },
    [sections]
  )

  const wrapperStyles = {
    height:
      items.length > MAX_SHOWING_ITEMS ? `318px` : `${32 * items.length}px`,
    paddingRight: items.length > MAX_SHOWING_ITEMS ? '0px' : `5px`
  }

  return (
    <div style={wrapperStyles} className={styles.wrapperList}>
      {items.length > 0 && (
        <AutoSizer>
          {({ height, width }) => (
            <List
              className={styles.list}
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowCount={items.length}
              overscanRowCount={5}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      )}
    </div>
  )
}

export default ProjectsList
