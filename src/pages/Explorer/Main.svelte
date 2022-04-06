<script>
    import Explorer from './Explorer/index'
</script>

<main class="content">
    <div class="leftcol">
        <Explorer />
    </div>
    <div class="rightcol">
        Widget
    </div>
</main>

<style>
.content {
    max-width: 1152px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin: 24px auto;
}

.leftcol {
    width: 640px;
    margin-right: 48px;
}

.rightcol {
    width: 320px;
}
</style>