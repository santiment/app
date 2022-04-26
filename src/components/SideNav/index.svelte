<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Section from './Section.svelte'

  export let pathname = ''

  $: console.log(pathname)

  const CREATE_LINKS = [
    ['Chart layout', '/charts', 'chart'],
    ['Watchlist', '/watchlist', 'report'],
    ['Screener', '/screener', 'screener'],
    ['Address', '/address', 'wallet'],
    ['Alert', '/alerts', 'alert'],
  ]

  const RECENTS = []
</script>

<aside>
  <div class="container txt-m">
    <a href="/" class="btn" class:active={pathname === '/'} on:click={window.__onLinkClick}>
      <Svg id="info" w="16" h="14" class="mrg-m mrg--r" />
      Explorer
    </a>

    <Section title="Create" icon="plus-circle" links={CREATE_LINKS} {pathname} />
    <Section title="Recent" icon="time" links={CREATE_LINKS} {pathname} />
  </div>
</aside>

<style lang="scss">
  aside {
    position: absolute;
    left: 0;
    top: 70px;
    z-index: 25;
    height: 100%;
    color: var(--fiord);
    fill: var(--waterloo);
  }

  .container {
    position: sticky;
    top: 0;
    height: 100vh;
    background: var(--athens);
    padding: 24px 16px;
    width: 240px;

    & :global {
      a.btn {
        display: flex;
        align-items: center;
        padding: 10px 12px;
        --color-hover: var(--green);

        &.active {
          --bg: var(--white);
          --color: var(--black);
        }
      }
    }
  }
</style>
