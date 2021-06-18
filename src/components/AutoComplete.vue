<template>
  <div>
    <md-autocomplete v-model="cityAutoComplete" :md-options="citiesName" @keyup.native="debounceTyping"   @input="sendCity">
      <label @click="hanleClick" >{{cityAutoComplete}}</label>
    </md-autocomplete>
  </div>
</template>

<script>
  export default {
    name: 'AutocompleteStatic',  
    props:["city","cities","debounceTyping"],
    computed: {
        citiesName() {
            return  this.cities.map((city) => city.LocalizedName)
        }
    },
    data() {
        return {
             cityAutoComplete:this.city,
             citiesAutoComplete:this.cities,
        }
    },
    methods: {
        sendCity() {
            this.$emit("citysearched",this.cityAutoComplete);
        },
        hanleClick(e) {
          console.log(e)
        }
    }
  }
</script>