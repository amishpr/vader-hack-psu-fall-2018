<template>
  <div class="container">
    <div class="row p-1">
      <div class="col-2">
        <label class="mr-1">City:</label>
      </div>
      <div class="col-6">
        <label v-if="location !== null">{{city}}</label>
      </div>
    </div>
    <div class="row p-1">
      <div class="col-2">
        <label class="mr-1">State:</label>
      </div>
      <div class="col-6">
        <label v-if="location !== null">{{stateAbbr}}</label>
      </div>
    </div>
    <div class="row p-1">
      <div class="col-2">
        <label>AccuWeatherKey:</label>
      </div>
      <div class="col-6">
        {{accuWeatherKey}}
      </div>
    </div>
    <div class="row p-1">
      <div class="col-2">
        <label class="mr-1">City: </label>
      </div>
      <div class="col-6">
        <input class="form-control" v-model="user_City" placeholder="City"/>
      </div>
    </div>
    <div class="row p-1">
      <div class="col-2">
        <label class="mr-1">State: </label>
      </div>
      <div class="col-6">
        <input class="form-control" v-model="user_State" placeholder="State"/>
      </div>
    </div>
    <button class="btn btn-primary" v-on:click="searchForKey()">Search</button>
  </div>
</template>

<script>

  import {here} from '../../APIKeys'
  import cities from 'cities'

  export default {
    name: 'home',
    mounted() {
      this.$getLocation({
        enableHighAccuracy: false, //defaults to false
        timeout: Infinity, //defaults to Infinity
        maximumAge: 0 //defaults to 0

      })
      .then(coordinates => {
        this.coordinates = coordinates
        console.debug("Location: ", this.coordinates)
      })
    },
    data() {
      return {
        coordinates: null,
        lat: null,
        lng: null,
        location: null,
        user_City: '',
        user_State: ''
      }
    },
    methods: {
      searchForKey () {
        let newLocation = {
          city: this.user_City,
          state_abbr: this.user_State
        }
        this.$store.dispatch("getCityKey", newLocation)
        this.$store.commit("setCity", this.user_City)
        this.$store.commit("setStateAbbr", this.user_State)
      }
    },
    computed: {
      accuWeatherKey() {
        return this.$store.state.accuWeatherKey
      },
      city() {
        return this.$store.state.city
      },
      stateAbbr () {
        return this.$store.state.stateAbbr
      }
    },
    watch: {
      coordinates() {
        this.lat = this.coordinates.lat
        this.lng = this.coordinates.lng
        this.location = cities.gps_lookup(this.lat, this.lng)
        console.debug("LAT: ", this.lat)
        console.debug("LNG: ", this.lng)
        console.debug("CITY: ", this.location)
        this.$store.dispatch("getCityKey", this.location)
        this.$store.commit("setCity", this.location.city)
        this.$store.commit("setStateAbbr", this.location.state_abbr)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .center {
    text-align: center;
  }

</style>
