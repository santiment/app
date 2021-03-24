import React, { useState } from 'react'
import Button from '@santiment-network/ui/Button'
import { useUser } from '../../../../../../../stores/user'
import LoginPopup from '../../../../../../../components/banners/feature/PopupBanner'
import EditForm from './EditForm'
import styles from './EditForm.module.scss'

export const NewConfigTrigger = props => (
  <Button variant='flat' border className={styles.trigger} {...props}>
    Save columns as set
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
  const { isLoggedIn } = useUser()
  const [isOpened, setIsOpened] = useState(false)

  if (!isLoggedIn) return <LoginPopup>{trigger}</LoginPopup>

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
