<template>
  <div 
    @mouseover="mouseOver"
    :class="[{shiftCard: !isFirst(), active: hover}, 'card']"
  >
  	<img class="card-img" :src="getImg(value, suit)"> 
  	<!-- <img class="card-img" src="../../static/ace_clubs.svg">  -->
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
  data: {
    function() {
      return {
        hover: false
      }
    }
  },
  methods: {
		getImg(value, suit) {
  		var images = require.context('../assets', false, /\.svg$/)
      // return images('./' + pet + ".png")
  		return images('./' + value + "_" + suit + ".svg");
  	},

    // checks if this is the first card in the hand
    isFirst: function () {
      return Boolean(this.index === 0);
    },

    mouseOver: function() {
      this.hover = !this.hover;
      console.log("moused over!");
    }
    // getSpacing(index) {
    //   return 50 * index + 'px';
    // }
  },
  // mounted: function () {
  //   document.querySelector('.card').style.left = 50 * this.index + 'px';
  // }
}   
</script>

<style scoped>
.card {
	display: block;
	float: left;
  width: 7em;

  /*position: absolute;*/
}

.shiftCard {
  margin-left: -5em;
}

/* when hover over card */
.active {
  border: blue;
  z-index: 3;
  width: 10em;
}
</style>
