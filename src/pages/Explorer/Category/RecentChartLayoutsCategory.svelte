<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Category from './Category.svelte'
  import ChartLayoutItem from './ChartLayoutItem.svelte'

  const items = [
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

<Category title="Recent Chart Layouts" small iconClass="$style.icon" {items}>
  <svelte:fragment slot="icon">
    <Svg id="info" w="16" />
  </svelte:fragment>

  <svelte:fragment let:item>
    <ChartLayoutItem small {item} />
  </svelte:fragment>
</Category>

<style>
  .icon {
    background: var(--green-light-1);
    fill: var(--green);
  }
</style>
