<script>
  import Svg from 'webkit/ui/Svg/svelte'
  export let item
</script>

<div class="row justify v-center">
  <h4>
    {item.name}
  </h4>
  <a href={item.url} download>
    <Svg id="download" w="16" />
  </a>
</div>

<style>
  h4 {
    max-width: 252px;
  }
</style>