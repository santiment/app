<script>
  export let tags = []
</script>

<div class="row v-center c-waterloo">
  {#each tags.slice(0, 3) as tag}
    <div class="tag mrg-xs mrg--r">
      {tag}
    </div>
  {/each}
  {#if tags.length > 3}
    <div class="tag">
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
