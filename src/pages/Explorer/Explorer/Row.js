import React from 'react'
import User from './User'
import Stat from './Stat'
import Tags from './Tags'
import ProjectIcons from './ProjectIcons'
import styles from './explorer.module.scss'

// TODO remove me
const PROJECTS = [
    {
      "darkLogoUrl": null,
      "id": "34001",
      "logoUrl": "https://stage-sanbase-images.s3.amazonaws.com/uploads/logo64_contents-protocol.png",
      "name": "Contents Protocol",
      "ticker": "CPT"
    },
    {
      "darkLogoUrl": null,
      "id": "33904",
      "logoUrl": "https://stage-sanbase-images.s3.amazonaws.com/uploads/logo64_crypto-com-chain.png",
      "name": "Crypto.com Chain",
      "ticker": "CRO"
    },
    {
      "darkLogoUrl": null,
      "id": "34083",
      "logoUrl": "https://stage-sanbase-images.s3.amazonaws.com/uploads/logo64_krios.png",
      "name": "Krios",
      "ticker": "KRI"
    },
    {
      "darkLogoUrl": null,
      "id": "34081",
      "logoUrl": "https://stage-sanbase-images.s3.amazonaws.com/uploads/logo64_uni-coin.png",
      "name": "UNI COIN",
      "ticker": "UNI"
    },
    {
      "darkLogoUrl": null,
      "id": "34074",
      "logoUrl": null,
      "name": "Ocean Protocol",
      "ticker": "OCEAN"
    },
    {
      "darkLogoUrl": null,
      "id": "33568",
      "logoUrl": "https://stage-sanbase-images.s3.amazonaws.com/uploads/logo64_wax.png",
      "name": "WAX",
      "ticker": "WAXP"
    }
]

const Row = ({entity}) => {
    return (
        <div className={styles.row}>
            <div className={styles.head}>
                <div className={styles.title}>
                    <h2>Quick 'Coin Health' audit template</h2>
                    <ProjectIcons projects={PROJECTS} />
                </div>
                <entity.Icon />
            </div>
            <div className={styles.footer}>
                <User />
                <Stat />
            </div>
        </div>
    )
}

export default Row