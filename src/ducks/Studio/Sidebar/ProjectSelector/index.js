import React, { useMemo } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Svg from 'webkit/ui/Svg/react'
import { minifyAddress } from 'studio/metrics/utils'
import ProjectSelectDialog from '../../Compare/ProjectSelectDialog'
import { DEFAULT_TABS } from '../../Compare/ProjectSelectTabs'
import { FIAT_MARKET_ASSETS } from '../../../dataHub/fiat'
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon'
import { useDialogState } from '../../../../hooks/dialog'
import styles from './index.module.scss'

const CUSTOM_CATEGORY = {
  Fiat: () => Promise.resolve(FIAT_MARKET_ASSETS),
}

const CUSTOM_TABS = DEFAULT_TABS.concat(Object.keys(CUSTOM_CATEGORY))

const ALL_STABLECOINS = {
  slug: 'stablecoins',
  name: 'Stablecoins',
  ticker: 'Stablecoins',
}
const STABLECOINS_ASSETS = [ALL_STABLECOINS]
const CategoryModifier = {
  All: (assets) => assets.concat(STABLECOINS_ASSETS).concat(FIAT_MARKET_ASSETS),
  Stablecoins: (assets) => STABLECOINS_ASSETS.concat(assets),
}

const Asset = ({ slug, logoUrl, name }) => (
  <>
    <ProjectIcon size={20} slug={slug} logoUrl={logoUrl} className={styles.icon} />
    {name}
    <Icon type='arrow-down' className={styles.arrow} />
  </>
)

const Address = ({ address }) => (
  <>
    <div className={cx(styles.addressIcon, 'row hv-center mrg-xs mrg--r')}>
      <Svg id='report' w='8' />
    </div>

    <span className={styles.address}>{address}</span>

    <Icon type='arrow-down' className={styles.arrow} />
  </>
)

const Selector = ({ slug, name, address, logoUrl, onClick }) => (
  <div className={styles.selector} onClick={onClick}>
    {address ? <Address address={address} /> : <Asset slug={slug} name={name} logoUrl={logoUrl} />}
  </div>
)

const ProjectSelector = ({
  project: { slug, name, logoUrl, address },
  address: masterAddress,
  onProjectSelect,
}) => {
  const { isOpened, closeDialog, openDialog } = useDialogState()
  const categoryModifier = useMemo(() => {
    return masterAddress
      ? {
          ...CategoryModifier,
          All: (assets) =>
            [
              {
                address: masterAddress,
                slug: masterAddress,
                ticker: minifyAddress(masterAddress),
                name: masterAddress,
              },
            ].concat(CategoryModifier.All(assets)),
        }
      : CategoryModifier
  }, [masterAddress])

  function onSelect(project) {
    onProjectSelect(project)
    closeDialog()
  }

  return (
    <ProjectSelectDialog
      open={isOpened}
      activeSlug={address || slug}
      onOpen={openDialog}
      onClose={closeDialog}
      onSelect={onSelect}
      trigger={
        <Selector
          slug={slug}
          logoUrl={logoUrl}
          name={name}
          address={address}
          onClick={openDialog}
        />
      }
      customTabs={CUSTOM_TABS}
      CustomCategory={CUSTOM_CATEGORY}
      CategoryModifier={categoryModifier}
    />
  )
}

export default ProjectSelector
