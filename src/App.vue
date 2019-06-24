<template>
  <div id="app">
    <!-- <img src="./assets/ace_clubs.svg"> -->
    <Card value="ace" suit="clubs"/>

    <!-- your hand -->
    <!-- <div class="hand" v-for="card in cards">
      <p> hi </p>
      <img src="./assets/ace_clubs.svg">
    </div> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Card from './components/Card.vue'

export default {
  name: 'app',
  data: function() {
    return  {
      cards: ["HI", "JI"]
    }
  },

  components: {
    Card
  },
  
  // created: function () {
  //  this.url = "../static/" + this.value + "_" + this.suit + ".svg";
  //   console.log('card value is: ' + src);
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
/*  margin-top: 60px;
*/
  position: absolute;
  top: 0;

  z-index: 1;
}
</style>
