<script context="module">
  import { dialogs } from 'webkit/ui/Dialog'
  import HideConfirmationDialog from './HideConfirmationDialog.svelte'

  export function showHideConfirmationDialog(itemData, filterExplorerItems) {
    dialogs.show(HideConfirmationDialog, { itemData, filterExplorerItems })
  }
</script>

<script>
  import Dialog from 'webkit/ui/Dialog'
  import Svg from 'webkit/ui/Svg/svelte'
  import { hide } from './api'

  let closeDialog

  export let filterExplorerItems
  export let itemData

  $: ({ id, key, singular, item } = itemData)

  const onHide = () =>
    hide(id, key)
      .then(() => filterExplorerItems(item))
      .then(closeDialog)
</script>

<Dialog {...$$props} noTitle bind:closeDialog>
  <div class="dialog">
    <div class="row justify v-center h4 txt-m mrg-s mrg--b c-black">
      Do you want to hide this {singular}?
      <Svg id="close" w="12" on:click={closeDialog} class="btn" />
    </div>
    <div class="hv-center body-2 c-waterloo mrg-xl mrg--b">
      Are you sure? This action cannot be undone.
    </div>
    <div class="row hv-center">
      <button class="btn-1 mrg-m mrg--r" on:click={onHide}>Hide</button>
      <!-- svelte-ignore a11y-autofocus -->
      <button class="btn-2" autofocus on:click={closeDialog}>Cancel</button>
    </div>
  </div>
</Dialog>

<style>
  .dialog {
    width: 480px;
    padding: 20px 30px;
  }
</style>
