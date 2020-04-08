import React from 'react'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import Button from '@santiment-network/ui/Button'
import { PROMOTER_MUTATION } from '../../pages/Account/AffilateSettings/promotersGql'
import styles from './CreatePromoter.module.scss'

const CreatePromoter = ({ userId }) => {
  return (
    <div className={styles.container}>
      <Mutation mutation={PROMOTER_MUTATION}>
        {(createPromoter, { loading }) => (
          <Button
            variant='fill'
            accent='positive'
            isLoading={loading}
            onClick={() =>
              createPromoter({ variables: { refId: userId.toString() } })
            }
          >
            Create referral link
          </Button>
        )}
      </Mutation>
    </div>
  )
}

const mapStateToProps = ({ user: { data: { id } = {} } }) => {
  return {
    userId: id
  }
}

export default connect(mapStateToProps)(CreatePromoter)
