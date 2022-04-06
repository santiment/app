<script>
    export let items = []

    const CUT_COUNT = 3
    const hasMore = items.length > CUT_COUNT
    const moreCount = items.length - CUT_COUNT
    const displayItems = items.slice(0, CUT_COUNT)
</script>

<div class="row v-center caption txt-r">
    {#each displayItems as item, index}
        <div key={index} class="tag c-waterloo">
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
.tag {
    text-align: center;
    background-color: var(--athens);
    padding: 4px 8px;
    border-radius: 12px;
    min-width: 27px;
}

.tag:not(:last-child) {
    margin-right: 4px;
}
</style>