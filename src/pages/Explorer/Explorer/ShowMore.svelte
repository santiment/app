<script>
    export let label = 'Show more'
    export let onClick = () => {}
</script>

<div class="showMore fluid body-3 txt-r" onClick={onClick}>
    {label}
</div>

<style>
.showMore {
    text-align: center;
    padding: 13.5px 0;
    border: 1px solid var(--porcelain);
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: var(--green);
    cursor: pointer;
}

.showMore:hover {
    background-color: var(--athens);
}
</style>