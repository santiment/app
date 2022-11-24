<script>
  import { getContext } from 'svelte'
  import { copy } from 'webkit/utils'
  import { notifications$ } from 'webkit/ui/Notifications'
  import {
    trackVote,
    trackShowComments,
    trackShareLinkCopy,
  } from 'webkit/analytics/events/interaction'
  import { VoteTypeFeature } from 'webkit/ui/LikeButton/index.svelte'
  import { vote, feature } from './api'
  import { showDeleteConfirmationDialog } from './DeleteConfirmationDialog.svelte'
  import { showHideConfirmationDialog } from './HideConfirmationDialog.svelte'
  import { showEditDialog } from './EditDialog.svelte'
  import ActionButton from './ActionButton.svelte'
  import { EntityKeys, EntityType, getItemRoute, getItemUrl } from '../const'
  import { currentUser } from '../store'
  import { history } from '../../../redux'
  import { mutateStoreUserActivity, InteractionType } from '../../../queries/userActivity'
  import { notifyError } from '../helpers'

  let className = ''
  export { className as class }

  export let isOwner = false
  export let item = {}
  export let type

  let totalVotes = item && item.votes ? +item.votes.totalVotes : 0
  let userVotes = item && item.votes ? +item.votes.currentUserVotes : 0
  let copyLabel = 'Copy link'
  let isFeatured = item.trigger ? item.trigger.isFeatured : item.isFeatured

  $: id = item.trigger ? item.trigger.id : item.id
  $: ({ key, voteKey, deleteKey, singular } = EntityType[type])
  $: isPublic = item.trigger ? item.trigger.isPublic : item.isPublic
  $: views = item.trigger ? item.trigger.views : item.views

  const filterExplorerItems = getContext('filterExplorerItems')
  const updateExplorerItem = getContext('updateExplorerItem')

  function onCopy(e) {
    e.preventDefault()
    const url = getItemUrl(item, type)
    copyLabel = 'Copied!'
    copy(url, () => (copyLabel = 'Copy link'), 1500)

    trackShareLinkCopy({ url, feature: VoteTypeFeature[voteKey], source: 'explorer' })
  }

  function onVote(e) {
    if (e) e.preventDefault()

    if (!$currentUser) {
      history.push('/login')
      return false
    }

    totalVotes = totalVotes + 1
    mutateStoreUserActivity(key, id, InteractionType.UPVOTE)
    vote(id, voteKey)
      .then((res) => (totalVotes = res.totalVotes))
      .catch(() => (totalVotes = totalVotes - 1))

    trackVote({ id, feature: VoteTypeFeature[voteKey], source: 'explorer' })
  }

  function onComment(e) {
    e.preventDefault()

    trackShowComments({ id, feature: VoteTypeFeature[voteKey], source: 'explorer' })

    if (!$currentUser) {
      history.push('/login')
      return false
    }

    const route = getItemRoute(item, type, true)
    if (route.startsWith("https://")) {
      window.open(route, '_blank')
    } else {
      history.push(route, { openComments: true })
    }
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

  function onFeature(e, flag = true) {
    e.preventDefault()
    const { title } = item.trigger || item
    feature(key, id, flag)
      .then(() => {
        isFeatured = flag
        notifications$.show({
          variant: 'info',
          title: `Item: ${title}`,
          description: `Set to ${!isFeatured ? 'not' : ''} featured successfully`,
        })
      })
      .catch(() => {
        notifyError({ title: `Item: ${title}` })
      })
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
      <ActionButton
        svgid="rocket"
        onClick={onVote}
        {userVotes}
        counter={totalVotes}
        tooltip="Like"
      />
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
        {#if isPublic}
          <ActionButton
            forceActive={isFeatured}
            svgid="fire"
            onClick={(event) => onFeature(event, !isFeatured)}
            tooltip="Featured"
          />
        {/if}
        <ActionButton svgid="eye-crossed" onClick={onHide} tooltip="Hide" />
        <ActionButton svgid="delete" onClick={onDelete} tooltip="Delete" />
        <ActionButton svgid="eye" tooltip="Views" counter={views} hasbackground={false} />
      {/if}
    {/if}
  </div>
</div>
