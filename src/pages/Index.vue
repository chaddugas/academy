<template lang="pug">
	Layout
		main
			app-hero
			app-visit
			app-insurance
			app-grid
</template>

<script>
import Hero from "@/components/Hero"
import Visit from "@/components/Visit"
import Insurance from "@/components/Insurance"
import Grid from "@/components/Grid"
export default {
	name: "Home",
  components: {
    appHero: Hero,
    appVisit: Visit,
    appInsurance: Insurance,
    appGrid: Grid
  }
};
</script>

<style>
</style>
