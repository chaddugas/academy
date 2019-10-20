<template lang="pug">
	nav.nav(:class="{active}")
		.nav-trigger(@click="toggle()")
		.nav-inner
			.nav-item(@click="navigate('locations', false)")
				.nav-content
					i.nav-icon.fas.fa-walking
					h6.nav-text Visit
			.nav-item(@click="navigate('insurance', false)")
				.nav-content
					i.nav-icon.fas.fa-file-invoice
					h6.nav-text Insurance
			.nav-item(@click="navigate('staff', false)")
				.nav-content
					i.nav-icon.fas.fa-id-badge
					h6.nav-text Staff
			.nav-item(@click="navigate('resources', false)")
				.nav-content
					i.nav-icon.fas.fa-file-medical-alt
					h6.nav-text Resources
			a.nav-item.nav-item--external(
				@click="navigate(context == 'desktop' ? `https://www.google.com/maps/dir//Academy+Park+Pediatrics/@${loc.h.lat},${loc.h.lng}` : `tel:${loc.h.phone}`)")
				.nav-content
					i.nav-icon.fas(:class="context == 'desktop' ? 'fa-map-marked-alt' : 'fa-phone'")
					h6.nav-text {{loc.h.title}}
			a.nav-item.nav-item--external(@click="navigate('https://mychart.childrenscolorado.org/MyChart/')")
				.nav-content
					i.nav-icon.fas.fa-baby
					h6.nav-text My Chart
			a.nav-item.nav-item--external(
				@click="navigate(context == 'desktop' ? `https://www.google.com/maps/dir//Academy+Park+Pediatrics/@${loc.l.lat},${loc.l.lng}` : `tel:${loc.l.phone}`)")
				.nav-content
					i.nav-icon.fas(:class="context == 'desktop' ? 'fa-map-marked-alt' : 'fa-phone'")
					h6.nav-text {{loc.l.title}}
</template>

<script>
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
export default {
  name: "Navigation",
  data() {
    return {
      active: false,
      context: process.isClient
        ? window.matchMedia("(pointer: fine)").matches
          ? "desktop"
          : "mobile"
        : false
    };
  },
  computed: {
    loc() {
      return {
        h: JSON.parse(
          JSON.stringify(this.$static.office.edges[0].node.highlands)
        ),
        l: JSON.parse(
          JSON.stringify(this.$static.office.edges[0].node.lakewood)
        )
      };
    }
  },
  methods: {
    toggle() {
      if (this.active) {
        this.active = false;
        enableBodyScroll(this.$el);
      } else {
        this.active = true;
        disableBodyScroll(this.$el);
      }
    },
    navigate(path, external = true) {
      if (!external) {
        let dest = document.querySelector(`#${path}`);
				this.toggle();
				
				window.scrollBy({
					top: dest.getBoundingClientRect().top - 30,
					behavior: "smooth"
				});
      } else if (path.includes("tel:")) {
        path = path.replace(/ /g, "").replace(/\-/g, "");
        window.location.href = path;
      } else {
        window.open(path, "_blank");
      }
    }
  }
};
</script>

<static-query>
	query {
		office: allOffice {
			edges {
				node {
					highlands {
						title
						phone
						lat
						lng
					}
					lakewood {
						title
						phone
						lat
						lng
					}
				}
			}
		}
	}
</static-query>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  z-index: 20;
  background: transparent;
  pointer-events: none;
	transition: 0.2s 1s ease;
  overflow-x: hidden;
  overflow-y: auto;
  &.active {
    opacity: 1;
    pointer-events: all;
    transition: 0.2s ease;
    background: $gray;
    .nav-trigger {
      background: $red;
      color: $white;
      &::before,
      &::after {
        transition: 0s ease, margin-top 0.2s ease, transform 0.2s 0.2s ease;
        transform: translateY(-50%) rotate(45deg);
        margin-top: 0;
      }
      &::after {
        transform: translateY(-50%) rotate(-45deg);
      }
    }
    .nav-item {
      transform: translate(0, 0);
      opacity: 1;
      @for $n from 1 through 10 {
        &:nth-child(#{$n}) {
          $delay: (0.1s * $n) - 0.1s + 0.2s;
					transition: 
						background 0.2s ease,
						color 0.2s ease,
						transform 0.6s $delay ease-out;
        }
      }
    }
  }
}

.nav-trigger {
  position: fixed;
  top: 10px;
  right: 10px;
  height: 34px;
  width: 34px;
  background: $white;
  color: $onyx;
  pointer-events: all;
  cursor: pointer;
  box-shadow: 0 0 3px 1px rgba($black, 0.05), 0 0 20px rgba($black, 0.05);
  transition: 0.2s ease;
  z-index: 5;
  &:hover {
    background: $indigo;
    color: $white;
  }
  &::before,
  &::after {
    content: "";
    transition: 0s ease, margin-top 0.2s 0.2s ease, transform 0.2s ease;
    position: absolute;
    height: 1px;
    width: 18px;
    background: currentColor;
    transform: translateY(-50%);
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  &::before {
    margin-top: -3.5px;
  }
  &::after {
    margin-top: 3.5px;
  }
}

.nav-inner {
  @include container($max: 550px, $margin: 10px);
  display: flex;
  flex-wrap: wrap;
  padding: 54px 0 30px;
}

.nav-item {
  position: relative;
  flex: 0 0 calc(50% - 5px);
  width: calc(50% - 5px);
  background: $white;
  margin-bottom: 10px;
  cursor: pointer;
  transform: translate(100vw, -100vh);
  @for $n from 1 through 10 {
    &:nth-last-child(#{$n}) {
      $delay: (0.1s * $n) - 0.1s;
			transition: 
				background 0.2s ease,
				color 0.2s ease,
				transform 0.6s $delay ease-in;
    }
  }
  &:nth-child(odd) {
    margin-right: 5px;
  }
  &:nth-child(even) {
    margin-left: 5px;
  }
  &:before {
    display: block;
    content: "";
    padding-top: 100%;
  }
  &:hover {
    color: $white;
    &:nth-child(5n-4) {
      background: $indigo;
    }
    &:nth-child(5n-3) {
      background: $orange;
    }
    &:nth-child(5n-2) {
      background: $sky;
    }
    &:nth-child(5n-1) {
      background: $red;
    }
    &:nth-child(5n) {
      background: $teal;
    }
  }
  @media (min-width: $sm) {
    flex: 0 0 calc(50% - 10px);
    width: calc(50% - 10px);
    margin-bottom: 20px;
    &:nth-child(odd) {
      margin-right: 10px;
    }
    &:nth-child(even) {
      margin-left: 10px;
    }
  }
}

.nav-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  @media (min-width: $sm) {
    padding: 40px;
  }
}

.nav-icon {
  font-size: 12vw;
  margin-bottom: 4vw;
  @media (min-width: $sm) {
    font-size: 80px;
    margin-bottom: 30px;
  }
}

.nav-text {
  font-size: 6vw;
  text-align: center;
  @media (min-width: $sm) {
    font-size: 36px;
  }
}

.nav-item.nav-item--external {
  flex: 0 0 calc(33.3333% - 6.6666px);
  width: calc(33.3333% - 6.6666px);
  margin-left: 0;
  margin-right: 0;
  &:nth-of-type(3n-2) {
    margin-right: 5px;
  }
  &:nth-of-type(3n-1) {
    margin-left: 5px;
    margin-right: 5px;
  }
  &:nth-of-type(3n) {
    margin-left: 5px;
  }
  @media (min-width: $sm) {
    flex: 0 0 calc(33.3333% - 13.333px);
    width: calc(33.3333% - 13.333px);
    &:nth-of-type(3n-2) {
      margin-right: 10px;
    }
    &:nth-of-type(3n-1) {
      margin-left: 10px;
      margin-right: 10px;
    }
    &:nth-of-type(3n) {
      margin-left: 10px;
      margin-right: 0;
    }
  }
  .nav-content {
    padding: 20px;
    @media (min-width: $sm) {
      padding: 30px;
    }
  }
  .nav-icon {
    font-size: 7vw;
    @media (min-width: $sm) {
      font-size: 40px;
      margin-bottom: 20px;
    }
  }
  .nav-text {
    font-size: 4vw;
    @media (min-width: $sm) {
      font-size: 20px;
    }
  }
}
</style>