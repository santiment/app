<script>
  import Checkbox from 'webkit/ui/Checkbox'

  export let isActive = false
  export let project = {}
</script>

<div on:click class="row v-center mrg-l mrg--b btn">
  <Checkbox {isActive} class="mrg-m mrg--r" />
  <div>{project.name} <span class="c-waterloo">{project.ticker}</span></div>
</div>
