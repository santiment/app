import React, { useEffect, useMemo, useState } from 'react'
import { useField } from 'formik'
import Input from '@santiment-network/ui/Input'
import Select from '@santiment-network/ui/Select/Select'
import { getAddressInfrastructure } from 'webkit/utils/address'
import { track } from 'webkit/analytics'
import StepTitle from '../../StepTitle/StepTitle'
import EventSelector from './EventSelector/EventSelector'
import ConditionsSelector from '../../MetricAndConditions/ConditionsSelector/ConditionsSelector'
import InfoBlock from './InfoBlock/InfoBlock'
import { useProjects } from '../../../../../../../stores/projects'
import { useWalletAssets } from '../../../../../hooks/useWalletAssets'
import { Infrastructure } from '../../../../../../../utils/address'
import { mapAssetsToProjects } from './utils'
import { AlertsEvents } from '../../../../../analytics'
import styles from './WalletAndConditionsSelector.module.scss'

const WalletAndConditionsSelector = () => {
  const [currentEvent, setCurrentEvent] = useState({})
  const [selectedAsset, setSelectedAsset] = useState()
  const [, { value: address }, { setValue: setAddress }] = useField('settings.target.address')
  const [, { value: selector }, { setValue: setSelector }] = useField('settings.selector')
  const { assets = [], infrastructure } = useWalletAssets({
    walletAddress: address,
  })
  const { projects } = useProjects()

  useEffect(() => {
    if (!selectedAsset && selector.slug && projects.length > 0) {
      const currentProject = projects.find((project) => project.slug === selector.slug)
      setSelectedAsset({ value: selector.slug, label: currentProject.name })
    }
  }, [selector, projects])

  useEffect(() => {
    if (selectedAsset) {
      setSelector({ infrastructure, slug: selectedAsset.value })
    }
  }, [selectedAsset])

  useEffect(() => {
    if (address) {
      setSelector({ ...selector, infrastructure: getAddressInfrastructure(address) })
    }
  }, [address])

  const walletProjects = useMemo(() => {
    return projects.length > 0 && assets.length > 0 ? mapAssetsToProjects(projects, assets) : []
  }, [assets, projects])

  let children

  if (!currentEvent.settings) {
    children = <></>
  } else {
    switch (currentEvent.settings.type) {
      case 'wallet_usd_valuation': {
        children = (
          <>
            <StepTitle title='Condition' className={styles.conditionTitle} />
            <InfoBlock metric={currentEvent.settings.type} assets={assets} />
            <div className={styles.conditions}>
              <ConditionsSelector metric={{ category: '' }} isWallet />
            </div>
          </>
        )
        break
      }
      case 'wallet_assets': {
        children = <></>
        break
      }
      case 'wallet_movement':
      default: {
        children = (
          <>
            <StepTitle title='Condition' />
            <div className={styles.row}>
              <div className={styles.label}>Asset</div>
            </div>
            <Select
              placeholder='Select an asset'
              isDisabled={walletProjects.length === 0}
              isClearable={false}
              isSearchable={false}
              options={walletProjects}
              value={selectedAsset}
              onChange={(asset) => {
                track.event(AlertsEvents.SetAlertWalletAsset, { asset })

                setSelectedAsset(asset)
              }}
              className='mrg--b mrg-xl'
            />
            <InfoBlock metric={currentEvent.settings.type} />
            {selector.slug && (
              <>
                <div className={styles.conditions}>
                  <ConditionsSelector metric={{ category: '' }} isWallet />
                </div>
              </>
            )}
          </>
        )
        break
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <StepTitle title='Choose Wallet' className={styles.title} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Wallet address</div>
        {address && infrastructure === Infrastructure.ETH && (
          <a
            href={`https://app.santiment.net/labs/balance?address=${address}`}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
          >
            Open Sanbase
          </a>
        )}
      </div>
      <Input
        placeholder='Type an address'
        value={address}
        onChange={(e) => {
          track.event(AlertsEvents.SetAlertAddress)

          setAddress(e.target.value)
        }}
        className={styles.addressInput}
      />
      <EventSelector
        address={address}
        onEventChange={setCurrentEvent}
        setSelectedAsset={setSelectedAsset}
      />
      {children}
    </div>
  )
}

export default WalletAndConditionsSelector
