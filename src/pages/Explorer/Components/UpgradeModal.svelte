<script context="module">
  import { dialogs } from 'webkit/ui/Dialog'
  import UpgradeModal from './UpgradeModal.svelte'
  export const showUpgradeModal = () => dialogs.show(UpgradeModal)
</script>

<script>
  import Dialog from 'webkit/ui/Dialog'

  let closeDialog
</script>

<!-- TODO complete me -->
<Dialog {...$$props} bind:closeDialog>
  <div class="dialog-body column">Upgrade to Pro for full access!</div>
</Dialog>

<style>
  .dialog-body {
    width: 612px;
  }
</style>
