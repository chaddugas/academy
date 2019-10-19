<template lang="pug">
	section#staff.profiles
		.profiles-inner
			.profiles-title
				h2
					span Meet 
					span Our
					span Staff
			app-profile(
				v-for="(profile, i) in profiles", 
				:key="i", 
				:profile="profile")
</template>

<script>
import Profile from "./Profile";

export default {
	name: "Profiles",
  components: {
		appProfile: Profile,
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
/* autoprefixer grid: on */
.profiles {
	@include container($max: 1200px);
	padding: 30px 0;
}

.profiles-inner {
	display: flex;
	flex-wrap: wrap;
	width: calc(100% + 10px);
	margin: 0 -5px;
	position: relative;
	z-index: 1;
	@media (min-width: $md) {
		width: calc(100% + 40px);
		margin: 0 -20px;
	}
}

.profiles-title {
	position: relative;
  z-index: -1;
	flex: 0 0 calc(50% - 5px);
	width: calc(50% - 5px);
	margin: 0 2.5px 5px;
	background: $red;
  transition: none;
  transition-delay: 0;
  @media (min-width: $xs) {
    padding: 30px;
  }
  @media (min-width: $sm) {
    padding: 40px;
  }
	@media (min-width: $md) {
		flex: 0 0 calc(33.333% - 20px);
		width: calc(33.333% - 20px);
		margin: 0 10px 20px;
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
</style>