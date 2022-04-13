<script>
  import EmptyCreations from './EmptyCreations.svelte'
  import { MenuItem } from '../const'

  export let activeMenu
</script>

<div class="empty row hv-center fluid">
  {#if activeMenu == MenuItem.LIKES}
    <EmptyCreations id="rocket" action="like" title="No liked" />
  {:else if activeMenu == MenuItem.MY_CREATIONS}
    <EmptyCreations id="browser" action="make" title="No" />
  {/if}
</div>

<style>
  .empty {
    margin-top: 120px;
  }
</style>
