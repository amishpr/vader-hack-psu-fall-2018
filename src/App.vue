<template>
  <div id="app">
    <img src="https://i.imgur.com/SVJDKUp.png" width="400" class="center">
    <router-view></router-view>
    <!--<home></home>-->
  </div>
</template>
<script>
  import Home from './components/Home'

  export default {
    components: {
      Home
    }
  }
</script>
<style>
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
</style>
