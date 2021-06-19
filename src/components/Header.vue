<template>
  <div class="header_container">
    <div class="logo">
      Herolo Task
    </div>
    <div class="btn_container">
      <md-switch
        v-model="tooggleButton"
        @change="handleToggle"
      />
      <router-link
        to="/"
        tag="button"
      >
        Home
      </router-link>
      <router-link
        to="/favorites"
        tag="button"
      >
        Favorites
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tooggleButton: false,
        }
    },
    methods:{
        handleToggle() {
            this.$emit('toggled',this.tooggleButton);
        }
    }
}
</script>

<style scoped>
    .header_container {
        background: rgb(0, 128, 255);
        width: 100%;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
    }
    .logo {
        color: #ffffff;
        font-size: 40px;
    }
    .btn_container {
        display:flex;
        align-items:center;
    }
    .btn_container > button {
        background: #4CAF50;
        border:none;
        margin-left: 8px; 
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 20px;
        border-radius: 3px;
        cursor: pointer;
    }

    button.router-link-exact-active {
        background:mediumseagreen;
    }
    @media (max-width: 600px) { 
        .header_container {
        flex-direction: column;
        align-items: flex-start;
    }
    .logo {
        font-size: 30px;
    }
    .btn_container > button {
        margin-left: 4px; 
        color: white;
        padding: 3px 0px;
        text-align: center;
        text-decoration: none;
        display: block;
        font-size: 20px;
        border-radius: 3px;
        cursor: pointer;
        margin: 8px 5px;
        padding:10px;
    }
    button.router-link-exact-active {
        color:	rgb(0, 255, 191);
        color: white;
    }
}
</style>
