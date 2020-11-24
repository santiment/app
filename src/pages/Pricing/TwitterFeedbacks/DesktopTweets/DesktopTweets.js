import React, { useRef, useState } from 'react'
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized'
import { TweetCard, TweetsParsed } from '../Tweets'
import { useEventListener } from '../../../../hooks/eventListeners'

const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 380,
  fixedWidth: true
})

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 4,
  columnWidth: 380,
  spacer: 24
})

const SETTINGS = {
  columnWidth: 380,
  height: 300,
  gutterSize: 10
}

const DesktopTweets = () => {
  function getColumnsCount () {
    const { columnWidth, gutterSize } = SETTINGS
    return Math.floor(window.innerWidth / (columnWidth + gutterSize))
  }

  const [columnsCount, setColumnsCount] = useState(() => getColumnsCount())

  const _masonry = useRef(null)

  function _calculateColumnCount () {
    const newCount = getColumnsCount()

    if (newCount !== columnsCount) {
      setColumnsCount(newCount)

      return true
    }
  }

  function _resetCellPositioner () {
    const { columnWidth, gutterSize } = SETTINGS

    cellPositioner.reset({
      columnCount: columnsCount,
      columnWidth,
      spacer: gutterSize
    })
  }

  function _setMasonryRef (ref) {
    _masonry.current = ref
  }

  function _onResize () {
    if (_calculateColumnCount()) {
      _resetCellPositioner()
      _masonry.current.recomputeCellPositions()
    }
  }

  useEventListener('resize', _onResize)

  console.log('newCount', columnsCount, SETTINGS)

  function cellRenderer ({ index, key, parent, style }) {
    const item = TweetsParsed[index]

    const { columnWidth } = SETTINGS

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div
          className='cell'
          style={{
            ...style,
            width: columnWidth
          }}
        >
          <TweetCard item={item} key={index} />
        </div>
      </CellMeasurer>
    )
  }

  return (
    <Masonry
      cellCount={TweetsParsed.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={cellRenderer}
      width={window.innerWidth}
      overscanByPixels={0}
      ref={_setMasonryRef}
      autoHeight={true}
      height={900}
    />
  )
}

export default DesktopTweets
