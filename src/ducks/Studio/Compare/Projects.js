import React from 'react'
import cx from 'classnames'
import { AutoSizer, List } from 'react-virtualized'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import styles from './Projects.module.scss'

const ROW_HEIGHT = 32
const MAX_SHOWING_ITEMS = 4

const ProjectsList = ({ projects, onSelect }) => {
  function rowRenderer ({ key, index, style, ...props }) {
    const project = projects[index]
    const { name, ticker, slug, id, balance } = project

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
    <div className={styles.wrapper}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className={styles.list}
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
