<template>
   <div id="app">
    	<router-view/>
   </div>
</template>

<script>
	export default {
		name: 'App',
		created() {
			window.document.getElementById('spinner-loading').style.display = 'none';
		}
	}

</script>
<style>
	#app {
		max-width: 640px;
		min-width: 320px;
		margin: 0 auto;
		height: 100%;
		background-color: #f8f8f8;
	}

</style>
