<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Tootlip from 'webkit/ui/Tooltip/svelte'
  import Checkbox from 'webkit/ui/Checkbox.svelte'
  import { FILTERABLE_TABS } from '../const'

  export let onChange = () => {}
  export let displayingTypes
  export let flat = false

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
      {#each FILTERABLE_TABS as type}
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
  <div class="wrapper row v-center">
    {#each FILTERABLE_TABS as type}
      <div
        class="btn c-waterloo row v-center"
        on:click={() => toggleType(type.key)}
        class:active-filter={displayingTypes.has(type.key)}
      >
        <Svg id={type.icon} w="12" class="mrg--r" />
        {type.label}
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
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

  .wrapper {
    gap: 16px;
  }

  .btn {
    --margin: 6px;
    --color-hover: var(--green);

    height: 32px;
    border-radius: 0;
  }

  .active-filter {
    --color: var(--green);
    --color-hover: var(--green-hover) !important;
    --fill: var(--green);

    border-bottom: 1px solid var(--green);
  }
</style>
