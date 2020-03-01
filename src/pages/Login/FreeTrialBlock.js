import React from 'react'
import giftImg from './../../../src/assets/login/gift.svg'
import Button from '@santiment-network/ui/Button'
import { Link } from 'react-router-dom'
import styles from './FreeTrialBlock.module.scss'
import { PATHS } from '../../App'

const FreeTrialBlock = () => {
  return (
    <div className={styles.container}>
      <img src={giftImg} alt={'Free trial'} />
      <div className={styles.start}>Start your free trial</div>
      <div className={styles.description}>
        Enjoy 14 days free of Sanbase Pro, no card or payment information
        required
      </div>
      <Button
        as={Link}
        to={PATHS.CREATE_ACCOUNT_FREE_TRIAL}
        className={styles.btn}
        variant={'fill'}
        accent={'positive'}
      >
        Start my Free Trial
      </Button>
    </div>
  )
}

export default FreeTrialBlock
