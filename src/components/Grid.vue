<template lang="pug">
	section#staff.grid
		.grid-inner
			app-profile(:title="true")
			app-profile(
				v-for="(profile, i) in profiles", 
				:key="i", :profile="profile", 
				:title="false")
</template>

<script>
import Profile from "./Profile";
export default {
	name: "Staff",
  components: {
    appProfile: Profile
	},
	computed: {
		profiles() {
			return this.$static.profiles.edges[0].node.profiles
		}
	}
}
</script>

<static-query>
query {
  profiles:allProfiles {
    edges {
      node {
        profiles {
          title
          photo
          bio
          visible
        }
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
.grid {
	@include container($max: 1100px);
	padding: 30px 0;
}

.grid-inner {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: 1fr;
	grid-gap: 20px;
	position: relative;
	z-index: 1;
	@media (min-width: $md) {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>