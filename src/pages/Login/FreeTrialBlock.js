import React from 'react'
import giftImg from './../../../src/assets/login/gift.svg'
import Button from '@santiment-network/ui/Button'
import styles from './FreeTrialBlock.module.scss'

const FreeTrialBlock = () => {
  return (
    <div className={styles.container}>
      <img src={giftImg} />
      <div className={styles.start}>Start your free trial</div>
      <div className={styles.description}>
        Enjoy 14 days free of Sanbase Pro, no card or payment information
        required
      </div>
      <Button className={styles.btn} variant={'fill'} accent={'positive'}>
        Start my Free Trial
      </Button>
    </div>
  )
}

export default FreeTrialBlock
