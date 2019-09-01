import React from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import TutorialCard from './TutorialCard'
import styles from './TutorialsDialog.module.scss'

const TutorialsDialog = () => {
  return (
    <Dialog title='🎓  Santiment Academy' open={true} classes={styles}>
      <div className={styles.content}>
        <div className={styles.tutorials}>
          <TutorialCard
            className={cx(styles.card, styles.card_active)}
            title='How to use Price metric?'
            duration='0:53'
          />
          <TutorialCard
            className={styles.card}
            title='How to use Price metric?'
            duration='0:53'
          />
          <TutorialCard
            className={styles.card}
            title='How to use Price metric?'
            duration='0:53'
          />
        </div>
        <div className={styles.tutorial}>
          <div className={styles.video}>
            <iframe
              className={styles.video__iframe}
              src='https://www.youtube-nocookie.com/embed/DQPrfUbcNrA'
              frameborder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowfullscreen
            />
          </div>

          <h2 className={styles.tutorial__title}>How to use MVRV Ratio?</h2>
          <p className={styles.tutorial__text}>
            This metric shows the whole market value divided by the realized
            value of the network, available to ETH, all ERC-20s and BTC
          </p>
        </div>
      </div>
    </Dialog>
  )
}

export default TutorialsDialog
