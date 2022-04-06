<script>
    export let title = "Explorer"
</script>

<div class="header row justify v-center">
    <h3 class="body-1 c-black">{title}</h3>
    <div class="actions row h-center">
        <!-- TODO -->
        <div>All time</div>
        <div>Assets: All</div>
        <div>Types: 5</div>
    </div>
</div>

<style>
.header {
    padding: 17px 24px;
    border: 1px solid var(--porcelain);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.actions div:not(:last-child) {
    margin-right: 8px;
}
</style>