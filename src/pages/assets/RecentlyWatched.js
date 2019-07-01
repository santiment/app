import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ProjectIcon from '../../components/ProjectIcon'
import PercentChanges from './../../components/PercentChanges'
import styles from './RecentlyWatched.module.scss'
import { store } from '../../index'
import { RECENT_ASSETS_FETCH } from '../../actions/types'
import { formatNumber } from '../../utils/formatting'

const RecentlyWatched = ({ assets, price = 41382 }) => {
  useEffect(() => {
    store.dispatch({ type: RECENT_ASSETS_FETCH })
  }, [])
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Recently watched assets</h2>
      {assets.map(({ name, ticker, priceUsd, percentChange24h }) => (
        <div className={styles.item} key={ticker}>
          <div className={styles.group}>
            <ProjectIcon size={20} name={name} ticker={ticker} />
            <h3 className={styles.name}>
              {name} <span className={styles.ticker}>{ticker}</span>
            </h3>
          </div>
          <div className={styles.group}>
            <h4 className={styles.price}>
              {priceUsd
                ? formatNumber(priceUsd, { currency: 'USD' })
                : 'No data'}
            </h4>
            <PercentChanges
              changes={percentChange24h}
              className={styles.change}
            />
          </div>
        </div>
      ))}
    </section>
  )
}

const mapStateToProps = ({ recents }) => ({
  assets: recents.assets
})

export default connect(mapStateToProps)(RecentlyWatched)
