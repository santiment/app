<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Tootlip from 'webkit/ui/Tooltip/svelte'
  import Checkbox from 'webkit/ui/Checkbox.svelte'
  import { EntityType } from '../const'

  export let onChange = () => {}
  export let types = new Set()

  const toggleType = (key) => {
    if (types.has(key)) {
      types.delete(key)
    } else {
      types.add(key)
    }
    types = types
    onChange(types)
  }
</script>

<Tootlip on="click" activeClass="$style.active" align="end">
  <div slot="trigger" class="btn-2 btn--s">Types: {types.size}</div>

  <div slot="tooltip" class="tooltip">
    <div class="caption txt-m mrg-s mrg--l mrg--b c-waterloo">Types</div>
    {#each Object.values(EntityType) as type}
      <div
        class="btn-ghost row v-center"
        on:click={() => toggleType(type.key)}
        style="fill: {type.color}"
      >
        <Svg id={type.icon} w="16" class="mrg-s mrg--r" />
        {type.label}
        <Checkbox isActive={types.has(type.key)} class="mrg-a mrg--l" />
      </div>
    {/each}
  </div>
</Tootlip>

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
</style>
