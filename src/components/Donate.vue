<template>
  <div class="container">
    <div class="row p-1">
      <div class="col-2">
        <label>First Name</label>
      </div>
      <div class="col-3">
        <input class="form-control"/>
      </div>
      <div class="col-2">
        <label>Last Name</label>
      </div>
      <div class="col-3">
        <input class="form-control"/>
      </div>
    </div>
    <div class="row p-1">
      <div class="col-2">
        <label>Credit Card</label>
      </div>
      <div class="col-10">
        <input class="form-control"/>
      </div>
    </div>
    <div class="row p-1">
      <div class="col-2">
        <label>CVC</label>
      </div>
      <div class="col-2">
        <input class="form-control"/>
      </div>
      <div class="col-2">
        <label>Expiration Date</label>
      </div>
      <div class="col-3">
        <input class="form-control"/>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <label>Address</label>
      </div>
      <div class="col-10">
        <input class="form-control"/>
      </div>
    </div>
    <div class="row p-1">
      <div class="col-2">
        <label>City</label>
      </div>
      <div class="col-3">
        <input class="form-control"/>
      </div>
      <div class="col-1">
        <label>State</label>
      </div>
      <div class="col-2">
        <input class="form-control"/>
      </div>
      <div class="col-1">
        <label>Zip</label>
      </div>
      <div class="col-2">
        <input class="form-control"/>
      </div>
    </div>
    <router-link to="/home">
      <button class="btn btn-success" v-on:click="confirm">Submit</button>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: "Donate",
    methods: {
      confirm () {
        alert('Payment Confirmed!')
      }
    }
  }
</script>

<style scoped>

</style>