<script>
  export let tags = []
</script>

<div class="row v-center">
  {#each tags.slice(0, 3) as tag, index (index)}
    <div class="tag mrg-xs mrg--r c-waterloo">
      {tag}
    </div>
  {/each}
  {#if tags.length > 3}
    <div class="tag c-waterloo">
      +{tags.length - 3}
    </div>
  {/if}
</div>

<style>
  .tag {
    padding: 4px 8px;
    background-color: var(--athens);
    border-radius: 12px;
  }
</style>
