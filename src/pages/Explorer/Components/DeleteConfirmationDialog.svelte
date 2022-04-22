<script context="module">
  import { dialogs } from 'webkit/ui/Dialog'
  import DeleteConfirmationDialog from './DeleteConfirmationDialog.svelte'

  export function showDeleteConfirmationDialog(itemType, onDelete, onComplete) {
    dialogs.show(DeleteConfirmationDialog, { itemType, onDelete, onComplete })
  }
</script>

<script>
  import Dialog from 'webkit/ui/Dialog'
  import Svg from 'webkit/ui/Svg/svelte'

  let closeDialog

  $: ({ itemType, onDelete, onComplete } = $$props)
</script>

<Dialog {...$$props} noTitle bind:closeDialog>
  <div class="dialog">
    <div class="row justify v-center h4 txt-m mrg--b mrg-s c-black">
      Do you want to delete this {itemType}?
      <Svg id="close" w="12" on:click={closeDialog} class="btn" />
    </div>
    <div class="column hv-center body-2 c-waterloo mrg--b mrg-xl">
      Are you sure? This action cannot be undone.
    </div>
    <div class="row hv-center">
      <button
        class="btn-1 mrg--r mrg-m"
        on:click={() =>
          onDelete()
            .then((id) => onComplete(id))
            .then(closeDialog)}>Delete</button
      >
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
