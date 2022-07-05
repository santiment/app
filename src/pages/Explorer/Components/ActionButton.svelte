<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Tooltip from 'webkit/ui/Tooltip/svelte'
  import LikeButton from 'webkit/ui/LikeButton'

  export let svgid
  export let counter
  export let tooltip
  export let width = 16
  export let onClick = () => {}
  export let userVotes = 0

  $: isLike = svgid === 'rocket'
</script>

<Tooltip dark position="top" align="center" activeClass="$style.active" openDelay={200}>
  <div
    class="actionbutton row hv-center"
    class:padding={!isLike}
    slot="trigger"
    on:click={!isLike ? onClick : undefined}
  >
    {#if isLike}
      <LikeButton
        totalVotes={counter}
        {userVotes}
        onVote={onClick}
        hasBorder={false}
        class="$style.like"
      />
    {:else}
      <Svg id={svgid} w={width} class="$style.svg" />
      {#if counter >= 0}
        <span>{counter}</span>
      {/if}
    {/if}
  </div>
  <div slot="tooltip" class="c-white">{tooltip}</div>
</Tooltip>

<style>
  .like {
    --bg-hover: var(--green-light-1);
  }

  .actionbutton {
    border-radius: 16px;
    border: none;
    margin-right: 2px;
  }

  .padding {
    padding: 6px 12px;
  }

  .active {
    background-color: var(--green-light-1);
  }

  .active span {
    color: var(--green);
  }

  .svg {
    fill: var(--waterloo);
  }

  .active .svg {
    fill: var(--green);
  }

  span {
    margin-left: 6px;
  }
</style>
