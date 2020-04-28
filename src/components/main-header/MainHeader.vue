<template>
  <header
    class="header"
  >
    <div
        class="content"
    >
        <router-link
            class="title"
            :to="{ name: 'main' }"
        >
            <h1 class="title">Movie database</h1>
        </router-link>
        <div
            v-if="shouldShowSearch"
            class="search"
        >
            <input
                v-model="searchInputValue"
                class="search-input"
                type="text"
                placeholder="Search"
            />
        </div>
    </div>
  </header>
</template>

<script>
import debounce from 'lodash/debounce'; 


export default {
    data() {
        return {
            updateQueryDebounced: debounce(this.updateQuery, 300),
        };
    },
    computed: {
        searchInputValue: {
            get() {
                return this.$route.query.query;
            },
            set(value) {
                this.updateQueryDebounced(value);
            },
        },
        shouldShowSearch() {
            return this.$route.name === 'main';
        },
    },
    methods: {
        updateQuery(value) {
            this.$router.replace({
                query: {
                    query: value,
                },
            });
        },
    },
}
</script>

<style scoped>
    .header {
        background: #222222;
        padding: 10px 15px;
    }

    .content {
        max-width: 1000px;
        display: flex;
        margin: auto;
    }

    .title {
        margin: 0 auto 0 0;
        color: #ffffff;
        font-size: 1.35rem;
        display: inline-block;
    }

    .search {
        background: #111111;
        align-self: center;
    }

    .search-input {
        padding: 5px 7px;
        background: transparent;
        color: #ffffff;
        border: none;
        box-sizing: border-box;
    }

    .search-input::placeholder {
        color: #ffffff;
    }

    @media screen and (max-width: 425px) {
        .header {
            flex-flow: column nowrap;
        }

        .search {
            align-self: stretch;
            margin-top: 10px;
        }

        .search-input {
            width: 100%;
        }
    }
</style>