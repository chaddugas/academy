<template lang="pug">
	section#staff.grid
		.grid-inner
			.grid-title
				canvas.title-canvas
				h2
					span Meet 
					span Our
					span Staff
			app-profile(
				v-for="(profile, i) in profiles", 
				:key="i", :profile="profile")
</template>

<script>
import Profile from "./Profile";
import Canvas from "@/mixins/Canvas";

export default {
	name: "Staff",
  mixins: [Canvas],
  components: {
    appProfile: Profile
	},
	computed: {
		profiles() {
			let profiles = this.$static.profiles.edges[0].node.profiles
			profiles = profiles.filter(profile => profile.visible)
			return profiles
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
	@include container($max: 1200px);
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

.grid-title {
	position: relative;
  z-index: -1;
  grid-area: span 1 / span 1;
	background: $red;
  transition: none;
  transition-delay: 0;
  @media (min-width: $xs) {
    padding: 30px;
  }
  @media (min-width: $sm) {
    padding: 40px;
  }
  h2 {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    height: 100%;
    width: 100%;
    text-align: right;
    color: $white;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 22px;
    line-height: 1.1;
    text-transform: uppercase;
    @media (min-width: $xs) {
      font-size: 28px;
    }
    @media (min-width: $sm) {
      font-size: 45px;
    }
    @media (min-width: $md) {
      font-size: 50px;
      line-height: 1.2;
    }
    @media (min-width: $lg) {
      font-size: 55px;
    }
    @media (min-width: $xl) {
      font-size: 65px;
    }
    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
  }
}

.title-canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
}
</style>