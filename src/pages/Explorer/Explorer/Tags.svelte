<script>
    export let items = []

    const CUT_COUNT = 3
    const hasMore = items.length > CUT_COUNT
    const moreCount = items.length - CUT_COUNT
    const displayItems = items.slice(0, CUT_COUNT)
</script>

<div class="tags">
    {#each displayItems as item, index}
        <div key={index} class="tag">
            {item}
        </div>
    {/each}
    {#if hasMore}
        <div class="tag">
            +{moreCount}
        </div>
    {/if}
</div>

<style>
.tags {
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
}

.tag {
    text-align: center;
    color: var(--waterloo);
    background-color: var(--athens);
    padding: 4px 8px;
    border-radius: 12px;
    min-width: 27px;
}

.tag:not(:last-child) {
    margin-right: 4px;
}
</style>