<script>
  import { getContext } from 'svelte'
  import { copy } from 'webkit/utils'
  import { vote } from './api'
  import { showDeleteConfirmationDialog } from './DeleteConfirmationDialog.svelte'
  import { showHideConfirmationDialog } from './HideConfirmationDialog.svelte'
  import { showEditDialog } from './EditDialog.svelte'
  import ActionButton from './ActionButton.svelte'
  import { EntityType, getItemRoute, getItemUrl } from '../const'
  import { currentUser } from '../store'
  import { history } from '../../../redux'
  import { mutateStoreUserActivity, InteractionType } from '../../../queries/userActivity'

  let className = ''
  export { className as class }

  export let isOwner = false
  export let item = {}
  export let type

  let totalVotes = item && item.votes ? +item.votes.totalVotes : 0
  let copyLabel = 'Copy link'

  $: id = item.trigger ? item.trigger.id : item.id
  $: ({ key, voteKey, deleteKey, singular } = EntityType[type])

  const filterExplorerItems = getContext('filterExplorerItems')
  const updateExplorerItem = getContext('updateExplorerItem')

  function onCopy(e) {
    e.preventDefault()
    copyLabel = 'Copied!'
    copy(getItemUrl(item, type), () => (copyLabel = 'Copy link'), 1500)
  }

  function onVote(e) {
    e.preventDefault()

    if (!$currentUser) {
      history.push('/login')
      return false
    }

    totalVotes = totalVotes + 1
    mutateStoreUserActivity(key, id, InteractionType.UPVOTE)
    vote(id, voteKey).catch(() => (totalVotes = totalVotes - 1))
  }

  function onComment(e) {
    e.preventDefault()

    if (!$currentUser) {
      history.push('/login')
      return false
    }

    history.push(getItemRoute(item, type, true), { openComments: true })
  }

  function onDelete(e) {
    e.preventDefault()
    const isModerator = $currentUser && $currentUser.isModerator
    showDeleteConfirmationDialog(
      {
        item,
        singular,
        id,
        deleteKey: isModerator ? key : deleteKey,
        isModerator,
      },
      filterExplorerItems,
    )
  }

  function onEdit(e) {
    e.preventDefault()
    const { title, description = '', isPublic } = item.trigger || item
    showEditDialog(
      {
        id,
        item,
        singular,
        title,
        description,
        isPublic,
        editKey: deleteKey,
      },
      updateExplorerItem,
    )
  }

  function onHide(e) {
    e.preventDefault()
    showHideConfirmationDialog({ key, singular, id, item }, filterExplorerItems)
  }
</script>

<div>
  <div class="row hv-center c-waterloo {className}">
    {#if isOwner}
      <ActionButton svgid="pencil" onClick={onEdit} tooltip="Edit" />
      <ActionButton svgid="delete" onClick={onDelete} tooltip="Delete" />
      {#if item.commentsCount >= 0}
        <ActionButton
          svgid="comment"
          onClick={onComment}
          counter={item.commentsCount}
          tooltip="Comment"
        />
      {/if}
    {:else}
      <ActionButton svgid="rocket" onClick={onVote} counter={totalVotes} tooltip="Like" />
      {#if item.commentsCount >= 0}
        <ActionButton
          svgid="comment"
          onClick={onComment}
          counter={item.commentsCount}
          tooltip="Comment"
        />
      {/if}
      <ActionButton svgid="link" onClick={onCopy} tooltip={copyLabel} />
      {#if $currentUser && $currentUser.isModerator}
        <ActionButton svgid="eye-crossed" onClick={onHide} tooltip="Hide" />
        <ActionButton svgid="delete" onClick={onDelete} tooltip="Delete" />
      {/if}
    {/if}
  </div>
</div>
