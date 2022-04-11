<script>
    import Svg from 'webkit/ui/Svg/svelte'

    export let id = "rocket"
    export let title = "No"
    export let action = "like" 
</script>


<div class="hv-center">
    <Svg illus={true} {id} class="mrg--b mrg-xl" />
    <h6 class="mrg--b mrg-xs txt-b body-2">{title} creations yet</h6>
    <h6>Creations you {action} will show up here</h6>  
</div>

<style>
    h6 {
        text-align: center;
    }
</style>