import React, { useMemo } from 'react'
import toReact from 'svelte-adapter/react'
import { CommentsType } from 'webkit/api/comments'
import SvelteComments from 'webkit/ui/Comments/svelte'
import { useBlockchainAddress } from '../hooks'
import { useUser } from '../../../stores/user'
import { onAnonComment } from '../../../pages/Studio/utils'
import styles from './index.module.scss'

const ReactComments = toReact(SvelteComments, {}, 'div')
const Comments = ({ settings }) => {
  const blockchainAddress = useBlockchainAddress(settings)
  const { user } = useUser()
  const commentsFor = useMemo(() => {
    blockchainAddress.user = {}
    blockchainAddress.title = settings.address
    return blockchainAddress
  }, [settings, blockchainAddress])

  return (
    <div className={styles.wrapper}>
      {commentsFor.id && (
        <ReactComments
          type={CommentsType.Address}
          commentsFor={commentsFor}
          currentUser={user}
          onAnonComment={onAnonComment }
        />
      )}
    </div>
  )
}

export default Comments
