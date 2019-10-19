<template lang="pug">
	Layout
		main
			app-hero
			app-locations
			app-insurance
			app-profiles
			app-resources
</template>

<script>
import Hero from "@/components/Hero"
import Locations from "@/components/Locations"
import Insurance from "@/components/Insurance"
import Profiles from "@/components/Profiles"
import Resources from "@/components/Resources"
export default {
	name: "Home",
  components: {
    appHero: Hero,
    appLocations: Locations,
    appInsurance: Insurance,
    appProfiles: Profiles,
    appResources: Resources
  }
};
</script>

<style>
</style>
