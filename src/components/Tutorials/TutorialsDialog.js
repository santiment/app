import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import TutorialCard from './TutorialCard'
import { tutorials } from './tutorials'
import styles from './TutorialsDialog.module.scss'

const TutorialsDialog = ({
  selectedTutorial = tutorials[0],
  open,
  onClose
}) => {
  const [selected, setSelected] = useState(selectedTutorial)

  useEffect(
    () => {
      setSelected(selectedTutorial)
    },
    [selectedTutorial]
  )

  return (
    <Dialog
      title='🎓  Santiment Academy'
      open={open}
      classes={styles}
      onClose={onClose}
    >
      <div className={styles.content}>
        <div className={cx(styles.block, styles.tutorials)}>
          <div className={styles.block__scroll}>
            {tutorials.map(tutorial => (
              <TutorialCard
                key={tutorial.title}
                onClick={() => setSelected(tutorial)}
                className={cx(
                  styles.card,
                  selected === tutorial && styles.card_active
                )}
                {...tutorial}
              />
            ))}
          </div>
        </div>

        <div className={cx(styles.block, styles.block_tutorial)}>
          <div
            className={cx(styles.block__scroll, styles.block__scroll_tutorial)}
          >
            <div className={styles.tutorial}>
              <div className={styles.video}>
                <iframe
                  title={selected.title}
                  className={styles.video__iframe}
                  src={selected.src}
                  frameBorder='0'
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
              {/* TODO(vanguard): Hiding until text arrives */}
              {false && (
                <>
                  <h2 className={styles.tutorial__title}>{selected.title}</h2>
                  <p className={styles.tutorial__text}>
                    This metric shows the whole market value divided by the
                    realized value of the network, available to ETH, all ERC-20s
                    and BTC
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default TutorialsDialog
