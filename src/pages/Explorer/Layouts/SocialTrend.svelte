<script>
  import { history } from '../../../redux'

  export let item = {}

  const PER_ROW = 4

  $: ({ word, tags, volume } = item)
  $: TOTAL_TAGS = tags.length
</script>

<a
  href="https://app.santiment.net/labs/trends/explore/{word}"
  on:click|preventDefault={() => history.push(`/labs/trends/explore/${word}`)}
>
  <div class="row justify v-center mrg--b mrg-s">
    <h5>{word}</h5>
    <!-- TODO add volume -->
    <!-- <h6 class="caption">{volume} volume</h6> -->
  </div>
  <ul class="row v-center c-waterloo caption">
    {#each tags.slice(0, PER_ROW) as item}
      <li class="mrg-xs mrg--r ">{item}</li>
    {/each}
    {#if TOTAL_TAGS > PER_ROW}
      <li>+{TOTAL_TAGS - PER_ROW}</li>
    {/if}
  </ul>
</a>

<style>
  li {
    min-width: 14px;
    padding: 4px 8px;
    border-radius: 12px;
    background: var(--athens);
  }
</style>
