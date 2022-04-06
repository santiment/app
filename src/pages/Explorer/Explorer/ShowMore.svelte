<script>
    export let label = 'Show more'
    export let onClick = () => {}
</script>

<div class="showMore" onClick={onClick}>
    {label}
</div>

<style>
.showMore {
    width: 100%;
    text-align: center;
    padding: 13.5px 0;
    border: 1px solid var(--porcelain);
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: var(--jungle-green);
    cursor: pointer;
}

.showMore:hover {
    background-color: var(--athens);
}
</style>