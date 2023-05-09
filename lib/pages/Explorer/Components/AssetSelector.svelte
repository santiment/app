<script context="module">
  import { Preloader } from 'webkit/utils/fn'
  import { queryProjects } from 'webkit/api/projects'

  const projectsPreloader = Preloader(queryProjects)
</script>

<script>
  import { onMount } from 'svelte'
  import Tooltip from 'webkit/ui/Tooltip'
  import Svg from 'webkit/ui/Svg'
  import VirtualList from 'webkit/ui/VirtualList'
  import AssetItem from './AssetItem.svelte'

  export let onChange = () => {}
  export let setDeselect = () => {}

  let inputNode
  let isOpened = false
  let input = ''
  let projects = []
  let selections = new Set()

  $: searchTerm = input.toLowerCase()
  $: selectedProjects = (searchTerm, Array.from(selections).filter(search))
  $: notSelectedProjects =
    (searchTerm, selections, projects.filter(checkIsNotSelected).filter(search))

  $: isOpened && getProjects()

  function toggleProject(project) {
    if (selections.has(project)) {
      selections.delete(project)
    } else {
      selections.add(project)
    }

    selections = selections
    inputNode.focus()
    onChange(Array.from(selections))
  }

  function search({ name, ticker }) {
    return name.toLowerCase().includes(searchTerm) || ticker.toLowerCase().includes(searchTerm)
  }

  function checkIsNotSelected(project) {
    return !selections.has(project)
  }

  function getProjects() {
    queryProjects().then((data) => {
      projects = data
    })
  }

  function deselect() {
    selections = new Set()
    onChange([])
  }

  onMount(() => {
    setDeselect(deselect)
  })
</script>

<Tooltip bind:isOpened on="click" align="end" activeClass="$style.active">
  <div slot="trigger" class="btn-2 btn--s mrg-s mrg--r" use:projectsPreloader>
    Assets: {selections.size || 'All'}
    <Svg id="arrow-down" w="8" h="4.5" class="mrg-s mrg--l" />
  </div>

  <div slot="tooltip">
    <div class="assets">
      <!-- svelte-ignore a11y-autofocus -->
      <input
        autofocus
        type="text"
        class="input fluid mrg-l mrg--b"
        placeholder="Search for asset"
        bind:this={inputNode}
        bind:value={input}
      />

      <div>
        {#if selectedProjects.length}
          <h6 class="caption c-waterloo mrg-xs mrg--b">Selected assets</h6>
          <div class="selections visible mrg-s mrg--b">
            {#each selectedProjects as project (project.slug)}
              <AssetItem {project} on:click={() => toggleProject(project)} isActive />
            {/each}
          </div>
        {/if}

        {#if notSelectedProjects.length}
          <h6 class="caption c-waterloo mrg-xs mrg--b">Assets</h6>
          <div class="visible">
            <VirtualList
              key="slug"
              items={notSelectedProjects}
              maxHeight={160}
              defaultItemHeight={32}
              hideEmptyResults
              let:item={project}
            >
              <AssetItem {project} on:click={() => toggleProject(project)} />
            </VirtualList>
          </div>
        {/if}
      </div>
    </div>
    {#if selections.size > 0}
      <button class="deselect btn caption fluid" on:click={deselect}>Deselect all</button>
    {/if}
  </div>
</Tooltip>

<style>
  .active {
    --border: var(--green);
  }

  .assets {
    width: 280px;
    padding: 12px 16px;
  }

  .visible {
    margin-left: -8px;
    margin-right: -8px;
  }

  .selections {
    max-height: 160px;
    overflow: auto;
  }

  input {
    padding: 6px 10px;
  }

  .deselect {
    border-radius: 0;
    padding: 6px 0 8px;
    border-top: 1px solid var(--porcelain);
    --color-hover: var(--green);
  }
</style>
