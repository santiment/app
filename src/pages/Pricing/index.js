import React from 'react'
import Button from '@santiment-network/ui/Button'
import Plans from '../../components/Plans/Plans'
import FAQ from '../../components/FAQ'
import Testimonials from '../../components/Testimonials'
import styles from './index.module.scss'

export default () => {
  return (
    <>
      <h1 className={styles.title}>Choose the plan that works for you</h1>
      <h3 className={styles.subtitle}>
        No credit card required, cancel any time
      </h3>

      <Plans />
      <Testimonials />
      <FAQ />
      <div>
        <h2>Ready to upgrade?</h2>
        <h4>
          Click below to access the Santiment API or join the Discord channel to
          share your solutions with the world
        </h4>
        <Button>Choose plan</Button>
      </div>
    </>
  )
}
