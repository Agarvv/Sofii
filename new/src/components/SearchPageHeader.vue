<template>
<div>
    <header>
      <div class="logo">
        <h2>Sofii</h2>
      </div>
      <div class="search-input">
        <input v-model="searchQ" type="search" placeholder="Search..."/>
      </div>
      <div class="icons">
        <font-awesome-icon icon="search" @click="search"/>
        <font-awesome-icon icon="filter" @click="toggleFilterButton"/>
      </div>
    </header>
</div>
</template>

<script>
export default {
    name: 'SearchPageHeader',
    data() {
        return {
            searchQ: ""
        }
    },
    methods: {
        search() {
            if (this.searchQ.trim() !== "") {
                this.$router.push(`/search/${encodeURIComponent(this.searchQ)}`);
            }
        },
        toggleFilterButton() {
            this.$emit("toggleFilters")
        }
    }
}
</script>

<style scoped>
header {
    background-color: #ff6347;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    padding: 0 20px;
}

header .search-input {
    flex: 1;
    margin: 0 20px;
}

header .search-input input {
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.3s ease;
}

header .search-input input:focus {
    border-color: #ff6347;
}

header .icons {
    display: flex;
    gap: 10px;
    align-items: center;
}

header .icons i {
    font-size: 24px;
    color: white;
}
</style>