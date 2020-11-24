import React, { useCallback, useState } from 'react'
import { useEventListener } from '../../../../hooks/eventListeners'
import { TweetCard, TweetsParsed } from '../Tweets'
import Masonry from 'react-responsive-masonry'

const SETTINGS = {
  columnWidth: 380,
  height: 300,
  gutterSize: 10
}

function getColumnsCount () {
  const { columnWidth, gutterSize } = SETTINGS
  return Math.floor(window.innerWidth / (columnWidth + gutterSize))
}

const DesktopTweets = () => {
  const [columnsCount, setColumnsCount] = useState(() => getColumnsCount())

  function _calculateColumnCount () {
    const newCount = getColumnsCount()

    if (newCount !== columnsCount) {
      setColumnsCount(newCount)
    }
  }

  const _onResize = useCallback(
    () => {
      _calculateColumnCount()
    },
    [_calculateColumnCount]
  )

  useEventListener('resize', _onResize)

  return (
    <Masonry columnsCount={columnsCount} gutter={24}>
      {TweetsParsed.map((item, index) => (
        <TweetCard item={item} key={index} />
      ))}
    </Masonry>
  )
}

export default DesktopTweets
