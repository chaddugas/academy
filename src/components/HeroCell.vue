<template lang='pug'>
	.hero-cell
		.cell-img(:class="{active}", :style="style")
		img(
			v-for="set in total",
			:src="prerender(set)",
			@load="activate()")
</template>

<script>
export default {
  name: "HeroCell",
	props: ["item", "set", "total"],
	data() {
		return {
			active: false,
			imageSet: this.set,
			activeTotal: 0
		}
	},
  computed: {
		image() {
			return `/media/hero-${this.set}/hero_${this.item.toString().padStart(2, "0")}.jpg`
		},
		delay() {
			// return ((Math.ceil(Math.random() * 10) + 5) * 0.05) * 1000
			return ((this.item - 1) * 0.05) * 1000
		},
    style() {
			let backgroundImage = `url(${this.image})`
			let transitionDelay = `${this.delay}ms`
			if (this.set) {
				return {
					backgroundImage,
					transitionDelay
				}
			}
      return {
				transitionDelay
      }
    }
	},
	methods: {
		prerender(set) {
			return `/media/hero-${set}/hero_${this.item.toString().padStart(2, "0")}.jpg`
		},
		activate() {
			this.activeTotal ++
			if (this.activeTotal == this.total) {
				this.active = true
			}
		}
	}
};
</script>

<style lang='scss' scoped>
.hero-cell {
	position: relative;
  // margin: 0 2.5px;
	// margin-bottom: 5px;
	overflow: hidden;
  @media (min-width: $sm) {
    // margin: 0 5px;
    // margin-bottom: 10px;
  }
	$r: 1;
	$c: 1;
	@for $n from 1 through 20 {
		@if $c > 9 {
			$c: 1;
			$r: $r+2;
		}
		@if $r > 7 {
			$r: 1;
		}
		&:nth-child(#{$n}) {
			grid-row-start: #{$r};
			grid-row-end: #{$r + 1};
			grid-column-start: #{$c};
			grid-column-end: #{$c + 1};
		}
		$c: $c+2;
	}
}

.cell-img {
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	background-size: cover;
	transition: 0.6s ease;
	opacity: 0;
	&.active {
		opacity: 1;
	}
}

img {
	position: absolute;
	top: -100vh;
	left: -100vw;
	height: 1px;
	width: 1px;
	opacity: 0;
}
</style>