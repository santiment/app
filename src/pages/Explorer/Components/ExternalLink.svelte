<script>
  import Svg from 'webkit/ui/Svg/svelte'
  export let href
</script>

<a
  {href}
  target="_blank"
  class="btn-3 border"
  on:click={href.startsWith('/') ? window.__onLinkClick : null}>
  <Svg id="external-link" w="12" />
</a>

<style>
  a {
    border-radius: 6px;
  }
</style>
