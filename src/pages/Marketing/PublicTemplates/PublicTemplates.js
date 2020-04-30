import React from 'react'
import cx from 'classnames'
import {connect} from "react-redux";
import {TEMPLATES} from "./utils";
import Icon from "@santiment-network/ui/Icon";
import {getCurrentSanbaseSubscription} from "../../../utils/plans";
import {PRO} from "../../../components/Navbar/NavbarProfileDropdown";
import UpgradeBtn from "../../../components/UpgradeBtn/UpgradeBtn";
import styles from './PublicTemplates.module.scss'

const PublicTemplates = ({isProSanbase}) => {
  return <div className={styles.container}>
    {TEMPLATES.map(({link, title, description, isProRequired}) => {
      const requirePro = isProRequired && !isProSanbase

      return <div key={title} className={cx(styles.template, requirePro && styles.proTemplate)}>
        <div className={styles.title}>{title}</div>

        <div className={styles.description}>{description}</div>

        {requirePro ? <UpgradeBtn showCrownIcon={false} variant='flat' className={styles.proBtn}>
          <>
            <Icon type='crown' className={styles.proIcon} /> PRO Chart Layouts
          </>
        </UpgradeBtn> : <a className={styles.useLink}
           target='_blank'
           rel='noopener noreferrer' href={link}>Use chart layout <Icon className={styles.useIcon} type='pointer-right' /></a>}
      </div>
    })}
  </div>
}

const mapStateToProps = ({ user: { data } }) => {
  const sanbaseSubscription = getCurrentSanbaseSubscription(data)

  const isProSanbase =
    sanbaseSubscription && sanbaseSubscription.plan
      ? sanbaseSubscription.plan.name === PRO
      : false

  return {
    isProSanbase
  }
}

export default connect(mapStateToProps)(PublicTemplates)
