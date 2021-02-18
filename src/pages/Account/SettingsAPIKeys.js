import React, { useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import copy from 'copy-to-clipboard'
import Settings from './Settings'
import * as actions from '../../actions/types'
import ApiCallsStatistic, { API_KEYS_STATS } from './ApiCallsStatistic'
import styles from './SettingsAPIKeys.module.scss'

let genTimer

const SettingsAPIKeys = ({ apikeys = [], generateAPIKey, revokeAPIKey }) => {
  const [copiedShown, setCopiedShown] = useState(false)

  function showCopiedTooltip () {
    setCopiedShown(true)
    setTimeout(() => setCopiedShown(false), 1000)
  }

  function onGenClick () {
    clearTimeout(genTimer)
    genTimer = setTimeout(generateAPIKey, 300)
  }

  return (
    <Settings id='api-keys' header='API keys'>
      <Settings.Row>
        <div className={styles.setting__left}>
          <Label className={styles.setting__description} accent='waterloo'>
            The api key can only be used to fetch data and not to execute
            graphql mutations.
            <br />
            <br />
            You can try out queries through our{' '}
            <a
              href='https://api.santiment.net/graphiql?query=%7B%0A%20%20networkGrowth(from%3A%20%222019-05-09T11%3A25%3A04.894Z%22%2C%20interval%3A%20%221d%22%2C%20slug%3A%20%22ethereum%22%2C%20to%3A%20%222019-06-23T11%3A25%3A04.894Z%22)%20%7B%0A%20%20%20%20newAddresses%0A%20%20%20%20datetime%0A%20%20%7D%0A%7D%0A&variables=%7B%7D'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
            >
              web explorer
            </a>{' '}
            or explore our{' '}
            <a
              href='https://academy.santiment.net/sanapi/'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
            >
              documentation
            </a>{' '}
            to get started.
          </Label>
        </div>
        <div>
          <div className={styles.wrapper}>
            {apikeys.length > 0 ? (
              apikeys.map(apikey => (
                <div key={apikey} className={styles.keyContainer}>
                  <div
                    className={cx(styles.apikey, copiedShown && styles.copied)}
                  >
                    <input
                      className={styles.apikey__input}
                      defaultValue={apikey}
                      readOnly
                    />
                    <Icon
                      onClick={() => {
                        copy(apikey)
                        showCopiedTooltip()
                      }}
                      type='copy'
                      className={styles.apikey__icon}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      revokeAPIKey(apikey)
                    }}
                    accent='negative'
                  >
                    Revoke
                  </Button>
                </div>
              ))
            ) : (
              <Button onClick={onGenClick} variant='fill' accent='positive'>
                Generate
              </Button>
            )}
          </div>
        </div>
      </Settings.Row>

      <ApiCallsStatistic type={API_KEYS_STATS.APIKEY} />
    </Settings>
  )
}

const mapStateToProps = ({
  user: {
    data: { apikeys = [] }
  }
}) => ({
  apikeys
})

const mapDispatchToProps = dispatch => ({
  generateAPIKey: () =>
    dispatch({
      type: actions.USER_APIKEY_GENERATE
    }),
  revokeAPIKey: apikey =>
    dispatch({
      type: actions.USER_APIKEY_REVOKE,
      apikey
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsAPIKeys)
