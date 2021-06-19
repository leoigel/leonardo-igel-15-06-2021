import Vue from "vue";
import axios from "axios";
const apiKey = "qXWynkdr89DXaRAWHcuYu5rAWGCDGgMA";

const baseUrl = "https://dataservice.accuweather.com";

let api = {
    geoLocation(latitude,longitude) {
        return axios(`${baseUrl}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude}%2C${longitude}`);
    },
    autoComplete : (city) => {
       return axios(`${baseUrl}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`);
    },
    
     forecasts:  (key) => {
        return axios(`${baseUrl}/forecasts/v1/daily/5day/${key}?apikey=${apiKey}&language=en-us`);
     },
    
     currentConditions: (key) => {
        return axios(`${baseUrl}/currentconditions/v1/${key}?apikey=${apiKey}&language=en-us`);
     },
     pic_url: (num) => {
         return `https://developer.accuweather.com/sites/default/files/${num}-s.png`;
     }
}


Vue.use({
    install(Vue) {
        Vue.prototype.$http = {api};
    }
})
export default api;