<script>
    import Svg from 'webkit/ui/Svg/svelte'
    export let href;
</script>

<a {href} target="_blank" class="btn row hv-center border">
    <Svg id="external-link" w="12" />
</a>

<style>
    a { 
        width: 32px;
        height: 32px;
        border-radius: 6px;
    }
</style>