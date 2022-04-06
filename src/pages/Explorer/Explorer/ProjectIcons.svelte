<script>
    export let projects = []
    export let maxCount = 3

    const hasMore = projects.length > maxCount
    const moreCount = projects.length - maxCount
    const displayProjects = projects.slice(0, maxCount)

</script>

<div class="row v-center">
    {#each displayProjects as project, index}
        <img key={index} style="z-index: {maxCount + 1 - index}" src={project.logoUrl} alt={project.name || project.ticker} class="projectIcon chip" />
    {/each}
    {#if hasMore}
        <div class="counter chip txt-r caption c-waterloo">
            +{moreCount}
        </div>
    {/if}
</div>

<style>
.chip {
    position: relative;
    width: 24px;
    border: none;
    border-radius: 50%;
}

.projectIcon:not(:first-child) {
    margin-left: -8px;
}

.counter {
    margin-left: -8px;
    text-align: center;
    background-color: var(--athens);
    padding: 4px 5.5px;
    z-index: 1;
}
</style>