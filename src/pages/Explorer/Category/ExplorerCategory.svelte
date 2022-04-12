<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Tootlip from 'webkit/ui/Tooltip/svelte'
  import Checkbox from 'webkit/ui/Checkbox.svelte'
  import Range from 'webkit/ui/Range.svelte'
  import Category from './Category.svelte'
  import ChartLayoutItem from '../Layouts/ChartLayoutItem.svelte'
  import AssetSelector from '../Components/AssetSelector.svelte'
  import { EntityType } from '../const'

  export let items = [
    {
      id: 0,
      type: 'chart',
      title: 'Protocol - Fundamental comparison (TVL, User, Develel)',
      comments: 0,
      votes: 0,
      user: { username: 'test' },
      assets: [
        { slug: 'bitcoin' },
        { slug: 'ethereum' },
        { slug: 'bitcoin-cash' },
        { slug: 'bitcoin' },
      ],
    },
  ]

  const RANGES = {
    '24h': '1d',
    '7d': '7d',
    '1m': '30d',
    '6m': '183d',
    '1y': '1y',
    'All time': 'all',
  }

  let types = new Set(Object.values(EntityType))

  const toggleType = (type) => {
    if (types.has(type)) {
      types.delete(type)
    } else {
      types.add(type)
    }
    types = types
  }
</script>

<Category title="Explorer" {items}>
  <div slot="header" class="controls row mrg-a mrg--l">
    <!-- TODDO add `onChange` prop -->
    <Range items={Object.keys(RANGES)} selectedIndex="5" />

    <AssetSelector />

    <!-- TODO: move to Types.svelte -->
    <Tootlip on="click" activeClass="$style.active" align="end">
      <div slot="trigger" class="btn-2 btn--s">Types: {types.size}</div>

      <div slot="tooltip" class="tooltip">
        <div class="caption txt-m mrg-s mrg--l mrg--b c-waterloo">Types</div>
        {#each Object.values(EntityType) as type, index (index)}
          <div
            class="btn-ghost row v-center"
            on:click={() => toggleType(type)}
            style="fill: {type.color}"
          >
            <Svg id={type.icon} w="16" class="mrg-s mrg--r" />
            {type.label}
            <Checkbox isActive={types.has(type)} class="mrg-a mrg--l" />
          </div>
        {/each}
      </div>
    </Tootlip>
  </div>

  <svelte:fragment let:item>
    {#if item.type === 'chart'}
      <ChartLayoutItem {item} showActions={true} />
    {/if}
  </svelte:fragment>
</Category>

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
