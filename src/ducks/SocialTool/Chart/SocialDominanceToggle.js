import React from 'react'
import cx from 'classnames'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import { saveToggle } from '../../../utils/localStorage'
import styles from './SocialDominanceToggle.module.scss'

const SocialDominanceToggle = ({ className, options = {}, setOptions }) => {
  const isActive = options.isSocialDominanceActive

  function toggle () {
    setOptions(state => ({
      ...state,
      isSocialDominanceActive: saveToggle(
        'isSocialDominanceActive',
        !state.isSocialDominanceActive
      )
    }))
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <Button variant='flat' onClick={toggle} className={styles.button}>
        <Toggle className={styles.toggle} isActive={isActive} />
        Social Dominance
      </Button>
    </div>
  )
}

export default SocialDominanceToggle
