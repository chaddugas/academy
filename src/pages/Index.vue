<template lang="pug">
	Layout
		main
			app-hero
			app-visit
</template>

<script>
import Hero from "@/components/Hero"
import Visit from "@/components/Visit"
export default {
	name: "Home",
  components: {
    appHero: Hero,
    appVisit: Visit
  }
};
</script>

<style>
</style>
