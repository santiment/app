<script>
    export let item;
</script>

<div>
    <div class="social row justify v-center mrg--b">
        <h5>{item.name}</h5>
        <h6 class="caption">{item.volume} volume</h6>
    </div>
    <ul class="row v-center c-waterloo caption">
       {#each item.tags.slice(0, 5) as item}
            <li class="mrg-xs mrg--r ">{item}</li>
       {/each} 
       {#if item.tags.length > 5}
            <li>+3</li>
       {/if}
    </ul>
</div>

<style>
.social {
    --margin: 8px
}
li {
    min-width: 14px;
    padding: 4px 8px;
    border-radius: 12px;
    background-color: var(--athens);
}
</style>