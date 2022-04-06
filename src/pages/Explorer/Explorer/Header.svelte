<script>
    export let title = "Explorer"
</script>

<div class="header">
    <h3>{title}</h3>
    <div class="actions">
        <!-- TODO -->
        <div>All time</div>
        <div>Assets: All</div>
        <div>Types: 5</div>
    </div>
</div>

<style>
.header {
    width: 100%;
    padding: 17px 24px;
    border: 1px solid var(--porcelain);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

h3 {
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    color: var(--rhino);
}

.actions {
    display: flex;
    justify-content: center;
}

.actions div:not(:last-child) {
    margin-right: 8px;
}
</style>