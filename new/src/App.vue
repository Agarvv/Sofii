<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
img {
    loading: 'lazy';
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
    padding: 0;
    margin: 0;
}
</style>
