<script>
    import Svg from 'webkit/ui/Svg/svelte'

    let className = ''
    export {className as class}

    export let isOwner = false;
    export let isModerator = false;
</script>

<div class="actions flex hv-center box border c-waterloo {className}">
    {#if isOwner}
        <Svg id="pencil" w="16" class="btn mrg-xl mrg--r" />
        <Svg id="delete" w="16" class="btn mrg-xl mrg--r" />
        <Svg id="comment" w="16" />
    {:else}
        <Svg id="comment" w="16" class="btn mrg-xl mrg--r" />
        <Svg id="rocket" w="16" class="btn mrg-xl mrg--r" />
        <Svg id="share-dots" w="16" class="btn" />
        {#if isModerator}
            <Svg id="eye-crossed" w=16 class="btn mrg-xl mrg--l" />
        {/if}
    {/if}
</div>

<style>
.actions {
    position: absolute;
    right: -8px;
    top: -32px;
    height: 40px;
    padding: 8px 16px;
    z-index: 10;
}
</style>