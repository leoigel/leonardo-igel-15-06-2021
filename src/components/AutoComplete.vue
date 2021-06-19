<template>
  <div>
    <md-autocomplete
      v-model="cityAutoComplete"
      :md-options="citiesName"
      @keyup.native="debounceTyping"
      @input="sendCity"
    >
      <label>{{ cityAutoComplete }}</label>
    </md-autocomplete>
  </div>
</template>

<script>
  export default {
    name: 'AutocompleteStatic',  
    props:["city","cities","debounceTyping"],
    data() {
        return {
             cityAutoComplete:this.city,
             citiesAutoComplete:this.cities,
        }
    },
    computed: {
        citiesName() {
            return  this.cities.map((city) => city.LocalizedName)
        }
    },
    methods: {
        sendCity() {
            this.$emit("citysearched",this.cityAutoComplete);
        },
    }
  }
</script>