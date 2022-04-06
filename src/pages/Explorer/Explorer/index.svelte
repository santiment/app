<script>
    import TopButtons from './TopButtons' 
    import Header from './Header'
    import ShowMore from './ShowMore'
    import Row from './Row'
    import { BUTTONS, ENTITY_TYPES } from './shared'

    let activeButton = BUTTONS.NEW
    let showMore = true;
</script>

<TopButtons activeButton={activeButton} setActiveButton={btn => activeButton = btn} />

<Header />

<Row entity={ENTITY_TYPES.ADDRESS}/>

{#if showMore}
    <ShowMore />
{/if}
