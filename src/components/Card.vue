<template>
  <div 
    @mouseover="isHovering(true)"
    @mouseout="isHovering(false)"
    @click="onClick"
    :class="[{shiftCard: !isFirst}, {active: hover}, {click: clicked}, 'card']"
  >
  	<img draggable="false" class="card-img" :src="getImg(value, suit)"> 
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
  // watch: {
  //   numClicks: function (newVal) {
  //     this.clicked = true;
  //      // console.log('Change to numCLicks', newVal)
  //   }
  // },
  
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

    // checks if this is the first card in the hand
    // isFirst: function () {
    //   return Boolean(this.index === 0);
    // },

    isHovering: function(isHover) {
      this.hover = isHover;
      if (!isHover) {
        this.clicked = false;
      }
    },

    onClick: function(event) {
      this.numClicks += 1;
      this.clicked = !this.clicked;
      // if (this.click === "hi there") {
      //   this.click = "waut"
      // } else {
      //   this.click = "hi there"
      // }
      // console.log("on click!", this.index, this.hover)
    },

    
    // calculateClass: function() {
    //   var isFirst = Boolean(this.index === 0);
    //   var classList = [
    //     'card',
    //     isFirst ? "shiftCard" : "normalCard"
    //   ]
    //   return classList
    // }
  },



  // mounted: function () {
  //   document.querySelector('.card').style.left = 50 * this.index + 'px';
  // }
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
    background: rgba(255, 255, 255, .3);
}
*/
.shiftCard {
  margin-left: -5em;
}

.normalCard {
  margin-left: 0;
}

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
/*.click {
  position: relative;
}*/
</style>
