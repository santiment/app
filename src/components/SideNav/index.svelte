<script>
  import { onDestroy } from 'svelte'
  import Svg from 'webkit/ui/Svg/svelte'
  import MinimizedCategories from './MinimizedCategories.svelte'
  import Recent from './Recent.svelte'

  export let root
  export let pathname = '/'

  let isPeeked = false

  $: isCollapsed = pathname !== '/'
  $: root.classList.toggle('$style.shifted', isCollapsed)

  const CREATE_LINKS = [
    ['Charts', '/charts', 'chart'],
    ['Watchlists', '/watchlists', 'report'],
    ['Screener', '/screener/new', 'screener'],
    ['Alerts', '/alerts', 'alert'],
    ['Queries (Beta)', '/queries', 'queries'],
    ['Insights', 'https://insights.santiment.net/', 'insight', '_blank'],
  ]

  onDestroy(() => {
    root.classList.remove('$style.shifted')
  })
</script>

<aside
  class:collapsed={isCollapsed}
  on:mouseenter={() => (isPeeked = true)}
  on:mouseleave={() => (isPeeked = false)}
>
  <div class="content">
    <MinimizedCategories {pathname} {isCollapsed} />
    <div class="container txt-m" class:no-scrollbar={isCollapsed}>
      <div class="links">
        <a href="/" class="btn" class:active={pathname === '/'} on:click={window.__onLinkClick}>
          <Svg id="folder" w="16" h="14" class="mrg-m mrg--r" />
          Explorer
        </a>
        <a
          href="/dashboards"
          class="btn mrg-s mrg--t"
          class:active={pathname.startsWith('/dashboards')}
          on:click={window.__onLinkClick}
        >
          <Svg id="report" w="16" class="mrg-m mrg--r" />
          Dashboards
        </a>

        {#each CREATE_LINKS as [label, href, icon, target]}
          <a
            {href}
            class="btn mrg-xs mrg--t"
            class:active={pathname === href}
            on:click={!target ? window.__onLinkClick : undefined}
            {target}
          >
            <Svg id={icon} w="16" class="mrg-m mrg--r" />

            <span>{label}</span>

            {#if target}
              <Svg id="external-link" w="12" class="mrg-m mrg--l" />
            {/if}
          </a>
        {/each}

        <Recent {pathname} {isPeeked} />
      </div>
    </div>
  </div>
</aside>
{#if !isCollapsed}
  <div class="xmas">
    <Svg illus id="christmas/left-top-snow" w="353" h="290" class="$style.left-snow" />
  </div>
{/if}

<style lang="scss">
  aside {
    position: absolute;
    top: 64px;
    left: 0;
    bottom: 0;
    z-index: 25;
    width: 240px;
    color: var(--fiord);
    fill: var(--waterloo);
    transition: transform 180ms;
  }

  .content {
    background: var(--athens);
    height: 100%;

    & :global {
      a.btn {
        display: flex;
        align-items: center;
        padding: 10px 12px;
        --color-hover: var(--green);
      }

      .btn.active {
        --bg: var(--white);
        --color: var(--black);
      }
    }
  }

  .container {
    position: sticky;
    top: 0;
    height: calc(100vh - 64px);
    background: var(--athens);
    padding: 24px 16px;
    overflow: auto;
    z-index: 6;

    &::-webkit-scrollbar {
      display: none;
    }

    &:hover::-webkit-scrollbar {
      display: initial;
    }
  }

  .collapsed {
    transform: translateX(-200px);

    .links {
      transform: translateX(-100px);
      opacity: 0;
    }

    &:hover {
      transform: translateX(0);
      --bg-opacity: 0.5;
      --minimized-opacity: 0;

      .links {
        transform: translate(0px);
        opacity: 1;
      }

      .container {
        background-color: var(--athens);
      }
    }
  }

  .collapsed::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    background: #000;
    pointer-events: none;
    z-index: -1;
    width: 200vw;
    opacity: var(--bg-opacity, 0);
    transition: opacity 0.15s;
  }

  .links {
    transition: transform 0.15s, opacity 0.2s;
  }

  .shifted {
    padding-left: 40px;

    :global(header) {
      margin-left: -40px;
    }
  }

  .xmas {
    position: absolute;
    left: 180px;
    top: 20px;
    width: 353px;
    height: 100%;
  }

  .left-snow {
    position: sticky;
    top: -40px;
    z-index: 2;
    --cyan: #d7f6fc;

    :global(.night-mode) & {
      --cyan: #253a4b;
    }
  }
</style>
