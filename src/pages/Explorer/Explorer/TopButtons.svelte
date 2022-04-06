<script>
    import {BUTTONS} from './shared'
    import TopButton from './TopButton'

    export let activeButton
    export let setActiveButton
</script>

<div class="row justify v-center mrg-xl mrg--b">
    <div class="row v-center">
        <TopButton label={BUTTONS.NEW} isActive={BUTTONS.NEW === activeButton} onClick={() => setActiveButton(BUTTONS.NEW)} />
        <TopButton label={BUTTONS.LIKES} isActive={BUTTONS.LIKES === activeButton} onClick={() => setActiveButton(BUTTONS.LIKES)} />
    </div>
    <div>
        <TopButton label={BUTTONS.MY_CREATIONS} isActive={BUTTONS.MY_CREATIONS === activeButton} onClick={() => setActiveButton(BUTTONS.MY_CREATIONS)} />
    </div>
</div>
