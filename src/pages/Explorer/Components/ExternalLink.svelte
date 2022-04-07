<script>
    import Svg from 'webkit/ui/Svg/svelte'

    export let href;
    export let icon = "rocket";
</script>

<div class="row hv-center border">
    <a {href} target="_blank" class="row hv-center">
        <Svg id={icon} w="12" h="12" />
     </a>
</div>

<style>
    div {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        cursor: pointer;
    }
    a { 
        width: 100%;
        height: 100%;
    }
</style>