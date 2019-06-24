<template>
  <div class="card">
  	<img class="card-img" :src="getImg(value, suit)"> 
  	<!-- <img class="card-img" src="../../static/ace_clubs.svg">  -->
  	{{ value }}
  </div>
</template>

<script>
export default {
  name: 'Card', 
  props: {
    value: String,
    suit: String
  },

  methods: {
		getImg(value, suit) {
  		var images = require.context('../assets', false, /\.svg$/)
      // return images('./' + pet + ".png")
  		return images('./' + this.value + "_" + this.suit + ".svg");
  	}
  }
}   
</script>

<style scoped>
.card {
	display: block;
	float: left;
  	/*color: red;
  	font-size: 2em;*/
}
</style>
