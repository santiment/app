import React, { useState } from 'react'
import cx from 'classnames'
import TutorialCard from './TutorialCard'
import TutorialsDialog from './TutorialsDialog'
import { tutorials } from './tutorials'
import styles from './TutorialList.module.scss'

const TutorialList = ({ classes = {} }) => {
  const [selected, setSelected] = useState()

  return (
    <div className={cx(styles.wrapper, classes.list)}>
      {tutorials.map(tutorial => (
        <TutorialCard
          className={cx(styles.card, classes.card)}
          key={tutorial.title}
          onClick={() => setSelected(tutorial)}
          {...tutorial}
        />
      ))}
      <TutorialsDialog
        open={!!selected}
        selectedTutorial={selected}
        onClose={setSelected}
      />
    </div>
  )
}

export default TutorialList
