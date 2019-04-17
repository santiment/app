import React from 'react'
import { connect } from 'react-redux'
import { Icon, Label, Button } from '@santiment-network/ui'
import copy from 'copy-to-clipboard'
import Settings from './Settings'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsAPIKeys = ({ apikey, generateAPIKey, revokeAPIKey }) => (
  <Settings id='api-keys' header='API keys'>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>API Keys</Label>
        <Label className={styles.setting__description} accent='waterloo'>
          The api key will give you access to the data that requires SAN token
          staking.
          <br />
          The api key can only be used to fetch data and not to execute graphql
          mutations.
        </Label>
      </div>
      <div>
        <div className={styles.setting_apikey}>
          {apikey ? (
            <>
              <div className={styles.apikey}>
                <input
                  className={styles.apikey__input}
                  defaultValue={apikey}
                  readOnly
                />
                <Icon
                  onClick={() => copy(apikey)}
                  type='copy'
                  className={styles.apikey__icon}
                />
              </div>
              <Button onClick={() => revokeAPIKey(apikey)} accent='negative'>
                Revoke
              </Button>
            </>
          ) : (
            <Button onClick={generateAPIKey} variant='fill' accent='positive'>
              Generate
            </Button>
          )}
        </div>
      </div>
    </Settings.Row>
  </Settings>
)

const mapStateToProps = ({
  user: {
    data: { apikeys = [] }
  }
}) => ({
  apikey: apikeys[0]
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
