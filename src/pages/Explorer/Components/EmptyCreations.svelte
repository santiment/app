<script>
  import Svg from 'webkit/ui/Svg/svelte'

  export let id = 'rocket'
  export let title = 'No'
  export let action = 'like'
  export let description
</script>

<div class="column hv-center">
  <Svg illus {id} class="mrg-xl mrg--b" />
  <h6 class="mrg-xs mrg--b txt-b body-2 text-center">{title} creations yet</h6>
  <h6>{description || `Creations you ${action} will show up here`}</h6>
</div>
