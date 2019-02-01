import React, { Component } from 'react'

const PRIMARY_COLOR = '#14c393'

class BancorWidget extends Component {
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
    return <div className='bancor-wc' id='bancor-wc-san' />
  }
}

export default BancorWidget
