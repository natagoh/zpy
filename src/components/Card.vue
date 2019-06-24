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
  // computed: {
  //   url: function() {
  //     return "../../static/" + this.value + "_" + this.suit + ".svg";
  //   }
  // },
  methods: {
		getImg(value, suit) {
		var images = require.context('../assets', false, /\.svg$/)
    // return images('./' + pet + ".png")
		return images('./' + this.value + "_" + this.suit + ".svg");
	}
}
  // mounted: function () {
  // 	this.url = "../static/" + this.value + "_" + this.suit + ".svg";
  //   console.log('card value is: ' + src);
  // }
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
