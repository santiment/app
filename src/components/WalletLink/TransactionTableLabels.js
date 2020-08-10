import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import styles from './TransactionTableLabels.module.scss'

const HARDCODED_LINKS = {
  defisaver: 'https://defisaver.com/',
  pooltogether: 'https://www.pooltogether.com/',
  dydx: 'https://dydx.exchange/',
  compound: 'https://compound.finance/',
  bzx: 'https://bzx.network/',
  defizap: 'https://defizap.com/',
  makerdao: 'https://makerdao.com/ru/',
  iearn: 'https://yearn.finance/',
  defimoneymarket: 'https://defimoneymarket.com/',
  chai: 'https://chai.money/',
  tokensets: 'https://www.tokensets.com/',
  eidoo: 'https://eidoo.io/',
  aave: 'https://aave.com/',
  celsius: 'https://celsius.network/',
  nexo: 'https://nexo.io/',
  nuonetwork: 'https://www.nuo.network/',
  synthetix: 'https://www.synthetix.io/',
  instadapp: 'https://instadapp.io/',
  wbtc: 'https://wbtc.network/'
}

const LabelWrapper = ({ metadata }) => {
  if (!metadata) {
    return null
  }

  const decoded = JSON.parse(metadata)
  const { owner } = decoded

  const linkRef = HARDCODED_LINKS[owner]

  if (linkRef) {
    return (
      <a
        className={cx(styles.label, styles.link)}
        target='_blank'
        rel='noopener noreferrer'
        href={linkRef}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {owner}
      </a>
    )
  } else {
    return <Label className={styles.label}>{owner}</Label>
  }
}

const LabelRenderer = ({ name, metadata }) => {
  switch (name) {
    case 'decentralized_exchange': {
      return <LabelWrapper metadata={metadata} />
    }
    case 'centralized_exchange': {
      return <LabelWrapper metadata={metadata} />
    }
    case 'defi': {
      return <LabelWrapper metadata={metadata} />
    }
    default: {
      return null
    }
  }
}

const TransactionTableLabels = ({ labels }) =>
  labels.map((item, index) => <LabelRenderer key={index} {...item} />)

export default TransactionTableLabels
