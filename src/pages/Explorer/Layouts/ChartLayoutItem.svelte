<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import ProjectIcon from 'webkit/ui/ProjectIcon.svelte'
  import UserCreation from '../Category/UserCreation.svelte'

  export let small = false
  export let item

  $: ({ assets } = item)
</script>

<UserCreation {item} {small}>
  {#if !small}
    <div class="assets row mrg-l mrg--r">
      {#each assets.slice(0, 3) as { slug }, i}
        <span style="z-index:{5 - i}">
          <ProjectIcon {slug} size={24} />
        </span>
      {/each}
      {#if assets.length > 3}
        <div class="expand row hv-center caption c-waterloo">+4</div>
      {/if}
    </div>

    <div class="type row v-center mrg-a mrg--l">
      <Svg id="info" w="16" />
    </div>
  {/if}
</UserCreation>

<style>
  .type {
    fill: var(--green);
  }

  .assets > :global(*) {
    margin-left: -8px;
  }

  .expand {
    padding: 4px 5.5px;
    border-radius: 20px;
    background: var(--athens);
  }
</style>
