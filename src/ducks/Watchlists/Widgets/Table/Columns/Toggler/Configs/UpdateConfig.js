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
  trigger,
  onChange,
  sets,
  title,
  name,
  buttonLabel
}) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <EditForm
      title={title}
      name={name}
      buttonLabel={buttonLabel}
      onFormSubmit={name => onChange(name).then(() => setIsOpened(false))}
      open={isOpened}
      sets={sets}
      toggleOpen={setIsOpened}
      trigger={trigger}
    />
  )
}

UpdateConfig.defaultProps = {
  trigger: <NewConfigTrigger />,
  title: 'New set',
  buttonLabel: 'Create'
}

export default UpdateConfig
