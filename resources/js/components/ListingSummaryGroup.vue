<template>
    <div class="listing-summary-group">
        <h1>Pokemons</h1>
        <div class="listing-carousel">
            <div class="controls">
                <carousel-control dir="left" @change-image="change" :style="leftArrowStyle"></carousel-control>
                <carousel-control dir="right" @change-image="change" :style="rightArrowStyle"></carousel-control>
            </div>
            <div class="listing-summaries-wrapper">
                <div class="listing-summaries" :style="style">
                    <listing-summary
                        v-for="listing in listings"
                        :listing="listing"
                        :key="listing.id"
                    ></listing-summary>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ListingSummary from './ListingSummary.vue';
    import CarouselControl from './CarouselControl.vue';
    
    const rowSize = 3;
    const listingSummaryWidth = 365;

    export default {
        props: [ 'count', 'next', 'previous', 'listings' ],
        created(){
            console.log('count: ');
            console.log(this.$props.count);
            console.log('next: ');
            console.log(this.$props.next);
            console.log('previous');
            console.log(this.$props.previous);
            console.log('listings');
            console.log(this.$props.listings);
        },
        data() {
            return {
                offset: 0,
                pokelist: [],
            };
        },
        methods: {
            change(val) {
                console.log(`val: ${val}`);
                let newVal = this.offset + parseInt(val);
                console.log(`newVal: ${newVal}`);
                if (newVal >= 0 && newVal <= this.listings.length - rowSize) {
                    this.offset = newVal;
                    console.log(`offset: ${this.offset}`);
                }
            },
            nextList(){
            },
            previousList(){
            },
        },
        computed: {
            style() {
                return { transform: `translateX(${this.offset * -listingSummaryWidth}px)` }
            },
            leftArrowStyle() {
                return { visibility: (this.offset > 0 ? 'visible' : 'hidden') }
            },
            rightArrowStyle() {
                return { visibility: (this.offset < (this.listings.length - rowSize) ? 'visible' : 'hidden') }
            },
        },
        components: {
            ListingSummary,
            CarouselControl
        }
    }
</script>
<style>
    .listing-summary-group {
        padding-bottom: 20px;
    }

    .listing-summaries-wrapper {
        overflow: hidden;
    }

    .listing-summaries {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        transition: transform 0.5s;
    }
    .listing-summaries > .listing-summary {
        margin-right: 15px;
    }

    .listing-summaries > .listing-summary:last-child {
        margin-right: 0;
    }
    .listing-carousel {
        position: relative;
    }

    .listing-carousel .controls {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: calc(50% - 45px);
        left: -45px;
        width: calc(100% + 90px);
    }

    .listing-carousel .controls .carousel-control {
        color: #c5c5c5;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .listing-carousel .controls .carousel-control:hover {
        color: #4fc08d;
    }
</style>
