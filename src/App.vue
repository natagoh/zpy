<template>
  <div id="app">
    <!-- your hand -->

    <Container 
      id="hand"
      @drop-ready="dropReady"
      orientation="horizontal"
      :get-child-payload="getHandPayload"
      @drop="onDrop('hand', $event)"
      drag-class="dragging"
      group-name="cards"
    >
      <!-- <Draggable v-model="hand" group="cards" @start="drag=true" @end="drag=false"> -->
      <Draggable v-for="(card, index) in hand" :key="card.id">
        <Card :value="card.value" :suit="card.suit" :index="index"/>
      </Draggable>
    </Container>

    <Container 
      id="kitty"
      @drop-ready="dropReady"
      orientation="horizontal"
      :get-child-payload="getKittyPayload"
      @drop="onDrop('kitty', $event)"
      drag-class="dragging"
      group-name="cards"
    >
      <Draggable v-for="(card, index) in kitty" :key="card.id">
        <!-- <Card v-for="(card, index) in kitty" :value="card.value" :suit="card.suit" :index="index" :key="card.id"/> -->
        <Card :value="card.value" :suit="card.suit" :index="index"/>
      </Draggable>
    </Container>

     
    <!-- <div class="hand">
      <Card v-for="(card, index) in cards" :value="card.value" :suit="card.suit" :index="index" :key="card.id"/>
    </div> -->
  </div>
</template>


<!-- <template>
  <div>
    <div class="simple-page">
        <Container @drop="onDrop">            
          <Draggable v-for="item in items" :key="item.id">
            <div class="draggable-item">
              {{item.data}}
            </div>
          </Draggable>
        </Container>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "./utils";
export default {
  name: "Simple",
  components: { Container, Draggable },
  data() {
    return {
      items: generateItems(50, i => ({ id: i, data: "Draggable " + i }))
    };
  },
  methods: {  
    onDrop(dropResult) {
      this.items = applyDrag(this.items, dropResult);
    }
  }
};
</script> -->


<script>
// import HelloWorld from './components/HelloWorld.vue'
import Card from './components/Card.vue'
// import draggable from 'vuedraggable'
import { Container, Draggable } from "vue-smooth-dnd";
// import { applyDrag, generateItems } from "./utils";


const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};

export default {
  name: 'app',
  data: function() {
    return  {
      // hand: [
      //   { value: "ace", suit: "clubs" },
      //   { value: "ace", suit: "clubs" },
      //   { value: "king", suit: "hearts" },
      //   { value: "ace", suit: "clubs" },
      //   { value: "4", suit: "spades" },
      //   { value: "jack", suit: "diamonds" },
      // ],
      hand: generateItems(25, i => ({ id: 'h' + i, value: "king", suit: "hearts" })),
      kitty: generateItems(8, i => ({ id: 'k' + i, value: "king", suit: "clubs" }))
      // kitty: [
      //   { value: "ace", suit: "clubs" },
      //   { value: "ace", suit: "clubs" },
      //   { value: "king", suit: "hearts" },
      //   { value: "ace", suit: "clubs" },
      //   { value: "2", suit: "spades" },
      //   { value: "jack", suit: "diamonds" },
      // ]
    }
  },

  components: {
    Card,
    // draggable
    Container, 
    Draggable
  },

   methods: {  
    // onDropHand(dropResult) {
    //   this.hand = applyDrag(this.hand, dropResult);
    // },
    // onDropKitty(dropResult) {
    //   this.kitty = applyDrag(this.kitty, dropResult);
    // },

    onDrop: function(collection, dropResult) {
      this[collection] = applyDrag(this[collection], dropResult)
    },
    dropReady: function() {
      // console.log(arguments);
    },
    getHandPayload: function(index) {
      return this.hand[index];
    },
    getKittyPayload: function(index) {
      return this.kitty[index];
    },
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
  top: 0;
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

.dragging {
  background-color: yellow;
  border: blue;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.45em;
}
</style>
