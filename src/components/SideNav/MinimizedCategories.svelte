<script>
  import Svg from 'webkit/ui/Svg/svelte'

  export let pathname = ''
  export let isCollapsed = false

  $: ({ isExplorerPath, isCreatePath, isDashboardsPath } = getActivePath(pathname))

  function getActivePath(pathname) {
    if (pathname === '/') return { isExplorerPath: true }

    if (pathname.startsWith('/dashboards')) return { isDashboardsPath: true }

    return { isCreatePath: true }
  }
</script>

<div class="minimized" class:collapsed={isCollapsed}>
  <div class="sticky">
    {#if isCollapsed}
      <div class="btn row hv-center" class:active={isExplorerPath}>
        <Svg id="folder" w="16" h="14" />
      </div>

      <div class="btn row hv-center" class:active={isDashboardsPath}>
        <Svg id="report" w="16" />
      </div>

      <div class="btn row hv-center" class:active={isCreatePath}>
        <Svg id="plus-circle" w="16" />
      </div>

      <div class="btn row hv-center"><Svg id="time" w="16" /></div>
    {/if}
  </div>
</div>

<style>
  .sticky {
    position: sticky;
    top: 22px;
  }

  .minimized {
    position: absolute;
    top: 22px;
    right: 6px;
    opacity: 0;
    bottom: 0;
  }

  .collapsed {
    opacity: var(--minimized-opacity, 1);
    transition: opacity 0.2s;
  }

  .btn {
    width: 28px;
    height: 28px;
    fill: var(--waterloo);
    margin: 0 0 16px;
  }
</style>
