<template lang="pug">
	Layout
		main
			app-hero
			app-visit
			app-grid
</template>

<script>
import Hero from "@/components/Hero"
import Visit from "@/components/Visit"
import Grid from "@/components/Grid"
export default {
	name: "Home",
  components: {
    appHero: Hero,
    appVisit: Visit,
    appGrid: Grid
  }
};
</script>

<style>
</style>
