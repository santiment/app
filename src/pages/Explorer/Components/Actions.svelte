<script>
  import { getContext } from 'svelte'
  import Svg from 'webkit/ui/Svg/svelte'
  import { copy } from 'webkit/utils'
  import { vote } from './api'
  import { showDeleteConfirmationDialog } from './DeleteConfirmationDialog.svelte'
  import { showHideConfirmationDialog } from './HideConfirmationDialog.svelte'
  import { showEditDialog } from './EditDialog.svelte'
  import { EntityType, getItemRoute } from '../const'
  import { currentUser } from '../store'
  import { history } from '../../../redux'
  import { mutateStoreUserActivity, InteractionType } from '../../../queries/userActivity'

  let className = ''
  export { className as class }

  export let isOwner = false
  export let url
  export let item = {}
  export let type
  export let onVoteCountChange
  export let showCommentAction

  let label = ''
  let voteTimeout

  $: id = item.trigger ? item.trigger.id : item.id
  $: ({ key, voteKey, deleteKey, singular } = EntityType[type])

  const filterExplorerItems = getContext('filterExplorerItems')
  const updateExplorerItem = getContext('updateExplorerItem')

  function onShare(e) {
    e.preventDefault()
    label = 'Copied!'
    copy(url, () => (label = ''), 1500)
  }

  function onVote(e) {
    e.preventDefault()

    if (!$currentUser) {
      history.push('/login')
      return false
    }

    vote(id, voteKey).then((votes) => {
      mutateStoreUserActivity(key, id, InteractionType.UPVOTE)
      onVoteCountChange(votes.totalVotes)
      clearTimeout(voteTimeout)
      label = 'Voted!'
      voteTimeout = setTimeout(() => {
        label = ''
      }, 1500)
    })
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

<div class="actions">
  <div class="note c-white caption" class:show={!!label}>{label}</div>
  <div class="flex hv-center box border c-waterloo {className}">
    {#if isOwner}
      <Svg id="pencil" w="16" class="btn $style.svg" on:click={onEdit} />
      <Svg id="delete" w="16" class="btn $style.svg" on:click={onDelete} />
      {#if showCommentAction}
        <Svg id="comment" w="16" class="btn $style.svg" on:click={onComment} />
      {/if}
    {:else}
      {#if showCommentAction}
        <Svg id="comment" w="16" class="btn $style.svg" on:click={onComment} />
      {/if}
      <Svg id="rocket" w="16" class="btn $style.svg" on:click={onVote} />
      <Svg id="share-dots" w="16" class="btn $style.svg" on:click={onShare} />
      {#if $currentUser && $currentUser.isModerator}
        <Svg id="eye-crossed" w="16" class="btn $style.svg" on:click={onHide} />
        <Svg id="delete" w="16" class="btn $style.svg" on:click={onDelete} />
      {/if}
    {/if}
  </div>
</div>

<style>
  .actions {
    position: absolute;
    right: -8px;
    top: -32px;
    height: 40px;
    z-index: 10;
  }

  .svg {
    padding: 12px;
  }

  .note {
    opacity: 0;
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--fiord);
    border-radius: 4px;
    padding: 5px 12px;
    transition: all 0.2s linear;
  }

  .show {
    opacity: 1;
  }
</style>
