<script>
  export let item
</script>

<div>
  <div class="row justify v-center mrg--b mrg-s">
    <h5>{item.name}</h5>
    <h6 class="caption">{item.volume} volume</h6>
  </div>
  <ul class="row v-center c-waterloo caption">
    {#each item.tags.slice(0, 5) as item}
      <li class="mrg-xs mrg--r ">{item}</li>
    {/each}
    {#if item.tags.length > 5}
      <li>+{item.length - 5}</li>
    {/if}
  </ul>
</div>

<style>
  li {
    min-width: 14px;
    padding: 4px 8px;
    border-radius: 12px;
    background: var(--athens);
  }
</style>
