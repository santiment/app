<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Tootlip from 'webkit/ui/Tooltip/svelte'
  import Checkbox from 'webkit/ui/Checkbox.svelte'
  import Category from './Category.svelte'
import ChartLayoutItem from './ChartLayoutItem.svelte'
</script>

<Category title="Explorer">
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

  <ChartLayoutItem />
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
