<script>
    export let label = 'Show more'
    export let onClick = () => {}
</script>

<div class="btn row h-center fluid" on:click={onClick}>
    {label}
</div>

<style>
div {
    padding: 13.5px 0;
    border: 1px solid var(--porcelain);
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: var(--green);
    cursor: pointer;
    --bg-hover: var(--athens);
}
</style>