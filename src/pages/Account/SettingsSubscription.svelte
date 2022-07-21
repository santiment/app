<script>
  import SubscriptionSettings from 'webkit/ui/Pricing/SubscriptionSettings/index.svelte'
  import { subscription$ } from 'webkit/stores/subscription'
  import { paymentCard$ } from 'webkit/stores/paymentCard'
</script>

<SubscriptionSettings subscription={$subscription$} paymentCard={$paymentCard$} />
