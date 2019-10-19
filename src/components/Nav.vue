<template lang="pug">
	transition(name="fade")
		nav.nav(v-if="active")
			.nav-item(@click="navigate('locations')")
				i.nav-icon.fas.fa-walking
				span.nav-text Visit
			.nav-item(@click="navigate('insurance')")
				i.nav-icon.fas.fa-file-invoice
				span.nav-text Insurance
			.nav-item(@click="navigate('staff')")
				i.nav-icon.fas.fa-id-badge
				span.nav-text Staff
			.nav-item(@click="navigate('resources')")
				i.nav-icon.fas.fa-file-medical-alt
				span.nav-text Resources
			//- .nav-item(@click="navigate('about')")
			//- 	i.nav-icon.fas.fa-dna
			//- 	span.nav-text About
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      active: process.isClient ? window.scrollY > 200 : false
    };
  },
  methods: {
		navigate(id) {
			let dest = document.querySelector(`#${id}`)

			if (dest) window.scrollBy({top: dest.getBoundingClientRect().top - 30, behavior: 'smooth'})
		},
    activate() {
      this.active = window.scrollY > 200;
    },
    init() {
      window.addEventListener("scroll", this.activate);
    },
    destroy() {
      window.removeEventListener("scroll", this.activate);
    }
  },
  mounted() {
    if (process.isClient) this.init();
  },
  beforeDestroy() {
    this.destroy();
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.nav {
  display: flex;
  padding: 0 20px;
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
  background: $orange;
  z-index: 20;
}

.nav-item {
  font-weight: 700;
  padding: 0 17px;
  line-height: 1;
  color: $onyx;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  text-align: center;
	transition: 0.25s ease;
	cursor: pointer;
  @media (min-width: $md) {
  padding: 0 20px;
	}
  &:before {
    transition: bottom 0.2s ease, right 0s 0.2s linear,
      background 0.2s 0.2s ease;
    position: absolute;
    content: "";
    bottom: 100%;
    left: 0;
    top: 0;
    right: 100%;
    background: $indigo;
    z-index: -1;
  }
  &:hover {
    color: $orange;
    &:before {
      transition: right 0.2s ease, bottom 0s linear, background 0.2s ease;
      right: 0;
      bottom: 0;
      background: $onyx;
    }
  }
}

.nav-icon {
  font-size: 30px;
  @media (min-width: $md) {
    margin-right: 8px;
    font-size: 22px;
  }
}

.nav-text {
  font-size: 18px;
  text-transform: uppercase;
  display: none;
  @media (min-width: $md) {
    display: block;
  }
}
</style>