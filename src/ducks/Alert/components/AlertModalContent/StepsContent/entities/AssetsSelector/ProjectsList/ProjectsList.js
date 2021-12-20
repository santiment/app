import React, { useCallback } from 'react'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import ProjectListItem from './ProjectListItem/ProjectListItem'
import styles from './ProjectsList.module.scss'

const ROW_HEIGHT = 32
const MAX_SHOWING_ITEMS = 4

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

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: ROW_HEIGHT
})

const ProjectsList = ({
  items,
  listItems,
  listItemsIds,
  onToggleProject,
  isContained,
  hideCheckboxes = false,
  sections
}) => {
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
            {({ registerChild }) => (
              <div
                ref={registerChild}
                style={style}
                className={styles.sectionTitle}
              >
                {item.title}
              </div>
            )}
          </CellMeasurer>
        )
      } else {
        const isAssetInList = listItemsIds.has(item.id)

        const { name, ticker, slug, balance, logoUrl } = item

        return (
          <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            {({ registerChild }) => (
              <ProjectListItem
                ref={registerChild}
                style={style}
                isSelectedItem={isSelectedItem}
                isLast={isLast}
                onToggleProject={onToggleProject}
                item={item}
                listItems={listItems}
                isAssetInList={isAssetInList}
                hideCheckboxes={hideCheckboxes}
                isContained={isContained}
                slug={slug}
                logoUrl={logoUrl}
                name={name}
                balance={balance}
                ticker={ticker}
              />
            )}
          </CellMeasurer>
        )
      }
    },
    [sections]
  )

  const wrapperStyles = {
    height: '318px',
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
