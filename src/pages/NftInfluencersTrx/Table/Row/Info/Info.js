import React, { useEffect, useRef } from 'react'
import cx from 'classnames'
import { copy } from 'webkit/utils'
import { dateDifferenceInWords } from 'webkit/utils/dates'
import Svg from 'webkit/ui/Svg/react'
import {
  Activity,
  getTwitterAccount,
  Marketplace,
} from '../../../../Index/Section/NftInfluencers/utils'
import Section from './Section/Section'
import { capitalizeStr } from '../../../../../utils/utils'
import styles from './Info.module.scss'

const Info = ({ data, isOpened }) => {
  const { nft, datetime, trxHash, amount, currencyProject, marketplace } = data

  const account = getTwitterAccount(data)

  const when = dateDifferenceInWords(new Date(datetime))

  const clearTimerRef = useRef()

  useEffect(() => () => clearTimerRef.current && clearTimerRef.current(), [])

  function onCopyAddressClick(address, event) {
    if (clearTimerRef.current) clearTimerRef.current()

    const { currentTarget } = event

    if (currentTarget) currentTarget.ariaLabel = 'Address copied'
    clearTimerRef.current = copy(address)
  }

  return (
    <div className={cx(styles.wrapper, 'fluid column justify', isOpened && styles.opened)}>
      <Section titles={['Twitter influencer', 'Activity']}>
        {account && (
          <a
            href={account.Twitter}
            target='_blank'
            rel='noopener noreferrer'
            className='body-2 row v-center'
          >
            @{account.Name}
            <Svg id='external-link' w={12} className={cx(styles.linkIcon, 'mrg-s mrg--l')} />
          </a>
        )}
        <Activity original={data} />
      </Section>
      <Section isSingle titles={['Collection name']}>
        <span className='mrg-s mrg--r nowrap'>{capitalizeStr(nft.name)}</span>
        <button
          className={cx(styles.address, 'btn expl-tooltip')}
          id={nft.contractAddress.toString()}
          aria-label='Copy address'
          onClick={(event) => onCopyAddressClick(nft.contractAddress, event)}
        >
          <span className='single-line'>{nft.contractAddress}</span>
        </button>
      </Section>
      <Section titles={['Trx hash', 'When']}>
        <button
          className={cx(styles.address, 'btn body-2 expl-tooltip')}
          id={trxHash.toString()}
          aria-label='Copy address'
          onClick={(event) => onCopyAddressClick(trxHash, event)}
        >
          <span className='single-line'>{trxHash}</span>
        </button>
        <div className='body-2'>{when}</div>
      </Section>
      <Section titles={['Price', 'Marketplace']}>
        <div className='body-2'>
          {`${parseFloat(amount.toFixed(3))} ${currencyProject && currencyProject.ticker}`}
        </div>
        <div className='body-2'>
          <Marketplace marketplace={marketplace} />
        </div>
      </Section>
    </div>
  )
}

export default Info
