<script>
  import Dialog from 'webkit/ui/Dialog'

  let closeDialog
  const DialogPromise = {
    resolve: () => console.log('resolve'),
    reject: () => console.log('reject'),
    locking: 0,
  }
</script>

<Dialog {DialogPromise} bind:closeDialog>
  <div class="dialog-body column">Upgrade to Pro for full access!</div>
</Dialog>

<style>
  .dialog-body {
    width: 612px;
  }
</style>
