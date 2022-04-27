<script context="module">
  import { dialogs } from 'webkit/ui/Dialog'
  import EditDialog from './EditDialog.svelte'

  export function showEditDialog(itemData) {
    dialogs.show(EditDialog, { itemData })
  }
</script>

<script>
  import Dialog from 'webkit/ui/Dialog'
  import Toggle from 'webkit/ui/Toggle'
  import { edit } from './api'

  const MAX_TITLE_LENGTH = 25
  const MIN_TITLE_LENGTH = 3

  export let itemData

  let closeDialog
  let loading = false
  let editedTitle = itemData.title
  let editedDescription = itemData.description || ''
  let editedPublic = !!itemData.isPublic

  $: titleLength = (title || '').length
  $: applyDisabled = loading || titleLength < MIN_TITLE_LENGTH || titleLength > MAX_TITLE_LENGTH

  function onEditClick() {
    loading = true
    edit(itemData.id, itemData.editKey, editedTitle, editedDescription, editedPublic)
      .then(() => {
        // TODO: update item in the UI
        closeDialog()
      })
      .catch((err) => {
        // TODO: handle error and remove log
        console.log(err.message)
      })
      .finally(() => (loading = false))
  }
</script>

<Dialog {...$$props} bind:closeDialog title="Edit {itemData.singular}">
  <div class="dialog">
    <div class="mrg-l mrg--b">
      <label for="name" class="c-waterloo mrg-xs mrg--b">
        Name ({titleLength}/{MAX_TITLE_LENGTH})
      </label>
      <input
        id="name"
        class="input"
        placeholder="For example, Favorites"
        bind:value={editedTitle}
        minlength="3"
        maxlength={MAX_TITLE_LENGTH}
      />
    </div>
    <div class="mrg-l mrg--b">
      <label for="description" class="c-waterloo mrg-xs mrg--b">Description (optional)</label>
      <textarea
        id="description"
        class="input"
        placeholder="Add a description"
        bind:value={editedDescription}
      />
    </div>
    <div class="row justify v-center">
      <button
        class="btn-1 mrg-m mrg--r"
        disabled={applyDisabled}
        class:disabled={applyDisabled}
        class:loading
        on:click={onEditClick}>Apply changes</button
      >
      <div class="row hv-center btn" on:click={() => (editedPublic = !editedPublic)}>
        <span class="mrg-s mrg--r">{editedPublic ? 'Public' : 'Private'}</span>
        <Toggle isActive={editedPublic} />
      </div>
    </div>
  </div>
</Dialog>

<style>
  .dialog {
    width: 600px;
    padding: 20px;
  }

  label,
  input,
  textarea {
    display: block;
    width: 100%;
  }

  textarea {
    min-height: 80px;
  }
</style>
