<script>
    export let username = "username"
    export let avatar = "https://www.w3schools.com/howto/img_avatar.png"
</script>

<div class="user">
    <img src={avatar} alt={username} />
    <div class="username">@{username}</div>
</div>

<style>
.user {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.user:hover .username {
    color: var(--jungle-green);
}

img {
    width: 24px;
    border: none;
    border-radius: 50%;
    margin-right: 8px;
}

.username {
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: var(--waterloo);
}
</style>