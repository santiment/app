import React from 'react'
import Button from '@santiment-network/ui/Button'
/* import Plans from '../../components/Plans/Plans' */
import Plans from './Plans'
import Testimonials from '../../components/Testimonials'
import styles from './index.module.scss'

export default () => {
  return (
    <div className={styles.wrapper + ' page'}>
      <div className={styles.top}>
        <h1 className={styles.title}>Choose the plan that works for you</h1>
        <h3 className={styles.subtitle}>
          No credit card required, cancel any time
        </h3>
      </div>

      <Plans />

      <Testimonials />
      <section className={styles.ready}>
        <div className={styles.ready__content}>
          <h2 className={styles.ready__title}>Ready to upgrade?</h2>
          <h4 className={styles.ready__text}>
            Click below to access the Santiment API or join the Discord channel
            to share your solutions with the world
          </h4>
          <Button
            variant='fill'
            accent='positive'
            className={styles.ready__btn}
            as='a'
            href='#plans'
          >
            Choose plan
          </Button>
        </div>
      </section>
    </div>
  )
}
