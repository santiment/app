<script>
    export let item;
</script>

<div class="row column">
    <div class="social row justify v-center mrg--b">
        <h5>{item.name}</h5>
        <h6>{item.volume} volume</h6>
    </div>
    <ul class="row v-center">
       {#each item.tags.slice(0, 5) as item, index}
            <li key={index} class="c-waterloo mrg-xs mrg--r caption">{item}</li>
       {/each} 
       {#if item.tags.length > 5}
        <li class="c-waterloo mrg-xs caption">+3</li>
       {/if}
    </ul>
</div>

<style>
.social {
    --margin: 10px
}
li {
    min-width: 14px;
    padding: 4px 8px;
    border-radius: 12px;
    background-color: var(--athens);
}
</style>