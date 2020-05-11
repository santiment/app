import React from 'react'
import cx from 'classnames'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Button from '@santiment-network/ui/Button'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import styles from './Projects.module.scss'

const ROW_HEIGHT = 32

const ProjectsList = ({ projects, onSelect, className }) => {
  function rowRenderer ({ key, index, style }) {
    const project = projects[index]
    const { name, ticker, slug } = project

    return (
      <Button
        key={key}
        variant='ghost'
        style={style}
        className={styles.btn}
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
            rowCount={projects.length}
            overscanRowCount={5}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default ProjectsList
