import Vue from 'vue';
import Vuex from 'vuex';
import api from "../axios/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        favoriteCity:"",
        cities:[],
        wheather:null,
        favorite:false,
        favorites:[],
        error:"",

    },
    mutations: {
        city(state,payload) {
            state.city = payload;
        },
        typing(state,payload) {
            state.cities = payload.data;
        },
        error_fetch(state,payload) {
            state.error = payload;
        },
        noExistCity(state,payload) {
            state.error = payload;
        },
        wheather(state,payload) {
            let wheatherExist = state.favorites.find(w => w.id === payload.id);
            if(!wheatherExist) {
                state.wheather = payload;
            }else {
                state.wheather = wheatherExist;
            }
           
        },
        letterNotAllow(state,payload) {
            state.error = payload;
        },
        favorites(state,payload) {
            let wheatherExist = state.favorites.some(w => w.id === payload.id)
            if(!wheatherExist) {
                state.favorites = [...state.favorites,payload];
                state.wheather = payload;
            }
            else {
                for(let i = 0; i < state.favorites.length; i++) {
                    if(state.favorites[i].id === payload.id) {
                        state.favorites[i].isFavorite = !state.favorites[i].isFavorite;
                        state.favorites[i].temperature = payload.temperature;
                        state.wheather = state.favorites[i];
                    }
                }
            }
            state.favorites = state.favorites.reduce((acc, current) => {
                const wheater = acc.find(item => item.id === current.id);
                if (!wheater) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
              }, []);
            
        },
        favoriteCity(state,payload){
            state.favoriteCity = payload;
        }
    },
    actions: {
        city({commit},payload) {
            commit("city",payload);
        },
        searchForWheather({commit},payload) {
            api.autoComplete(payload).then((cities) => {
               let city = cities.data.find((c) => c.LocalizedName.trim().toLowerCase() === payload.trim().toLowerCase());
               
               if(city) {
                   return api.currentConditions(city.Key).then((conditions) => {
                       return api.forecasts(city.Key).then((forecast) => {
        
                           let wheather = {
                               id: city.Key,
                               name:city.LocalizedName,
                               condition: {
                                   temperature:conditions.data[0].Temperature,
                                   wheatherIcon:conditions.data[0].WeatherIcon,
                                   weatherText:conditions.data[0].WeatherText
                               },
                               forecasts: forecast.data.DailyForecasts,
                               isFavorite:false,

                           }
                           commit("wheather",wheather);
                       })
                   })
               }
            }).catch(error => {
                commit('error_fetch',error)
            })
        },
        favorites({commit},payload) {
            commit('favorites',payload);
        },
        favoriteCity({commit},payload) {
            commit('favoriteCity',payload)
        },
        typing({commit},payload) {
            api.autoComplete(payload).then((cities) => {
                commit('typing',cities);
            })
        },
        error_fetch({commit},payload) {
            commit('error_fetch',payload);
        },
        letterNotAllow({commit},payload) {
            commit('letterNotAllow',payload);
        }
    }
})