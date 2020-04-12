import React from 'react'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import Button from '@santiment-network/ui/Button'
import { showNotification } from '../../actions/rootActions'
import { PROMOTER_MUTATION } from '../../pages/Account/AffilateSettings/promotersGql'
import styles from './CreatePromoter.module.scss'

const CreatePromoter = ({ userData, showAlert, setData }) => {
  const { email } = userData

  return (
    <div className={styles.container}>
      <Mutation mutation={PROMOTER_MUTATION}>
        {(createPromoter, data) => {
          const {
            loading,
            data: { createPromoter: createPromoterData } = {}
          } = data

          if (createPromoterData) {
            setData && setData(createPromoterData)
          }

          return (
            <Button
              variant='fill'
              accent='positive'
              isLoading={loading}
              onClick={() => (email ? createPromoter() : showAlert())}
            >
              Create referral link
            </Button>
          )
        }}
      </Mutation>
    </div>
  )
}

const mapStateToProps = ({ user: { data = {} } }) => {
  return {
    userData: data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showAlert: () => {
      dispatch(
        showNotification({
          variant: 'error',
          title: 'You need to bind email to your account'
        })
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePromoter)
