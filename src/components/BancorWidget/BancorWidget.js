import React, { PureComponent } from 'react'
import cx from 'classnames'

const PRIMARY_COLOR = '#14c393'

class BancorWidget extends PureComponent {
  componentDidMount () {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://widget-convert.bancor.network/v1')
    script.addEventListener('load', evt => {
      ;(window.BancorConvertWidget || {}).createInstance({
        type: '1',
        blockchainTypes: ['ethereum'],
        baseCurrencyId: '5a69a9cb1b67798dab40b995',
        pairCurrencyId: '5937d635231e97001f744267',
        primaryColor: PRIMARY_COLOR,
        widgetContainerId: 'bancor-wc-san',
        displayCurrency: 'USD'
      })
    })
    document.body.appendChild(script)
  }

  render () {
    return (
      <div
        className={cx('bancor-wc', this.props.className)}
        id='bancor-wc-san'
      />
    )
  }
}

export default BancorWidget
