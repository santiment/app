import React, { useRef } from 'react'
import cx from 'classnames'
import { copy } from 'webkit/utils'
import Svg from 'webkit/ui/Svg/react'
import {
  Activity,
  getTwitterAccount,
  Marketplace,
} from '../../../../Index/Section/NftInfluencers/utils'
import { dateDifferenceInWords } from '../../../../../utils/dates'
import { capitalizeStr } from '../../../../../utils/utils'
import styles from './Info.module.scss'

const Info = ({ data, isOpened }) => {
  const account = getTwitterAccount(data)
  const { nft, datetime, trxHash, amount, currencyProject, marketplace } = data

  const clearTimerRef = useRef()

  function onCopyAddressClick(address) {
    if (clearTimerRef.current) clearTimerRef.current()

    const node = document.getElementById(address)

    if (node) node.ariaLabel = 'Address copied'
    clearTimerRef.current = copy(address)
  }

  const when = dateDifferenceInWords({
    from: new Date(datetime),
    to: new Date(),
    format: 'd',
  })

  return (
    <div className={cx(styles.wrapper, 'fluid column justify', isOpened && styles.opened)}>
      <div className='row justify'>
        <div className='column'>
          <div className='txt-m c-casper'>Twitter influencer</div>
          <div>
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
          </div>
        </div>
        <div className='column justify'>
          <div className='txt-m c-casper'>Activity</div>
          <Activity original={data} />
        </div>
      </div>
      <div className='column'>
        <div className='txt-m c-casper'>Collection name</div>
        <div className='body-2 row v-center justify'>
          <span className='mrg-s mrg--r nowrap'>{capitalizeStr(nft.name)}</span>
          <button
            className={cx(styles.address, 'btn-0 expl-tooltip')}
            id={nft.contractAddress.toString()}
            aria-label='Copy address'
            onClick={() => onCopyAddressClick(nft.contractAddress)}
          >
            <span className='nowrap line-clamp'>{nft.contractAddress}</span>
          </button>
        </div>
      </div>
      <div className='row justify'>
        <div className='column'>
          <div className='txt-m c-casper'>Trx hash</div>
          <button
            className={cx(styles.address, 'btn-0 body-2 expl-tooltip')}
            id={trxHash.toString()}
            aria-label='Copy address'
            onClick={() => onCopyAddressClick(trxHash)}
          >
            <span className='nowrap line-clamp'>{trxHash}</span>
          </button>
        </div>
        <div className='column justify txt-right'>
          <div className='txt-m c-casper'>When</div>
          <div className='body-2'>{when}</div>
        </div>
      </div>
      <div className='row justify'>
        <div className='column'>
          <div className='txt-m c-casper'>Price</div>
          <div className='body-2'>
            {`${parseFloat(amount.toFixed(3))} ${currencyProject && currencyProject.ticker}`}
          </div>
        </div>
        <div className='column justify txt-right'>
          <div className='txt-m c-casper'>Marketplace</div>
          <div className='body-2'>
            <Marketplace marketplace={marketplace} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
