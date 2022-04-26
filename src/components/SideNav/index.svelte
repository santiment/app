<script>
  import { onDestroy } from 'svelte'
  import Svg from 'webkit/ui/Svg/svelte'
  import Section from './Section.svelte'
  import MinimizedCategories from './MinimizedCategories.svelte'

  export let root
  export let pathname = '/'

  $: console.log(pathname)

  $: isCollapsed = pathname !== '/'
  $: root.classList.toggle('$style.shifted', isCollapsed)

  const CREATE_LINKS = [
    ['Chart layout', '/charts', 'chart'],
    ['Watchlist', '/watchlists', 'report'],
    ['Screener', '/screener/new', 'screener'],
    ['Address', '/labs/balance', 'wallet'],
    ['Alert', '/alerts', 'alert'],
  ]

  const RECENTS = []

  onDestroy(() => {
    root.classList.remove('$style.shifted')
  })
</script>

<aside class:collapsed={isCollapsed}>
  <div class="content">
    <div class="container txt-m">
      <MinimizedCategories {pathname} {isCollapsed} />

      <div class="links">
        <a href="/" class="btn" class:active={pathname === '/'} on:click={window.__onLinkClick}>
          <Svg id="folder" w="16" h="14" class="mrg-m mrg--r" />
          Explorer
        </a>

        <Section title="Create" icon="plus-circle" links={CREATE_LINKS} {pathname} />
        <Section title="Recent" icon="time" links={CREATE_LINKS} {pathname} />
      </div>
    </div>
  </div>
</aside>

<style lang="scss">
  aside {
    position: absolute;
    top: 70px;
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
  }

  .container {
    position: sticky;
    top: 0;
    height: calc(100vh - 70px);
    padding: 24px 16px;

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
</style>
