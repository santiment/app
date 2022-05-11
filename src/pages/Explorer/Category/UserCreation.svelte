<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Profile from 'webkit/ui/Profile/svelte'
  import Tooltip from 'webkit/ui/Tooltip/svelte'
  import Info from 'webkit/ui/Profile/Info.svelte'
  import Actions from '../Components/Actions'
  import { currentUser } from '../store'
  import { history } from '../../../redux'
  import { getItemRoute } from '../const'

  export let item = {}
  export let small = false
  export let showActions = false
  export let url
  export let type

  let hoverActions = false

  $: totalVotes = item.votes.totalVotes
  $: ({ user, commentsCount } = item)

  function onClick(e) {
    if (['use', 'svg'].includes(e.target.tagName)) {
      e.preventDefault()
      return
    }
    if (url.includes(location.hostname)) {
      e.preventDefault()
      history.push(getItemRoute(item, type))
    }
  }
</script>

<a href={url} target="_blank" on:click={onClick} class="hoverable {hoverActions && 'forcehover'}">
  <div class="row v-center nowrap relative">
    {#if showActions}
      <Actions
        class="$style.actions"
        isOwner={$currentUser && user && user.id === $currentUser.id}
        {url}
        {item}
        {type}
        showCommentAction={commentsCount >= 0}
        onVoteCountChange={(newTotalVotes) => (totalVotes = newTotalVotes)}
      />
    {/if}
    <h3 class="mrg-l mrg--r" class:body-2={!small}>
      {item.trigger ? item.trigger.title : item.title}
    </h3>

    <slot />
  </div>
</a>

<div class="bottom row justify v-center c-waterloo mrg-s mrg--t" class:caption={small}>
  <Tooltip openDelay={110}>
    <svelte:fragment slot="trigger">
      <Profile {user} class="author fluid" />
    </svelte:fragment>

    <svelte:fragment slot="tooltip">
      <Info {user} currentUser={$currentUser} />
    </svelte:fragment>
  </Tooltip>

  <a
    class="stats row hv-center"
    href={url}
    target="_blank"
    on:click={onClick}
    on:mouseenter={() => (hoverActions = true)}
    on:mouseleave={() => (hoverActions = false)}
  >
    {#if commentsCount >= 0}
      <div class="row v-center">
        <Svg id="comment" w="12" h="10.5" class="mrg-s mrg--r" />
        {commentsCount}
      </div>
    {/if}

    <div class="row v-center mrg-l mrg--l">
      <Svg id="rocket" w="10.5" h="14" class="mrg-s mrg--r" />
      {totalVotes}
    </div>
  </a>
</div>

<style>
  h3 {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bottom {
    fill: var(--waterloo);
  }

  .bottom :global(.author) {
    --img-size: 24px;
    --black: var(--waterloo);
  }

  .actions {
    display: none;
  }

  .hoverable:hover .actions,
  .forcehover .actions {
    display: block;
  }

  .stats {
    justify-content: end;
  }
</style>
