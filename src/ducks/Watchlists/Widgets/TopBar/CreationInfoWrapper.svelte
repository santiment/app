<script lang="ts">
  import CreationInfo from 'webkit/ui/CreationInfo/svelte'
  import Svg from 'webkit/ui/Svg/svelte'

  export let id
  export let type
  export let title
  export let user
  export let currentUser
  export let onEditClick
  export let comments
  export let votes
  export let onVote
  export let description
  export let titleHoverTooltipClass
</script>

<CreationInfo
  {id}
  {type}
  {title}
  {user}
  {currentUser}
  {onEditClick}
  {comments}
  {votes}
  {onVote}
  {titleHoverTooltipClass}>
  <svelte:fragment slot="info">
    <div class="row mrg-s mrg--b">
      <Svg id="description" w="16" class="mrg-m mrg--r" />
      <div class="c-waterloo body-3 txt-m">Description</div>
    </div>
    <div class="body-3 description">
      {description}
    </div>
  </svelte:fragment>
</CreationInfo>

<style lang="scss">
  .description {
    padding-left: 28px;
  }
</style>
