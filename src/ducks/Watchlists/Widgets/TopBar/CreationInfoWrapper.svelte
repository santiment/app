<script lang="ts">
  import CreationInfo from "webkit/ui/CreationInfo/svelte";
  import Svg from 'webkit/ui/Svg/svelte'

  export let id;
  export let type;
  export let title;
  export let user;
  export let currentUser;
  export let onEditClick;
  export let comments;
  export let votes;
  export let onVote;
  export let description;
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
>
  <svelte:fragment slot="info">
    <div class="row title">
      <Svg id="description" w="16" />
      <div class="c-waterloo body-3 txt-m">
        Description
      </div>
    </div>
    <div class="body-3 description">
      {description}
    </div>
  </svelte:fragment>
</CreationInfo>

<style lang="scss">
  .title {
    gap: 12px;
    margin-bottom: 8px;
  }

  .description {
    padding-left: 28px;
  }
</style>
