<script>
    import Svg from 'webkit/ui/Svg/svelte'
    export let item;
</script>

<div class="row justify v-center">
    <h4 class="body-3">
        {item.title}<br />
        ({item.date})
    </h4>
    <a href={item.url} download>
        <Svg id="rocket" w="16" />
    </a>
</div>

<style>
h4 {
    color: var(--rhino);
}
</style>