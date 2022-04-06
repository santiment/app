<script>
    export let projects = []

    const CUT_COUNT = 3
    const hasMore = projects.length > CUT_COUNT
    const moreCount = projects.length - CUT_COUNT
    const displayProjects = projects.slice(0, CUT_COUNT)

</script>

<div class="projects">
    {#each displayProjects as project, index}
        <img key={index} style="z-index: {4 - index}" src={project.logoUrl} alt={project.name || project.ticker} class="projectIcon holder" />
    {/each}
    {#if hasMore}
        <div class="counter holder">
            +{moreCount}
        </div>
    {/if}
</div>

<style>
.projects {
    display: flex;
    align-items: center;
}

.holder {
    width: 24px;
    border: none;
    border-radius: 50%;
    position: relative;
}

.projectIcon:not(:first-child) {
    margin-left: -8px;
}

.counter {
    margin-left: -8px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: var(--waterloo);
    text-align: center;
    background-color: var(--athens);
    padding: 4px 5.5px;
    z-index: 1;
}
</style>