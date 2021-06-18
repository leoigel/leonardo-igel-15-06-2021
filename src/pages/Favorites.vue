<template>
     <div class="container">
         <div v-if="favoritesWhethers.length > 0" class="cards_favorites">
             <div class="favorite_card" v-for="favorite in favoritesWhethers" :key="favorite.id">
                 <div class="name">{{favorite.name}}</div>
                 <div>
                 <span>{{favorite.temperature.value}}</span>
                 <span>{{favorite.temperature.unit}}</span>
                 </div>
                  <div class="card_forecast_icon" :style="{ backgroundImage: 'url(' + pic_url(favorite.condition.wheatherIcon) + ')' }"></div>
             </div>
         </div>
         <div v-else class="no_city">No Wheather City was saved!!!</div>
    </div>
</template>

<script>
import pic_url from '../utilits/pic_url';
export default {

    data() {
        return {
            favoritesWhethers:null,
            pic_url,
        }
    },
    methods: {
        loadFavoriteWheather() {
             this.favoritesWhethers = this.$store.state.favorites.filter((favorite) => favorite.isFavorite === true).map((item) => {
            let favorite = {
                id:item.id,
                name:item.name,
                condition:item.condition,
                temperature:item.temperature,
            }
            return favorite;
        });
        }
    },

    mounted() {
         this.loadFavoriteWheather();  
         console.log(this.favoritesWhethers)
    }
 }

</script>

<style>

 .cards_favorites {
    display:flex;
    text-align:center;
    justify-content:center;
    flex-wrap:wrap;
    margin:40px 0px;
    /* border:1px solid gray; */
}
span + span {
    margin-left:3px;
}
.no_city {
    font-size:24px;
    font-weight: 900;
     text-align:center;
     line-height: 20px;
}

</style>