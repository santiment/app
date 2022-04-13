<script>
  import ProjectIcon from 'webkit/ui/ProjectIcon.svelte'

  export let assets = []
</script>

<div class="assets row mrg-l mrg--r">
  {#each assets.slice(0, 3) as { slug }, i}
    <span style="z-index:{5 - i}">
      <ProjectIcon {slug} size={24} />
    </span>
  {/each}
  {#if assets.length > 3}
    <div class="expand row hv-center caption c-waterloo">+{assets.length - 3}</div>
  {/if}
</div>

<style>
  .assets > :global(*) {
    margin-left: -8px;
  }

  .expand {
    padding: 4px 5.5px;
    border-radius: 20px;
    background-color: var(--athens);
  }
</style>
