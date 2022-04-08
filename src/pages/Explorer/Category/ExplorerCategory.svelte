<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Tootlip from 'webkit/ui/Tooltip/svelte'
  import Checkbox from 'webkit/ui/Checkbox.svelte'
  import Category from './Category.svelte'
  import ChartLayoutItem from '../Layouts/ChartLayoutItem.svelte'
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

  let types = Object.keys(EntityType)
  const toggleType = type => {
    types.includes(type) ? types = types.filter(t => t !== type) : types = [...types, type]
  }
  
</script>

<Category title="Explorer" {items}>
  <div slot="header" class="controls row mrg-a mrg--l">
    <div class="btn-2 btn--s">All time</div>
    <div class="btn-2 btn--s mrg-s mrg--l mrg--r">Assets: All</div>

    <!-- TODO: move to Types.svelte -->
    <Tootlip on="click" activeClass="$style.active" align="end">
      <div slot="trigger" class="btn-2 btn--s">Types: {types.length}</div>

      <div slot="tooltip" class="tooltip">
        <div class="caption txt-m mrg-s mrg--l mrg--b c-waterloo">Types</div>
        {#each Object.keys(EntityType) as type, index}
          <div class="btn-ghost row v-center" key={index} on:click={() => toggleType(type)} style="fill: {EntityType[type].color}">
            <Svg id={EntityType[type].icon} w="16" style="fill: {EntityType[type].color}" class="mrg-s mrg--r" />
            {EntityType[type].label}
            <Checkbox isActive={types.includes(type)} class="mrg-a mrg--l" />
          </div>
        {/each}
      </div>
    </Tootlip>
  </div>

  <svelte:fragment let:item>
    {#if item.type === 'chart'}
      <ChartLayoutItem {item} />
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
