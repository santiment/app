<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Category from './Category.svelte'
import ChartLayoutItem from './ChartLayoutItem.svelte';
</script>

<Category title="Recent Chart Layouts" small iconClass="$style.icon">
  <svelte:fragment slot="icon">
    <Svg id="info" w="16" />
  </svelte:fragment>

  <ChartLayoutItem small />
</Category>

<style>
  .icon {
    background: var(--green-light-1);
    fill: var(--green);
  }
</style>
