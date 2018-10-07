<template>
  <div class="container">
  <table class="table table-bordered">
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
    <tr v-for="v in volunteers">
     <td>{{v.name}}</td>
     <td>{{v.contact}}</td>
    </tr>
  </table>
    <button class="btn btn-success">Donate</button>
  </div>
</template>

<script>
  export default {
    name: "Join",
    computed: {
      volunteers () {
        return this.$store.state.volunteers
      }
    }
  }
</script>

<style scoped>

</style>