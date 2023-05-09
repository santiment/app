<script>
  import Page from 'webkit/ui/Pricing/Page/index.svelte'
</script>

<Page class="$style.pricing" />

<style>
  .pricing {
    margin-top: 32px;
  }
  :global(.desktop) .pricing {
    margin-top: 80px;
  }
</style>
