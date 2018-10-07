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
    <!--Search-->
    <button class="btn btn-primary" v-on:click="searchForKey()">Search</button>

    <table class="table table-bordered mt-1">
      <tr>
        <th>Natural Disaster</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Help</th>
      </tr>
      <tr>
        <td v-if="rain >= 5">Possible Flooding in {{city}}</td>
        <td v-if="rain >= 5">{{startDates}}</td>
        <td v-if="rain >= 5">{{endDate}}</td>
        <td v-if="rain >= 5">
          <button class="btn btn-success" v-if="!eventExists">Create</button>
          <router-link to="/join">
            <button class="btn btn-warning" v-if="eventExists">Join</button>
          </router-link>
        </td>

        <td v-if="ice >= 3">Possible Snowstorm in {{city}}</td>
        <td v-if="ice >= 3">{{startDates}}</td>
        <td v-if="ice >= 3">{{endDate}}</td>
        <td v-if="ice >= 3">
          <button class="btn btn-success" v-if="!eventExists">Create</button>
          <router-link to="/join">
            <button class="btn btn-warning" v-if="eventExists">Join</button>
          </router-link>
        </td>

        <td v-if="wind >= 30">Possible Hurricane in {{city}}</td>
        <td v-if="wind >= 30">{{startDates}}</td>
        <td v-if="wind >= 30">{{endDate}}</td>
        <td v-if="wind >= 30">
          <button class="btn btn-success" v-if="!eventExists">Create</button>
          <router-link to="/join">
          <button class="btn btn-warning" v-if="eventExists">Join</button>
          </router-link>
        </td>
      </tr>
    </table>
    <!--Show Stats-->
    <button class="btn btn-info" v-on:click="showStats = !showStats">Show Stats</button>
    <div v-if="showStats">
      <div class="row p-1">
        <div class="col-2">
          <label>AccuWeatherKey:</label>
        </div>
        <div class="col-6">
          {{accuWeatherKey}}
        </div>
      </div>
      <table class="table table-bordered">
        <tr>
          <th>Type</th>
          <th>Value (Imperial)</th>
        </tr>
        <tr v-for="a in alarms" v-if="alarms !== null">
          <td>{{a.Alarms[0].AlarmType}}</td>
          <td>{{roundToTwoDecimal(a.Alarms[0].Value.Imperial.Value)}}</td>
        </tr>
      </table>
      <table class="table table-bordered">
        <tr>
          <th>Rain</th>
          <th>Ice</th>
          <th>Snow</th>
          <th>Wind</th>
          <th>Wind Gusts</th>
          <th>Thunderstorms</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
        <tr>
          <td>{{roundToTwoDecimal(rain)}}</td>
          <td>{{roundToTwoDecimal(ice)}}</td>
          <td>{{roundToTwoDecimal(snow)}}</td>
          <td>{{roundToTwoDecimal(wind)}}</td>
          <td>{{roundToTwoDecimal(windGusts)}}</td>
          <td>{{roundToTwoDecimal(thunderStorm)}}</td>
          <td>{{startDates}}</td>
          <td>{{endDate}}</td>
        </tr>
      </table>
    </div>
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
        eventExists: true,
        showStats: false,
        coordinates: null,
        lat: null,
        lng: null,
        location: null,
        user_City: '',
        user_State: ''
      }
    },
    methods: {
      searchForKey() {
        let newLocation = {
          city: this.user_City,
          state_abbr: this.user_State
        }
        this.$store.dispatch("getCityKey", newLocation)
        this.$store.commit("setCity", this.user_City)
        this.$store.commit("setStateAbbr", this.user_State)
      },
      roundToTwoDecimal(num) {
        return Math.round(num * 100) / 100
      }
    },
    computed: {
      accuWeatherKey() {
        return this.$store.state.accuWeatherKey
      },
      city() {
        return this.$store.state.city
      },
      stateAbbr() {
        return this.$store.state.stateAbbr
      },
      alarms() {
        return this.$store.state.alarm
      },
      rain() {
        return this.$store.state.rain
      },
      ice() {
        return this.$store.state.ice
      },
      snow() {
        return this.$store.state.snow
      },
      wind() {
        return this.$store.state.wind
      },
      windGusts() {
        return this.$store.state.windGusts
      },
      thunderStorm() {
        return this.$store.state.thunderStorm
      },
      startDates() {
        return this.$store.state.startDate
      },
      endDate() {
        return this.$store.state.endDate
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
