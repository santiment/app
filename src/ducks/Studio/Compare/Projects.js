import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Button from '@santiment-network/ui/Button'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import styles from './Projects.module.scss'

const ROW_HEIGHT = 32

const Key = {
  ENTER: 'Enter',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown'
}

const ProjectsList = ({ projects, onSelect, className }) => {
  const [cursor, setCursor] = useState(0)
  const rowCount = projects.length

  useEffect(
    () => {
      function onKeyDown (e) {
        const { key } = e
        setCursor(cursor => {
          let newCursor = cursor

          switch (key) {
            case Key.ArrowUp:
            case Key.ArrowDown:
              e.preventDefault()
              newCursor += key === Key.ArrowDown ? 1 : -1
              break
            case Key.ENTER:
              e.preventDefault()
              onSelect(projects[cursor]) // eslint-disable-next-line
            default:
              return cursor
          }

          newCursor %= rowCount
          return newCursor < 0 ? rowCount - 1 : newCursor
        })
      }

      window.addEventListener('keydown', onKeyDown)

      return () => {
        setCursor(0)
        window.removeEventListener('keydown', onKeyDown)
      }
    },
    [projects]
  )

  function rowRenderer ({ key, index, style }) {
    const project = projects[index]
    const { name, ticker, slug } = project

    return (
      <Button
        key={key}
        variant='ghost'
        style={style}
        className={cx(styles.btn, cursor === index && styles.btn_cursored)}
        onClick={() => onSelect(project)}
      >
        <ProjectIcon className={styles.icon} size={16} slug={slug} />
        {name}
        <span className={styles.ticker}>{ticker}</span>
      </Button>
    )
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowHeight={ROW_HEIGHT}
            rowCount={rowCount}
            overscanRowCount={5}
            rowRenderer={rowRenderer}
            //
            scrollToIndex={cursor}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default ProjectsList
