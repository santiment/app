import React, { useEffect, useMemo, useState } from 'react'
import { useField } from 'formik'
import Input from '@santiment-network/ui/Input'
import Select from '@santiment-network/ui/Select/Select'
import StepTitle from '../../StepTitle/StepTitle'
import NextStep from '../../NextStep/NextStep'
import ConditionsSelector from '../../MetricAndConditions/ConditionsSelector/ConditionsSelector'
import { useProjects } from '../../../../../../../stores/projects'
import { useWalletAssets } from '../../../../../hooks/useWalletAssets'
import { Infrastructure } from '../../../../../../../utils/address'
import { mapAssetsToProjects } from './utils'
import styles from './WalletAndConditionsSelector.module.scss'

const WalletAndConditionsSelector = ({
  selectorSettings: { setSelectedStep, selectedStep, visitedSteps, setVisitedSteps },
}) => {
  const [, { value: address }, { setValue: setAddress }] = useField('settings.target.address')
  const [, { value: selector }, { setValue: setSelector }] = useField('settings.selector')
  const { assets, infrastructure } = useWalletAssets({
    walletAddress: address,
  })
  const { projects } = useProjects()
  const [selectedAsset, setSelectedAsset] = useState()

  useEffect(() => {
    if (!selectedAsset && selector.slug) {
      const currentProject = projects.find((project) => project.slug === selector.slug)
      setSelectedAsset({ value: selector.slug, label: currentProject.name })
    }
  }, [selector])

  useEffect(() => {
    if (selectedAsset) {
      setSelector({ infrastructure, slug: selectedAsset.value })
    }
  }, [selectedAsset])

  const walletProjects = useMemo(() => {
    return projects.length > 0 && assets.length > 0 ? mapAssetsToProjects(projects, assets) : []
  }, [assets, projects])

  function handleNextClick() {
    setSelectedStep(selectedStep + 1)

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps((prev) => [...prev, selectedStep + 1])
    }
  }

  let children = (
    <>
      <div className={styles.titleWrapper}>
        <StepTitle title='Choose Wallet & Conditions' className={styles.title} />
        <NextStep
          onClick={handleNextClick}
          label='Notification settings'
          className={styles.nextBtn}
        />
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
        onChange={(e) => setAddress(e.target.value)}
        className={styles.addressInput}
      />
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
        onChange={(asset) => setSelectedAsset(asset)}
        className={styles.assetSelect}
      />
      <StepTitle disabled={!selector.slug} title='Conditions' />
      {selector.slug && (
        <div className={styles.conditions}>
          <ConditionsSelector metric={{ category: '' }} isWallet />
        </div>
      )}
    </>
  )

  return <div className={styles.wrapper}>{children}</div>
}

export default WalletAndConditionsSelector
