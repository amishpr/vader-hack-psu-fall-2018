<template>
  <div class="container">
    <a>https://{{city.toLowerCase()}}.flood.slack.com</a>
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
      volunteers() {
        return this.$store.state.volunteers
      },
      city() {
        return this.$store.state.city
      },
    }
  }
</script>

<style scoped>

</style>