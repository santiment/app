<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Profile from 'webkit/ui/Profile/svelte'

  export let small = false
  export let item

  $:({title, user, votes, comments}= item)
</script>

<div class="row v-center nowrap">
  <h3 class="mrg-l mrg--r" class:body-2={!small}>
    {title}
  </h3>

  <slot />
</div>

<div
  class="bottom row justify v-center c-waterloo mrg-s mrg--t"
  class:caption={small}
>
  <Profile {user} class="author" />

  <div class="stats row v-center">
    <div class="row v-center">
      <Svg id="comment" w="12" h="10.5" class="mrg-s mrg--r" />
      {comments}
    </div>

    <div class="row v-center mrg-l mrg--l">
      <Svg id="rocket" w="10.5" h="14" class="mrg-s mrg--r" />
      {votes}
    </div>
  </div>
</div>

<style>
  h3 {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bottom {
    fill: var(--waterloo);
  }
  .bottom :global(.author) {
    --img-size: 24px;
    --black: var(--waterloo);
  }
</style>
