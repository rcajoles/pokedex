<template>
    <div class="listing-summary">
        <div class="wrapper">
            <div class="thumbnail" :style="backgroundImageStyle"></div>
            <div class="info title">
                <span>{{ listing.name }}</span>
            </div>
            <!-- <div class="info types">{{ listing.types }}</div> -->
        </div>
        <listing-save :id="listing.id"></listing-save>
    </div>
</template>
<script>
    import ListingSave from './ListingSave.vue';
    import _ from 'lodash';
    export default {
        props: [ 'listing' ],
        computed: {
            backgroundImageStyle() {
                if (_.has(this.listing.sprites, 'other')) {
                    return {
                        'background-image': `url("${this.listing.sprites.other['official-artwork'].front_default}")`
                    }
                } else if(_.has(this.listing.sprites,'front_default')){
                    return {
                        'background-image': `url("${this.listing.sprites.front_default}")`
                    }
                } else if(_.has(this.listing.sprites,'other') && _.has(this.listing.sprites.other,'home')){
                    return {
                        'background-image': `url("${this.listing.sprites.other.home.front_default}")`
                    }
                }
            }
        },
        components: {
            ListingSave
        }
    }
</script>
<style>
    .listing-summary {
        flex: 0 0 auto;
        position: relative;
    }

    .listing-summary a {
        text-decoration: none;
    }

    .listing-summary .wrapper {
        max-width: 350px;
        display: block;
    }

    .listing-summary .thumbnail {
        width: 273px;
        height: 250px;
        background-size: contain;
        background-position: center;
    }

    .listing-summary .info {
        color: #484848;
        word-wrap: break-word;
        letter-spacing: 0.2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .listing-summary .info.title {
        padding-top: 5px;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        text-transform: capitalize;
    }

    .listing-summary .info.types {
        font-size: 14px;
        line-height: 18px;
    }

    @media (max-width: 400px) {
        .listing-summary .listing-save {
            left: 15px;
            right: auto;
        }
    }
</style>
