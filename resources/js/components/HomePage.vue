<template>
    <div class="home-container">
        <keep-alive>
            <div class="content">
                <listing-summary-group
                    :listings="contentData.results"
                    :next="contentData.next"
                    :previous="contentData.previous"
                    :count="contentData.count"
                    class="listing-summary-group"
                ></listing-summary-group>
            </div>
        </keep-alive>
    </div>
</template>
<script>
    import ListingSummaryGroup from './ListingSummaryGroup.vue';
    import PokeAPI from '../services/pokeAPI';
    import { Pokedex } from 'pokeapi-js-wrapper';
    import _ from 'lodash';

    export default {
        data() {
            return {
                contentData: {
                    next: null,
                    previous: null,
                    count: null,
                    results: [],
                },
            };
        },
        created: function() {
            try {
                const intrval = {
                    limit: 20,
                    offset: 0,
                };
                PokeAPI.list(intrval)
                    .then(res => {
                        if (res.status === 200) {
                            console.log('api response: ');
                            console.log(res);
                            this.contentData = res.data;
                            return res.data;
                        }
                        return res;
                    })
                    .then(res => {
                        console.log('res: ');
                        console.log(res);
                        console.log('filters: ');
                        const newArr = _.map(res.results, item => {
                                return item.url;
                            });
                        console.log(newArr);
                        const P = new Pokedex();
                        P.resource(newArr)
                        .then(response => {
                            console.log('wrapper response: ');
                            console.log(response);
                            const detailed = {
                                listing: response
                            };
                            this.contentData.results = response;
                            this.$store.commit('addData', {route: 'home', data: detailed});
                            window.server_data = response;
                        });
                    });
            } catch (error) {
                console.log(error);
            }
        },
        computed: {
            listing_pokemons() {
                return this.$store.state.listing_summaries
            }
        },
        components: {
            ListingSummaryGroup
        }
    }
</script>
<style>
.home-container .content {
    margin-top: 100px;
    height: 64vh;
}
</style>