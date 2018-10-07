import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accuWeatherKey: 0,
    city: '',
    stateAbbr: '',
    alarm: null,
    startDate: 0,
    endDate: 0,
    rain: 0,
    ice: 0,
    snow: 0,
    windGusts: 0,
    wind: 0,
    thunderStorm: 0,
    volunteers: [
      {name: 'Amish P.', contact: 'amishp@gmail.com'},
      {name: 'Ronak P.', contact: 'ronakp@gmail.com'},
      {name: 'Kishan P.', contact: 'kishanp@yahoo.com'},
      {name: 'John H.', contact: 'johnh@hotmail.com'},
    ]
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
      state.alarm = payload
      // Reset
      state.rain = 0
      state.ice = 0
      state.snow = 0
      state.wind = 0
      state.windGusts = 0
      state.thunderStorm = 0
      state.stateDate = 0
      state.endDate = 0

      console.debug('START DATE: ', payload[0].Date)
      state.startDate = new Date(payload[0].Date).toDateString()


      console.debug('END DATE: ', payload[payload.length - 1].Date)
      state.endDate = new Date(payload[payload.length - 1].Date).toDateString()

      for (let i = 0; i < payload.length; i++) {
        let AlarmType = payload[i].Alarms[0].AlarmType
        let Value = payload[i].Alarms[0].Value.Imperial.Value

        if (AlarmType === 'Rain') {
          state.rain += Value
        }
        if (AlarmType === 'Ice') {
          state.ice += Value
        }
        if (AlarmType === 'Snow') {
          state.snow += Value
        }
        if (AlarmType === 'Wind') {
          state.wind += Value
        }
        if (AlarmType === 'WindGust') {
          state.windGusts += Value
        }
        if (AlarmType === 'Thunderstorm') {
          state.thunderStorm += Value
        }
      }

      console.error("Rain: ", state.rain)
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
