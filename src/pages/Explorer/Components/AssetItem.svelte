<script>
  import Checkbox from 'webkit/ui/Checkbox'

  export let isActive = false
  export let project = {}
</script>

<div on:click class="btn-ghost row v-center">
  <Checkbox {isActive} class="mrg-m mrg--r" />
  {project.name} <span class="c-waterloo mrg-xs mrg--l">{project.ticker}</span>
</div>
