import React from 'react'
import cx from 'classnames'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import { saveToggle } from '../../../utils/localStorage'
import styles from './SocialDominanceToggle.module.scss'

const Icon = () => (
  <path
    fillRule='evenodd'
    clipRule='evenodd'
    d='M7 6.9c.1-.2.3-.3.6-.3h4.8c.3 0 .6.2.6.5s-.3.5-.6.5H8.9l2 2c.2.2.2.6 0 .8l-2 2h3.5c.3 0 .6.2.6.5s-.3.5-.6.5H7.6a.6.6 0 01-.6-.3l.1-.6L9.7 10 7 7.5a.5.5 0 010-.6z'
    fill='#FFF3E4'
  />
)

const SocialDominanceToggle = ({ className, options = {}, setOptions }) => {
  const isActive = options.withDominance

  function toggle () {
    setOptions(state => ({
      ...state,
      withDominance: saveToggle('withDominance', !state.withDominance)
    }))
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <Button variant='flat' onClick={toggle} className={styles.button}>
        <Toggle
          Icon={Icon}
          className={cx(styles.toggle, isActive && styles.active)}
          isActive={isActive}
        />
        Social Dominance
      </Button>
    </div>
  )
}

export default SocialDominanceToggle
