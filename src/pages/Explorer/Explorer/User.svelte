<script>
    export let username = "username"
    export let avatar = "https://www.w3schools.com/howto/img_avatar.png"
</script>

<div class="row v-center user">
    <img src={avatar} alt={username} class="mrg-s mrg--r" />
    <div class="username body-3 txt-r c-waterloo">@{username}</div>
</div>

<style>
.user {
    cursor: pointer;
}

.user:hover .username {
    color: var(--green);
}

img {
    width: 24px;
    border: none;
    border-radius: 50%;
}
</style>