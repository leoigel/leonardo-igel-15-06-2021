<template>
    <div>
        <button @click="handleFavorite" :class="wheather.isFavorite?'yes btn_addfavorite':'no btn_addfavorite'"> Add to Favorites</button>
         <button class="switch_tmp"  @click="handleTemperature">Switch</button >
         <div class="container" >
          <AutoComplete :cities="cities" :city="city" :debounceTyping="debounceTyping" @citysearched="city = $event" class="autocomplete"/>
          <div class="main_content">
              <div class="card_condition">
                  <div class="name">{{wheather.name}}</div>
                  <div >
                   <span class="condition_temperature_value" >{{wheather.condition.temperature[typeOfConditionTemperature].Value}} </span>
                  <span class="condition_temperature_unit">{{wheather.condition.temperature[typeOfConditionTemperature].Unit}}</span>
                  </div>
                   <div class="weatherText">{{wheather.condition.weatherText}}</div>
                  <div class="condition_icon" :style="{ backgroundImage: 'url(' + pic_url(wheather.condition.wheatherIcon) + ')' }"></div>
              </div>
              <div class="cards_container">
                  <div class="card_forecast"  v-for="(forecast,index) in wheather.forecasts" :key="index">
                      <div class="day_of_week">{{dayOfWeek(forecast.Date)}}</div>
                      <div>{{forecast.Day.IconPhrase}}</div>
                       <div class="favorite_card_icon" :style="{ backgroundImage: 'url(' + pic_url(forecast.Day.Icon) + ')' }"></div>
                       <div v-if="typeOfTemperature">
                            {{forecast.Temperature.Maximum.Value | CelsiusToFahrenheit}}
                       </div>
                       <div v-else>
                          {{forecast.Temperature.Maximum.Value | FahrenheitToCelsius}}
                       </div>
                  </div>
              </div>
          </div>
</div>  
    </div>
</template>

<script>
import lodash from 'lodash';
import api from '../axios/index';
import AutoComplete from '../components/AutoComplete';
import pic_url from '../utilits/pic_url';
import { convertFahrenheitToCelsius,convertCelsiusToFahrenheit } from "../utilits/convertTemperature";
import not_found_pic from '../assets/images/pic_herolo.png';
import moment from 'moment'
export default {
    components:{AutoComplete},
   
    data() {
        return {
            city:"",
            isFavorite:false,
            pic_url,
            conditionTemperature:false,
            not_found_pic,
            typeOfTemperature:false,
        }
    },
     filters:{
        FahrenheitToCelsius(val) {
            return convertFahrenheitToCelsius(val).toFixed(1) + "°C";
        },
        CelsiusToFahrenheit(val) {
            return convertCelsiusToFahrenheit(val).toFixed(1) + "°F";
        }

    },
    computed:{
        wheather() {
            return this.$store.state.wheather;
        },
        cities() {
            return this.$store.state.cities;
        },
        favorite() {
            return this.$store.state.favorite
        },
        favorites() {
            return this.$store.state.favorites
        },
        typeOfConditionTemperature() {
            return this.conditionTemperature?'Imperial':'Metric';
        },
        typeOfFotecastTemperature() {
            return this.typeOfTemperature?true:false;
        }  
    },

    watch: {
        city(newVal) {
               let city = this.cities.find(c => c.LocalizedName.trim().toLowerCase() === newVal.trim().toLowerCase()) 
               let reg = /^[a-zA-Z0-9_ ]*$/i;
               if(!reg.test(newVal)) {
                   this.$store.dispatch("letterNotAllow",'Just English are allow!')
               }
               if(city) {
                   this.loadData();
               }
        },
    },

methods: {
    typing() {
        this.$store.dispatch("typing",this.city);
    },
    
    geoLocation() {
        const allowLocation =  (position) => {
            const { latitude, longitude } = position.coords;
            api.geoLocation(latitude, longitude).then((city) => {
               this.city = city.data.LocalizedName;
               this.loadData()
            })
           

        }
         const rejectLocation = () => {
             this.city = 'Tel Aviv';
             this.loadData()
             
        }
       navigator.geolocation.getCurrentPosition(allowLocation, rejectLocation) 
        
    },
    loadData() {
        if(this.city) {
            this.$store.dispatch("searchForWheather",this.city);
        }
    },
    handleFavorite() {
        let temperature = {
            value:this.wheather.condition.temperature[this.typeOfConditionTemperature].Value,
            unit:this.wheather.condition.temperature[this.typeOfConditionTemperature].Unit
        }
         let wheather = {
                id:this.wheather.id,
                condition:this.wheather.condition,
                temperature:temperature,
                forecasts:this.wheather.forecasts,
                isFavorite:true,
                name:this.wheather.name,
            } 
        this.$store.dispatch('favorites',wheather);
        
    },
    handleTemperature() {
        this.conditionTemperature = !this.conditionTemperature;
        this.typeOfTemperature = !this.typeOfTemperature;
    },
    debounceTyping: lodash.debounce(function() {
       if(this.city) {
            this.typing()
       }
    },500),
    dayOfWeek(date) {
      const weekDayName =  moment(date).format('dddd');  
      return weekDayName;
    },
 
   },
     created() {
        
       
    },
    mounted() {
        this.geoLocation();
    }
    
}
</script>

<style>
.autocomplete {
    max-width: 70%;
    margin: 0 auto;
}
.card_condition {
    margin: 0px auto;
    height: 100%;
    max-width: 250px;
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 5px 10px 23px 0px rgba(0,0,0,0.58);
    
}
 .cards_container {
    display:flex;
    justify-content:space-between;
    text-align:center;
    flex-wrap:wrap;
    margin:40px 0px;   
}

.btn_addfavorite, .switch_tmp {
      font-weight: 900;
      border: 2px solid #000;
      padding:6px;
      border-radius:3px;
      margin:10px 10px 10px 16px;
      cursor: pointer;
      width:140px

}
.switch_tmp {
    color:#000;
}
.yes {
    color:red;
}
.no{ 
    color:green;
}

@media (max-width: 1000px) {
 .autocomplete {
    max-width: 85%
 } 
}

@media (max-width: 750px) {
    .cards_container {
    justify-content:space-around;
    margin:20px
}
}


</style>