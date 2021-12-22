import React, { useCallback } from 'react'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import ProjectListItem from './ProjectListItem/ProjectListItem'
import styles from './ProjectsList.module.scss'

const ROW_HEIGHT = 36
const listStyle = { overflowX: false, overflowY: false }

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
        header: true
      }
    } else {
      return {
        item: section.data[itemIndex],
        index: index,
        header: false
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
  sections,
  searchTerm,
  isSocial,
  isWords
}) => {
  const rowRenderer = useCallback(
    ({ key, index, style, parent }) => {
      const { item, index: itemIndex, header } = subExtractor(sections, index)

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

        const { name, ticker, slug, logoUrl } = item

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
                onToggleProject={onToggleProject}
                item={item}
                listItems={listItems}
                isAssetInList={isAssetInList}
                slug={slug}
                logoUrl={logoUrl}
                name={name}
                ticker={ticker}
                isWords={isWords}
              />
            )}
          </CellMeasurer>
        )
      }
    },
    [sections, listItemsIds, searchTerm]
  )

  const wrapperStyles = {
    height: isSocial || isWords ? '393px' : '443px'
  }

  const getRowCount = () =>
    sections.reduce((acc, section) => {
      return 1 + acc + section.data.length
    }, 0)

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
              rowCount={getRowCount()}
              overscanRowCount={5}
              rowRenderer={rowRenderer}
              style={listStyle}
            />
          )}
        </AutoSizer>
      )}
    </div>
  )
}

export default ProjectsList
