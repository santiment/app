<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Tootlip from 'webkit/ui/Tooltip/svelte'
  import Checkbox from 'webkit/ui/Checkbox.svelte'
  import { EntityType } from '../const'

  export let onChange = () => {}
  export let displayingTypes
  export let flat = false

  const filterableTabs = Object.values(EntityType).filter((entity) => entity.filterable)

  const toggleType = (key) => {
    if (displayingTypes.has(key)) {
      displayingTypes.delete(key)
    } else {
      displayingTypes.add(key)
    }
    onChange(displayingTypes)
  }
</script>

{#if !flat}
  <Tootlip on="click" activeClass="$style.active" align="end">
    <div slot="trigger" class="btn-2 btn--s">Types: {displayingTypes.size}</div>

    <div slot="tooltip" class="tooltip">
      <div class="caption txt-m mrg-s mrg--l mrg--b c-waterloo">Types</div>
      {#each filterableTabs as type}
        <div
          class="btn-ghost row v-center"
          on:click={() => toggleType(type.key)}
          style="fill: {type.color}"
        >
          <Svg id={type.icon} w="16" class="mrg-s mrg--r" />
          {type.label}
          <Checkbox isActive={displayingTypes.has(type.key)} class="mrg-a mrg--l" />
        </div>
      {/each}
    </div>
  </Tootlip>
{:else}
  {#each filterableTabs as type}
    <div
      class="btn-ghost btnflat row v-center"
      on:click={() => toggleType(type.key)}
      class:activetype={!displayingTypes.has(type.key)}
      style="fill: {type.color}"
    >
      <Svg id={type.icon} w="16" class="mrg-s mrg--r" />
      {type.label}
    </div>
  {/each}
{/if}

<style>
  .active {
    --border: var(--green);
  }

  .tooltip {
    width: 176px;
    padding: 12px 12px 16px;
  }

  .btn-ghost {
    --color: var(--waterloo);
    --color-hover: var(--black);
  }

  .btnflat {
    border-radius: 20px;
    border: 1px solid var(--porcelain);
    padding: 8px 12px;
    background-color: var(--athens);
    font-size: 12px;
  }

  .btnflat:not(:last-of-type) {
    margin-right: 8px;
  }

  .activetype {
    background-color: var(--white);
  }
</style>
