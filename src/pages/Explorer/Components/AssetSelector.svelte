<script>
  import { onMount } from 'svelte'
  import Tooltip from 'webkit/ui/Tooltip'
  import { queryProjects } from 'webkit/api/projects'
  import AssetItem from './AssetItem.svelte'

  export let onChange = (selectedProjects) => {}
  let searchKey = ''
  let selectedProjects = new Set()
  let unselectedProjects = new Set()
  let allProjects = new Set()

  function toggleProject(project) {
    if (selectedProjects.has(project)) {
      selectedProjects.delete(project)
      unselectedProjects.add(project)
    } else {
      selectedProjects.add(project)
      unselectedProjects.delete(project)
    }
    selectedProjects = selectedProjects
    unselectedProjects = unselectedProjects
    onChange(Array.from(selectedProjects))
  }

  const deselectAll = () => {
    selectedProjects = new Set()
    unselectedProjects = allProjects
    searchKey = ''
  }

  const filter = (project, search) =>
    project.name.toUpperCase().includes(search) || project.ticker.toUpperCase().includes(search)

  $: search = searchKey.toUpperCase()

  onMount(() => {
    queryProjects()
      .then((res) => {
        allProjects = new Set(res)
        unselectedProjects = new Set(res)
      })
      .catch((e) => console.log(e.message))
  })
</script>

<Tooltip on="click" align="end">
  <div slot="trigger" class="btn-2 btn--s mrg-s mrg--l mrg--r">
    Assets: {selectedProjects.size === 0 ? 'All' : selectedProjects.size}
  </div>

  <div slot="tooltip" class="tooltip">
    <div class="top">
      <!-- svelte-ignore a11y-autofocus -->
      <input
        autofocus
        type="text"
        class="input fluid mrg-l mrg--b"
        placeholder="Search for asset"
        bind:value={searchKey}
      />
      <div class="assets">
        <h6 class="caption c-waterloo mrg-l mrg--b">Selected assets</h6>
        <div class="mrg-m mrg--b">
          {#each Array.from(selectedProjects) as project}
            {#if filter(project, search)}
              <AssetItem {project} on:click={() => toggleProject(project)} isActive />
            {/if}
          {/each}
        </div>
        <h6 class="caption c-waterloo mrg-l mrg--b">Assets</h6>
        <div>
          {#each Array.from(unselectedProjects) as project}
            {#if filter(project, search)}
              <AssetItem {project} on:click={() => toggleProject(project)} />
            {/if}
          {/each}
        </div>
      </div>
    </div>
    <button class="deselect btn-2 caption fluid" on:click={deselectAll}>Deselect all</button>
  </div>
</Tooltip>

<style>
  .tooltip {
    width: 280px;
  }

  .top {
    padding: 12px 16px;
  }

  .assets {
    height: 340px;
    overflow-y: auto;
  }

  input {
    padding: 6px 10px;
  }

  .deselect {
    border-radius: 0;
    border-right: none;
    border-left: none;
    border-bottom: none;
    margin: 0;
    padding: 8px 0;
  }
</style>
