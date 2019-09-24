import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import Icon from '@santiment-network/ui/Icon'
import StoryPreview from './StoryPreview'
import Story from './Story'
import { stories } from './content/content'
import styles from './StoriesList.module.scss'

const StoriesList = ({ classes = {} }) => {
  const [selected, setSelected] = useState()

  const close = () => setSelected()

  return (
    <section className={cx(styles.list, classes.stories)}>
      <div className={styles.scrollableWrapper}>
        <div className={styles.scrollable}>
          {stories.map(story => (
            <StoryPreview
              className={cx(styles.item, classes.story)}
              key={story.previewTitle}
              onClick={() => setSelected(story)}
              {...story}
            />
          ))}
        </div>
      </div>
      <Dialog
        title={(selected || {}).storyHeaderName || ''}
        open={!!selected}
        onClose={setSelected}
        classes={styles}
      >
        <Story story={selected} onEnd={setSelected} />
      </Dialog>
    </section>
  )
}

export default StoriesList
