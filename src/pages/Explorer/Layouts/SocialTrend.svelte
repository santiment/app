<script>
  export let item = {}

  const PER_ROW = 4

  $: ({ word, tags, volume } = item)
  $: totalTags = tags.length
</script>

<a href="/labs/trends/explore/{word}" on:click={window.__onLinkClick}>
  <div class="row justify v-center mrg--b mrg-s">
    <h5>{word}</h5>
    <!-- TODO add volume -->
    <!-- <h6 class="caption">{volume} volume</h6> -->
  </div>
  <ul class="row v-center c-waterloo caption">
    {#each tags.slice(0, PER_ROW) as item}
      <li class="mrg-xs mrg--r ">{item}</li>
    {/each}
    {#if totalTags > PER_ROW}
      <li>+{totalTags - PER_ROW}</li>
    {/if}
  </ul>
</a>

<style>
  li {
    min-width: 14px;
    padding: 4px 8px;
    border-radius: 12px;
    background: var(--athens);
  }
</style>
