import React from 'react'
import cx from 'classnames'
import dashboardsStyles from '../../dashboards.module.scss'

const Section = ({ title, description, id, children }) => (
  <div id={id}>
    {title && <h4 className={`h4 txt-b ${description ? 'mrg-s' : 'mrg-xxl'} mrg--b`}>{title}</h4>}
    {description && (
      <p className={cx(dashboardsStyles.description, 'body-2 mrg-xxl mrg--b')}>{description}</p>
    )}
    {children}
  </div>
)

export default Section
