import React from 'react'
import { Modal } from '@santiment-network/ui'
import StickyBannerContent from './StickyBannerContent'

const BannerMobile = () => {
  return (
    <Modal trigger={<></>} defaultOpen>
      {closeModal => <StickyBannerContent onClose={closeModal} />}
    </Modal>
  )
}

export default BannerMobile
