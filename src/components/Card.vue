<template>
  <div 
    @mouseover="isHovering(true)"
    @mouseout="isHovering(false)"
    @click="onClick"
    :class="[{shiftCard: !isFirst}, {active: hover}, {cardlicked: clicked}, 'card']"
  >
  	<img class="card-img" :src="getImg(value, suit)"> 
 <!--    {{ String(hover)  }}
    <p>clicked {{ String(numClicks) }} times</p> -->
  </div>
</template>

<script>

export default {
  name: 'Card', 
  props: {
    value: String,
    suit: String,
    index: Number
  },
  data: function() {
    return { 
      hover: false,
      numClicks: 0,
      clicked: false,
    }
  },
  
  computed: {
    isFirst: function() {
      return Boolean(this.index === 0);
    }

  },
  methods: {
		getImg: function(value, suit) {
  		var images = require.context('../assets/cards', false, /\.svg$/)
      // return images('./' + pet + ".png")
  		return images('./' + suit + "_" + value + ".svg");
  	},

    isHovering: function(isHover) {
      this.hover = isHover;
      if (!isHover) {
        this.clicked = false;
      }
    },

    onClick: function(event) {
      this.numClicks += 1;
      this.clicked = !this.clicked;
    },

  },
}   
</script>

<style scoped>
.card {
	display: flex;
	float: left;
  width: 7em;
  border: gray;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.45em;
  margin-left: auto;
  /*z-index: 2;*/
  /*position: relative;*/
}
/*.card:before {
    content: "";
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 0, .9);
}*/

.shiftCard {
  margin-left: -5em;
}

/*.normalCard {
  margin-left: 0;
}*/

/* prevent image from interfering with draggable */
.card-img { 
  pointer-events: none;
}

/* when hover over card */
/*.active {
  color: white;
  width: 8em;
  z-index: 3;
}*/


/* make card float to top on click*/
/*.cardClicked {
  position: relative;
}*/
</style>
