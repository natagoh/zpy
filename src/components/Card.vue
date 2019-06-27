<template>
  <div 
    @mouseover="isHovering(true)"
    @mouseout="isHovering(false)"
    @click="onClick"
    :class="[{shiftCard: !isFirst}, {active: hover}, numClicks, 'card']"
  >
  	<img class="card-img" :src="getImg(value, suit)"> 
    {{ String(hover)  }}
    <p>clicked {{ String(numClicks) }} times</p>
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
    }
  },
  
  computed: {
    isFirst: function() {
      return Boolean(this.index === 0);
    }

  },
  methods: {
		getImg: function(value, suit) {
  		var images = require.context('../assets', false, /\.svg$/)
      // return images('./' + pet + ".png")
  		return images('./' + value + "_" + suit + ".svg");
  	},

    isHovering: function(isHover) {
      this.hover = isHover;
    },

    onClick: function(event) {
      this.numClicks += 1;
    },
  },
}   
</script>

<style scoped>
.card {
	display: block;
	float: left;
  width: 7em;
  z-index: 2;
  /*position: relative;*/
}

.shiftCard {
  margin-left: -5em;
}

.normalCard {
  margin-left: 0;
}
/* when hover over card */
.active {
  color: white;
  width: 8em;
  z-index: 3;
}
/* make card float to top on click*/
.click {
  position: relative;
}
</style>
