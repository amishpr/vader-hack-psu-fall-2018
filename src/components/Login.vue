<template>
  <div class="container">
    <div class="row mb-1 mt-1">
      <div class="col-2">
        <label class="mr-1">Email: </label>
      </div>
      <div class="col-6">
        <input class="form-control"placeholder="Email"/>
      </div>
    </div>
    <div class="row mb-1">
      <div class="col-2">
        <label class="mr-1">Password: </label>
      </div>
      <div class="col-6">
        <input type="password" class="form-control"placeholder="Password"/>
      </div>
    </div>
    <router-link to="/home">
    <button class="btn btn-primary">Login</button>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "Login"
  }
</script>

<style scoped>

</style>