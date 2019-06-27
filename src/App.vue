<template>
  <div id="app">
    <!-- your hand -->

    <div id="hand">
      <draggable v-model="hand" group="cards" @start="drag=true" @end="drag=false">
        <!-- <div v-for="element in myArray" :key="element.id">{{element.name}}</div> -->
        <Card v-for="(card, index) in hand" :value="card.value" :suit="card.suit" :index="index" :key="card.id"/>
      </draggable>
    </div>

    <div id="kitty">
      <draggable v-model="kitty" group="cards" @start="drag=true" @end="drag=false">
        <!-- <div v-for="element in myArray" :key="element.id">{{element.name}}</div> -->
        <Card v-for="(card, index) in kitty" :value="card.value" :suit="card.suit" :index="index" :key="card.id"/>
      </draggable>
    </div>
    <!-- <div class="hand">
      <Card v-for="(card, index) in cards" :value="card.value" :suit="card.suit" :index="index" :key="card.id"/>
    </div> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Card from './components/Card.vue'
import draggable from 'vuedraggable'

export default {
  name: 'app',
  data: function() {
    return  {
      hand: [
        { value: "ace", suit: "clubs" },
        { value: "ace", suit: "clubs" },
        { value: "king", suit: "hearts" },
        { value: "ace", suit: "clubs" },
        { value: "4", suit: "spades" },
        { value: "jack", suit: "diamonds" },
      ],
      kitty: [
        { value: "ace", suit: "clubs" },
        { value: "ace", suit: "clubs" },
        { value: "king", suit: "hearts" },
        { value: "ace", suit: "clubs" },
        { value: "2", suit: "spades" },
        { value: "jack", suit: "diamonds" },
      ]
    }
  },

  components: {
    Card,
    draggable
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

  width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  /*color: #2c3e50;*/
/*  margin-top: 60px;
*/
  /*position: relative;*/

  display: flex;
  flex-direction: column-reverse;
  justify-content: center;

  z-index: 1;
}

#hand {
  position: absolute;
  bottom: 0;
}

#kitty {
  min-height: 14em;

  background: #EFEFEF;
  /*box-shadow: inset 0 3px 7px #000000;*/
  box-shadow: 0 1px 1.5px 0 rgba(0,0,0, 0.12);
  box-shadow: 0 1px 1px 0 rgba(,0,0,0, 0.24);  

  border-radius: 2px;
  margin: auto;

  width: 70%;

  /*position: relative;
  left: 20px;
  top: 20px;*/

  /*position: relative;*/
 /* box-shadow: (
    0 1px 1.5px 0 rgba(0,0,0, 0.12),
    0 1px 1px 0 rgba(,0,0,0, 0.24)
  );  */
}

#kitty draggable {
  margin: auto;
}
</style>
