<script context="module">
  import { dialogs } from 'webkit/ui/Dialog'
  import DeleteConfirmationDialog from './DeleteConfirmationDialog.svelte'

  export function showDeleteConfirmationDialog(itemData, filterExplorerItems) {
    dialogs.show(DeleteConfirmationDialog, { itemData, filterExplorerItems })
  }
</script>

<script>
  import Dialog from 'webkit/ui/Dialog'
  import Svg from 'webkit/ui/Svg/svelte'
  import { deleteAction } from './api'

  export let itemData
  export let filterExplorerItems

  let closeDialog

  $: ({ item, id, singular, deleteKey, isModerator, key } = itemData)

  const onDeleteClick = () =>
    deleteAction(id, isModerator ? key : deleteKey, isModerator)
      .then(() => filterExplorerItems(item))
      .then(closeDialog)
</script>

<Dialog {...$$props} noTitle bind:closeDialog>
  <div class="dialog">
    <div class="row justify v-center h4 txt-m mrg-s mrg--b c-black">
      Do you want to delete this {singular}?
      <Svg id="close" w="12" on:click={closeDialog} class="btn" />
    </div>
    <div class="hv-center body-2 c-waterloo mrg-xl mrg--b">
      Are you sure? This action cannot be undone.
    </div>
    <div class="row hv-center">
      <button class="btn-1 mrg-m mrg--r" on:click={onDeleteClick}>Delete</button>
      <button class="btn-2" on:click={closeDialog}>Cancel</button>
    </div>
  </div>
</Dialog>

<style>
  .dialog {
    width: 480px;
    padding: 20px 30px;
  }
</style>
