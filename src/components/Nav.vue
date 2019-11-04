<template lang="pug">
	nav.nav(:class="{active}")
		.nav-trigger(@click="toggle()") 
			.trigger-icon
			span.trigger-text My Chart & Contact
		.nav-inner
			a.nav-item(
				@click="navigate(`tel:${loc.l.phone}`)")
				.nav-content
					i.nav-icon.fas(class="fa-phone")
					h6.nav-text {{loc.l.title}}
			a.nav-item(
				@click="navigate(`tel:${loc.h.phone}`)")
				.nav-content
					i.nav-icon.fas(class="fa-phone")
					h6.nav-text {{loc.h.title}}
			a.nav-item.nav-item--main(@click="navigate('https://mychart.childrenscolorado.org/MyChart/')")
				.nav-content
					i.nav-icon.fas.fa-child
					h6.nav-text My Chart
			a.nav-item(
				@click="navigate(`https://www.google.com/maps/dir/?api=1&destination=${loc.h.lat},${loc.h.lng}`)")
				.nav-content
					i.nav-icon.fas(class="fa-map-marked-alt")
					h6.nav-text {{loc.h.title}}
			a.nav-item(
				@click="navigate(`https://www.google.com/maps/dir/?api=1&destination=${loc.l.lat},${loc.l.lng}`)")
				.nav-content
					i.nav-icon.fas(class="fa-map-marked-alt")
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: -30px;
  right: -30px;
  bottom: 0;
  height: 100%;
  width: calc(100vw + 60px);
  z-index: 20;
  background: transparent;
  pointer-events: none;
  transition: 0.2s 1s ease;
  overflow-x: hidden;
  overflow-y: auto;
  &.active {
    background: $gray;
    pointer-events: all;
    transition: 1s ease;
    .trigger-icon {
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
          transition: background 0.2s ease,
            transform 0.8s $delay ease-out, opacity 1s $delay ease-in;
        }
      }
    }
  }
}

.nav-trigger {
  display: flex;
  align-items: center;
  position: fixed;
  top: 10px;
	right: 10px;
	outline: 1px solid transparent;
  background: $white;
  color: $onyx;
  pointer-events: all;
  cursor: pointer;
  box-shadow: 0 0 3px 1px rgba($black, 0.05), 0 0 20px rgba($black, 0.05);
  transition: 0.2s ease;
  z-index: 5;
  &:hover {
    .trigger-icon {
      background: $indigo;
      color: $white;
    }
  }
}

.trigger-icon {
  position: relative;
  height: 34px;
  width: 34px;
  min-height: 34px;
  min-width: 34px;
  background: $gray;
  transition: 0.2s ease;
  &::before,
  &::after {
    content: "";
    transition: 0s ease, margin-top 0.2s 0.2s ease, transform 0.2s ease;
    position: absolute;
    height: 2px;
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

.trigger-text {
  font-size: 14px;
  margin: 0 7px;
	display: none;
	white-space: nowrap;
  @media (min-width: $md) {
    display: block;
  }
}

.nav-inner {
  max-width: 350px;
  display: flex;
  flex-wrap: wrap;
  padding: 54px 0 30px;
  width: calc(100% - 65px);
}

.nav-item {
  position: relative;
  background: $white;
  flex: 0 0 calc(50% - 5px);
  width: calc(50% - 5px);
  margin: 0 2.5px 5px;
  cursor: pointer;
  transform: translate(100vw, -100vh);
  opacity: 0;
  &.nav-item--main {
    flex: 0 0 calc(100% - 5px);
    width: calc(100% - 5px);
  }
  @media (min-width: $sm) {
    flex: 0 0 calc(50% - 20px);
    width: calc(50% - 20px);
    margin: 0 10px 20px;
    &.nav-item--main {
      flex: 0 0 calc(100% - 20px);
      width: calc(100% - 20px);
    }
  }
  @for $n from 1 through 10 {
    &:nth-last-child(#{$n}) {
      $delay: (0.1s * $n) - 0.1s;
      transition: background 0.2s ease,
        transform 0.8s $delay ease-in, opacity 0.4s $delay ease-in;
    }
  }
  &:before {
    display: block;
    content: "";
    padding-top: 100%;
  }
  &:hover {
		.nav-icon,
		.nav-text {
			color: $white !important;
		}
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
  padding: 20px;
  @media (min-width: $sm) {
    padding: 30px;
  }
}

.nav-icon {
  font-size: 40px;
	margin-bottom: 20px;
	transition: color 0.2s ease;
  .nav-item--main & {
		font-size: 100px;
    color: $sky;
  }
}

.nav-text {
	text-align: center;
  font-size: 20px;
	transition: color 0.2s ease;
  .nav-item--main & {
    font-size: 28px;
    color: $sky;
  }
}
</style>