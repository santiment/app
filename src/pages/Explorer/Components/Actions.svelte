<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { copy } from 'webkit/utils'
  import vote from './api/vote'
  import { EntityType, getItemRoute } from '../const'
  import { currentUser } from '../store'
  import { history } from '../../../redux'

  let className = ''
  export { className as class }

  export let isOwner = false
  export let isModerator = false
  export let url
  export let item = {}
  export let type
  export let onVoteCountChange
  export let showCommentAction

  let label = ''
  let voteTimeout

  function onShare() {
    label = 'Copied!'
    copy(url, () => (label = ''), 1500)
  }

  function onVote(e) {
    e.preventDefault()

    if (!$currentUser) {
      history.push('/login')
      return false
    }

    const id = item.trigger ? item.trigger.id : item.id
    const voteType = EntityType[type].voteKey

    vote(id, voteType).then((votes) => {
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

    history.push(getItemRoute(item, type), { openComments: true })
  }
</script>

<div class="actions">
  <div class="note c-white caption" class:show={!!label}>{label}</div>
  <div class="flex hv-center box border c-waterloo {className}" on:click|preventDefault>
    {#if isOwner}
      <Svg id="pencil" w="16" class="btn $style.svg" />
      <Svg id="delete" w="16" class="btn $style.svg" />
      {#if showCommentAction}
        <Svg id="comment" w="16" class="btn $style.svg" on:clck={onComment} />
      {/if}
    {:else}
      {#if showCommentAction}
        <Svg id="comment" w="16" class="btn $style.svg" on:click={onComment} />
      {/if}
      <Svg id="rocket" w="16" class="btn $style.svg" on:click={onVote} />
      <Svg id="share-dots" w="16" class="btn $style.svg" on:click={onShare} />
      {#if isModerator}
        <Svg id="eye-crossed" w="16" class="btn $style.svg" />
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