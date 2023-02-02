<script>
  import Svg from 'webkit/ui/Svg/svelte'

  export let href
  export let onClick

  function onLinkClick(e) {
    if (onClick) onClick()

    if (href.startsWith('/')) {
      window.__onLinkClick(e)
    }
  }
</script>

<a {href} target="_blank" class="btn-3 border" on:click={onLinkClick}>
  <Svg id="external-link" w="12" />
</a>

<style>
  a {
    border-radius: 6px;
  }
</style>
