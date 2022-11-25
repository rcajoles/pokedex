<template>
    <div class="listing-action">
        <div class="listing-save" @click.stop="toggleSaved()">
            <button v-if="button">
                <i :class="liked"></i>
            </button>
            <i v-else :class="liked"></i>
        </div>
        <div class="listing-disliked" @click.stop="toggleDisliked()">
            <button v-if="button">
                <i :class="disliked"></i>
            </button>
            <i v-else :class="disliked"></i>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'id', 'button' ],
        methods: {
            toggleSaved() {
                this.$store.dispatch('toggleSaved', this.id);
            },
            toggleDisliked() {
                this.$store.dispatch('toggleDisliked', this.id);
            }
        },
        computed: {
            isListingSaved() {
                return this.$store.state.saved.find(saved => saved === this.id);
            },
            isListingDisliked() {
                return this.$store.state.disliked.find(disliked => disliked === this.id);
            },
            liked() {
                let saved = this.isListingSaved;
                return {
                    'fa': true,
                    'fa-lg': true,
                    'fa-thumbs-up': saved,
                    'fa-thumbs-o-up': !saved
                }
            },
            disliked() {
                let disliked = this.isListingDisliked;
                return {
                    'fa': true,
                    'fa-lg': true,
                    'fa-thumbs-down': disliked,
                    'fa-thumbs-o-down': !disliked
                }
            },
            likedMessage() {
                return this.isListingSaved ? 'Saved' : 'Save';
            },
            dislikedMessage() {
                return this.isListingDisliked ? 'Unliked' : 'Unlike';
            }
        }
    }
</script>
<style>
    .listing-action {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        display: inline-flex;
        flex-wrap: wrap;
    }

    .listing-save {
        position: absolute;
        right: 30px;
        cursor: pointer;
    }

    .listing-save .fa-thumbs-o-up {
        color: #1876f2;
    }
    
    .listing-disliked .fa-thumbs-o-down {
        color: #1876f2;
    }

    .listing-save .fa-thumbs-o-up:hover {
        color: #808080;
    }

    .listing-disliked .fa-thumbs-o-down:hover {
        color: #808080;
    }

    .listing-save .fa-thumbs-up {
        color: #1876f2;
    }

    .listing-disliked .fa-thumbs-down {
        color: #1876f2;
    }

    .listing-save i {
        padding-right: 4px;
    }

    .listing-save button,
    .listing-disliked button {
        background-color: transparent;
        border: none;
    }

    .listing-save button .fa-thumbs-o-up {
        color: #1876f2;
    }

    .listing-save button .fa-thumbs-o-up:hover {
        color: #808080;
    }

    .listing-disliked button .fa-thumbs-o-down {
        color: #1876f2;
    }

    .listing-disliked button .fa-thumbs-o-down:hover {
        color: #808080;
    }
</style>
