<script>
  import Svg from 'webkit/ui/Svg/svelte'
  export let item
</script>

<div class="row justify v-center">
  <h4>
    {item.title}<br />
    ({item.date})
  </h4>
  <a href={item.url} download>
    <Svg id="download" w="16" />
  </a>
</div>
