<template>
    <div id="footer">
        <div class="hr"></div>
        <div :class="containerClass">
            <p>
                <img class="icon" :src="logoUrl">
                <span>demo app.</span>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            containerClass() {
                return `${this.$route.name}-container`;
            },
            logoUrl() {
                return `${window.cdn_url || ''}images/logo.png`;
            }
        },
    }
</script>
<style>
    #footer {
        margin-bottom: 3em;
    }

    #footer .icon {
        height: 23px;
        display: inline-block;
        margin-bottom: -6px;
    }

    .hr {
        border-bottom: 1px solid #dbdbdb;
        margin: 3em 0;
    }

    #footer p {
        font-size: 15px;
        color: #767676 !important;
        display: flex;
    }

    #footer p img {
        padding-right: 6px;
    }
</style>
