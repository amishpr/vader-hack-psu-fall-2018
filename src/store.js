import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accuWeatherKey: 0,
    city: '',
    stateAbbr: '',
    stateDate: 0,
    endDate: 0,
    rain: 0,
    snow: 0,
    ice: 0,
    windGusts: 0,
    wind: 0,
  },
  mutations: {
    setAccuWeatherKey (state, key) {
      console.debug('setAccuWeatherKey', key)
      state.accuWeatherKey = key
    },
    setCity (state, city) {
      state.city = city
    },
    setStateAbbr (state, stateAbbr) {
      state.stateAbbr = stateAbbr
    },
    processWeatherAlarm (state, payload) {
    }
  },
  getters: {
    getAccuWeatherKey(state) {
      return state.accuWeatherKey
    }
  },
  actions: {
    getCityKey(context, location) {
      let stateAbbr = location.state_abbr
      let cityName = location.city
      let url = "http://dataservice.accuweather.com/locations/v1/cities/US/" + stateAbbr + "/search?apikey=HackPSU2018&q=" + cityName

      const fetchData = () => fetch(url)
      const getCityKeyData = () => fetchData().then(res => res.json()).then(json => {
        console.debug('actions.getCityKey()', json[0].Key)
        context.commit('setAccuWeatherKey', json[0].Key)
        context.dispatch('getWeatherAlarms', json[0].Key)
      })
      getCityKeyData()

    },

    getWeatherAlarms (context, key) {
      let url = "http://dataservice.accuweather.com/alarms/v1/15day/" + key + "?apikey=HackPSU2018"
      const fetchData = () => fetch(url)
      const getWeatherAlarmsData = () => fetchData().then(res => res.json()).then(json => {
        console.debug('actions.getWeatherAlarms()', json)
        context.commit('processWeatherAlarm', json)
      })
      getWeatherAlarmsData()

    }
  }
})
