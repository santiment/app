<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Tootlip from 'webkit/ui/Tooltip/svelte'
  import Checkbox from 'webkit/ui/Checkbox.svelte'
  import Category from './Category.svelte'
  import ChartLayoutItem from '../Layouts/ChartLayoutItem.svelte'

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
</script>

<Category title="Explorer" {items}>
  <div slot="header" class="controls row mrg-a mrg--l">
    <div class="btn-2 btn--s">All time</div>
    <div class="btn-2 btn--s mrg-s mrg--l mrg--r">Assets: All</div>

    <!-- TODO: move to Types.svelte -->
    <Tootlip on="click" activeClass="$style.active" align="end">
      <div slot="trigger" class="btn-2 btn--s">Types: 5</div>

      <div slot="tooltip" class="tooltip">
        <div class="caption txt-m mrg-s mrg--l mrg--b c-waterloo">Types</div>
        <div class="btn-ghost row v-center">
          <Svg id="info" w="16" class="$style.charts mrg-s mrg--r" />
          Charts
          <Checkbox isActive={false} class="mrg-a mrg--l" />
        </div>
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

  .charts {
    fill: var(--green);
  }
</style>
