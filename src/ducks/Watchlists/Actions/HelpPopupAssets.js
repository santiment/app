import React from 'react'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import styles from '../../../components/HelpPopup/HelpPopup.module.scss'

const HelpPopupAssets = ({ isTrendingWatchlist }) => (
  <HelpPopup>
    {isTrendingWatchlist && (
      <p>
        <b>Includes assets, which appeared in emerging trends by social data</b>
      </p>
    )}
    <h3 className={styles.heading}>
      The <code>Assets</code> section includes lists of tokens you can use to:
    </h3>
    <ol className={styles.list}>
      <li className={styles.item}>
        <h4 className={styles.title}>
          1. Spot increase or decrease in token usage.
        </h4>
        <p>
          Look at the <b>Daily Active Addresses</b> column to see how many
          unique addresses participated in transactions for that token for the
          last 30 days. Sudden increases in activity can sometimes preceed sharp
          price movements.
        </p>
      </li>
      <li className={styles.item}>
        <h4 className={styles.title}>
          2. See if, and how much, a project is "dumping" its collected ETH
          funds.
        </h4>
        <p>
          Look for this figure in the <b>ETH Spent</b> column. Activity here
          could effect the price of ETH and, by extention, related tokens.
        </p>
      </li>
      <li className={styles.item}>
        <h4 className={styles.title}>
          3. See how active a project's team is in building their product.
        </h4>
        <p>
          Look for this metric in the <b>Dev Activity</b> column, which shows a
          summary of Development activity.
        </p>
      </li>
      <li className={styles.item}>
        <h4 className={styles.title}>4. Compare tokens.</h4>
        <p>Click the column headers to sort by the various metrics.</p>
      </li>
      <li className={styles.item}>
        <h4 className={styles.title}>
          5. Get details, including price charts, for each token.
        </h4>
        <p>Click the token name to drill down to a detail page.</p>
      </li>
    </ol>
  </HelpPopup>
)

export default HelpPopupAssets
