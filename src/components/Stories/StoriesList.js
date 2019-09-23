import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import StoryPreview from './StoryPreview'
import Story from './Story'
import { stories } from './content/content'
import styles from './StoriesList.module.scss'

const StoriesList = ({ classes = {} }) => {
  const [selected, setSelected] = useState()

  return (
    <section className={cx(styles.list, classes.stories)}>
      {stories.map(story => (
        <StoryPreview
          className={cx(styles.item, classes.story)}
          key={story.previewTitle}
          onClick={() => setSelected(story)}
          {...story}
        />
      ))}
      <Dialog
        title='🎓  Santiment Academy'
        open={!!selected}
        onClose={setSelected}
        classes={styles}
      >
        <Story story={selected} />
      </Dialog>
    </section>
  )
}

export default StoriesList
