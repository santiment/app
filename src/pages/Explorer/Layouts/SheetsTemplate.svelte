<script>
    import Svg from 'webkit/ui/Svg/svelte'

    export let item;

    let isOpen = false;
</script>

<div class="{isOpen ? 'open' : 'close'}" on:click={() => isOpen = !isOpen}>
    <div class="row justify v-center">
        <h5>{item.title}</h5>
        <Svg id='arrow-down' w="10" class="$style.arrow" />
    </div>
    {#if isOpen}
        <div class="mrg-l mrg--t mrg--b description">
            <p class="mrg-s mrg--b">
                {item.desc}
            </p>
            <a href={item.url} target="_blank" class="btn-1 btn--s row v-center c-white">
                <div class="mrg-s mrg--r">Open template</div>
                <Svg id='external-link' w="12" class="$style.link" />
            </a>
        </div>
    {/if}
</div>

<style>
.description {
    padding: 12px 16px;
    background: var(--athens);
    border-radius: 4px;
}

a {
    width: 141px;
}

.close svg.arrow {
    transform: rotate(0);
}
.open svg.arrow {
    transform: rotate(180deg);
}

.link {
    fill: var(--white);
}

</style>