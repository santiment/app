<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Tooltip from 'webkit/ui/Tooltip/svelte'

  export let svgid
  export let counter
  export let tooltip
  export let width = 16
  export let onClick = () => {}
</script>

<Tooltip dark position="top" align="center" activeClass="$style.active" openDelay={200}>
  <div class="actionbutton row hv-center" slot="trigger" on:click={onClick}>
    <Svg id={svgid} w={width} class="$style.svg" />
    {#if counter >= 0}
      <span>{counter}</span>
    {/if}
  </div>
  <div slot="tooltip" class="c-white">{tooltip}</div>
</Tooltip>

<style>
  .actionbutton {
    padding: 6px 12px;
    border-radius: 16px;
    border: none;
    margin-right: 2px;
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
