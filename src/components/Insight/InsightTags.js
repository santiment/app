import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { ContextMenu, Panel, Button } from '@santiment-network/ui'
import { noTrendTagsFilter } from './utils'
import styles from './InsightTags.module.scss'

const VISIBLE_TAGS_BY_DEFAULT = 3

const InsightTags = ({ tags = [] }) => {
  const filteredTags = tags.filter(noTrendTagsFilter)
  const tagsOverflow =
    filteredTags.length > VISIBLE_TAGS_BY_DEFAULT
      ? filteredTags.length - VISIBLE_TAGS_BY_DEFAULT
      : 0
  return (
    <>
      {filteredTags.slice(0, VISIBLE_TAGS_BY_DEFAULT).map(({ name }) => (
        <Link to={`/insights/tags/${name}`} key={name} className={styles.tag}>
          {name}
        </Link>
      ))}
      {tagsOverflow > 0 && (
        <ContextMenu
          trigger={
            <Button className={cx(styles.tag, styles.moreTagsTrigger)}>
              +{tagsOverflow}
            </Button>
          }
          position='bottom'
        >
          <Panel className={styles.overflowTags}>
            {filteredTags.slice(VISIBLE_TAGS_BY_DEFAULT).map(({ name }) => (
              <Link
                to={`/insights/tags/${name}`}
                key={name}
                className={styles.tag}
              >
                {name}
              </Link>
            ))}
          </Panel>
        </ContextMenu>
      )}
    </>
  )
}

export default InsightTags
