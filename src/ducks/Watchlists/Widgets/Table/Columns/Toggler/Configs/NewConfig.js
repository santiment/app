import React, { useState } from 'react'
import Button from '@santiment-network/ui/Button'
import EditForm from './EditForm'
import styles from './EditForm.module.scss'

export const NewConfigTrigger = props => (
  <Button variant='flat' border className={styles.trigger} {...props}>
    Save columns as ...
  </Button>
)

const UpdateConfig = ({
  trigger = <NewConfigTrigger />,
  createConfig,
  sets
}) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <EditForm
      title='New set'
      buttonLabel='Create'
      onFormSubmit={({ name }) =>
        createConfig({
          title: name,
          columns: { metrics: ['price_usd_chart_7d', 'volume_usd'] }
        }).then(() => setIsOpened(false))
      }
      open={isOpened}
      sets={sets}
      toggleOpen={setIsOpened}
      trigger={trigger}
    />
  )
}

export default UpdateConfig
