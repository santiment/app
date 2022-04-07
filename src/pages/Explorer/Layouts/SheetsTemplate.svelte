<script>
    import Svg from 'webkit/ui/Svg/svelte'
    export let item;
    let isOpen = false;
</script>

<div class="column" on:click={() => isOpen = !isOpen}>
    <div class="row justify v-center">
        <h5 class="body-3">{item.title}</h5>
        <Svg id='arrow' w="16" />
    </div>
    {#if isOpen}
        <div class="row column mrg-l mrg--t mrg--b desc">
            <p class="body-3 mrg-s mrg--b">
                {item.desc}
            </p>
            <a href={item.url} target="_blank" class="row v-center c-white body-3">
                <div class="mrg-s mrg--r">Open template</div>
                <Svg id='arrow' w="12" />
            </a>
        </div>
    {/if}
</div>

<style>
.desc {
    padding: 12px 16px;
    background-color: var(--athens);
    border-radius: 4px;
}
p {
    color: var(--rhino);
}
a {
    background-color: var(--green);
    border-radius: 6px;
    padding: 6px 12px;
    width: 141px;
}
</style>